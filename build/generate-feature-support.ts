import { parse } from 'csv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import fse from 'fs-extra';
import { FeatureSupportItem } from '../src/models/web-mapping/feature-support-item\.model';
import { WebMappingLibrary } from '../src/models/web-mapping/web-mapping-library';
import { FeatureSupportFeature } from '../src/models/web-mapping/feature-support-feature\.model';

const baseDir = dirname(fileURLToPath(import.meta.url));
const configPath = path.join(baseDir, '..', 'src', 'assets', 'config', 'feature-support.json');
const csvPath = path.join(baseDir, '..', 'src', 'assets', 'web-mapping', 'support-matrix.csv');

const supportMatrix: FeatureSupportItem[] = [];
let header: string[] = [];

fs.createReadStream(csvPath)
    .pipe(parse())
    .on('data', function (row: string[]) {
        if (!header.length) {
            header = row;
        } else {
            const pairedRow = pairRow(row);
            supportMatrix.push(processPairedRow(pairedRow));
        }
    })
    .on('end', function () {
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
function processPairedRow(pairedRow: Record<string, string | number | undefined>): FeatureSupportItem {
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
                    example: false
                },
                [WebMappingLibrary.OPENLAYERS]: {
                    score: pairedRow[WebMappingLibrary.OPENLAYERS],
                    example: false
                },
                [WebMappingLibrary.MAPLIBRE]: {
                    score: pairedRow[WebMappingLibrary.MAPLIBRE],
                    example: false
                },
                [WebMappingLibrary.CESIUM]: {
                    score: pairedRow[WebMappingLibrary.CESIUM],
                    example: false
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
