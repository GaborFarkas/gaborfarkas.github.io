// Configuration for rolling up a target .d.ts file by inlining all dependencies.
import dts from 'rollup-plugin-dts';
const config = [
    {
        input: 'public/web-mapping/types/maplibregljs.d.ts',
        output: [{ file: 'public/web-mapping/types/maplibregljs.d.ts', format: 'es' }],
        plugins: [dts({respectExternal: true})]
    }
];

export default config;
