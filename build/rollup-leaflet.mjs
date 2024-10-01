// Configuration for rolling up a target .d.ts file by inlining all dependencies.
import dts from 'rollup-plugin-dts';
const config = [
    {
        input: 'node_modules/@types/leaflet/index.d.ts',
        output: [{ file: 'src/assets/web-mapping/types/leaflet.d.ts', format: 'es' }],
        plugins: [dts({respectExternal: true})]
    }
];

export default config;
