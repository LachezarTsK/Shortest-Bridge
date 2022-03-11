
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function (grid) {
    this.THERE_ARE_NO_ISLANDS = -1;
    if (grid === undefined || grid === null || grid.length === 0 || grid[0].length === 0) {
        return THERE_ARE_NO_ISLANDS;
    }

    this.WATER = 0;
    this.LAND = 1;
    this.MARK_ONE_ISLAND_WITH_DISTINCT_ID = 2;
    this.VISITED = 3;

    this.moves = [[-1, 0]/*up*/, [1, 0]/*down*/, [0, -1]/*left*/, [0, 1]/*right*/];
    this.rows = grid.length;
    this.columns = grid[0].length;
    markOneIslandWithDistinctID(grid);

    return breadthFirstSearch_findShortestBridge(grid);
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
function breadthFirstSearch_findShortestBridge(grid) {
    const queue = new Queue();
    initializeQueueWithLandPointsOnShoreline(grid, queue);
    let shortestBridge = 0;

    while (!queue.isEmpty()) {

        let size = queue.size();
        while (size-- > 0) {

            const coordinates = queue.dequeue();
            for (let i = 0; i < this.moves.length; i++) {
                let row = coordinates[0] + this.moves[i][0];
                let column = coordinates[1] + this.moves[i][1];

                if (!pointIsInGrid(row, column)) {
                    continue;
                }
                if (grid[row][column] === this.LAND) {
                    return shortestBridge;
                }
                if (grid[row][column] === this.WATER) {
                    queue.enqueue([row, column]);
                    grid[row][column] = this.VISITED;
                }
            }
        }
        shortestBridge++;
    }
    return this.THERE_ARE_NO_ISLANDS;
}

/**
 * @param {number[][]} grid
 * @param {Queue of number[]}queue
 */
function initializeQueueWithLandPointsOnShoreline(grid, queue) {
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
            if (grid[r][c] === this.MARK_ONE_ISLAND_WITH_DISTINCT_ID && isLandPointOnShoreline(grid, r, c)) {
                queue.enqueue([r, c]);
            }
        }
    }
}

/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number}column 
 * @return {boolean}
 */
function isLandPointOnShoreline(grid, row, column) {
    for (let i = 0; i < this.moves.length; i++) {
        let new_row = row + this.moves[i][0];
        let new_column = column + this.moves[i][1];
        if (pointIsInGrid(new_row, new_column) && grid[new_row][new_column] === this.WATER) {
            return true;
        }
    }
    return false;
}

/**
 * @param {number[][]} grid
 */
function markOneIslandWithDistinctID(grid) {
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
            if (grid[r][c] === this.LAND) {
                depthFirstSearch_markIsland(grid, r, c);
                return;
            }
        }
    }
}

/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number}column 
 */
function depthFirstSearch_markIsland(grid, row, column) {

    grid[row][column] = this.MARK_ONE_ISLAND_WITH_DISTINCT_ID;
    if (row - 1 >= 0 && grid[row - 1][column] === this.LAND) {
        depthFirstSearch_markIsland(grid, row - 1, column);
    }
    if (row + 1 < this.rows && grid[row + 1][column] === this.LAND) {
        depthFirstSearch_markIsland(grid, row + 1, column);
    }
    if (column - 1 >= 0 && grid[row][column - 1] === this.LAND) {
        depthFirstSearch_markIsland(grid, row, column - 1);
    }
    if (column + 1 < this.columns && grid[row][column + 1] === this.LAND) {
        depthFirstSearch_markIsland(grid, row, column + 1);
    }
}

/**
 * @param {number} row
 * @param {number}column 
 * @return {boolean}
 */
function pointIsInGrid(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}
