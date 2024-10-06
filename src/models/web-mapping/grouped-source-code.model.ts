/**
 * Represents the root of an example (or saved) source code tree containing loadable code blocks and category groups.
 */
export interface GroupedSourceCodeModel {
    /**
     * Children of the source code group.
     */
    children: (SourceCodeGroup | SourceCodeItem)[]
}

/**
 * A group of loadable source codes.
 */
export interface SourceCodeGroup extends GroupedSourceCodeModel {
    /**
     * Name of the group.
     */
    name: string
    /**
     * Name of the parent's group.
     */
    parent?: string
    /**
     * The depth of the group.
     */
    depth: number
}

/**
 * Describes a single loadable source code.
 */
export interface SourceCodeItem {
    /**
     * Name of the source code.
     */
    name: string
    /**
     * Access key of the source code. Used differently for every type.
     */
    key: string
    /**
     * The type of the source code.
     */
    type: SourceCodeType
}

/**
 * Enum for loadable source code types.
 */
export enum SourceCodeType {
    /**
     * A locally saved source code. Key is localStorage key.
     */
    LOCAL = 'local',
    /**
     * A source code file from GitHub. Key is line number in file.
     */
    GITHUB = 'github'
}
