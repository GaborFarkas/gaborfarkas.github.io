/**
 * An element with a custom data attribute.
 */
export type ElementWithData<T = any> = {
    dataValue: T
} & Element;
