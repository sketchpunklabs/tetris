import { DirectionalLight, AmbientLight, GridHelper } from 'three';

export default function useDarkScene( tjs ){
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Light
    const light = new DirectionalLight( 0xffffff, 0.8 );
    light.position.set( 5, 10, -5 );
    tjs.scene.add( light );
    
    tjs.scene.add( new AmbientLight( 0xa0a0a0 ) );
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Floor
    const gridSize = 10;
    const cellSize = 4;
    tjs.scene.add( new GridHelper( gridSize*cellSize, gridSize, 0x4f4f4f, 0x404040 ) );

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Renderer
    // tjs.renderer.setClearColor( 0x3a3a3a, 1 );
    return tjs;
};