#!/bin/bash

# Read the rollup template config, we will need it in several different steps later.
ROLLUPTEMPLATE=$(cat build/rollup-config.js)

# Cesium JS is the easiest, the officially generated d.ts file only needs to declare a namespace instead of a module.
DTSPATH=src/assets/web-mapping/types/cesiumjs.d.ts
cp node_modules/cesium/Source/Cesium.d.ts $DTSPATH
sed -i 's/declare[[:space:]]module[[:space:]]"cesium"/declare namespace Cesium/g' $DTSPATH
echo "declare var map: Cesium.Viewer;" >> $DTSPATH

# Although as its version is only added to the minified JS, we are extracting it from its package.json here as well.
CESIUMVERSION=$(grep '"version"' node_modules/cesium/package.json | cut -d '"' -f4)
sed -i "s/\(^export[[:space:]]const[[:space:]]VERSION.*$\)/export const VERSION = \"$CESIUMVERSION\";"/ src/utils/cesium.ts

# Maplibre GL JS has a great default d.ts, but it imports some externals which need to be skipped or rolled up.
DTSPATH=src/assets/web-mapping/types/maplibregljs.d.ts
cp node_modules/maplibre-gl/dist/maplibre-gl.d.ts $DTSPATH
sed -i "s/\(^import.*geojson-vt';$\)//" $DTSPATH
sed -i "s/\(^import.*gl-matrix';$\)//" $DTSPATH
sed -i "s/\(^import.*potpack';$\)//" $DTSPATH
sed -i "s/\(^import.*supercluster';$\)//" $DTSPATH
npx rollup --config build/rollup-maplibre.mjs
TYPES=$(cat $DTSPATH)
echo "declare namespace maplibregl {" > $DTSPATH
echo "$TYPES" >> $DTSPATH
echo "}" >> $DTSPATH
echo "declare var map: maplibregl.Map;" >> $DTSPATH

# Leaflet can be rolled up from its DefinitelyTyped d.ts file without any modifications
DTSPATH=src/assets/web-mapping/types/leaflet.d.ts
npx rollup --config build/rollup-leaflet.mjs
TYPES=$(cat $DTSPATH)
echo "declare namespace L {" > $DTSPATH
echo "$TYPES" >> $DTSPATH
echo "}" >> $DTSPATH
echo "declare var map: L.Map;" >> $DTSPATH

# OpenLayers can be rolled up by targeting its dist d.ts file with some modifications
DTSPATH=src/assets/web-mapping/types/openlayers.d.ts
npx rollup --config build/rollup-ol.mjs
sed -i "s/\(^import[[:space:]]\*.*;$\)//g" $DTSPATH
sed -i "s/\(^export[[:space:]]{[[:space:]]ol[[:space:]]as[[:space:]]default.*;$\)//g" $DTSPATH
sed -i "s/\(^declare[[:space:]]namespace[[:space:]]ol[[:space:]]{.*$\)//g" $DTSPATH
TYPES=$(cat $DTSPATH)
echo "declare namespace ol {" > $DTSPATH
echo "$TYPES" >> $DTSPATH
echo "declare var map: ol.Map;" >> $DTSPATH
