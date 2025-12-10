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
  mdiWindowOpenVariant,
  mdiSunThermometer,
  mdiDotsVertical,
  mdiCalendarSync,
  mdiAutorenew,
  mdiFire,
  mdiLeaf,
  mdiThermometer,
  mdiHeatWave,
  mdiWifiStrengthOffOutline,
  mdiMinus,
  mdiPlus,
  mdiChevronRight,
  mdiChevronLeft,
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
import './ha/ha-control-circular-slider';

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

type PresetMode = "manual" | "auto" | "holiday" | "extend" | "fireplace" | string;

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
  name: "AtagOne Thermostat Climate Card",
  description: "Card for climate entity",
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

  private target: any = "value";

  private _highChanged(ev) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    const target = ev.type.replace("-changed", "");
    this.value = {
      ...this.value,
      [target]: value,
    };
    this._selectTargetTemperature = target as Target;
    this._callService(target);
  }

  private _highChanging(ev) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    const target = ev.type.replace("-changing", "");
    this.value = {
      ...this.value,
      [target]: value,
    };
    this._selectTargetTemperature = target as Target;
    this._updateDisplay();
    this._vibrate(20);
  }

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
    this._updateDisplay();
    this._vibrate(40);
    this._debouncedCallService(target);
  }

  private _handleSelectTemp(ev) {
    const target = ev.currentTarget.target as Target;
    this._selectTargetTemperature = target;
    this._updateDisplay();
    this._vibrate(40);
  }

  private _init: Boolean = true;
  private _firstRender: Boolean = true;
  private _ignore: Boolean = false;
  private _hasSummer: Boolean = false;
  private _timeout: any;
  private _oldValueMin: number = 0;
  private _oldValueMax: number = 0;
  private stateObj: ClimateEntity | undefined;
  private _display_bottom: number = 0;
  private _display_top: number = 0;
  private modes: any = [];
  private error: any = [];
  

  @state() private _config?: ClimateCardConfig;

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
        font-size: 2.6em;
        letter-spacing: -0.03em;
        fill: var(--primary-text-color);
        text-rendering: geometricPrecision;
      }

      .current-info {
        font-family: 'OWOW', 'Roboto', 'Noto', sans-serif;
        font-size: 1.2em;
      }

  
      :host {
          display: block;
          box-sizing: border-box;
          position: relative;
          container: at-card / inline-size;
      }

      ha-card {
        overflow: hidden;
        height: auto%;
        min-height: 250px;
        width: 100%;
        vertical-align: middle;
        justify-content: center;
        justify-items: center;
        padding-left: 1em;
        padding-right: 1em;
        padding-top: 1.5em;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
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
        padding: 0.5em;
        cursor: pointer;
        margin-right: 2em;
      }

      at-ha-outlined-icon-right-button {
        color: #f44336;
        border: 2px solid #f44336;
        border-radius: 100%;
        padding: 0.5em;
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
      at-ha-control-circular-slider {
        --primary-color: var(--mode-color);
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
        pointer-events: auto; /* reenable pointer events on all children */
      }

      #expand .content {
        top: calc(50% - 40px);
      }

      #main {
        width: 100%;
        height: auto;
        aspect-ratio: 1.25 / 1; /* 125:100 viewBox */
        max-width: 230px;
        transform: none;
      }

      .name {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 20px;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
      svg {
        height: auto;
        margin: auto;
        display: block;
        width: 100%;
        -webkit-backface-visibility: hidden;
        max-width: 233px;
      }
      
      path {
        stroke-linecap: round;
        stroke-width: 1;
      }

      text {
        fill: var(--primary-text-color);
      }
      .eco {
        --mode-color: var(--energy-non-fossil-color);
      }

      .summer {
        --mode-color: var(--label-badge-yellow)
      }

      .window_open {
        --mode-color: #80a7c4
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
        width: auto;
        justify-content: center;
        margin-top: .5em;
        margin-bottom: 3em;
      }

      #presets {
        z-index: 3;
        position: relative;
        display: flex;
        width: auto;
        justify-content: center;
        margin-top: .5em;
        margin-bottom: 3em;
      }


      #at-control-buttons {
        z-index: 3;
        position: relative;
        display: flex;
        width: auto;
        justify-content: center;
        padding-bottom: 0.2em;
      }

      #at-control-buttons .button {
        z-index: 3;
        position: relative;
        display: flex;
        width: auto;
        justify-content: center;
        padding: 1em;
        padding-top: 0.2em;
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
      .eco ha-icon-button[title="heat"], .window_open ha-icon-button[title="heat"], .summer ha-icon-button[title="heat"] {
        --mode-color: var(--disabled-text-color);
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
      @container at-card (max-width: 280px) {
        .content {
          top: calc(50% - 10px);
        }
      }
      @container at-card (max-width: 255px) {
        #modes {
          margin-top: .5em;
        }
        ha-card {
          padding-top: 2em;
        }
      }
  `;

  private _vibrate(delay: number) {
    try {
      navigator.vibrate(delay);
    } catch (e) { }
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this._init = false;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config") !== undefined) {
      if (changedProps.get("_config") !== undefined) {
        this._hasSummer = false;
      }
    }
    if (changedProps.get("hass") !== undefined) {
      this._init = false;
    }
    return true;
  }

  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    this._firstRender = false;

    this?.shadowRoot?.querySelector('.low_battery')?.addEventListener('click', () => {
      this?.shadowRoot?.querySelector('.low_battery')?.remove();
      this._vibrate(2);
    });
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

  private _updateDisplay() {
    if (this?._config?.set_current_as_main) {
      this._display_bottom = this._getCurrentSetpoint();
      this._display_top = this.current;
    } else {
      this._display_bottom = this.current;
      this._display_top = this._getCurrentSetpoint();
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

  private _renderHVACAction(full = false): TemplateResult {
    const isHeating = this.stateObj?.attributes.hvac_action === 'heating' && this.mode !== 'off';
    const showCoolingIcon = this?.value?.high !== undefined && this?.value?.high !== null && this?.value?.high <= this.current;
    const transform = full ? "translate(-3,-3.5) scale(0.25)" : "translate(5,-4) scale(0.25)";
    const fill = "#9d9d9d";

    const label = isHeating ? localize({ hass: this.hass, string: `extra_states.heating` }) : localize({ hass: this.hass, string: `extra_states.heating_off` });
    return svg`<path class="status ${isHeating ? 'active' : ''}" transform="${transform}" fill="${fill}" d="${mdiHeatWave}" title="Heating"><title>${label}</title></path>`;
  }

  private _renderHVACIcon(currentMode: string): TemplateResult {
    if ((this?.value?.low || 0) >= this.current) return this._renderIcon("heat", currentMode);
    else if ((this?.value?.high || 0) <= this.current) return this._renderIcon("cool", currentMode);
    return this._renderIcon("ok", currentMode);
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

  private _handleMoreInfo() {
    fireEvent(this, "hass-more-info", {
      entityId: this._config!.entity,
    });
  }

  public render: () => TemplateResult = (): TemplateResult => {
    const upperContentIcons = svg``;

    const mainTempLabel = this?._config?.set_current_as_main ? localize({ hass: this.hass, string: `common.current_temperature` }) : localize({ hass: this.hass, string: `common.target_temperature` });
    const mainValue = svg`
      <text class="main-value" x="70" y="40%" dominant-baseline="middle" text-anchor="middle" style="font-size:3.6em;">
        <title>${mainTempLabel}</title>
        ${formatNumber(
      this._display_top,
      this.hass.locale,
      { minimumFractionDigits: 1, maximumFractionDigits: 1 }
    )}
        <tspan dx="-20" dy="15" style="font-size: 1.5em;">°</tspan>
      </text>`;

    const unavailableMessage = svg`${this?.stateObj?.state === UNAVAILABLE || this?.stateObj?.state === UNKNOWN ? svg`
      <text x="62.5" y="63%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
        ${this.hass!.localize("state.default.unavailable")}
      </text>` : ''}`;

    const lowerTempLabel = this?._config?.set_current_as_main ? localize({ hass: this.hass, string: `common.target_temperature` }) : localize({ hass: this.hass, string: `common.current_temperature` });
    const lowerContent = svg`
      <g class="current-info" transform="translate(62.5,88)">
          <text x="5" dominant-baseline="middle" text-anchor="middle" style="font-size:1.6em;">
              ${svg`${formatNumber(
                this._display_bottom,
                this.hass.locale,
                { minimumFractionDigits: 1, maximumFractionDigits: 1 }
              )}`}
              <tspan dx="-10" style="font-size:1em;">°</tspan>
              <title>${lowerTempLabel}</title>
          </text>
      </g>`;

    const modes = html`<div id="modes">
          ${this?._hasSummer ? svg`
            ${(this?._config?.disable_heat || !this.modes.includes('heat')) ? html`` : this._renderIcon("heat", this.mode)}
            ${(this?._config?.disable_heat || !this.modes.includes('heat_cool')) ? html`` : this._renderHVACIcon(this.mode)}
            ${this?._config?.disable_eco ? html`` :
          this?.stateObj?.attributes?.saved_temperature &&
            this?.stateObj?.attributes?.saved_temperature !== "none" &&
            this?.stateObj?.state !== UNAVAILABLE
            ? this._renderIcon("eco", "eco") : this._renderIcon("eco", "none")}
            ${this?._config?.disable_off ? html`` : this._renderIcon("off", this.mode)}
          `:
        svg`
            ${this.modes.map((mode) => {
          if (this._config?.disable_heat && (mode === "heat" || mode === "heat_cool")) return html``;
          if (this._config?.disable_eco && mode === "eco") return html``;
          if (this._config?.disable_off && mode === "off") return html``;
          return this._renderIcon(mode, this.mode);
        })}`}
        </div>`;

      const presets = html`<div id="presets">
          ${this?._hasSummer ? svg`
            ${(this?._config?.disable_heat || !this.modes.includes('heat')) ? html`` : this._renderIcon("heat", this.mode)}
            ${(this?._config?.disable_heat || !this.modes.includes('heat_cool')) ? html`` : this._renderHVACIcon(this.mode)}
            ${this?._config?.disable_eco ? html`` :
          this?.stateObj?.attributes?.saved_temperature &&
            this?.stateObj?.attributes?.saved_temperature !== "none" &&
            this?.stateObj?.state !== UNAVAILABLE
            ? this._renderIcon("eco", "eco") : this._renderIcon("eco", "none")}
            ${this?._config?.disable_off ? html`` : this._renderIcon("off", this.mode)}
          `:
        svg`
            ${this.modes.map((mode) => {
          if (this._config?.disable_heat && (mode === "heat" || mode === "heat_cool")) return html``;
          if (this._config?.disable_eco && mode === "eco") return html``;
          if (this._config?.disable_off && mode === "off") return html``;
          return this._renderIcon(mode, this.mode);
        })}`}
        </div>`;

    const buttons = this?._config?.disable_buttons ? html`` : html`
      <div id="at-control-buttons">
          <div class="button">
            <at-ha-outlined-icon-left-button
              .target=${this.target}
              .step=${-this.step}
              @click=${this._handleButton}
            >
              <ha-svg-icon style="width: 50px; height: 50px;" .path=${mdiChevronLeft}></ha-svg-icon>
            </at-ha-outlined-icon-left-button>
          </div>
          <div class="button">
            <at-ha-outlined-icon-right-button
              .target=${this.target}
              .step=${this.step}
              @click=${this._handleButton}
            >
            <ha-svg-icon style="width: 50px; height: 50px;" .path=${mdiChevronRight}></ha-svg-icon>
          </at-ha-outlined-icon-right-button>
          </div>
      </div>
    </div>`;

    return html`
    <ha-card id="${this?._config?.disable_buttons ? '' : 'expand'}" class=${classMap({
      [this.mode]: true,
    })}
    >
    ${this._config?.disable_menu ? `` : html`
      <ha-icon-button
        class="more-info"
        .label=${this.hass!.localize(
      "ui.panel.lovelace.cards.show_more_info"
    )}
        .path=${mdiDotsVertical}
        @click=${this._handleMoreInfo}
        tabindex="0"
      ></ha-icon-button>
      `}
      ${this?._config?.name?.length || 0 > 0 ? html`
        <div class="name">${this._config?.name}</div>
        ` : html`<div class="name">&nbsp;</div>`}

        <div class="content ${(this?.stateObj?.attributes?.saved_temperature && this?.stateObj?.attributes?.saved_temperature !== null) ? 'eco' : ''} ${this.summer ? 'summer' : ''} ">
          <svg id="main" viewbox="0 0 125 100">
            ${upperContentIcons}
            ${mainValue}
            ${unavailableMessage}
            ${lowerContent}
          </svg>
        </div>

      ${this.error.length > 0 ? html`
        <div class="error">
          <ha-icon-button class="alert" .path=${mdiWifiStrengthOffOutline}>
          </ha-icon-button>
          <span>${this.error}</span>
        </div>
      ` : ``}
      </at-ha-control-circular-slider>
      ${buttons}
      ${modes}
  </ha-card>
  `;
  };
}
