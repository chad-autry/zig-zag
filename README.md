# zig-zag
A function to return the hexagons intersected by a line drawn between the center of two hexagons

Anyone who does anything with hexagons is probablly familiar with [redblobgames](http://www.redblobgames.com/grids/hexagons/#line-drawing)
There he presents a [line drawing algorithm](http://www.redblobgames.com/grids/hexagons/#line-drawing) for hexagonal grids. However I wanted to develop my own for several reasons

My own algorith
* Lets the user choose the prefered direction of travel, when there are two equivalent choices
* Is not dependent on the cartesional representation and so has no rounding issues
* Makes logical sense to me, since it is based on choosing the 'best' direction of travel

# The Idea
To travel between two hexagons on a grid, with the minimum number of steps, the path taken is always in only one or two of the six hex cardinal directions. However, order traveled does not matter for hexagonal distance. To choose the direction of travel at each step which makes the best cartesian line, the difference between in slope between the prospective step and the final destination can be compared. The smallest distance in slope, is the 'best' direction of travel. If the difference is equal, a consistent choice of left/clockwise or right/counter-clockwise can be made.

# Note
This algorithm is not optimized for efficiency. There are several multiplications and comparisons made per hex traveled. I expect to use it only for small distances. Even there if efficiency becomes a concern I'll use it to generate a lookup table.
