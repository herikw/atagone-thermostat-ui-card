import {
  TemplateResult,
  LitElement,
  html,
  css,
  PropertyValueMap,
  svg,
  CSSResultGroup,
  PropertyValues
} from 'lit';
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
  mdiSunThermometer,
  mdiDotsVertical,
  mdiCalendarSync,
  mdiAutorenew,
  mdiFire,
  mdiLeaf,
  mdiThermometer,
  mdiWifiStrengthOffOutline,
  mdiChevronRight,
  mdiChevronLeft,
  mdiHandBackRightOutline,
  mdiBagSuitcaseOutline,
  mdiHistory,
  mdiWater
} from "@mdi/js";

import {
  CARD_VERSION
} from './const';
import {
  localize
} from './localize/localize';
import {
  clamp,
  ClimateEntity,
  debounce,
  fireEvent,
  formatNumber,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
} from "./ha";

import { ClimateCardConfig } from './climate-card-config';
import { mdiBagSuitcase } from '@mdi/js';

const UNAVAILABLE = "unavailable";
const UNKNOWN = "unknown";
const modeIcons: {
  [mode in any]: string
} = {
  auto: mdiCalendarSync,
  heat: mdiFire,
  eco: mdiLeaf,
  summer: mdiSunThermometer,
  temperature: mdiThermometer
};
type Target = "value" | "low" | "high";

type PresetMode = "manual" | "auto" | "holiday" | "fireplace" | string;

interface RegisterCardParams {
  type: string;
  name: string;
  description: string;
}
export function registerCustomCard(params: RegisterCardParams) {
  const windowWithCards = window as unknown as Window & {
    customCards: unknown[];
  };
  windowWithCards.customCards = windowWithCards.customCards || [];
  windowWithCards.customCards.push({
    ...params,
    preview: true,
  });
}

/* eslint no-console: 0 */
console.info(
  `%c  AtagOneThermostatUi-CARD \n%c  version: ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

registerCustomCard({
  type: "atagone-thermostat-ui-card",
  name: "AtagOne Thermostat Card",
  description: "Card for AtagOne entity",
});

@customElement('atagone-thermostat-ui-card')
export class AtagOneThermostatUi extends LitElement implements LovelaceCard {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./atagone-thermostat-ui-card-editor");
    return document.createElement("atagone-thermostat-ui-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass: HomeAssistant): Promise<any> {
    const entities = Object.keys(hass.states);
    const climates = entities.filter((e) => ["climate"].includes(e.split(".")[0]));
    const bt_climate: any = climates.filter((e) => hass.states[e].attributes?.call_for_heat);
    return {
      type: "custom:atagone-thermostat-ui-card",
      entity: bt_climate[0] || climates[0]
    };
  }

  @property({
    attribute: false
  }) public hass!: HomeAssistant;
  @property({ type: Number }) public value: Partial<Record<Target, number>> = {};
  @state() private _selectTargetTemperature: Target = "low";
  @property({ type: Number }) public current: number = 0;
  @property({ type: Number }) public min = 4;
  @property({ type: Number }) public max = 27;
  @property({ type: Number }) public step = .5;
  @property({ type: Boolean }) public summer: boolean = false;
  @property({ type: String }) public status: string = "loading";
  @property({ type: String }) public mode: string = "on";
  @property({ type: Boolean, reflect: true }) public dragging = false;
  @state()
  private changingHigh?: number;

  @state() private _vacationStart: Date | null = null;
  @state() private _vacationEnd: Date | null = null;
  @state() private _showHolidayEditor: boolean = false;
  @state() private _editingHoliday = false;

  private target: any = "value";


  private _debouncedCallService = debounce(
    (target: Target) => this._callService(target),
    1000
  );

  private _callService(type: string) {
    if (type === "high" || type === "low") {
      this.hass.callService("climate", "set_temperature", {
        entity_id: this.stateObj!.entity_id,
        target_temp_low: this.value.low,
        target_temp_high: this.value.high,
      });
      return;
    }
    this.hass.callService("climate", "set_temperature", {
      entity_id: this.stateObj!.entity_id,
      temperature: this.value.value,
    });
  }

  private _handleButton(ev) {
    const target = ev.currentTarget.target as Target;
    const step = ev.currentTarget.step as number;

    const defaultValue = target === "high" ? this.max : this.min;

    let temp = this.value[target] ?? defaultValue;
    temp += step;
    temp = clamp(temp, this.min, this.max);
    if (target === "high" && this.value.low != null) {
      temp = clamp(temp, this.value.low, this.max);
    }
    if (target === "low" && this.value.high != null) {
      temp = clamp(temp, this.min, this.value.high);
    }

    this.value = {
      ...this.value,
      [target]: temp,
    };

    this._activateSwapDisplay();

    this._updateDisplay();
    this._vibrate(40);
    this._debouncedCallService(target);
  }

  private _firstRender: Boolean = true;
  private _hasSummer: Boolean = false;
  private stateObj: ClimateEntity | undefined;
  private _display_bottom: number = 0;
  private _display_top: number = 0;
  private modes: any = [];
  private error: any = []; 

  @state() private _config?: ClimateCardConfig;
  @state() private _showPresets: boolean = false;

  @state() private _swapDisplay = false;
  private _swapTimeout?: number;

  @state() private _leftPressed: boolean = false;
  @state() private _rightPressed: boolean = false;

  private _onLeftDown() {
    this._leftPressed = true;
  }

  private _onLeftUp() {
    this._leftPressed = false;
  }

  private _onRightDown() {
    this._rightPressed = true;
  }

  private _onRightUp() {
    this._rightPressed = false;
  }

  setConfig(config: ClimateCardConfig): void {
    this._config = {
      tap_action: {
        action: "toggle",
      },
      hold_action: {
        action: "more-info",
      },
      ...config,
    };
  }

  getCardSize(): number | Promise<number> {
    return 1;
  }

  public static styles: CSSResultGroup = css`

    @font-face {
      font-family: 'OWOW';
      src: url('/local/fonts/owow_medium_03.woff2') format('woff2'),
          url('/local/fonts/owow_medium_03.ttf') format('truetype');
      font-style: normal;
      font-display: swap;
    }

    .main-value {
      font-family: 'OWOW', 'Roboto', 'Noto', sans-serif;
      font-size: 65px;
      letter-spacing: -0.03em;
      text-rendering: geometricPrecision;
      transition: fill 0.3s ease;
      fill: #ffffff;
    }

    .main-value.heating {
      fill: #f44336; /* bright red */
    }

    .current-info {
      font-family: 'OWOW', 'Roboto', 'Noto', sans-serif;
      font-size: 1.2em;
      transition: all 0.4s ease-in-out;
    }

    .current-info.heating text {
      fill: #ff5a4a;
      filter: drop-shadow(0 0 6px #ff5a4a);
      transition: fill 0.3s ease, filter 0.3s ease;
    }

    .current-info text {
      fill: #ffffff;
      filter: none;
      transition: fill 0.3s ease, filter 0.3s ease;
    }

    :host {
      display: block;
      box-sizing: border-box;
      position: relative;
      container: at-card / inline-size;
    }

    ha-card {
      overflow: hidden;
      height: 100%;
      min-height: 250px;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      align-content: stretch;
      justify-content: space-between;

      /* new black theme */
      background: #000;
      color: #fff;
      padding: 1.5em 0.2em 0.8em;
    }

    at-ha-outlined-icon-button {
      border: 1px solid var(--secondary-text-color);
      border-radius: 100%;
      padding: 0.5em;
      cursor: pointer;
    }

    at-ha-outlined-icon-left-button {
      color: #2196f3;
      border: 2px solid #2196f3;
      border-radius: 100%;
      padding: 0.6em;
      cursor: pointer;
      margin-right: 2em;
    }

    at-ha-outlined-icon-right-button {
      color: #f44336;
      border: 2px solid #f44336;
      border-radius: 100%;
      padding: 0.6em;
      cursor: pointer;
      margin-left: 2em;
    }

    .unavailable {
      opacity: 0.3;
    }

    .unavailable #bar, .unavailable .main-value, .unavailable #value,.unavailable #current, .unavailable .current-info,
    .unknown #bar, .unknown .main-value, .unknown #value,.unknown #current, .unknown .current-info {
      display: none;
    }

    .more-info {
      position: absolute;
      cursor: pointer;
      top: 0px;
      right: 0px;
      inset-inline-end: 0px;
      inset-inline-start: initial;
      border-radius: 100%;
      color: var(--secondary-text-color);
      z-index: 1;
      direction: var(--direction);
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .content {
      position: relative;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      text-align: center;
      overflow: visible;
      pointer-events: none;
    }

    .content > svg * {
      pointer-events: auto;
    }

    #main {
      width: 100%;
      height: auto;
      aspect-ratio: 1.25 / 1;
      max-width: 260px;
      transform: none;
    }

    .name {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      word-break: keep-all;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 0.6em;
    }

    .top-indicators {
      position: absolute;
      top: 1.5em;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 2;
    }

    .burner-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff3b30;
      box-shadow: 0 0 6px #ff3b30;
      opacity: 0;
      transition: opacity 0.4s ease, transform 0.3s ease;
      position: relative;
    }

    .burner-dot.active {
      opacity: 1;
      transform: scale(1.1);
      animation: pulse 1.6s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 6px #ff3b30;
      }
      50% {
        transform: scale(1.25);
        box-shadow: 0 0 10px #ff3b30;
      }
    }

    .holiday-icon {
      position: absolute;
      left: calc(50% + 9em); /* moves it slightly right of center */
      top: 0.05em;
      opacity: 0.4;
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
    }

    .holiday-icon.active {
      opacity: 1;
      transform: scale(1.05);
    }

    .holiday-icon.hidden {
      display: none !important;
    }

    .holiday-icon ha-svg-icon {
      --mdc-icon-size: 22px;
      color: #ffffff;
    }

    .top-icons ha-svg-icon {
      color: #fff;
      --mdc-icon-size: 20px;
      opacity: 0.6;
      transition: opacity 0.3s ease, transform 0.2s ease;
    }

    .top-icons ha-svg-icon.active {
      opacity: 1;
      transform: scale(1.05);
      color: #ffffff;
    }

    svg {
      height: auto;
      margin: auto;
      display: block;
      width: 100%;
      -webkit-backface-visibility: hidden;
      max-width: 260px;
    }
        
    path {
      stroke-linecap: round;
      stroke-width: 1;
    }

    text {
      fill: #ffffff;
    }

    .eco {
      --mode-color: var(--energy-non-fossil-color);
    }

    .summer {
      --mode-color: var(--label-badge-yellow);
    }

    .window_open {
      --mode-color: #80a7c4;
    }

    .auto,
    .heat_cool {
      --mode-color: var(--state-climate-auto-color);
    }
    .cool {
      --mode-color: var(--label-badge-red);
    }
    .heat, .heat_cool {
      --mode-color: var(--label-badge-red);
    }
    .manual {
      --mode-color: var(--state-climate-manual-color);
    }
    .off {
      --mode-color: var(--slider-track-color);
    }
    .fan_only {
      --mode-color: var(--state-climate-fan_only-color);
    }
    .dry {
      --mode-color: var(--state-climate-dry-color);
    }
    .idle {
      --mode-color: var(--state-climate-idle-color);
    }
    .unknown-mode {
      --mode-color: var(--state-unknown-color);
    }

    #modes {
      z-index: 3;
      position: relative;
      display: flex;
      width: 100%;
      justify-content: center;
      margin-top: 0.3em;
      margin-bottom: 0.3em;
    }

    #at-control-buttons {
      z-index: 3;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.2em 0 0.8em;
    }

    #at-control-buttons .button {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #modes > * {
      color: var(--disabled-text-color);
      cursor: pointer;
      display: inline-block;
    }

    #modes .selected-icon {
      color: var(--mode-color);
    }
        
    #shadowpath {
      stroke: #e7e7e8;
    }

    #value {
      fill: var(--mode-color);
      r: 5;
      z-index: 9999 !important;
      transition: r 0.3s ease-in-out, fill 0.6s ease-in-out;
    }

    #value,#current {
      filter: drop-shadow(0px 0px 1px #000);
    }

    #value:hover, #value:active, #value:focus, #value.active {
      r: 8 !important;
    }

    #current {
      pointer-events: none;
      fill: var(--label-badge-grey);
    }
        
    .status {
      transition: fill 0.6s ease-in-out, filter 0.6s ease-in-out;
      filter: none;
    }
    .status.active {
      fill: var(--error-color);
      filter: drop-shadow(0px 0px 6px var(--error-color));
    }

    .status.cooler.active {
      fill: #03A9F4;
      filter: drop-shadow(0px 0px 6px #03A9F4);
    }

    #bar {
      stroke: var(--mode-color);
      stroke-dasharray: 176;
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 5.1s ease-in-out 0s, stroke 0.6s ease-in-out;
    }

    #bar.drag {
      transition: none !important;
    }
    #c-minus,#c-plus {
      cursor: pointer;
    }
    .control {
      cursor: pointer;
      pointer-events: none;
    }
    ha-icon-button {
      transition: color 0.6s ease-in-out;
    }

    .summer,.window {
      transition: fill 0.3s ease;
      fill: var(--disabled-text-color);
    }
    line {
      stroke: var(--disabled-text-color);
    }
    .summer.active {
      fill: var(--label-badge-yellow);
    }
    .window.active {
      fill: #80a7c4;
    }
    ha-icon-button[title="eco"] {
      --mode-color: var(--energy-non-fossil-color) !important;
    }

    /* ---------- BLACK LAYOUT EXTRAS ---------- */

    .top-label {
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0.7;
      text-align: center;
      margin-bottom: 0.3em;
    }

    .bottom-small-label {
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0.7;
      text-align: center;
    }

    .center-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .error {
      display: flex;
      align-items: center;
      gap: 0.4em;
      font-size: 11px;
      margin: 0.4em 0 0;
      color: #ff8a80;
    }

    .bottom-bar {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.2em;
      background: #111;
      border-radius: 10px;
      padding: 0.4em 0.3em 0.2em;
      overflow: hidden;
      transition: all 0.35s ease;
    }

    /* When expanded, show all buttons spaced out */
    .bottom-bar.expanded {
      justify-content: space-between;
    }

    /* When collapsed, keep centered preset and left button only */
    .bottom-bar:not(.expanded) {
      justify-content: space-between;
    }

    /* Buttons transition opacity/slide smoothly */
    .bottom-button {
      flex: 1;
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-align: center;
      color: #888;
      opacity: 0.65;
      transition: opacity 0.25s ease, transform 0.35s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.2em;
      cursor: pointer;
      padding: 0.15em 0.1em 0.2em;
      border-radius: 6px;
    }


    .bottom-button.preset {
      opacity: 1;
      background: #1e1e1e;
      color: #888;
      --mdc-icon-size: 24px;
    }
    
    .bottom-button.preset.active {
      color: #fff;
    }

    .bottom-button.preset-centered {  
      --mdc-icon-size: 24px;
      color: #fff;
    }

    /* Center the preset when collapsed */
    .preset-centered {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      transition: transform 0.35s ease, opacity 0.35s ease;
      color: #fff;
    }

    /* Animate the preset row expanding/collapsing */
    .bottom-bar.expanded .preset-centered {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
      pointer-events: none;
    }

    .bottom-bar.expanded .bottom-button:not(.change-fn) {
      opacity: 1;
      transform: translateY(0);
    }

    .bottom-bar:not(.expanded) .bottom-button:not(.change-fn):not(.preset-centered) {
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
    }

    .change-fn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      gap: 0.3em;
      cursor: pointer;
      text-align: center;
    }

    .circle-button {
      width: 21px;
      height: 21px;
      border-radius: 50%;
      border: 2px solid #888;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.3s ease, transform 0.2s ease, background 0.3s ease;
    }

    .circle-button ha-svg-icon {
      --mdc-icon-size: 32px;
      color: #888;
      transition: color 0.3s ease;
    }

    /* Hover / active state */
    .change-fn:hover .circle-button {
      border-color: #bbb;
      transform: scale(1.05);
    }

    .change-fn:hover ha-svg-icon {
      color: #fff;
    }

    .change-fn .label {
      font-size: 0.65rem;
      color: #ccc;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .content text.main-value {
      font-size: 4.2em;
    }

    .content .current-info {
      font-size: 30px;
    }

    /* LEFT button pressed → BLUE background + BLACK arrow */
    at-ha-outlined-icon-left-button.pressed {
      background: #2196f3 !important;
      border-color: #2196f3 !important;
    }

    at-ha-outlined-icon-left-button.pressed ha-svg-icon {
      color: #000 !important;
    }

    /* RIGHT button pressed → RED background + BLACK arrow */
    at-ha-outlined-icon-right-button.pressed {
      background: #f44336 !important;
      border-color: #f44336 !important;
    }

    at-ha-outlined-icon-right-button.pressed ha-svg-icon {
      color: #000 !important;
  }


    #modes {
      margin-top: 0.3em;
      margin-bottom: 0.4em;
    }

    @container at-card (max-width: 280px) {
      .content {
        top: calc(50% - 10px);
      }
      .bottom-bar {
        flex-wrap: wrap;
        row-gap: 0.2em;
      }
    }

    @container at-card (max-width: 255px) {
      #modes {
        margin-top: .5em;
      }
      ha-card {
        padding-top: 1.6em;
      }
    }

    /* ---------------- HOLIDAY EDITOR ---------------- */
    .holiday-editor {
      width: 100%;
      margin: 1em 0.1em;
      background: #111;
      border-radius: 12px;
      border: 1px solid #222;
    }

    .holiday-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.1em;
    }

    .holiday-col-label {
      width: 48%;
      display: flex;
      flex-direction: column;
      font-size: 1rem;
      letter-spacing: 0.02em;
    }

    .holiday-col-label .description {
      opacity: 0.6;
      margin-top: -0.2em;
      font-size: 0.82rem;
    }

    .holiday-col-input {
      width: 50%;
    }

    .holiday-input {
      width: 100%;
      font-size: 1rem;
      padding: 0.55em 0.6em;
      border-radius: 6px;
      background: #1a1a1a;
      color: #fff;
      border: 1px solid #333;
      outline: none;
    }

    .holiday-input:focus {
      border-color: #888;
    }

    .holiday-buttons {
      margin-top: 1.2em;
      display: flex;
      justify-content: space-between;
    }

    .holiday-btn {
      flex: 1;
      margin: 0 0.3em;
      padding: 0.55em 0;
      border-radius: 6px;
      font-size: 1rem;
      text-transform: uppercase;
      text-align: center;
      cursor: pointer;
      border: none;
    }

    .holiday-btn-confirm {
      background: #28a745;
      color: #fff;
    }

    .holiday-btn-cancel,
    .holiday-btn-clear {
      background: #c82333;
      color: #fff;
    }
  `;

  private _vibrate(delay: number) {
    try {
      navigator.vibrate(delay);
    } catch (e) { }
  }

  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    this._firstRender = false;
  }

  public willUpdate(changedProps: PropertyValues) {
    if (!this.hass || !this._config || (!changedProps.has("hass") && !changedProps.has("_config"))) {
      return;
    }

    const entity_id: any = this._config.entity;

    const stateObj = this.hass.states[entity_id] as ClimateEntity;
    if (!stateObj) {
      return;
    }
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

    if (!oldHass || oldHass.states[entity_id] !== stateObj) {
      if (!this._config || !this.hass || !this._config.entity) return;

      this.stateObj = stateObj;
      const attributes = this.stateObj.attributes;
      const stateMode = this.stateObj.state;

      this.mode = stateMode || "off";

      if (attributes.hvac_modes) {
        this.modes = Object.values(attributes.hvac_modes);
      }

      this.value = {
        value: attributes?.temperature || 0,
        low: attributes?.target_temp_low as any || null,
        high: attributes?.target_temp_high as any || null,
      };

      if (attributes.target_temp_step) {
        this.step = attributes.target_temp_step;
      }
      if (attributes.min_temp) {
        this.min = attributes.min_temp;
      }
      if (attributes.max_temp) {
        this.max = attributes.max_temp;
      }
      if (attributes.current_temperature) {
        this.current = attributes.current_temperature;
      }

      if (attributes?.call_for_heat !== undefined) {
        this._hasSummer = true;
        this.summer = !attributes.call_for_heat
      }
      if (attributes?.errors !== undefined) {
        const errors = JSON.parse(attributes.errors);
        if (errors.length > 0) {
          this.error = errors[0];
        } else {
          this.error = [];
        }
      } else {
        this.error = [];
      }
      this._updateDisplay();
    }
  }

  private _isTopShowingTarget(): boolean {
    if (this._swapDisplay) return true;
    if (this._config?.set_current_as_main) return false;
    return true;
  }

  private _isBottomShowingTarget(): boolean {
    return !this._isTopShowingTarget();
  }
    

  private _updateDisplay() {
    if (this._swapDisplay) {
      this._display_top = this._getCurrentSetpoint(); 
      this._display_bottom = this.current;           
      return; // override config
    }

    const target = this._getCurrentSetpoint();
    const current = this.current;

    if (this?._config?.set_current_as_main) {
      this._display_top = current;
      this._display_bottom = target;
    } else {
      this._display_top = target;
      this._display_bottom = current;
    }
  }

  private _handleAction(e: MouseEvent): void {
    if ((e.currentTarget as any).mode === "eco") {
      const saved_temp = this?.stateObj?.attributes?.saved_temperature || null;
      if (saved_temp === null) {
        this.hass!.callService("atagone_thermostat", "set_temp_target_temperature", {
          entity_id: this._config!.entity,
          temperature: this._config?.eco_temperature || 18,
        });
      } else {
        this.hass!.callService("atagone_thermostat", "restore_saved_target_temperature", {
          entity_id: this._config!.entity,
        });
      }
    } else {
      const saved_temp = this?.stateObj?.attributes?.saved_temperature || null;
      if (saved_temp !== null) {
        this.hass!.callService("atagone_thermostat", "restore_saved_target_temperature", {
          entity_id: this._config!.entity,
        });
      }
      this.hass!.callService("climate", "set_hvac_mode", {
        entity_id: this._config!.entity,
        hvac_mode: (e.currentTarget as any).mode,
      });
    }
  }

  private _activateSwapDisplay() {
    this._swapDisplay = true;

    if (this._swapTimeout) {
      clearTimeout(this._swapTimeout);
    }

    this._swapTimeout = window.setTimeout(() => {
      this._swapDisplay = false;
      this._updateDisplay();
    }, 3000);
  }

  private _setTemperature(): void {
    this.hass!.callService("climate", "set_temperature", {
      entity_id: this._config!.entity,
      temperature: this.value,
    });
  }

  private _getCurrentSetpoint(): number {
    if (this?.value?.high !== null && this?.value?.low !== null) {
      if ((this?.value?.low || 0) >= this.current) return this?.value?.low || 0;
      else if ((this?.value?.high || 0) <= this.current) return this?.value?.high || 0;
      else return this?.value?.low || 0;
    }
    return this?.value?.value || 0;
  }

  private _renderIcon(mode: string, currentMode: string): TemplateResult {
    if (!modeIcons[mode]) {
      return html``;
    }
    const localizeMode = this.hass!.localize(`component.climate.state._.${mode}`) || localize({ hass: this.hass, string: `extra_states.${mode}` });
    return html`
      <ha-icon-button
        title="${currentMode === mode ? mode : ''}"
        class=${classMap({ "selected-icon": currentMode === mode })}
        .mode=${mode}
        @click=${this._handleAction}
        tabindex="0"
        .path=${modeIcons[mode]}
        .label=${localizeMode}
      >
      </ha-icon-button>
    `;
  }

  private _nowRounded(): Date {
    const d = new Date();
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  }
  
  private _handleMoreInfo() {
    fireEvent(this, "hass-more-info", {
      entityId: this._config!.entity,
    });
  }

  private _setPreset(preset: PresetMode): void {
    if (!this.hass || !this._config || !this.stateObj) return;

      if (preset === "holiday") {
        // enter holiday edit mode
        this._editingHoliday = true;

        // Only initialize if not previously set
        if (!this._vacationStart) {
          const start = this._nowRounded();
          const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days

          this._vacationStart = start;
          this._vacationEnd = end;
        }

      return;   // do NOT apply preset yet
    }

    // normal presets:
    this._showPresets = false;
    this._editingHoliday = false;

    // call HA immediately for non-holiday presets
    this.hass.callService("climate", "set_preset_mode", {
      entity_id: this._config!.entity,
      preset_mode: preset,
    });
  }

  private _renderPresetIcon(preset: PresetMode): TemplateResult {
    switch (preset) {
      case "auto":
        return html`<ha-svg-icon .path=${mdiCalendarSync}></ha-svg-icon>`;
      case "holiday":
        return html`<ha-svg-icon .path=${mdiBagSuitcaseOutline}></ha-svg-icon>`;
      //case "extend":
      //  return html`<ha-svg-icon .path=${mdiHistory}></ha-svg-icon>`;
      case "fireplace":
        return html`<ha-svg-icon .path=${mdiFire}></ha-svg-icon>`;
      case "manual":
        return html`<ha-svg-icon .path=${mdiHandBackRightOutline}></ha-svg-icon>`;
      default:
        return html`<ha-svg-icon .path=${mdiHandBackRightOutline}></ha-svg-icon>`;
    }
  }

  private _sevenDaysFromNow(): Date {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  }

  // holiday date helpers
  private _toLocalInputValue(d: Date): string {
    if (!d) return "";
      const pad = (n: number) => String(n).padStart(2, "0");
      const dt = new Date(d);
      const yyyy = dt.getFullYear();
      const mm = pad(dt.getMonth() + 1);
      const dd = pad(dt.getDate());
      const hh = pad(dt.getHours());
      const mi = pad(dt.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`; 
  }

  private _fromLocalInputValue(v: Date) { return v ? new Date(v) : null; }

  private _todayAt(hour = 12) {
    const d = new Date(); d.setSeconds(0); d.setMilliseconds(0);
    d.setHours(hour, 0, 0, 0); return d;
  }

  private _plusDays(d: Date, days:number) { const nd = new Date(d); nd.setDate(nd.getDate() + days); return nd; }

  private _submitHoliday(): void {
    if (!this.hass || !this._config) return;
    if (!this._vacationStart || !this._vacationEnd) return;

    // Break into date + time strings
    const startISO = this._vacationStart.toISOString();
    const endISO = this._vacationEnd.toISOString();

    const start_date = startISO.substring(0, 10);          // YYYY-MM-DD
    const start_time = startISO.substring(11, 19);          // HH:MM:SS
    const end_date   = endISO.substring(0, 10);             // YYYY-MM-DD
    const end_time   = endISO.substring(11, 19);            // HH:MM:SS

    // Optional vacation heat temp:
    const heat_temp = this.stateObj?.attributes?.temperature ?? 18;

    this.hass.callService("atagone", "create_vacation", {
      entity_id: this._config.entity,
      start_date,
      start_time,
      end_date,
      end_time,
      heat_temp
    });

    // Close editor
    this._showHolidayEditor = false;
    this._showPresets = false;
  }

  private _cancelHoliday() {
    this._editingHoliday = false;
    this._showPresets = false;
  }

  private _clearHoliday(): void {
    if (!this.hass || !this._config) return;

    this.hass.callService("atagone", "cancel_vacation", {
      entity_id: this._config.entity
    });

    this._showHolidayEditor = false;
    this._showPresets = false;
  }

 private _renderHolidaySettings(): TemplateResult {
    return html`
      <div class="holiday-editor">

        <div class="holiday-row">
          <div class="holiday-col-label">
            <label>Vertrek</label>
            <span class="description">(datum en tijd)</span>
          </div>

          <div class="holiday-col-input">
              <input
                class="holiday-input"
                type="datetime-local"
                .value=${this._vacationStart
                  ? this._toLocalInputValue(this._vacationStart)
                  : ""}
                @change=${(e: any) =>
                  (this._vacationStart = this._fromLocalInputValue(e.target.value))}
              />
          </div>
        </div>

        <div class="holiday-row">
          <div class="holiday-col-label">
            <label>Aankomst</label>
            <span class="description">(datum en tijd)</span>
          </div>

          <div class="holiday-col-input">
              <input
                class="holiday-input"
                type="datetime-local"
                .value=${this._vacationEnd
                  ? this._toLocalInputValue(this._vacationEnd)
                  : ""}
                @change=${(e: any) =>
                  (this._vacationEnd = this._fromLocalInputValue(e.target.value))}
              />
          </div>
        </div>

        <div class="holiday-row">
          <div class="holiday-col-label" style="width:100%; text-align:center;">
            <span class="description">
              <ha-svg-icon .path=${mdiLeaf} style="color:#4db6ac"></ha-svg-icon>
              &nbsp;Note: in vacation mode DHW mode = ECO
            </span>
          </div>
        </div>

        <div class="holiday-buttons">
          <button class="holiday-btn holiday-btn-confirm" @click=${this._submitHoliday}>
            ${localize({ hass: this.hass, string: "holiday.submit" }) || "STEL IN"}
          </button>
          <button class="holiday-btn holiday-btn-cancel" @click=${this._cancelHoliday}>
            ${localize({ hass: this.hass, string: "holiday.cancel" }) || "AFBREKEN"}
          </button>
          <button class="holiday-btn holiday-btn-clear" @click=${this._clearHoliday}>
            ${localize({ hass: this.hass, string: "holiday.clear" }) || "WISSEN"}
          </button>
        </div>

      </div>
    `;
  }


  public render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const mainTempLabel = this?._config?.set_current_as_main
      ? localize({ hass: this.hass, string: `common.current_temperature` })
      : localize({ hass: this.hass, string: `common.target_temperature` });

    const lowerTempLabel = this?._config?.set_current_as_main
      ? localize({ hass: this.hass, string: `common.target_temperature` })
      : localize({ hass: this.hass, string: `common.current_temperature` });


    const topLabel = this?._config?.set_current_as_main 
      ? localize({ hass: this.hass, string: "top.current_temperature" }) ||
      "CURRENT TEMPERATURE"
      : localize({ hass: this.hass, string: "top.target_temperature" }) ||
      "TARGET TEMPERATURE";

    const bottomSmallLabel = this?._config?.set_current_as_main 
      ? localize({ hass: this.hass, string: "top.target_temperature" }) ||
      "TARGET TEMPERATURE"
      : localize({ hass: this.hass, string: "top.current_temperature" }) ||
      "CURRENT TEMPERATURE";

    const currentPreset = (this.stateObj?.attributes?.preset_mode || "") as PresetMode;

    const changeFnLabel =
      localize({ hass: this.hass, string: "bottom.change_function" }) ||
      "Change function";
    const automaticLabel =
      localize({ hass: this.hass, string: "bottom.automatic" }) ||
      "Automatic";
    const holidayLabel =
      localize({ hass: this.hass, string: "bottom.holiday" }) ||
      "Holiday";
    //const extendLabel =
    //  localize({ hass: this.hass, string: "bottom.extend" }) ||
    //  "Extend";
    const fireplaceLabel =
      localize({ hass: this.hass, string: "bottom.fireplace" }) ||
      "Fireplace";
    const manualLabel =
      localize({ hass: this.hass, string: "bottom.manual" }) ||
      "Manual";


    const target = this._getCurrentSetpoint();
    const current = this.current;

    const topIsTarget = this._isTopShowingTarget();
    const bottomIsTarget = !topIsTarget;

    const topHeating = topIsTarget && target > current;
    const bottomHeating = bottomIsTarget && target > current;

    if (this._swapDisplay) {
      // during swap, heating is determined by target vs current
    } 

    const mainValue = svg`
      <text
        class=${classMap({
          "main-value": true,
          heating: topHeating,
        })}
        x="70"
        y="35%"
        dominant-baseline="middle"
        text-anchor="middle"
      >
        <title>${mainTempLabel}</title>
        ${formatNumber(
          this._display_top,
          this.hass.locale,
          { minimumFractionDigits: 1, maximumFractionDigits: 1 }
        )}
        <tspan dx="-25" dy="0" style="font-size: 65px;">°</tspan>
      </text>
    `;

    const unavailableMessage = svg`${this?.stateObj?.state === UNAVAILABLE || this?.stateObj?.state === UNKNOWN ? svg`
      <text x="62.5" y="63%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
        ${this.hass!.localize("state.default.unavailable")}
      </text>` : ''}`;

    const lowerContent = svg`
      <g class=${classMap({
        "current-info": true,
        heating: bottomHeating,
      })} transform="translate(62.5,100)">
          <text
            x="5"
            dominant-baseline="middle"
            text-anchor="middle"
          >
            ${formatNumber(
              this._display_bottom,
              this.hass.locale,
              { minimumFractionDigits: 1, maximumFractionDigits: 1 }
            )}
            <tspan dx="-15" dy="0" style="font-size:35px;">°</tspan>
            <title>${lowerTempLabel}</title>
          </text>
      </g>
    `;

    // left / right circle buttons
    const buttons = this?._config?.disable_buttons
      ? html``
      : html`
        <div id="at-control-buttons">
          <div class="button">
            <at-ha-outlined-icon-left-button
                class=${classMap({ pressed: this._leftPressed })}
                .target=${this.target}
                .step=${-this.step}
                @mousedown=${this._onLeftDown}
                @mouseup=${this._onLeftUp}
                @mouseleave=${this._onLeftUp}
                @touchstart=${this._onLeftDown}
                @touchend=${this._onLeftUp}
                @click=${this._handleButton}
              >
              <ha-svg-icon style="width: 42px; height: 42px;" .path=${mdiChevronLeft}></ha-svg-icon>
            </at-ha-outlined-icon-left-button>
          </div>
          <div class="button">
            <at-ha-outlined-icon-right-button
                class=${classMap({ pressed: this._rightPressed })}
                  .target=${this.target}
                  .step=${this.step}
                  @mousedown=${this._onRightDown}
                  @mouseup=${this._onRightUp}
                  @mouseleave=${this._onRightUp}
                  @touchstart=${this._onRightDown}
                  @touchend=${this._onRightUp}
                  @click=${this._handleButton}
              >
              <ha-svg-icon style="width: 42px; height: 42px;" .path=${mdiChevronRight}></ha-svg-icon>
            </at-ha-outlined-icon-right-button>
          </div>
        </div>
      `;

    const presetButtons = html`
      <div class=${classMap({ "bottom-bar": true, expanded: this._showPresets })}>
        <!-- CHANGE FUNCTION BUTTON -->
        <div
          class="bottom-button change-fn"
          @click=${() => {
            if (this._showHolidayEditor) {
              this._showHolidayEditor = false;
              this._showPresets = true;
            } else {
              this._showPresets = !this._showPresets;
            }
          }}
        >
          <div class="circle-button">
            <ha-svg-icon
              .path=${this._showPresets ? mdiChevronLeft : mdiChevronRight}
            ></ha-svg-icon>
          </div>
          <span class="label">${changeFnLabel}</span>
        </div>


        <!-- PRESETS -->
        ${this._showPresets
          ? html`
              <div
                class=${classMap({
                  "bottom-button preset": true,
                  active: currentPreset === "manual",
                })}
                @click=${() => this._setPreset("manual")}
              >
                ${this._renderPresetIcon("manual")}
                <span>${manualLabel}</span>
              </div>

              <div class=${classMap({
                  "bottom-button preset": true,
                  active: currentPreset === "auto",
                })}
                @click=${() => this._setPreset("auto")}
              >
                ${this._renderPresetIcon("auto")}
                <span>${automaticLabel}</span>
              </div>

              <div class=${classMap({
                  "bottom-button preset": true,
                  active: currentPreset === "holiday",
                })}
                @click=${() => this._setPreset("holiday")}
              >
                ${this._renderPresetIcon("holiday")}
                <span>${holidayLabel}</span>
              </div>

              <div class=${classMap({
                  "bottom-button preset": true,
                  active: currentPreset === "fireplace",
                })}
                @click=${() => this._setPreset("fireplace")}
              >
                ${this._renderPresetIcon("fireplace")}
                <span>${fireplaceLabel}</span>
              </div>
            `
          : html`
              <!-- CENTERED SELECTED PRESET -->
              <div class="bottom-button preset-centered active">
                ${this._renderPresetIcon(currentPreset)}
                <span>
                  ${(() => {
                    switch (currentPreset) {
                      case "auto":
                        return automaticLabel;
                      case "holiday":
                        return holidayLabel;
                      case "fireplace":
                        return fireplaceLabel;
                      default:
                        return manualLabel;
                    }
                  })()}
                </span>
              </div>
            `}
      </div>
    `;

    const isHeating =
    this.stateObj?.attributes.hvac_action === "heating" ||
    this.stateObj?.attributes.call_for_heat === true;

    const isHoliday = (this.stateObj?.attributes?.preset_mode || "") === "holiday";
    localize({ hass: this.hass, string: "bottom.change_function" }) ||
      "Change function";
    

    const topIcons = html`
      <div class="top-indicators">
        <!-- Centered burner dot -->
        <div class=${classMap({ "burner-dot": true, active: isHeating })}></div>

        <!-- Holiday icon slightly to the right of center -->
        <div class=${classMap({
          "holiday-icon": true,
          active: isHoliday,
          hidden: !isHoliday
        })}>
          <ha-svg-icon .path=${mdiBagSuitcase}></ha-svg-icon>
        </div>
      </div>
    `;
    

    return html`
      <ha-card
        id="${this?._config?.disable_buttons ? '' : 'expand'}"
        class=${classMap({ [this.mode]: true })}
      >
        ${this._config?.disable_menu
          ? ``
          : html`
            <ha-icon-button
              class="more-info"
              .label=${this.hass!.localize("ui.panel.lovelace.cards.show_more_info")}
              .path=${mdiDotsVertical}
              @click=${this._handleMoreInfo}
              tabindex="0"
            ></ha-icon-button>
          `}

        ${this?._config?.name?.length || 0 > 0
          ? html`<div class="name">${this._config?.name}</div>`
          : html`<div class="name">&nbsp;</div>`}

        <div class="center-block">
          ${topIcons}
          <div class="top-label">${topLabel}</div>

          <div class="content ${(this?.stateObj?.attributes?.saved_temperature && this?.stateObj?.attributes?.saved_temperature !== null) ? 'eco' : ''} ${this.summer ? 'summer' : ''}">
            <svg id="main" viewBox="0 0 125 125">
              ${mainValue}
              ${unavailableMessage}
              ${lowerContent}
            </svg>
          </div>

          <div class="bottom-small-label">${bottomSmallLabel}</div>

          ${buttons}
        </div>

        ${this.error.length > 0
          ? html`
            <div class="error">
              <ha-icon-button class="alert" .path=${mdiWifiStrengthOffOutline}></ha-icon-button>
              <span>${this.error}</span>
            </div>
          `
          : html ``}

      ${this._showPresets && this._editingHoliday
        ? this._renderHolidaySettings()
        : html``}
      ${this._showPresets && !this._editingHoliday
        ? presetButtons
        : html``}
      ${!this._showPresets
        ? presetButtons
        : html``}
      </ha-card>
    `;
  };
}
