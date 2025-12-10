import { Infer, array, assign, boolean, object, optional, any, number, string } from "superstruct";
import { HvacMode, LovelaceCardConfig } from "./ha";

const lovelaceCardConfigStruct = object({
    index: optional(number()),
    view_index: optional(number()),
    view_layout: any(),
    type: string(),
});

const entitySharedConfigStruct = object({
    entity: optional(string()),
    name: optional(string()),
    icon: optional(string()),
});
type EntitySharedConfig = Infer<typeof entitySharedConfigStruct>;


export const HVAC_MODES: HvacMode[] = [
    "auto",
    "heat",
];

export type ClimateCardConfig = LovelaceCardConfig &
    EntitySharedConfig &
    {
        disable_summer?: boolean;
        disable_eco?: boolean;
        disable_heat?: boolean;
        disable_menu?: boolean;
        set_current_as_main?: boolean;
        eco_temperature?: number;
        disable_buttons?: boolean;
    };

export const climateCardConfigStruct = assign(
    lovelaceCardConfigStruct,
    entitySharedConfigStruct,
    object({
        disable_summer: optional(boolean()),
        disable_eco: optional(boolean()),
        disable_heat: optional(boolean()),
        set_current_as_main: optional(boolean()),
        eco_temperature: optional(number()),
        disable_menu: optional(boolean()),
        disable_buttons: optional(boolean())
    })
);