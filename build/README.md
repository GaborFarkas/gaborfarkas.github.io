Build scripts running before every ng-build process.

Except `generate-web-map-types.sh`, that's an odd one. To make that work, you might need to modify the rolled up factory d.ts files from time to time. For example, ol 9 worked fine, but ol 10 contains some namespace hoisting which would be hard to automtically replace with a syntax acceptable by rollup's dts plugin.
