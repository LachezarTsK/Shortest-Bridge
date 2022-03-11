
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private static final int THERE_ARE_NO_ISLANDS = -1;
    private static final int WATER = 0;
    private static final int LAND = 1;
    private static final int MARK_ONE_ISLAND_WITH_DISTINCT_ID = 2;
    private static final int VISITED = 3;
    private static final int[][] moves = {{-1, 0}/*up*/, {1, 0}/*down*/, {0, -1}/*left*/, {0, 1}/*right*/};
    private int rows;
    private int columns;

    public int shortestBridge(int[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return THERE_ARE_NO_ISLANDS;
        }
        rows = grid.length;
        columns = grid[0].length;
        markOneIslandWithDistinctID(grid);

        return breadthFirstSearch_findShortestBridge(grid);
    }

    private int breadthFirstSearch_findShortestBridge(int[][] grid) {
        Queue<int[]> queue = new LinkedList<>();
        initializeQueueWithLandPointsOnShoreline(grid, queue);
        int shortestBridge = 0;

        while (!queue.isEmpty()) {

            int size = queue.size();
            while (size-- > 0) {

                int[] coordinates = queue.poll();
                for (int i = 0; i < moves.length; i++) {
                    int row = coordinates[0] + moves[i][0];
                    int column = coordinates[1] + moves[i][1];

                    if (!pointIsInGrid(row, column)) {
                        continue;
                    }
                    if (grid[row][column] == LAND) {
                        return shortestBridge;
                    }
                    if (grid[row][column] == WATER) {
                        queue.add(new int[]{row, column});
                        grid[row][column] = VISITED;
                    }
                }
            }
            shortestBridge++;
        }
        return THERE_ARE_NO_ISLANDS;
    }

    private void initializeQueueWithLandPointsOnShoreline(int[][] grid, Queue<int[]> queue) {
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (grid[r][c] == MARK_ONE_ISLAND_WITH_DISTINCT_ID && isLandPointOnShoreline(grid, r, c)) {
                    queue.add(new int[]{r, c});
                }
            }
        }
    }

    private boolean isLandPointOnShoreline(int[][] grid, int row, int column) {
        for (int i = 0; i < moves.length; i++) {
            int new_row = row + moves[i][0];
            int new_column = column + moves[i][1];
            if (pointIsInGrid(new_row, new_column) && grid[new_row][new_column] == WATER) {
                return true;
            }
        }
        return false;
    }

    private void markOneIslandWithDistinctID(int[][] grid) {
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (grid[r][c] == LAND) {
                    depthFirstSearch_markIsland(grid, r, c);
                    return;
                }
            }
        }
    }

    private void depthFirstSearch_markIsland(int[][] grid, int row, int column) {

        grid[row][column] = MARK_ONE_ISLAND_WITH_DISTINCT_ID;
        if (row - 1 >= 0 && grid[row - 1][column] == LAND) {
            depthFirstSearch_markIsland(grid, row - 1, column);
        }
        if (row + 1 < rows && grid[row + 1][column] == LAND) {
            depthFirstSearch_markIsland(grid, row + 1, column);
        }
        if (column - 1 >= 0 && grid[row][column - 1] == LAND) {
            depthFirstSearch_markIsland(grid, row, column - 1);
        }
        if (column + 1 < columns && grid[row][column + 1] == LAND) {
            depthFirstSearch_markIsland(grid, row, column + 1);
        }
    }

    private boolean pointIsInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
