// Configuration for rolling up a target .d.ts file by inlining all dependencies.
import dts from 'rollup-plugin-dts';
const config = [
    {
        input: 'node_modules/ol/dist/ol.d.ts',
        output: [{ file: 'src/assets/web-mapping/types/openlayers.d.ts', format: 'es' }],
        plugins: [dts({respectExternal: true})]
    }
];

export default config;
