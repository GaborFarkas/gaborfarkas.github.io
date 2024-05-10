import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import fse from 'fs-extra';
import { walk } from 'walk';
import gitDateExtractor from 'git-date-extractor';

const baseDir = dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(baseDir, '..', 'src', 'components', 'story');
const configPath = path.join(baseDir, '..', 'src', 'assets', 'config', 'stories.json');
const routesPath = path.join(baseDir, '..', 'src', 'app', 'app.routes.ts');
const urlMappingPath = path.join(baseDir, '..', 'src', 'models', 'page-url-mapping.model.ts');

const routesFileContent = fs.readFileSync(routesPath, 'utf-8');
const storyMappings = fs.readFileSync(urlMappingPath, 'utf-8').match(/(?<=StoryUrlMapping).*$/s)[0];

const storyConfigFiles = await getConfigurationsAsync(srcDir);
const stories = [];
for (let storyConfigFile of storyConfigFiles) {
    const config = await parseStoryConfigAsync(storyConfigFile);
    stories.push(config);
}

await fse.outputJson(configPath, stories, { spaces: 2 });

/**
 * Extracts all the story configuration files from the story folder.
 * @param {string} sourceDir The directory to walk through.
 * @return {Promise<string[]>} The array of configuration file paths.
 */
function getConfigurationsAsync(sourceDir) {
    return new Promise((resolve, reject) => {
        let paths = [];
        let currFile = '';

        const walker = walk(sourceDir);
        walker.on('file', (root, stats, next) => {
            currFile = path.join(root, stats.name);
            if (stats.name === 'config.json') {
                paths.push(currFile);
            }
            next();
        });
        walker.on('errors', () => {
            reject(new Error(`Failed to walk ${sourceDir}. Last file found was ${currFile}.`));
        });

        walker.on('end', () => {
            resolve(paths);
        });
    });
}

/**
 * Parses and validates a story configuration from a config file.
 * @param {string} configPath The path to the configuration file.
 * @returns {object} The parsed story configuration.
 */
async function parseStoryConfigAsync(configPath) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const required = ['title', 'description', 'thumbUrl'];
    const allowed = required.concat(['created', 'lastModified', 'category', 'slug']);

    required.forEach(prop => {
        if (typeof config[prop] !== 'string') {
            throw new Error(`Property ${prop} must be a string.`);
        }
    });

    for (let prop in config) {
        if (!allowed.includes(prop)) {
            throw new Error(`Unsupported property ${prop}.`);
        }
    }

    // Supported story path scheme: config.json -> component folder -> category folder -> story -> components -> src
    if (!config.category) {
        const pathArr = configPath.split(path.sep);
        config.category = pathArr[pathArr.length - 3];
    }

    // Slug
    if (!config.slug) {
        const componentFile = fs.readdirSync(path.dirname(configPath)).find(file => file.endsWith('.component.ts'));
        const componentImportName = componentFile.replace('.ts', '');
        const routeDefinition = routesFileContent.match(new RegExp(`\{.*${componentImportName.replace('.', '\\.')}.*\}`))[0];
        const slugMapping = routeDefinition.match(/(?<=StoryUrlMapping\.).*?(?=,)/)[0].trim();
        const urlMappingLine = storyMappings.match(new RegExp(`.*${slugMapping}.*`))[0];
        const slug = urlMappingLine.match(/(?<=['"]).*?(?=['"])/)[0].trim();
        config.slug = slug;
    }

    // Timestamps
    if (!config.created || !config.lastModified) {
        const stamps = await gitDateExtractor.getStamps({
            onlyIn: path.dirname(configPath),
            outputToFile: false
        });

        if (!config.created) {
            const minCreated = Math.min(...Object.values(stamps).map(stamp => stamp.created * 1000));
            config.created = new Date(minCreated).toISOString();
        }

        if (!config.lastModified) {
            const maxModified = Math.max(...Object.values(stamps).map(stamp => stamp.modified * 1000));
            config.lastModified = new Date(maxModified).toISOString();
        }
    }

    return config;
}
