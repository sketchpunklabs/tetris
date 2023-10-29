// #region IMPORTS
// import * as THREE           from 'three';
import { EffectComposer }   from 'postprocess/EffectComposer.js';
import { RenderPass }       from 'postprocess/RenderPass.js';
// #endregion

// #region MAIN
export default function usePostEffects( tjs ){
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // RENDERER
    tjs.renderer.setClearColor( 0x000000, 0 ); // Make the background blank

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // POST EFFECTS
    const composer = new EffectComposer( tjs.renderer );
    composer.renderToScreen = true;

    const renderPass = new RenderPass( tjs.scene, tjs.camera );
    composer.addPass( renderPass );

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // METHODS
    const render = ( onPreRender=null, onPostRender=null ) =>{
        const deltaTime   = tjs.clock.getDelta();
        const ellapseTime = tjs.clock.getElapsedTime();

        if( onPreRender )  onPreRender( deltaTime, ellapseTime );
        
        composer.render();
        
        if( onPostRender ) onPostRender( deltaTime, ellapseTime );
        return tjs;
    };

    const renderLoop = ()=>{
        window.requestAnimationFrame( renderLoop );
        render();
        return tjs;
    };

    const createRenderLoop = ( fnPreRender=null, fnPostRender=null )=>{
        let   reqId = 0;

        const onRender = ()=>{
            render( fnPreRender, fnPostRender );
            reqId = window.requestAnimationFrame( onRender );
        };
        
        return {
            stop    : () => window.cancelAnimationFrame( reqId ),
            start   : () => onRender(),
        };
    };

    const onResize = ( e )=>{ composer.setSize( e.detail.width, e.detail.height ); };

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Replace render controls with one that handles composer
    tjs.render             = render;
    tjs.renderLoop         = renderLoop;
    tjs.createRenderLoop   = createRenderLoop;
    tjs.composer           = composer;

    // Handle resizing the composer
    tjs.events.on( 'resize', onResize );

    // Set size of composer
    const res = tjs.getRenderSize();
    composer.setSize( res[0], res[1] );

    return tjs;
}
// #endregion