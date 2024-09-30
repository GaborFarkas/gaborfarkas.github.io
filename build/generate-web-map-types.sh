#!/bin/bash

# Cesium JS is the easiest, the officially generated d.ts file only needs to declare a namespace instead of a module.
DTSPATH=src/assets/web-mapping/types/cesiumjs.d.ts
cp node_modules/cesium/Source/Cesium.d.ts $DTSPATH
sed -i 's/declare[[:space:]]module[[:space:]]"cesium"/declare namespace Cesium/g' $DTSPATH
echo "declare var map: Cesium.Viewer;" >> $DTSPATH

# Although as its version is only added to the minified JS, we are extracting it from its package.json here as well.
CESIUMVERSION=$(grep '"version"' node_modules/cesium/package.json | cut -d '"' -f4)
sed -i "s/\(^export[[:space:]]const[[:space:]]VERSION.*$\)/export const VERSION = \"$CESIUMVERSION\";"/ src/utils/cesium.ts

# Maplibre GL JS works with dts-gen out of the box
TYPES=$(npx dts-gen -s -m maplibre-gl)
DTSPATH=src/assets/web-mapping/types/maplibregljs.d.ts
echo "declare namespace maplibregl {" > $DTSPATH
echo "$TYPES" >> $DTSPATH
echo "}" >> $DTSPATH
echo "declare var map: maplibregl.Map;" >> $DTSPATH

# Leaflet only works with dts-gen if window is defined
# Hack from https://gist.github.com/ifiokjr/0e1e993f87a8f99b4924e8ecdce0edbc
rm -rf node_modules/leaflet-gentypes
cp -r node_modules/leaflet node_modules/leaflet-gentypes
ENTRYPATH=node_modules/leaflet-gentypes/dist/leaflet-src.js
ENTRY=$(cat $ENTRYPATH)
echo "const { JSDOM } = require('jsdom');" > $ENTRYPATH
echo "const DEFAULT_HTML = '<html><body></body></html>';" >> $ENTRYPATH
echo "const jsdom = new JSDOM(DEFAULT_HTML, {" >> $ENTRYPATH
echo "    url: 'https://www.bbc.co.uk'," >> $ENTRYPATH
echo "    referrer: 'https://www.bbc.co.uk'," >> $ENTRYPATH
echo "    contentType: 'text/html'," >> $ENTRYPATH
echo "    userAgent: 'node.js'," >> $ENTRYPATH
echo "    includeNodeLocations: true" >> $ENTRYPATH
echo "});" >> $ENTRYPATH
echo "const { window } = jsdom;" >> $ENTRYPATH
echo "const { document, navigator } = window;" >> $ENTRYPATH
echo "$ENTRY" >> $ENTRYPATH

TYPES=$(npx dts-gen -s -m leaflet-gentypes)
DTSPATH=src/assets/web-mapping/types/leaflet.d.ts
echo "declare namespace L {" > $DTSPATH
echo "$TYPES" >> $DTSPATH
echo "}" >> $DTSPATH
echo "declare var map: L.Map;" >> $DTSPATH

rm -rf node_modules/leaflet-gentypes

# OpenLayers is the problematic child, we need its source code and build tools first
rm -rf openlayers
git clone git@github.com:openlayers/openlayers.git

# Get currently installed version and checkout to its ref
VER=$(grep VERSION node_modules/ol/util.js | cut -d "'" -f2)
cd openlayers
git checkout "v$VER"

# Run the full build process
npm install
npm run build-full
npm run generate-types
cd build

# Set up the rollup config for generating flattened d.ts files
# Inspired by https://medium.com/@martin_hotell/typescript-library-tips-rollup-your-types-995153cc81c7
npm install rollup-plugin-dts
ROLLUPPATH=rollup-dts.js
echo "import dts from 'rollup-plugin-dts';" > $ROLLUPPATH
echo "const config = [" >> $ROLLUPPATH
echo "  {" >> $ROLLUPPATH
echo "    input: './ol/{FILENAME}.d.ts'," >> $ROLLUPPATH
echo "    output: [{ file: './{FILENAME}.d.ts', format: 'es' }]," >> $ROLLUPPATH
echo "    plugins: [dts({respectExternal: true})]" >> $ROLLUPPATH
echo "  }" >> $ROLLUPPATH
echo "];" >> $ROLLUPPATH
echo "export default config;" >> $ROLLUPPATH

# Use the custom rollup config to generate a flattened d.ts for every namespace including the main one
DTSPATH=../../src/assets/web-mapping/types/openlayers.d.ts
echo "declare namespace ol {" > $DTSPATH
ROLLUPCONFIGTEMPLATE=$(cat $ROLLUPPATH)
sed -i 's/{FILENAME}/index/g' $ROLLUPPATH
npx rollup --config $ROLLUPPATH
EXPORTLINE=$(grep "export {" index.d.ts)
FIXEDEXPORTLINE="$(echo $EXPORTLINE | cut -d '}' -f1), control events extent format geom interaction layer proj render reproj style tilegrid webgl };"
sed -i "s/$EXPORTLINE/$FIXEDEXPORTLINE/" index.d.ts
echo "$(cat index.d.ts)" >> $DTSPATH

for NAMESPACE in control events extent format geom interaction layer proj render reproj style tilegrid webgl; do
    echo "declare namespace $NAMESPACE {" >> $DTSPATH
    echo "$ROLLUPCONFIGTEMPLATE" > $ROLLUPPATH
    sed -i "s/{FILENAME}/$NAMESPACE/g" $ROLLUPPATH
    npx rollup --config $ROLLUPPATH
    echo "$(cat $NAMESPACE.d.ts)" >> $DTSPATH
    echo "}" >> $DTSPATH
done

echo "}" >> $DTSPATH
echo "declare var map: ol.Map;" >> $DTSPATH

cd ../..
rm -rf openlayers
