# zig-zag
A function to return the hexagons intersected by a line drawn between the center of two hexagons

Anyone who does anything is probablly familiar with (redblobgames)[http://www.redblobgames.com/grids/hexagons/#line-drawing]
There he presents a (line drawing algorithm)[http://www.redblobgames.com/grids/hexagons/#line-drawing] for hexagonal grids. However it has several shortcomings I wanted to address for my own games.

My own algorith is

* is symetric and will return the same list of hexagons inverted
* is not dependent on the cartesional representation and so has no rounding issues
* Handles intersecting multiple hexagons better
