import { getPlatform } from "@angular/core";
import { DynamicComponentService } from "../services/dynamic-component.service";

/**
 * Returns an Angular component by its ID, if it was previously regitered with the [@RegisterComponent](../../src/decorators/register-component.decorator.ts) decorator.
 * @param id The component ID.
 * @returns The component, if found.
 */
export function getComponentById(id: string) {
    return getPlatform()?.injector.get<DynamicComponentService>(DynamicComponentService).getComponentById(id);
}
