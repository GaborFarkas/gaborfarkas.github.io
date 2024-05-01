import { Injectable, Type } from "@angular/core";

/**
 * A platform scoped service for registering and loading components dynamically.
 */
@Injectable({ providedIn: 'platform' })
export class DynamicComponentService {
    /**
     * The map of registered components.
     */
    private components: Map<string, Function> = new Map();

    /**
     * Registers a component with an ID.
     * @param id The ID.
     * @param ctor The component class.
     */
    public load(id: string, ctor: Function) {
        this.components.set(id, ctor);
    }

    /**
     * Retrieves a component by its ID.
     * @param id The ID.
     * @returns The component class.
     */
    public getComponentById(id: string) {
        if (this.components.has(id)) {
            return this.components.get(id) as Type<unknown>;
        }

        throw new Error(`No component with ID ${id} loaded`);
    }
}
