// #region CONSTANTS
const NEIGHBOR_OFFSETS = [
    [0,0,1], [0,0,-1],
    [0,1,0], [0,-1,0],
    [1,0,0], [-1,0,0],
];
// #endregion

export default class VoxelGrid{
    // #region MAIN
    cellState = null;       // On/Off state for each voxel
    cellSize  = 1;          // Size of the voxel
    xzCount   = 0;          // How many voxels for one Y row

    dimension = [0,0,0];    // How many voxels per axis
    maxCoord  = [0,0,0];    // Max coordinate per axis
    minBound  = [0,0,0];    // Min Bounding location
    maxBound  = [0,0,0];    // Max Bounding location

    constructor( x=2, y=2, z=2 ){
        this.setDimension( x, y, z );

    }
    // #endregion

    // #region SETTERS
    setCellSize( s ){
        this.cellSize = s;
        // this.minBound[0]  = 0;
        // this.minBound[1]  = 0;
        // this.minBound[2]  = 0;
        this.maxBound[0]  = this.dimension[0] * this.cellSize;
        this.maxBound[1]  = this.dimension[1] * this.cellSize;
        this.maxBound[2]  = this.dimension[2] * this.cellSize;
        return this;
    }

    setDimension( x, y, z ){
        this.xzCount      = x * z;
        this.dimension[0] = x;
        this.dimension[1] = y;
        this.dimension[2] = z;

        this.maxCoord[0]  = x-1;
        this.maxCoord[1]  = y-1;
        this.maxCoord[2]  = z-1;

        this.minBound[0]  = 0;
        this.minBound[1]  = 0;
        this.minBound[2]  = 0;

        this.maxBound[0]  = x * this.cellSize;
        this.maxBound[1]  = y * this.cellSize;
        this.maxBound[2]  = z * this.cellSize;

        this.cellState    = new Uint8Array( 
            this.dimension[0] * 
            this.dimension[2] * 
            this.dimension[1]
        );
    }
    // #endregion

    // #region COORD MATH

    // Using Voxel Coordinates, Gets the Cell Array Index
    coordIdx( coord ){
        // ( xLen * zLen * y ) + ( xLen * z ) + x
        const x = Math.min( Math.max( coord[0], 0 ), maxCoord[0] );
        const y = Math.min( Math.max( coord[1], 0 ), maxCoord[1] );
        const z = Math.min( Math.max( coord[2], 0 ), maxCoord[2] );
        return this.xzCount * y + this.dimension[0] * z + x;
    }

    // Using Cell Array Index, Compute Voxel Coordinate
    idxCoord( i, out=[0,0,0] ){
        const y     = Math.floor( i / this.xzCount );       // How Many Y Levels Can We Get?
        const xz    = i - y * this.xzCount;                 // Subtract Y Levels from total, To get remaining Layer
        const z     = Math.floor( xz / this.dimension[0] ); // How many rows in the last layer can we get?

        out[0] = xz - z * this.dimension[0];
        out[1] = y;
        out[2] = z;
        return out;
    }

    // Convert Worldspace Position to Voxel Coordinates
    posCoord( pos, out=[0,0,0] ){
        // Localize Postion in relation to Chunk's Starting position
        // Divide  the Local Position by Voxel's Size.
        // Floor it to get final coordinate value.
        out[0] = Math.floor( (pos[0] - this.minBound[0]) / this.cellSize );
        out[1] = Math.floor( (pos[1] - this.minBound[1]) / this.cellSize );
        out[2] = Math.floor( (pos[2] - this.minBound[2]) / this.cellSize );
        return out;
    }

    // Get the cell min/max boundary from voxel coordinates
    coordBound( coord, minOut, maxOut ){
        minOut[0] = coord[0] * this.cellSize + this.minBound[0];
        minOut[1] = coord[1] * this.cellSize + this.minBound[1];
        minOut[2] = coord[2] * this.cellSize + this.minBound[2];

        maxOut[0] = ( coord[0] + 1 ) * this.cellSize + this.minBound[0];
        maxOut[1] = ( coord[1] + 1 ) * this.cellSize + this.minBound[1];
        maxOut[2] = ( coord[2] + 1 ) * this.cellSize + this.minBound[2];
    }

    // Get the cell min boundary from voxel coordinates
    coordMinBound( coord, minOut=[0,0,0] ){
        minOut[0] = coord[0] * this.cellSize + this.minBound[0];
        minOut[1] = coord[1] * this.cellSize + this.minBound[1];
        minOut[2] = coord[2] * this.cellSize + this.minBound[2];
        return minOut;
    }

    // Get the center point of a cell
    coordMidPoint( coord, out=[0,0,0] ){
        const h = this.cellSize * 0.5;
        out[0]  = coord[0] * this.cellSize + this.minBound[0] + h;
        out[1]  = coord[1] * this.cellSize + this.minBound[1] + h;
        out[2]  = coord[2] * this.cellSize + this.minBound[2] + h;
        return out;
    }

    isCoord( coord ){
        if( coord[0] < 0 || coord[0] > this.maxCoord[0] ) return false;
        if( coord[1] < 0 || coord[1] > this.maxCoord[1] ) return false;
        if( coord[2] < 0 || coord[2] > this.maxCoord[2] ) return false;
        return true;
    }

    // #endregion

    // #region ITER
    
    // Loop over all the cells
    iterCells(){
        let   i      = 0;
        const sCell  = this.cellState;
        const len    = sCell.length;
        const val    = {
            min   : [0,0,0],
            max   : [0,0,0],
            coord : [0,0,0],
            isOn  : false,
            idx   : 0,
        };

        const result = { done: false, value: val };
        const next   = ()=>{
            if( i >= len ) result.done = true;
            else{
                val.idx  = i;                                   // Cell Index
                val.isOn = ( sCell[ i ] != 0 );                 // Is Cell Active
                this.idxCoord( i++, val.coord );                // Compute Voxel Coordinate
                this.coordBound( val.coord, val.min, val.max ); // cell Bounding
            }
            return result;
        };

        return { [Symbol.iterator]() { return { next }; } };
    }

    // #endregion
}