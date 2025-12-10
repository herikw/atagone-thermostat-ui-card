# AtagOne Thermostat UI Card

Custom Lovelace card that mirrors the look-and-feel of the AtagOne thermostat. It shows current/target temperatures, heating and summer indicators, error feedback, and offers quick preset selection including an inline holiday scheduler. Built with Lit and tailored for the AtagOne Home Assistant integration.

## Features
- Modern black AtagOne-inspired UI with current vs. target temperature emphasis
- Manual/Auto/Fireplace/Holiday presets with expandable bottom bar
- Holiday scheduler that calls the AtagOne `create_vacation`/`cancel_vacation` services
- Call-for-heat and summer indicator support (uses the entity’s `call_for_heat` attribute)
- Optional eco temperature helper that saves/restores a custom setpoint
- Error banner when the entity exposes `errors` (JSON array in attributes)
- Localization-ready (translations included for multiple languages)

## Requirements
- Home Assistant with the AtagOne integration providing a `climate` entity
- Services used by the card:
  - `climate.set_temperature`, `climate.set_hvac_mode`, `climate.set_preset_mode`
  - `atagone_thermostat.set_temp_target_temperature` / `atagone_thermostat.restore_saved_target_temperature` (eco helper)
  - `atagone.create_vacation` and `atagone.cancel_vacation` for holiday scheduling
- For the custom font, place `owow_medium_03.ttf` (or WOFF2 equivalent) in `/config/www/fonts/` if you want the exact typography. The card will fall back to system fonts if it is missing.

## Installation

### HACS (recommended)
1) In HACS → Frontend, add this repository `https://github.com/herikw/atagone-thermostat-ui-card` as a custom repository (Category: Lovelace).  
2) Install the card and reload resources when prompted.

### Manual
1) Download `dist/atagone-thermostat-ui-card.js`.  
2) Copy it to your Home Assistant `/config/www/` directory.  
3) Add a Lovelace resource:
```yaml
url: /local/atagone-thermostat-ui-card.js
type: module
```
4) Reload the dashboard (Clear cache if needed).

## Lovelace usage
Minimal example:
```yaml
type: custom:atagone-thermostat-ui-card
entity: climate.living_room
```

Example with options:
```yaml
type: custom:atagone-thermostat-ui-card
entity: climate.living_room
name: Living room
eco_temperature: 18        # temperature used when toggling eco helper
disable_menu: false        # hide the top-right more-info button when true
disable_buttons: false     # hide the +/- controls when true
set_current_as_main: false # swap current and target positions when true
disable_summer: false      # hide summer indicator (call_for_heat false) when true
disable_eco: false         # optional toggle (for eco helper visibility/support)
disable_heat: false        # optional toggle (for heat/on helper visibility/support)
```
