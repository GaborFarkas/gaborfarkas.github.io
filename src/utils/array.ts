/**
 * Creates a generator returning random elements of the provided array infinitely.
 * @param elems The array to get random picks from.
 */
export function* randomizer<T>(elems: T[]) {
    const remaining = elems.slice();
    const selected: T[] = [];
    const total = elems.length;
    if (!total) return;

    while (true) {
        // To make the main logic work (and to have a shortcut), return the elem directly if there is only one.
        if (total === 1) {
            yield elems[0];
        }

        const next = remaining.splice(Math.round(Math.random() * remaining.length - 1), 1)[0];
        if (!remaining.length) {
            // No more elems to select from next time. Put the selected elems back to the remaining array
            // except the current one to guarantee it won't be selected 2 times in a row.
            while (selected.length) {
                remaining.push(selected.pop()!);
            }
        }
        selected.push(next);
        yield next;
    }
}
