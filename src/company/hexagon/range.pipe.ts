import { Pipe, PipeTransform } from '@angular/core';
/**
 * Creates an empty array of length n.
 * Usage:
 *   value | range
 * Example:
 *   {{ 2 | range }}
 *   formats to: [undefined, undefined]
 */
@Pipe({
    standalone: true,
    name: 'range'
})
export class RangePipe implements PipeTransform {
    /**
     * Creates an empty array of length n.
     * Usage:
     *   value | range
     * Example:
     *   {{ 2 | range }}
     *   formats to: [undefined, undefined]
     */
    transform(value: number): unknown[] {
        return new Array(value);
    }
}
