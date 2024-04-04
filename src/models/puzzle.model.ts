/**
 * Represents a single jigsaw puzzle piece.
 */
export interface PuzzlePiece {
    /**
     * The top edge of the puzzle piece.
     * 0 means straight.
     * Positive numbers indicate outwards pointing edges, negatives are for inwards pointing edges.
     * The absolute value defines the edge variant.
     */
    topEdge: number;

    /**
     * The bottom edge of the puzzle piece.
     * 0 means straight.
     * Positive numbers indicate outwards pointing edges, negatives are for inwards pointing edges.
     * The absolute value defines the edge variant.
     */
    bottomEdge: number;

    /**
     * The left edge of the puzzle piece.
     * 0 means straight.
     * Positive numbers indicate outwards pointing edges, negatives are for inwards pointing edges.
     * The absolute value defines the edge variant.
     */
    leftEdge: number;

    /**
     * The right edge of the puzzle piece.
     * 0 means straight.
     * Positive numbers indicate outwards pointing edges, negatives are for inwards pointing edges.
     * The absolute value defines the edge variant.
     */
    rightEdge: number;

    /**
     * The current piece cannot be moved (e.g. in it's final position).
     */
    locked: boolean;

    /**
     * The row number of the current piece (0-indexed).
     */
    row: number;

    /**
     * The column number of the current piece (0-indexed).
     */
    column: number;

    /**
     * The DOM element associated with the current piece. Optional. Useful for storing GUI associations.
     */
    dom?: HTMLElement|SVGElement;
}

/**
 * Generates the pieces of a complete jigsaw puzzle with straight outer edges.
 * Makes sure that neighboring edges have the same inclination with a different direction.
 * @param width Number of columns in the puzzle.
 * @param height Number of rows in the puzzle.
 * @param edgeVariants Number of different edge types supported by the jigsaw implementation.
 */
export function* generatePuzzle(width: number, height: number, edgeVariants: number): Generator<PuzzlePiece, void, unknown> {
    const lastRowBottomEdges = new Array(width);
    const numPieces = width * height;
    let lastColRightEdge = 0;
    for (let i = 0; i < numPieces; ++i) {
        const currCol = i % width;
        const top = invertEdge(lastRowBottomEdges[currCol] ?? 0);
        const bottom = i > numPieces - width ? 0 : getRandomEdge(edgeVariants);
        const left = invertEdge(lastColRightEdge);
        const right = i % width === width - 1 ? 0 : getRandomEdge(edgeVariants);
        lastColRightEdge = right === 0 ? 0 : right;
        lastRowBottomEdges[currCol] = bottom === 0 ? 0 : bottom;

        yield {
            topEdge: top,
            leftEdge: left,
            bottomEdge: bottom,
            rightEdge: right,
            locked: false,
            column: currCol,
            row: Math.floor(i / width)
        };
    }
}

/**
 * Returns a randomly generated edge variant.
 * @param edgeVariants Number of different edge types supported by the jigsaw implementation.
 */
function getRandomEdge(edgeVariants: number) {
    return Math.ceil(Math.random() * edgeVariants) * (Math.round(Math.random()) === 0 ? -1 : 1);
}

/**
 * Returns the inverse of an edge variant (i.e. multiplied by -1).
 * @param edge The edge to invert.
 */
function invertEdge(edge: number) {
    return edge === 0 ? 0 : edge * -1;
}
