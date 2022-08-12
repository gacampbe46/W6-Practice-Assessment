function findPeak(matrix) {
    let highest = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[0].length; k++) {
            if (matrix[i][k] > highest) {
                highest = matrix[i][k];
            }
        }
    }

    return highest;
}

function findStarts(matrix) {
    let starts = [];

    // Top Row
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] == 0) {
            starts.push([0, i])
        }
    }

    // Bottom Row
    for (let i = 0; i < matrix[matrix.length-1].length; i++) {
        if (matrix[matrix.length-1][i] == 0) {
            starts.push([matrix.length-1, i])
        }
    }

    // Left except first and last
    for (let i = 1; i < matrix.length-1; i++) {
        if (matrix[i][0] == 0) {
            starts.push([i, 0])
        }
    }

    // Right except first and last
    for (let i = 1; i < matrix.length - 1; i++) {
        if (matrix[i][matrix[0].length - 1] == 0) {
            starts.push([i, matrix[0].length-1])
        }
    }

    return starts;
}

function findNeighbors(node, matrix) {
    // Don't forget to include diagonal neighbors!!!
    let [row, column] = node;       // deconstruct node
    let neighbors = [];             // init neighbors array
    let selectNeighbors = []        // init select neighbors array


    // STEP 1: FIND ALL NEIGHBORS

    // Neighbor 1: Directly Above
    if(row > 0) neighbors.push([row - 1,column])

    // Neighbor 2: Diagonal top-right
    if(row > 0 && column < matrix[0].length - 1) neighbors.push([row - 1,column + 1])

    // Neighbor 3: Directly Right
    if(column < matrix[0].length - 1) neighbors.push([row,column + 1])

    // Neighbor 4: Diagonal bottom-right
    if(row < matrix.length - 1 && column < matrix[0].length - 1) neighbors.push([row + 1,column + 1])

    // Neighbor 5: Directly below
    if(row < matrix.length - 1) neighbors.push([row + 1,column])

    // Neighbor 6: Diagonal bottom-left
    if(row < matrix.length - 1 > 0 && column > 0) neighbors.push([row + 1,column - 1])

    // Neighbor 7: Directly to the left
    if(column > 0) neighbors.push([row, column - 1])

    // Neighbor 8: Diagonal top-left
    if(row > 0 && column > 0) neighbors.push([row - 1, column - 1])

    // console.log(neighbors)  // At this point in our code, we know we have all neighbors

    //  STEP 2: FILTER NEIGHBORS TO ONLY HAVE DIFFERENCE OF 1
    neighbors.forEach(el => {
        let [myRow, myColumn] = el;
        let difference = Math.abs(matrix[row][column] - matrix[myRow][myColumn]);
        if(difference <= 1) selectNeighbors.push(el);
    })

    // console.log(selectNeighbors);
    return selectNeighbors;
}

function pathTraversal(node, matrix, visited, peak) {
    let stack = [node]
    visited.add(node.join(','))

    while(stack.length > 0){
    // Pop the first node
    // console.log(visited)
    let curr = stack.pop();
    let [currRow, curColumn] = curr;
    // DO THE THING (check and see if we found the peak)
    if(matrix[currRow][curColumn] === peak) return true
    // Then push all the UNVISITED neighbors on top of the stack
    // and mark them as visited
    // HINT: This is what your helper function `getNeighbors` is for
    let neighbor = findNeighbors(curr, matrix)
        neighbor.forEach(el => {
        // HINT: Remember, you're storing your visited nodes as strings!
            if(!visited.has(el.join(','))){
                visited.add(el.join(','))
                stack.push(el)
            }
        })
    }
    return false
}

function identifyPath(mountain) {
    // Find the peak
    let peak = findPeak(mountain)

    // Find the start
    let startArr = findStarts(mountain)

    let bestPath;
    startArr.forEach(el => {
        if(pathTraversal(el, mountain, visited = new Set(), peak)){
            bestPath = el
        }
    })

    return bestPath;
}

// Uncomment for local testing

// // Example 0
// const mountain_0 = [
    //     [1, 2, 4],
    //     [4, 5, 9],
    //     [5, 7, 6]
    // ];

    // console.log(findNeighbors([2,0], mountain_0)) // <- Expect '[ [ 1, 0 ], [ 1, 1 ] ]'

    // // Example 1
    // const mountain_1 = [
        //         [1, 0, 1, 1],
        //         [2, 3, 2, 1],
        //         [0, 2, 4, 1],
        //         [3, 2, 3, 1]
        // ];

        // test_visited = new Set()
        // console.log(pathTraversal([0, 1], mountain_1, test_visited, 4)) // <- Expect 'true
        // console.log(identifyPath(mountain_1)) // <- Expect '[ 0, 1 ]'

        // // Example 2
        // const mountain_2 = [
            //         [0, 2, 1, 1],
            //         [2, 2, 3, 1],
            //         [1, 1, 1, 1],
            //         [1, 0, 1, 1]
            // ];

            // console.log(identifyPath(mountain_2)) // <- Expect '[ 3, 1 ]'

            // // Example 3
            // const mountain_3 = [
                //         [0, 1, 2, 0],
                //         [5, 1, 3, 2],
                //         [4, 1, 2, 1],
                //         [3, 4, 3, 1]
                // ];

                // console.log(identifyPath(mountain_3)) // <- Expect '[ 0, 0 ]'

                // Alternative 'findStarts' method
                // mountain.forEach((row, rowIndex) => {
                    //     row.forEach((nodeVal, colIndex) => {
                        //         if(nodeVal === 0) {
                            //             zeros.push([rowIndex, colIndex]);
                            //             console.log(zeros)
                            //         }
                            //     })
                            // })

                // Alternative findPeak Method
                            // let peak = -Infinity;
                            // mountain.forEach(row => {
                            //     row.forEach(node => {
                            //         if(node > peak ) peak = node;
                            //     })
                            // })

                            /*************DO NOT MODIFY UNDER THIS LINE ***************/

                            module.exports = [identifyPath, findNeighbors, pathTraversal];
