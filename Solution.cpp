
#include <queue>
#include <array>
#include <vector>
using namespace std;

class Solution {
    
    inline static const int THERE_ARE_NO_ISLANDS = -1;
    inline static const int WATER = 0;
    inline static const int LAND = 1;
    inline static const int MARK_ONE_ISLAND_WITH_DISTINCT_ID = 2;
    inline static const int VISITED = 3;
    inline static const array<array<int, 2>, 4> moves{array<int, 2>{-1, 0}/*up*/, {1, 0}/*down*/, {0, -1}/*left*/, {0, 1}/*right*/};
    size_t rows;
    size_t columns;

public:

    int shortestBridge(vector<vector<int>>&grid) {
        if (grid.size() == 0 || grid[0].size() == 0) {
            return THERE_ARE_NO_ISLANDS;
        }
        rows = grid.size();
        columns = grid[0].size();
        markOneIslandWithDistinctID(grid);

        return breadthFirstSearch_findShortestBridge(grid);
    }

private:

    int breadthFirstSearch_findShortestBridge(vector<vector<int>>&grid) {
        queue<array<int, 2 >> queue;
        initializeQueueWithLandPointsOnShoreline(grid, queue);
        int shortestBridge = 0;

        while (!queue.empty()) {

            int size = queue.size();
            while (size-- > 0) {

                array<int, 2> coordinates = queue.front();
                queue.pop();

                for (const auto& move : moves) {
                    int row = coordinates[0] + move[0];
                    int column = coordinates[1] + move[1];

                    if (!pointIsInGrid(row, column)) {
                        continue;
                    }
                    if (grid[row][column] == LAND) {
                        return shortestBridge;
                    }
                    if (grid[row][column] == WATER) {
                        queue.push(array<int, 2>{row, column});
                        grid[row][column] = VISITED;
                    }
                }
            }
            shortestBridge++;
        }
        return THERE_ARE_NO_ISLANDS;
    }

    void initializeQueueWithLandPointsOnShoreline(vector<vector<int>>&grid, queue<array<int, 2 >> &queue) {
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (grid[r][c] == MARK_ONE_ISLAND_WITH_DISTINCT_ID && isLandPointOnShoreline(grid, r, c)) {
                    queue.push(array<int, 2>{r, c});
                }
            }
        }
    }

    bool isLandPointOnShoreline(vector<vector<int>>&grid, int row, int column) {
        for (const auto& move : moves) {
            int new_row = row + move[0];
            int new_column = column + move[1];
            if (pointIsInGrid(new_row, new_column) && grid[new_row][new_column] == WATER) {
                return true;
            }
        }
        return false;
    }

    void markOneIslandWithDistinctID(vector<vector<int>>&grid) {
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (grid[r][c] == LAND) {
                    depthFirstSearch_markIsland(grid, r, c);
                    return;
                }
            }
        }
    }

    void depthFirstSearch_markIsland(vector<vector<int>>&grid, int row, int column) {

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

    bool pointIsInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
