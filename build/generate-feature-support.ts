import { parse } from 'csv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import fse from 'fs-extra';
import { FeatureSupportItem } from '../src/models/web-mapping/feature-support-item.model';
import { WebMappingLibrary } from '../src/models/web-mapping/web-mapping-library';
import { FeatureSupportFeature } from '../src/models/web-mapping/feature-support-feature.model';
import LeafletExamples from '../src/examples/leaflet';
import OpenLayersExamples from '../src/examples/openlayers';
import MaplibreExamples from '../src/examples/maplibre';
import CesiumExamples from '../src/examples/cesium';

const baseDir = dirname(fileURLToPath(import.meta.url));
const configPath = path.join(baseDir, '..', 'src', 'assets', 'config', 'feature-support.json');
const csvPath = path.join(baseDir, '..', 'src', 'assets', 'web-mapping', 'support-matrix.csv');

const supportMatrix: FeatureSupportItem[] = [];
const pairedRows: Record<string, string | number | undefined>[] = [];
let header: string[] = [];

fs.createReadStream(csvPath)
    .pipe(parse())
    .on('data', function (row: string[]) {
        if (!header.length) {
            header = row;
        } else {
            pairedRows.push(pairRow(row));
        }
    })
    .on('end', async function () {
        for (let pairedRow of pairedRows) {
            supportMatrix.push(await processPairedRowAsync(pairedRow));
        }
        fse.outputJsonSync(configPath, supportMatrix, { spaces: 2 });
    }
);

/**
 * Pairs a single CSV row with the headers and returns it as an object.
 * @param row The CSV row
 */
function pairRow(row: string[]): Record<string, string | number | undefined> {
    if (row.length !== header.length) {
        throw new Error('Row length does not match header length');
    }

    const paired: Record<string, string | number | undefined> = {};
    row.forEach((val, index) => {
        const key = header[index];
        if (val) {
            const intVal = parseInt(val);
            paired[key] = isNaN(intVal) ? val : intVal;
        }
    });

    return paired;
}

/**
 * Processes a paired row by parsing it into a FeatureSupportItem. Either feature or category. Validates features.
 * @param pairedRow The paired row
 * @returns The feature support item
 */
async function processPairedRowAsync(pairedRow: Record<string, string | number | undefined>): Promise<FeatureSupportItem> {
    const featName: string = pairedRow['Name'] as string;

    if (pairedRow[WebMappingLibrary.CESIUM] !== undefined || pairedRow[WebMappingLibrary.LEAFLET] !== undefined ||
        pairedRow[WebMappingLibrary.MAPLIBRE] !== undefined || pairedRow[WebMappingLibrary.OPENLAYERS] !== undefined) {
        // This is a feature
        if (typeof pairedRow[WebMappingLibrary.CESIUM] !== 'number' || typeof pairedRow[WebMappingLibrary.LEAFLET] !== 'number' ||
            typeof pairedRow[WebMappingLibrary.MAPLIBRE] !== 'number' || typeof pairedRow[WebMappingLibrary.OPENLAYERS] !== 'number') {
            throw new Error(`Feature ${featName} does not contain valid scores for all libraries. Aborting.`);
        }

        if (!(Object as any).values(FeatureSupportFeature).includes(featName)) {
            throw new Error(`Feature ${featName} does not exist in the FeatureSupportFeature enum. Aborting.`);
        }

        return {
            name: featName,
            description: pairedRow['Description'] as string,
            addendum: pairedRow['Addendum'] as string | undefined,
            support: {
                [WebMappingLibrary.LEAFLET]: {
                    score: pairedRow[WebMappingLibrary.LEAFLET],
                    example: await getExampleAsync(WebMappingLibrary.LEAFLET, LeafletExamples[featName as FeatureSupportFeature])
                },
                [WebMappingLibrary.OPENLAYERS]: {
                    score: pairedRow[WebMappingLibrary.OPENLAYERS],
                    example: await getExampleAsync(WebMappingLibrary.OPENLAYERS, OpenLayersExamples[featName as FeatureSupportFeature])
                },
                [WebMappingLibrary.MAPLIBRE]: {
                    score: pairedRow[WebMappingLibrary.MAPLIBRE],
                    example: await getExampleAsync(WebMappingLibrary.MAPLIBRE, MaplibreExamples[featName as FeatureSupportFeature])
                },
                [WebMappingLibrary.CESIUM]: {
                    score: pairedRow[WebMappingLibrary.CESIUM],
                    example: await getExampleAsync(WebMappingLibrary.CESIUM, CesiumExamples[featName as FeatureSupportFeature])
                }
            }
        }
    } else {
        // This is a category
        return {
            name: featName,
            description: pairedRow['Description'] as string,
            addendum: pairedRow['Addendum'] as string | undefined
        }
    }
}

/**
 * Returns an example GitHub URL for the given library and example function, if any.
 * @param lib The library.
 * @param exampleFunc The example function, if any.
 * @returns The GitHub URL for the example source code.
 */
async function getExampleAsync(lib: WebMappingLibrary, exampleFunc?: (this: any, lib: any, map: any) => void): Promise<string | undefined> {
    if (!exampleFunc) return undefined;

    let lineNum = '0';
    try {
        // Trigger an error by calling ther func with invalid params
        if (exampleFunc.toString().startsWith('async')) {
            await exampleFunc(null, null);
        } else {
            exampleFunc(null, null);
        }
    } catch (exc: unknown) {
        // Get line num from error
        const err = exc as Error;
        if (err.stack) {
            const funcLine = err.stack.split('\n').find(line => line.includes(exampleFunc.name));
            lineNum = funcLine!.split(":")[1];
        }
    }

    const exampleUrlBasePath = 'https://github.com/GaborFarkas/gaborfarkas.github.io/blob/main/src/examples/' + (
        lib === WebMappingLibrary.LEAFLET ? 'leaflet' :
            lib === WebMappingLibrary.OPENLAYERS ? 'openlayers' :
                lib === WebMappingLibrary.MAPLIBRE ? 'maplibre' :
                    'cesium'
    ) + '.ts#L';

    return exampleUrlBasePath + lineNum;
}
