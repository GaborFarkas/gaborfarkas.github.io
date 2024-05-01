import { getPlatform } from "@angular/core"
import { DynamicComponentService } from "../services/dynamic-component.service"

/**
 * Decorator for registering a component in the [@DynamicComponentService](../../src/services/dynamic-component.service.ts) service.
 * @param id
 * @returns
 */
export function RegisterComponent(id: string) {
    return (constructor: Function) => {
        const dynamicComponentService = getPlatform()?.injector.get<DynamicComponentService>(DynamicComponentService);
        if (dynamicComponentService) {
            dynamicComponentService.load(id, constructor);
        }
    }
}
