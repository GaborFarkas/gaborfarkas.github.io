import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Configuration service for loading different static and dynamically generated configuration files.
 */
@Injectable()
export class ConfigService {
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
}
