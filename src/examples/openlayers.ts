// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { environment } from '@/environments/environment';
import { FeatureSupportFeature } from '@/models/web-mapping/feature-support-feature.model';
import { OpenLayers } from '@/utils/openlayers';

const exports: Record<FeatureSupportFeature, (this: OpenLayers.Map, ol: typeof OpenLayers, map: OpenLayers.Map) => void> = {
    [FeatureSupportFeature.HWACCEL]: webglPoints,
    [FeatureSupportFeature.BLEND]: blendLayers,
    [FeatureSupportFeature.KML]: loadKml,
    [FeatureSupportFeature.GEOJSON]: loadGeojson,
    [FeatureSupportFeature.GEOTIFF]: geoTiff,
    [FeatureSupportFeature.WFS]: readWfs,
    [FeatureSupportFeature.MAPBOXTILE]: loadVectorTiles,
    [FeatureSupportFeature.WMS]: readWms,
    [FeatureSupportFeature.WMTS]: readWmts,
    [FeatureSupportFeature.XYZ]: readSlippy,
    [FeatureSupportFeature.GOOGLE]: readGoogle,
    [FeatureSupportFeature.ARCGIS]: readArcgis,
    [FeatureSupportFeature.BING]: readBing,
    [FeatureSupportFeature.READATTRIB]: readAttribs,
    [FeatureSupportFeature.ZCOORDS]: zCoords,
    [FeatureSupportFeature.MCOORDS]: mCoords,
    [FeatureSupportFeature.INTERPOLATE]: heatMap,
    [FeatureSupportFeature.UPDATEATTRIB]: updateAttribs,
    [FeatureSupportFeature.UPDATEGEOM]: updateGeom,
    [FeatureSupportFeature.ADDRMLYR]: addRmLayer,
    [FeatureSupportFeature.LYRORDER]: changeLayerOrder,
    [FeatureSupportFeature.MODIFYIMG]: modifyImage,
    [FeatureSupportFeature.RASTCALC]: rasterAlgebra,
    [FeatureSupportFeature.CLASSIFY]: classify,
    [FeatureSupportFeature.CONVOLVE]: convolve,
    [FeatureSupportFeature.TRANSVECT]: transformVector,
    [FeatureSupportFeature.WARPRAST]: warpRaster,
    [FeatureSupportFeature.NORTH]: northArrow,
    [FeatureSupportFeature.OVERLAY]: textBox,
    [FeatureSupportFeature.OVERVIEWMAP]: overviewMap
} as Record<FeatureSupportFeature, (this: OpenLayers.Map, ol: typeof OpenLayers, map: OpenLayers.Map) => void>;

function webglPoints(ol: typeof OpenLayers, map: OpenLayers.Map) {
    // In its current form, OpenLayers flat style descriptors are not stable enough to have a single, data-driven style.
    // We create a group layer and use as many layers as different styles we want.
    const lyr = new ol.layer.Group();
    // All the layers can work from the same source
    const source = new ol.source.Vector({
        format: new ol.format.GeoJSON({
            dataProjection: 'EPSG:4326'
        }),
        url: '/assets/web-mapping/sample-data/hungary_settlements.geojson'
    });

    // Create styles for different symbols filtering the data
    const styles = [{
        'filter': ['!=', ['get', 'place'], 'city'],
        'shape-points': 4,
        'shape-radius': 8,
        'shape-radius2': 0,
        'shape-fill-color': '#006688',
        'shape-stroke-color': '#006688',
        'shape-stroke-width': 3,
        'shape-rotation': Math.PI / 4
    }, {
        'filter': ['==', ['get', 'place'], 'city'],
        'circle-radius': ['interpolate', ['linear'], ['get', 'population'], 50000, 2, 500000, 6],
        'circle-fill-color': '#ffeda0',
        'circle-stroke-color': '#f03b20',
        'circle-stroke-width': 1
    }];

    // Process styles, create a layer for each and add it to the layer group
    for (const style of styles) {
        const ptLyr = new ol.layer.WebGLPoints({
            source: source,
            style: style
        });
        lyr.getLayers().push(ptLyr);
    }

    map.addLayer(lyr);
}

function blendLayers(ol: typeof OpenLayers, map: OpenLayers.Map) {
    const lyr = new ol.layer.Tile({
        source: new ol.source.TileImage({
            attributions:
                'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer">ArcGIS</a>',
            url:
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        })
    });

    lyr.on('postrender', evt => {
        if (evt.context) {
            evt.context.globalCompositeOperation = 'multiply';
        }
    });

    map.addLayer(lyr);
}

function geoTiff(ol: typeof OpenLayers, map: OpenLayers.Map) {
    const source = new ol.source.GeoTIFF({
        sources: [
            {
                url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif'
            }
        ]
    });

    map.addLayer(new ol.layer.WebGLTile({
        source: source
    }));

    map.getView().setCenter([546484, 1842303]);
    map.getView().setZoom(9);
}

function loadKml(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/simple-kml.kml',
            format: new ol.format.KML()
        })
    }));
}

function loadGeojson(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/hungary_settlements.geojson',
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            })
        })
    }));
}

function readWfs(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: function (extent) {
                return 'https://view.eumetsat.int/geoserver/osmgray/ows?service=WFS&version=2.0.0&request=GetFeature&srsname=EPSG:3857&typeName=osmgray%3Ane_10m_admin_0_countries_points&outputFormat=application/json'
                    + '&bbox=' + extent.join(',');
            },
            format: new ol.format.GeoJSON()
        })
    }));
}

function loadVectorTiles(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.VectorTile({
        declutter: true,
        source: new ol.source.VectorTile({
            format: new ol.format.MVT(),
            url: 'https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.pbf',
            attributions: '<a href="https://maplibre.org">Maplibre</a>'
        }),
        background: '#d1d1d1',
        style: {
            'stroke-width': 0.6,
            'stroke-color': '#8c8b8b',
            'fill-color': '#f7f7e9',
        }
    }));
}

function readWms(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'https://www.oeny.hu/geoserver/ows',
            serverType: 'geoserver',
            params: {
                'LAYERS': 'tr4-tszt:rtszt_tersegi_teruletfelhaszn_kat'
            },
            attributions: 'E-TÉR data by © <a href="https://www.oeny.hu/oeny/4tr/#/tudastar/interaktiv-terkep" target="_blank">Lechner Tudásközpont</a>'
        })
    }));

    map.getView().setCenter([1962131, 5908264]);
    map.getView().setZoom(10);
}

function readWmts(ol: typeof OpenLayers, map: OpenLayers.Map) {
    // Example taken from https://openlayers.org/en/latest/examples/wmts.html
    const size = ol.extent.getWidth(map.getView().getProjection().getExtent()) / 256;
    const resolutions = new Array(19);
    const matrixIds = new Array(19);
    for (let z = 0; z < 19; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }

    map.addLayer(new ol.layer.Tile({
        source: new ol.source.WMTS({
            attributions: 'Tiles © <a href="https://mrdata.usgs.gov/geology/state/" target="_blank">USGS</a>',
            url: 'https://mrdata.usgs.gov/mapcache/wmts',
            layer: 'sgmc2',
            matrixSet: 'GoogleMapsCompatible',
            format: 'image/png',
            projection: map.getView().getProjection(),
            tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(map.getView().getProjection().getExtent()),
                resolutions: resolutions,
                matrixIds: matrixIds,
            }),
            style: 'default',
            wrapX: true,
        })
    }));

    map.getView().setCenter([-10881201, 4688556]);
    map.getView().setZoom(4);
}

function readSlippy(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            attributions: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL'
        })
    }));
}

function readGoogle(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.WebGLTile({
        source: new ol.source.Google({
            key: environment.googleMapsApiKey,
            scale: 'scaleFactor2x',
            highDpi: true,
            mapType: 'satellite',
            layerTypes: ['layerRoadmap'],
            overlay: false
        })
    }));
}

function readArcgis(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.WebGLTile({
        source: new ol.source.TileArcGISRest({
            url: 'https://services.geodataonline.no/arcgis/rest/services/Geocache_UTM33_EUREF89/GeocacheBilder/MapServer'
        })
    }));

    map.getView().setCenter([1564542, 9769810]);
    map.getView().setZoom(4.5);
}

function readBing(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.WebGLTile({
        source: new ol.source.BingMaps({
            key: environment.bingApiKey,
            imagerySet: 'AerialWithLabelsOnDemand'
        })
    }));
}

function readAttribs(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/australia-rivers-zm.geojson',
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            })
        })
    }));

    const overlayElem = document.createElement('h1');
    const overlay = new ol.Overlay({
        element: overlayElem,
        offset: [10, -5]
    });
    map.addOverlay(overlay);

    map.on('pointermove', function (evt) {
        const feats = map.getFeaturesAtPixel(evt.pixel, {
            hitTolerance: 5
        });
        if (feats?.length) {
            const attribs = feats[0].getProperties();
            overlayElem.textContent = attribs.name;
            overlay.setPosition(evt.coordinate);
        } else {
            overlayElem.textContent = '';
        }
    });

    map.getView().setCenter([14747744, -3263853]);
    map.getView().setZoom(4.6);
}

function zCoords(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/australia-rivers-zm.geojson',
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            })
        })
    }));

    const overlayElem = document.createElement('h1');
    const overlay = new ol.Overlay({
        element: overlayElem,
        offset: [10, -5]
    });
    map.addOverlay(overlay);

    map.on('pointermove', function (evt) {
        const feats = map.getFeaturesAtPixel(evt.pixel, {
            hitTolerance: 5
        });
        if (feats?.length) {
            const closest = feats[0].getGeometry().getClosestPoint(evt.coordinate);
            overlayElem.textContent = `${closest[2]} m`;
            overlay.setPosition(evt.coordinate);
        } else {
            overlayElem.textContent = '';
        }
    });

    map.getView().setCenter([14747744, -3263853]);
    map.getView().setZoom(4.6);
}

function mCoords(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/australia-rivers-zm.geojson',
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            })
        })
    }));

    const overlayElem = document.createElement('h1');
    overlayElem.className = 'whitespace-pre';
    const overlay = new ol.Overlay({
        element: overlayElem,
        offset: [10, -5]
    });
    map.addOverlay(overlay);

    map.on('pointermove', function (evt) {
        const feats = map.getFeaturesAtPixel(evt.pixel, {
            hitTolerance: 5
        });
        if (feats?.length) {
            const closest = feats[0].getGeometry().getClosestPoint(evt.coordinate);
            overlayElem.textContent = `This river accumulates water from \n ${Math.round(closest[3] / 10000) / 100} km2 at this point`;
            overlay.setPosition(evt.coordinate);
        } else {
            overlayElem.textContent = '';
        }
    });

    map.getView().setCenter([14747744, -3263853]);
    map.getView().setZoom(4.6);
}

function heatMap(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Heatmap({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/hungary_settlements.geojson',
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            })
        }),
        weight: function (feature) {
            return feature.get('population')
        }
    }));
}

function updateAttribs(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/hungary_settlements.geojson',
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            })
        }),
        style: function (feature) {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: feature.get('visited') ? '#ffff00' : '#ff7800',
                        opacity: 0.8
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#000',
                        width: 1
                    })
                })
            });
        }
    }));

    map.on('click', function (evt) {
        const feats = map.getFeaturesAtPixel(evt.pixel);
        if (feats?.length) {
            feats[0].set('visited', true);
        }
    });
}

function updateGeom(ol: typeof OpenLayers, map: OpenLayers.Map) {
    const lineFeat = new ol.Feature({
        geometry: new ol.geom.LineString([ol.proj.fromLonLat([Math.random() * 360 - 180, Math.random() * 180 - 90]), ol.proj.fromLonLat([Math.random() * 360 - 180, Math.random() * 180 - 90])])
    });
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [lineFeat]
        })
    }));

    map.on('click', function () {
        lineFeat.getGeometry()?.appendCoordinate(ol.proj.fromLonLat([Math.random() * 360 - 180, Math.random() * 180 - 90]));
    })

    map.getView().setCenter([0, 0]);
    map.getView().setZoom(0);
}

function addRmLayer(ol: typeof OpenLayers, map: OpenLayers.Map) {
    const lyr = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/australia-rivers-zm.geojson',
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            })
        })
    });
    map.addLayer(lyr);
    let added = true;

    map.getView().setCenter([14747744, -3263853]);
    map.getView().setZoom(4.6);

    map.on('click', function () {
        if (added) {
            map.removeLayer(lyr);
        } else {
            map.addLayer(lyr);
        }

        added = !added;
    });
}

function changeLayerOrder(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.getLayers().item(0).setOpacity(0.9);

    map.addLayer(new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'https://www.oeny.hu/geoserver/ows',
            serverType: 'geoserver',
            params: {
                'LAYERS': 'tr4-tszt:rtszt_tersegi_teruletfelhaszn_kat'
            },
            attributions: 'E-TÉR data by © <a href="https://www.oeny.hu/oeny/4tr/#/tudastar/interaktiv-terkep" target="_blank">Lechner Tudásközpont</a>'
        }),
        opacity: 0.7
    }));

    const vectorLyr = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            }),
            url: '/assets/web-mapping/sample-data/hungary_settlements.geojson'
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#006688'
                }),
                radius: 6
            })
        })
    });
    map.addLayer(vectorLyr);

    map.on('click', function () {
        const currIdx = map.getLayers().getArray().indexOf(vectorLyr);

        if (currIdx > 0) {
            map.getLayers().remove(vectorLyr);
            map.getLayers().insertAt(currIdx - 1, vectorLyr);
        }
    });

    map.getTargetElement().addEventListener('contextmenu', function (evt) {
        evt.preventDefault();

        const currIdx = map.getLayers().getArray().indexOf(vectorLyr);

        if (currIdx < map.getLayers().getLength() - 1) {
            map.getLayers().remove(vectorLyr);
            map.getLayers().insertAt(currIdx + 1, vectorLyr);
        }
    });

    map.getView().setCenter([1962131, 5908264]);
    map.getView().setZoom(10);
}

function modifyImage(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Image({
        source: new ol.source.Raster({
            sources: [
                new ol.source.OSM()
            ],
            operationType: 'pixel',
            operation: function (inputs) {
                // A simple averaging grayscale filter
                const rgba = inputs[0];
                const avg = Math.round((rgba[0] + rgba[1] + rgba[2]) / 3);
                return [avg, avg, avg, rgba[3]];
            }
        })
    }));
}

function rasterAlgebra(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.WebGLTile({
        source: new ol.source.GeoTIFF({
            sources: [{
                url: '/assets/web-mapping/sample-data/baranya-landsat-8.tif',
                bands: [3, 4]
            }],
            normalize: false
        }),
        style: {
            color: [
                'case',
                // In OL there is an extra band holding no-data cells.
                ['==', ['band', 3], 0],
                ['color', 0, 0, 0, 0],
                [
                    'interpolate',
                    ['linear'],
                    // Calculate NDVI from red (band 1) and NIR (band 2)
                    ['/', ['-', ['band', 2], ['band', 1]], ['+', ['band', 2], ['band', 1]]],
                    0,
                    [191, 191, 191],
                    0.2,
                    [12, 221, 8],
                    1,
                    [0, 69, 0]
                ]
            ]
        }
    }));

    map.getView().setCenter([2026714, 5794064]);
    map.getView().setZoom(9.5);
}

function classify(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.WebGLTile({
        source: new ol.source.GeoTIFF({
            sources: [{
                url: '/assets/web-mapping/sample-data/fejer-srtm-aspect.tif'
            }],
            normalize: false,
            interpolate: false
        }),
        style: {
            color: [
                'case',
                // In OL there is an extra band holding no-data cells.
                ['==', ['band', 2], 0],
                ['color', 0, 0, 0, 0],
                // Red for northern aspect
                ['between', ['band', 1], 0, 45],
                ['color', 255, 0, 0, 1],
                // Green for eastern aspect
                ['between', ['band', 1], 45, 135],
                ['color', 0, 255, 0, 1],
                // Blue for southern aspect
                ['between', ['band', 1], 135, 225],
                ['color', 0, 0, 255, 1],
                // Yellow for western aspect
                ['between', ['band', 1], 225, 315],
                ['color', 255, 255, 0, 1],
                // Red for northern aspect
                ['between', ['band', 1], 315, 360],
                ['color', 255, 0, 0, 1],
                // Transparent for the rest
                ['color', 0, 0, 0, 0]
            ]
        }
    }));

    map.getView().setCenter([2056439, 5962700]);
    map.getView().setZoom(9.5);
}

function convolve(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.WebGLTile({
        source: new ol.source.GeoTIFF({
            sources: [{
                url: '/assets/web-mapping/sample-data/fejer-srtm-dem.tif'
            }],
            normalize: false
        }),
        style: {
            color: [
                'case',
                // In OL there is an extra band holding no-data cells.
                ['==', ['band', 2], 0],
                ['color', 0, 0, 0, 0],
                [
                    'interpolate',
                    ['linear'],
                    // Calculate ruggedness using TRI by Riley et al. (1999)
                    ['+',
                        ['-',
                            // 8Esq
                            ['*', 8, ['^', ['band', 1], 2]],
                            ['*',
                                ['*', 2, ['band', 1]],
                                // Focal sum
                                ['+', ['+', ['+', ['+', ['+', ['+', ['+', ['band', 1, -1, -1], ['band', 1, 0, -1]], ['band', 1, 1, -1]], ['band', 1, 1, 0]], ['band', 1, 1, 1]], ['band', 1, 0, 1]], ['band', 1, -1, 1]], ['band', 1, -1, 0]]
                            ]
                        ],
                        // Focal squared sum
                        ['+', ['+', ['+', ['+', ['+', ['+', ['+', ['^', ['band', 1, -1, -1], 2], ['^', ['band', 1, 0, -1], 2]], ['^', ['band', 1, 1, -1], 2]], ['^', ['band', 1, 1, 0], 2]], ['^', ['band', 1, 1, 1], 2]], ['^', ['band', 1, 0, 1], 2]], ['^', ['band', 1, -1, 1], 2]], ['^', ['band', 1, -1, 0], 2]]
                    ],
                    0,
                    [0, 0, 0, 1],
                    200,
                    [255, 255, 255, 1]
                ]
            ]
        }
    }));

    map.getView().setCenter([2056439, 5962700]);
    map.getView().setZoom(9.5);
}

function transformVector(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/web-mapping/sample-data/australia-rivers-zm.geojson',
            format: new ol.format.GeoJSON({
                dataProjection: 'EPSG:4326'
            })
        })
    }));

    map.getView().setCenter([14747744, -3263853]);
    map.getView().setZoom(4.6);
}

function warpRaster(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.setView(new ol.View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 5
    }));
}

function northArrow(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addControl(new ol.control.Rotate());
    map.getView().setRotation(Math.PI / 4);
}

function textBox(ol: typeof OpenLayers, map: OpenLayers.Map) {
    const textElem = document.createElement('h1');
    textElem.textContent = 'This label is managed by the map';

    map.addOverlay(new ol.Overlay({
        position: map.getView().getCenter(),
        element: textElem
    }));
}

function overviewMap(ol: typeof OpenLayers, map: OpenLayers.Map) {
    map.addControl(new ol.control.OverviewMap({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        collapsible: false
    }));
}

export default exports;
