import { Injectable } from "@angular/core";
import { AsyncSubject } from "rxjs";
import { convertTheme } from "@/monaco-vscode-textmate";
import * as monacoType from "monaco-editor/esm/vs/editor/editor.api";

/**
 * Loader service for the monaco code editor library. It needs to be loaded through AMD with an
 * included loader to the global namespace.
 */
@Injectable()
export class MonacoLoaderService {
    /**
     * Proxies the load state of the monaco library.
     * After subscribing, please run loadAsync to receive a value.
     */
    public loaded = new AsyncSubject<boolean>();

    /**
     * Loads the monaco library if it is not already loaded.
     */
    public async loadAsync(): Promise<void> {
        try {
            const monaco: typeof monacoType | undefined = (window as unknown as Record<string, typeof monacoType | undefined>)['monaco'];
            if (monaco?.editor?.create) {
                // We already have the lib loaded
                this.loaded.next(true);
                this.loaded.complete();
            } else {
                // Load AMD loader, if it is not already loaded
                if (!(window as unknown as Record<string, unknown>)['require']) {
                    await this.loadAmdAsync();
                }

                const lightTheme = await (await fetch('/assets/monaco/themes/light-modern.json')).json();
                const darkTheme = await (await fetch('/assets/monaco/themes/dark-modern.json')).json();

                // Load monaco with AMD
                //@ts-expect-error TS and RequireJS are not friends when Angular is present
                window.require.config({ paths: { vs: '/assets/monaco/vs' } });
                //@ts-expect-error TS and RequireJS are not friends when Angular is present
                window.require(['vs/editor/editor.main'], () => {
                    // Define VSCode light/dark modern themes
                    const monaco = (window as unknown as Record<string, typeof monacoType>)['monaco'];
                    monaco.editor.defineTheme('light-modern', convertTheme(lightTheme));
                    monaco.editor.defineTheme('dark-modern', convertTheme(darkTheme));

                    this.loaded.next(true);
                    this.loaded.complete();
                });

                // Configure base URL for Worker script
                window.MonacoEnvironment = {
                    getWorkerUrl: function () {
                        return '/assets/monaco/vs/base/worker/workerMain.js';
                    }
                };


            }
        } catch (err) {
            this.loaded.next(false);
            this.loaded.complete();
            throw err;
        }
    }

    /**
     * Loads the AMD loader shipped with the monaco library.
     */
    private async loadAmdAsync(): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/assets/monaco/vs/loader.js';
            script.type = 'text/javascript';
            script.async = true;

            script.addEventListener('load', () => resolve());
            script.addEventListener('error', () => reject());

            document.body.appendChild(script);
        });
    }
}
