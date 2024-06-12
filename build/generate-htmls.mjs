import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import fse from 'fs-extra';
import { parse } from 'node-html-parser';

const baseDir = dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(baseDir, '..', 'dist', 'project-w', 'browser');
const configPath = path.join(baseDir, '..', 'src', 'assets', 'config', 'stories.json');
const indexPath = path.join(buildDir, 'index.html');

if (!fs.existsSync(buildDir)) {
    throw new Error(`Build directory (${buildDir}) does not exist!`);
}

if (!fs.existsSync(configPath)) {
    throw new Error(`Story configuration file (${configPath}) does not exist!`);
}

const htmlText = fs.readFileSync(indexPath, 'utf-8');
const configJson = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

['counseling', 'partnership', 'insights', 'about'].forEach(slug => {
    generateHtmlFile({
        slug: slug,
        category: 'home'
    });
});
configJson.forEach(config => {
    generateHtmlFile(config);
})

/**
 * Generates an HTML file from a configuration used for stories.
 * @param {object} config The story configuration.
 */
function generateHtmlFile(config) {
    config = config || {};
    let outputPath, type;
    switch (config.category) {
        case 'home':
            outputPath = path.join(buildDir, config.slug);
            break;
        case 'insight':
            outputPath = path.join(buildDir, 'insights', config.slug);
            type = 'article';
            break;
        default:
            throw new Error(`Unknown story type ${config.type}.`);
    }
    outputPath += '.html';

    // node-html-parser does not support cloning, so parse a new HTML DOM every time.
    const htmlDom = parse(htmlText);
    if (config.title) {
        const titleMetaElem = htmlDom.querySelector('meta[property=og:title]');
        titleMetaElem.setAttribute('content', `${config.title} - Farkas Gábor e.v.`);
    }

    if (config.description) {
        const descMetaOgElem = htmlDom.querySelector('meta[property=og:description]');
        descMetaOgElem.setAttribute('content', config.description);
        const descMetaElem = htmlDom.querySelector('meta[name=description]');
        descMetaElem.setAttribute('content', config.description);
    }

    if (config.thumbUrl) {
        const imgMetaElem = htmlDom.querySelector('meta[property=og:image]');
        imgMetaElem.setAttribute('content', config.thumbUrl);
    }

    if (type) {
        const typeMetaElem = htmlDom.querySelector('meta[property=og:type]');
        typeMetaElem.setAttribute('content', type);
    }

    fse.outputFileSync(outputPath, htmlDom.toString());
}
