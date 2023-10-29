import useThreeWebGL2, { THREE }    from './lib/useThreeWebGL2.js';
import usePostEffects               from './lib/usePostEffects.js';
import useDarkScene                 from './lib/useDarkScene.js';

import BoxBorderMaterial            from './lib/material/BoxBorderMaterial.js';

export default class App{
    // #region MAIN
    constructor( props={} ){
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        props = Object.assign( {
            postEffects : false,
        }, props );

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if( !props.postEffects ){
            this.three = useDarkScene( useThreeWebGL2( { colorMode:true }) );
            
        }else{
            this.three = useDarkScene( usePostEffects( useThreeWebGL2( { colorMode:true }) ) );
            addEffects( this.three );
        }

        this.renderLoop = this.three.createRenderLoop( this.onPreRender );

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.three.sphericalLook( 40, 20, 25 );

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        const geo  = new THREE.BoxGeometry( 1, 1, 1 ); 
        let mesh   = new THREE.Mesh( geo, BoxBorderMaterial() );
        this.three.scene.add( mesh );

    }

    onPreRender = ( dt, et )=>{};
    // #endregion

}


// #region POSTEFFECT
import UnrealBloomPass from 'postprocess/UnrealBloomPass.js';
import OutputPass      from 'postprocess/OutputPass.js';
function addEffects( tjs ){
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // tjs.composer.renderToScreen = false;
    tjs.renderer.toneMapping         = THREE.ReinhardToneMapping;
    tjs.renderer.toneMappingExposure = Math.pow( 1, 4.0 );
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const res           = tjs.getRenderSize();
    const bloomPass     = new UnrealBloomPass( new THREE.Vector2( res[0], res[1] ) );
    bloomPass.threshold = 0;
    bloomPass.strength  = 0.5;
    bloomPass.radius    = 0.1;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const outputPass    = new OutputPass();

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    tjs.composer.addPass( bloomPass );
    tjs.composer.addPass( outputPass );
}
// #endregion