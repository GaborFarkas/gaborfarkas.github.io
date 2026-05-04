import { Injectable } from "@angular/core";

/**
 * Service for saving user data locally, in the browser's localStorage.
 */
@Injectable()
export class PersistencyService {
    /**
     * The storage mechanism to use.
     */
    private storage: Storage = window.localStorage;

    /**
     * Gets a stored value by its key and optionally its prefix.
     * @param key The key.
     * @param prefix The prefix.
     * @returns The stored value.
     */
    public get(key: string, prefix?: string): string | null {
        const prefixedKey = prefix !== undefined ? `${prefix}:${key}` : key;
        return this.storage.getItem(prefixedKey);
    }

    /**
     * Gets all stored keys by a prefix.
     * @param prefix The prefix.
     * @returns The array of keys matching the prefix without the prefix.
     */
    public getKeysByPrefix(prefix: string): string[] {
        let keyIndex = 0;
        let key = this.storage.key(keyIndex);
        const values: string[] = [];

        while (key !== null) {
            if (key.startsWith(`${prefix}:`)) {
                values.push(key.replace(`${prefix}:`, ''));
            }

            ++keyIndex;
            key = this.storage.key(keyIndex);
        }

        return values;
    }

    /**
     * Stores a single value with a key.
     * @param key The key.
     * @param value The value.
     */
    public store(key: string, value: string) {
        this.storage.setItem(key, value);
    }

    /**
     * Stores a single value with a prefixed key.
     * @param prefix The key's prefix.
     * @param key The key.
     * @param value The value.
     */
    public storeWithPrefix(prefix: string, key: string, value: string) {
        this.storage.setItem(`${prefix}:${key}`, value);
    }

    /**
     * Removes a single value.
     * @param key The key.
     * @param prefix The key's prefix.
     */
    public remove(key: string, prefix?: string) {
        const prefixedKey = prefix !== undefined ? `${prefix}:${key}` : key;
        this.storage.removeItem(prefixedKey);
    }
}
