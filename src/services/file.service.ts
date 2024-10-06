import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * File service for loading different static and dynamically generated files.
 */
@Injectable()
export class FileService {
    constructor(private httpClient: HttpClient) { }

    /**
     * Returns a parsed and interpreted configuration from a file.
     * @param fileName The configuration file.
     */
    public getConfigAsync<T>(fileName: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.httpClient.get<T>(`/assets/config/${fileName}`).subscribe({
                next: data => resolve(data),
                error: err => reject(err)
            });
        });
    }

    /**
     * Downloads and returns a raw text document as a string.
     * @param url The text document's URL.
     * @returns The text document as a string.
     */
    public getTextDocumentAsync(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(url, {
                responseType: 'text'
            }).subscribe({
                next: data => resolve(data),
                error: err => reject(err)
            });
        });
    }
}
