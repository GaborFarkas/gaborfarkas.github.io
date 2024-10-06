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
     * Gets a stored value by its key.
     * @param key The key.
     * @returns The stored value.
     */
    public get(key: string): string | null {
        return this.storage.getItem(key);
    }

    /**
     * Gets all stored KVPs by a prefix.
     * @param prefix The prefix.
     * @returns The key-value pairs matching the prefix. Keys are returned without the prefix.
     */
    public getByPrefix(prefix: string): Record<string, string> {
        let keyIndex = 0;
        let key = this.storage.key(keyIndex);
        const values: Record<string, string> = {};

        while (key !== null) {
            if (key.startsWith(`${prefix}:`)) {
                values[key.replace(`${prefix}:`, '')] = this.storage.getItem(key)!;
            }

            ++keyIndex;
            key = this.storage.key(keyIndex);
        }

        return values;
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
