// in the future can prob do : <script type="importmap" src="/import-map.json"></script>
const prepend = ( document.location.hostname.indexOf( 'localhost' ) === -1 )? '/kaykit_halloween' : '';

document.body.appendChild(Object.assign(document.createElement('script'), {
type		: 'importmap',
innerHTML	: `
    {"imports":{
        "three"             : "${prepend}/thirdparty/three.module.js",
        "OrbitControls"	    : "${prepend}/thirdparty/OrbitControls.js",
        "TransformControls"	: "${prepend}/thirdparty/TransformControls.js",
        "gl-matrix"         : "${prepend}/thirdparty/gl-matrix/index.js",
        "postprocess/"      : "${prepend}/thirdparty/threePostProcess/",
        "tp/"               : "${prepend}/thirdparty/"
    }}
`}));