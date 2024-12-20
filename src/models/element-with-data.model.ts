/**
 * An element with a custom data attribute.
 */
export type ElementWithData<T = unknown> = {
    dataValue: T
} & Element;
