/**
 * URL segments pointing to different parts of the MPA, mainly used by the routing module.
 */
export enum PageUrlMapping {
    HOME = '',
    ABOUT = 'about',
    PUBLICATIONS = 'publications',
    PARTNERSHIP = 'partnership',
    COUNSELING = 'counseling',
    INSIGHTS = 'insights',
    CASESTUDIES = 'case-studies',
    FEATUREMATRIX = 'web-mapping/feature-matrix',
    MAP = 'web-mapping/map',
    SANDBOX = 'web-mapping/sandbox'
}

/**
 * URL slugs pointing to story pages.
 */
export enum StoryUrlMapping {
    WEBPROG2 = 'web-programming-2',
    SWDEVTECH = 'software-development-technologies',
    LINUXPROG = 'linux-as-programming-language'
}

/**
 * Query parameters for the MapPage page component.
 */
export enum MapPageQueryParams {
    LIB = 'lib'
}
