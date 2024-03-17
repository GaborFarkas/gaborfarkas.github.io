/**
 * A single navigation dropdown item descriptor.
 */
export interface NavDropdownItem {
    /**
     * The label of the navigation link.
     */
    label: string,
    /**
     * The URL of the navigation link.
     */
    url: string
}

/**
 * A navigation dropdown menu descriptor.
 */
export interface NavDropdownGroup {
    /**
     * The label of the menu group.
     */
    label: string,
    /**
     * The items in the menu group.
     */
    items: NavDropdownItem[]
}
