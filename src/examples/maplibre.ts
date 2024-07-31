//@ts-nocheck
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import * as Maplibre from 'maplibre-gl';

const exports: Record<FeatureSupportFeature, (this: Maplibre.Map, maplibregl: typeof Maplibre, map: Maplibre.Map) => void> = {
    [FeatureSupportFeature.GEOJSON]: loadGeojson,
    [FeatureSupportFeature.WFS]: readWfs
} as Record<FeatureSupportFeature, (this: Maplibre.Map, maplibregl: typeof Maplibre, map: Maplibre.Map) => void>;

function loadGeojson(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-settlements-points', {
            type: 'geojson',
            data: '/assets/web-mapping/sample-data/hungary_settlements.geojson'
        });

        map.addLayer({
            id: 'lyr-settlements-points',
            source: 'src-settlements-points',
            type: 'circle',
            paint: {
                "circle-color": '#ff7800',
                "circle-radius": 4
            }
        });
    });
}

function readWfs(maplibregl: typeof Maplibre, map: Maplibre.Map) {
    map.on('load', evt => {
        map.addSource('src-ne-10m-countries-points', {
            type: 'geojson',
            data: getWfsUrl()
        });

        map.addLayer({
            id: 'lyr-ne-10m-countries-points',
            source: 'src-ne-10m-countries-points',
            type: 'symbol',
            paint: {
                "icon-color": '#007cbf'
            },
            layout: {
                "text-field": ['get', 'NAME_GERM'],
                "icon-image": 'circle_stroked_11',
                "text-anchor": 'bottom',
                "text-offset": [0, -0.5],
                "icon-size": ['interpolate', ['linear'], ['get', 'POP'], 10000, 0.5, 1500000000, 2]
            }
        });
    });

    map.on('moveend', evt => {
        map.getSource('src-ne-10m-countries-points')?.setData(getWfsUrl());
    });

    /**
     * Returns a formatted WFS URL with the current map view's bounding box included.
     * @returns The URL.
     */
    function getWfsUrl() {
        // We have to transform LngLat to LatLng before joining
        return 'https://view.eumetsat.int/geoserver/osmgray/ows?service=WFS&version=2.0.0&request=GetFeature&srsname=EPSG:4326&typeName=osmgray%3Ane_10m_admin_0_countries_points&outputFormat=application/json'
            + '&bbox=' + map.getBounds().toArray().map(coords => coords.reverse()).flat().join(',');
    }
}

export default exports;
