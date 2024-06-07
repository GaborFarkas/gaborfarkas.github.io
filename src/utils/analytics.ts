
import { Analytics } from "analytics";
import simpleAnalyticsPlugin from "@analytics/simple-analytics";
import { isDevMode } from "@angular/core";

/**
 * Sends visitor analytics to Simple Analytics.
 */
export const analytics = Analytics({
    app: "gaborfarkas.github.io",
    plugins: [
        simpleAnalyticsPlugin({
            hostname: 'farkasgaborev.eu'
        })
    ],
    debug: isDevMode()
});
