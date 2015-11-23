function init() {
    document.removeEventListener('DOMContentLoaded', init);
    var fill = new ol.style.Fill({
       color: 'rgba(255,255,255,0.4)'
     });
     var stroke = new ol.style.Stroke({
       color: '#3399CC',
       width: 1.25
     });
     var styles = [
       new ol.style.Style({
         image: new ol.style.Circle({
           fill: fill,
           stroke: stroke,
           radius: 5
         }),
         fill: fill,
         stroke: stroke
       })
     ];
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                name: 'OpenStreetMap'
            }),
            new ol.layer.Image({
                source: new ol.source.ImageVector({
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON({
                            defaultDataProjection: 'EPSG:4326'
                        }),
                        url: '../res/world_countries.geojson'
                    }),
                    attributions: [
                        new ol.Attribution({
                            html: 'World Countries © Natural Earth'
                        })
                    ],
                    style: styles
                }),
                name: 'World Countries'
            })
        ],
        controls: [],
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        }),
        renderer: 'webgl'
    });
    var clippedLayer = new ol.layer.Tile({
        source: new ol.source.MapQuest({
            layer: 'osm'
        }),
        zIndex: 9999
    });

    var fragmentShaderSource = [
        'precision mediump float;',
        'void main() {',
        '}'
    ].join('');
    var vertexShaderSource = [
        'attribute vec2 a_position;',
        'uniform vec2 u_resolution;',
        'void main() {',
        '    vec2 pixelPos = a_position / u_resolution * 2.0 - 1.0;',
        '    gl_Position = vec4(pixelPos * vec2(1, -1), 0, 1);',
        '}'
    ].join('');

    clippedLayer.on('precompose', function (evt) {
        var context = evt.glContext;
        var gl = context.getGL();
        var program = gl.createProgram();
    
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        gl.attachShader(program, vertexShader);
    
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        gl.attachShader(program, fragmentShader);
    
        gl.linkProgram(program);
        context.useProgram(program);
        
        var resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        gl.uniform2f(resolutionLocation, context.A.width, context.A.height);
        var positionLocation = gl.getAttribLocation(program, 'a_position');
    
        gl.enable(gl.STENCIL_TEST);
        gl.colorMask(false, false, false, false);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        gl.stencilFunc(gl.ALWAYS, 1, 255);
    
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          20, 20, 120, 20, 20, 120, 120, 120
        ]), gl.STATIC_DRAW);
    
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.deleteBuffer(buffer);
    
        gl.colorMask(true, true, true, true);
        gl.stencilFunc(gl.NOTEQUAL, 0, 255);
    });

    clippedLayer.on('postcompose', function (evt) {
        var context = evt.glContext;
        var gl = context.getGL();
        gl.disable(gl.STENCIL_TEST);
    });
    clippedLayer.setMap(map);
    hljs.initHighlightingOnLoad();
}
document.addEventListener('DOMContentLoaded', init);