import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        color?: string | undefined;
        duration?: string | undefined;
        size?: string | number | undefined;
        pause?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type StretchProps = typeof __propDef.props;
export declare type StretchEvents = typeof __propDef.events;
export declare type StretchSlots = typeof __propDef.slots;
export default class Stretch extends SvelteComponentTyped<StretchProps, StretchEvents, StretchSlots> {
}
export {};
export declare const durationUnitRegex: RegExp;
export declare const range: (size: number, startAt?: number) => number[];