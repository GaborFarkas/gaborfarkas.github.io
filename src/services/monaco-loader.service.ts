import { Injectable } from "@angular/core";
import { AsyncSubject } from "rxjs";
import { convertTheme } from "@/monaco-vscode-textmate";

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
    public loaded: AsyncSubject<boolean> = new AsyncSubject();

    /**
     * Loads the monaco library if it is not already loaded.
     */
    public async loadAsync(): Promise<void> {
        try {
            const monaco: any = (window as any).monaco;
            if (monaco?.editor?.create) {
                // We already have the lib loaded
                this.loaded.next(true);
                this.loaded.complete();
            } else {
                // Load AMD loader, if it is not already loaded
                if (!(window as any).require) {
                    await this.loadAmdAsync();
                }

                const lightTheme = await (await fetch('/assets/monaco/themes/light-modern.json')).json();
                const darkTheme = await (await fetch('/assets/monaco/themes/dark-modern.json')).json();

                // Load monaco with AMD
                (window as any).require.config({ paths: { vs: '/assets/monaco/vs' } });
                (window as any).require(['vs/editor/editor.main'], () => {
                    // Define VSCode light/dark modern themes
                    (window as any).monaco.editor.defineTheme('light-modern', convertTheme(lightTheme));
                    (window as any).monaco.editor.defineTheme('dark-modern', convertTheme(darkTheme));

                    this.loaded.next(true);
                    this.loaded.complete();
                });

                // Configure base URL for Worker script
                (window as any).MonacoEnvironment = {
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
