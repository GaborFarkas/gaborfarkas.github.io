(function(h){var b={};h.gjl=b;b.o=function(a,b){function d(){}d.prototype=a.prototype;b.prototype=new d;b.prototype.constructor=b};b.aa=function(a,c){return"Feature"===a.type||"FeatureCollection"===a.type?b.j.m.prototype.v.call(a,c):b.b.h.prototype.v.call(a,c)};b.validateGeoJSON=b.aa;b.I=function(){};b.o(Object,b.I);b.I.prototype.a=function(){return JSON.stringify(this)};b.I.prototype.stringify=b.I.prototype.a;b.b={};b.geom=b.b;b.b.h=function(){};b.o(b.I,b.b.h);b.b.h.prototype.v=function(a){var c=
b.a.h(this);if(0===c.code)return!0;a&&b.g.i(c);return!1};b.b.h.prototype.isValid=b.b.h.prototype.v;b.b.w=function(a){var c=b.a.w(a);0<c.code&&b.g.i(c);this.coordinates=a;this.type="Point"};b.o(b.b.h,b.b.w);b.b.Point=b.b.w;b.b.F=function(a){var c=b.a.F(a);0<c.code&&b.g.i(c);this.coordinates=a;this.type="MultiPoint"};b.o(b.b.h,b.b.F);b.b.MultiPoint=b.b.F;b.b.C=function(a){var c=b.a.C(a);0<c.code&&b.g.i(c);this.coordinates=a;this.type="LineString"};b.o(b.b.h,b.b.C);b.b.LineString=b.b.C;b.b.D=function(a){var c=
b.a.D(a);0<c.code&&b.g.i(c);this.coordinates=a;this.type="MultiLineString"};b.o(b.b.h,b.b.D);b.b.MultiLineString=b.b.D;b.b.G=function(a){var c=b.a.G(a);0<c.code&&b.g.i(c);this.coordinates=a;this.type="Polygon"};b.o(b.b.h,b.b.G);b.b.Polygon=b.b.G;b.b.L=function(a){var c=b.a.L(a);0<c.code&&b.g.i(c);this.coordinates=a;this.type="MultiPolygon"};b.o(b.b.h,b.b.L);b.b.MultiPolygon=b.b.L;b.b.O=function(a){"[object Array]"!==Object.prototype.toString.call(a)&&b.g.i({c:a,code:1});var c;this.geometries=[];for(var d=
0;d<a.length;++d)a[d]instanceof b.b.h?(a[d].v(!0),this.geometries.push(a[d])):(c=b.a.h(a[d]),0<c.code?b.g.i(c):this.geometries.push(a[d]));this.type="GeometryCollection";b.f.R(this)};b.o(b.b.h,b.b.O);b.b.GeometryCollection=b.b.O;b.j={};b.feat=b.j;b.j.m=function(a,c){var d={code:0};this.properties=this.geometry=null;a instanceof b.b.h?(a.v(!0),this.geometry=a):a&&(d=b.a.h(a),0<d.code&&b.g.i(d),this.geometry=a);c&&(d=b.a.P(c),0<d.code&&b.g.i(d),this.properties=c);this.type="Feature";b.f.R(this)};b.o(b.I,
b.j.m);b.j.Feature=b.j.m;b.j.m.prototype.v=function(a){if("Feature"!==this.type&&"FeatureCollection"!==this.type)return a&&b.g.i({c:this.type,code:7}),!1;var c=b.a[this.type](this);return 0<c.code?(a&&b.g.i(c),!1):!0};b.j.m.prototype.isValid=b.j.m.prototype.v;b.j.K=function(a){"[object Array]"!==Object.prototype.toString.call(a)&&b.g.i({c:a,code:1});var c;this.features=[];for(var d=0;d<a.length;++d)a[d]instanceof b.j.m?(a[d].v(!0),this.features.push(a[d])):(c=b.a.m(a[d]),0<c.code?b.g.i(c):this.features.push(a[d]));
this.type="FeatureCollection";b.f.R(this)};b.o(b.j.m,b.j.K);b.j.FeatureCollection=b.j.K;b.a={};b.a.w=function(a){if("[object Array]"!==Object.prototype.toString.call(a))return{c:a,code:1};for(var b=0;b<a.length;++b)if("number"!==typeof a[b])return{c:a[b],code:2};return 2>a.length?{c:a,code:12}:{code:0}};b.a.Point=b.a.w;b.a.F=function(a,c){if("[object Array]"!==Object.prototype.toString.call(a))return{c:a,code:1};for(var d={code:0},e=0;0===d.code&&e<a.length;)d=b.a.w(a[e]),++e;if(0<d.code)return d;
if(c)for(e=0;e<a[0].length;++e)a[0][e]!==a[a.length-1][e]&&(d={c:a,code:18});return d};b.a.MultiPoint=b.a.F;b.a.C=b.a.F;b.a.LineString=b.a.C;b.a.D=function(a,c){if("[object Array]"!==Object.prototype.toString.call(a))return{c:a,code:1};for(var d={code:0},e=0;0===d.code&&e<a.length;)d=b.a.C(a[e],c),++e;return d};b.a.MultiLineString=b.a.D;b.a.G=function(a){return b.a.D(a,!0)};b.a.Polygon=b.a.G;b.a.L=function(a){if("[object Array]"!==Object.prototype.toString.call(a))return{c:a,code:1};for(var c={code:0},
d=0;0===c.code&&d<a.length;)c=b.a.G(a[d]),++d;return c};b.a.MultiPolygon=b.a.L;b.a.O=function(a){if("[object Array]"!==Object.prototype.toString.call(a.geometries))return{c:a.geometries,code:1};for(var c={code:0},d=0;d<a.geometries.length;++d)if(c=b.a.h(a.geometries[d]),0<c.code)return c;a.bbox&&(c=b.a.J(a.bbox,b.f.N(b.f.H(a))));return c};b.a.h=function(a){var c={code:0};if(!(a.type||a.geometries&&a.coordinates))return{c:a,code:6};c=b.f.B(a);c=b.a.S(a,c);return 0<c.code?c:"GeometryCollection"===a.type&&
a.geometries?b.a.O(a):"Point"!==a.type&&"MultiPoint"!==a.type&&"LineString"!==a.type&&"MultiLineString"!==a.type&&"Polygon"!==a.type&&"MultiPolygon"!==a.type?{c:a.type,code:5}:a.coordinates?(c=b.a[a.type](a.coordinates),0===c.code&&a.bbox?b.a.J(a.bbox,b.f.N(a.coordinates)):c):{c:a,code:6}};b.a.K=function(a){var c={code:0};if("FeatureCollection"!==a.type)return{c:a.type,code:7};if("[object Array]"!==Object.prototype.toString.call(a.features))return{c:a.features,code:1};c=b.f.B(a);c=b.a.S(a,c);if(0<
c.code)return c;for(var d=0;d<a.features.length;++d)if(c=b.a.m(a.features[d]),0<c.code)return c;a.bbox&&(c=b.a.J(a.bbox,b.f.N(b.f.H(a))));return c};b.a.FeatureCollection=b.a.K;b.a.m=function(a){var c={code:0};if(null!==a.geometry&&"[object Object]"!==Object.prototype.toString.call(a.geometry))return{c:a.geometry,code:11};if(a.geometry&&(c=b.a.h(a.geometry),0<c.code))return c;if(null!==a.properties&&"[object Object]"!==Object.prototype.toString.call(a.properties))return{c:a.properties,code:11};if(a.properties&&
(c=b.a.P(a.properties),0<c.code))return c;c=b.f.B(a);c=b.a.S(a,c);if(0<c.code)return c;a.bbox&&(c=b.a.J(a.bbox,a.geometry?b.f.N(b.f.H(a.geometry)):0));return c};b.a.Feature=b.a.m;b.a.P=function(a){if("[object Object]"!==Object.prototype.toString.call(a))return{c:a,code:9};for(var b in a){var d=typeof a[b];if("string"!==d&&"number"!==d&&"boolean"!==d&&null!==a[b])return{c:a[b],code:10}}return{code:0}};b.a.J=function(a,c){var d=b.a.w(a);return 0===d.code&&a.length!==2*c?{c:a,code:8}:d};b.a.S=function(a,
c){return 1<c.l?{code:13}:1!==c.l||a.crs?1===c.l&&a.crs?b.a.W(a.crs):{code:0}:{c:c.s,code:14}};b.a.W=function(a){var b={c:a,code:15};return a.type?"name"===a.type?a.properties&&"string"===typeof a.properties.name?{code:0}:b:"link"===a.type?a.properties&&"string"===typeof a.properties.href?(b=document.createElement("a"),b.href=a.properties.href,b.protocol&&b.host?{code:0}:{c:a.properties.href,code:17}):b:{c:a.type,code:16}:b};b.a.M=function(a){var c;if(a.vertices&&("number"!==typeof a.vertices||0!==
a.vertices%1))return{c:a.vertices,code:3};if(a.stride&&("number"!==typeof a.stride||2>a.stride||0!==a.stride%1))return{c:a.stride,code:4};if(a.type&&"Point"!==a.type&&"LineString"!==a.type&&"Polygon"!==a.type)return{c:a.type,code:5};if(a.numProp&&a.propSample){if("number"!==typeof a.numProp||0!==a.numProp%1)return{c:a.numProp,code:3};c=b.a.P(a.propSample);if(0<c.code)return c;c=0;for(var d in a.propSample)c++;if(c!==a.numProp)return{code:20}}else if(a.numProp){if("number"!==typeof a.numProp||0!==
a.numProp%1)return{c:a.numProp,code:3}}else if(a.propSample)return{c:"number of properties",code:19};return c=a.bbox?b.a.J(a.bbox,a.stride):{code:0}};b.g={};b.g.i=function(a){switch(a.code){default:throw new TypeError(JSON.stringify(a.code)+" is an invalid error code.");case 1:throw new TypeError(JSON.stringify(a.c)+" is not an array.");case 2:throw new TypeError(JSON.stringify(a.c)+" is not a number.");case 3:throw new TypeError(JSON.stringify(a.c)+" must be an integer.");case 4:throw new TypeError(JSON.stringify(a.c)+
" must be an integer, and greater than two.");case 5:throw new TypeError(JSON.stringify(a.c)+" is an invalid geometry type. For the random factory the supported types are Point, LineString, and Polygon.");case 6:throw new TypeError("Invalid GeoJSON: "+JSON.stringify(a.c)+".");case 7:throw new TypeError(JSON.stringify(a.c)+" is an invalid feature type.");case 8:throw new RangeError("Array "+JSON.stringify(a.c)+" has wrong number of members.");case 9:throw new TypeError(JSON.stringify(a.c)+" is not an object.");
case 10:throw new TypeError(JSON.stringify(a.c)+" is not a primitive.");case 11:throw new TypeError(JSON.stringify(a.c)+" must be null, or an object.");case 12:throw Error("Invalid coordinate array: "+JSON.stringify(a.c)+". There must be at least two coordinates in a position, and four in a bounding box.");case 13:throw Error("There are more than one CRS definitions in the GeoJSON.");case 14:throw Error("CRS "+JSON.stringify(a.c)+" must be on the top level.");case 15:throw new TypeError("Invalid CRS: "+
JSON.stringify(a.c)+".");case 16:throw new TypeError(JSON.stringify(a.c)+" is an invalid CRS type. Valid types are name, and link.");case 17:throw new SyntaxError(JSON.stringify(a.c)+" must be a dereferenceable URI.");case 18:throw new SyntaxError(JSON.stringify(a.c)+" must be a LinearRing (it must be closed).");case 19:throw Error("Missing "+JSON.stringify(a.c)+".");case 20:throw Error("Sample of properties must contain members equal to number of properties.");}};b.u=function(a){var c=a||{};c.type=
c.type||"Point";c.vertices=c.vertices||5;c.stride=c.stride||2;c.numProp=c.numProp||0;a=b.a.M(c);0<a.code&&b.g.i(a);c.bbox=c.bbox||b.random.Y(c.stride);c.propSample=c.propSample||b.random.V(c.propNum);a=b.a.M(c);0<a.code&&b.g.i(a);a=null;this.f=function(){return c};this.setVertices=this.o=function(a){if(a||0===a){var e=b.a.M({vertices:a});0<e.code&&b.g.i(e);c.vertices=a}};this.setProperties=this.j=function(a,e){if(a||0===a){var f=b.a.M({numProp:a,propSample:e});if(20===f.code&&a||0===a)e=b.random.V(a);
0<f.code&&20!==f.code&&b.g.i(f);c.numProp=a;c.propSample=e}}};b.RandomFactory=b.u;b.u.prototype.b=function(){var a=this.f(),c="LineString"===a.type?1:"Polygon"===a.type?2:null,d;"Point"===a.type?d=b.random.U(a.stride,a.bbox):(d=b.random.X(c,a.vertices,a.bbox),2===c&&d[0].push(d[0][0]));return new b.b[a.type](d)};b.u.prototype.generateGeometry=b.u.prototype.b;b.u.prototype.a=function(){var a=this.f(),c=this.b(),d=null;a.numProp&&(d=b.random.Z(a.propSample));return new b.j.m(c,d)};b.u.prototype.generateFeature=
b.u.prototype.a;b.u.prototype.g=function(a){var c=b.a.M({vertices:a});0<c.code&&b.g.i(c);for(var c=[],d=0;d<a;++d)c.push(this.a());return new b.j.K(c)};b.u.prototype.generateFeatures=b.u.prototype.g;b.random={};b.random.U=function(a,b){var d=[];d.push(parseFloat((Math.random()*(b[a]-b[0])+b[0]).toFixed(6)));d.push(parseFloat((Math.random()*(b[a+1]-b[1])+b[1]).toFixed(6)));for(var e=2;e<a;++e)d.push(parseFloat((Math.random()*(b[a+e]-b[e])+b[e]).toFixed(6)));return d};b.random.Y=function(a){for(var c=
b.A.T.slice(0,2),d=2;d<2*a;++d)2>d%a?c.push(b.A.T[d%a+2]):c.push(b.A.ca[Math.floor(d/a)]);return c};b.random.X=function(a,c,d){for(var e=[],f=1,g=0;g<c;++g)e.push(b.random.U(d.length/2,d));for(;f<a;)e=[e],++f;return e};b.random.V=function(a){for(var c={},d=0;d<a;++d)c[Math.random().toString(36).substr(2,3)]=b.A.ba[d%4];return c=0===Object.getOwnPropertyNames(c).length?null:c};b.random.Z=function(a){var c={},d;for(d in a)c[d]=b.random.$(a[d]);return c};b.random.$=function(a){var b;null===a?b=null:
"boolean"===typeof a?b=0===Math.round(Math.random())?!1:!0:"string"===typeof a?b=Math.random().toString(36).substr(2,a.length):"number"===typeof a&&(a=Math.floor(Math.log(a)/Math.LN10),b=Math.floor(Math.random()*(Math.pow(10,a+1)-Math.pow(10,a))+Math.pow(10,a)));return b};b.A={};b.A.T=[-180,-90,180,90];b.A.ca=[-10994,8848];b.A.ba=["abc",123,!0,null];b.f={};b.f.N=function(a){return"[object Array]"===Object.prototype.toString.call(a[0])?b.f.N(a[0]):a.length};b.f.H=function(a){if("GeometryCollection"===
a.type)return b.f.H(a.geometries[0]);if("Feature"===a.type)return a.geometry?b.f.H(a.geometry):[];if("FeatureCollection"===a.type){for(var c=0;c<a.features.length;++c){var d=b.f.H(a.features[c]);if(0<d.length)break}return d}return a.coordinates};b.f.B=function(a,c){var d={l:0},e;a.crs&&(d.l++,d.s=a.crs,c&&delete a.crs);if("GeometryCollection"===a.type)for(var f=0;f<a.geometries.length;++f)e=b.f.B(a.geometries[f],c),d.l+=e.l,e.s&&(d.s=e.s);else if("Feature"===a.type&&a.geometry)e=b.f.B(a.geometry,
c),d.l+=e.l,e.s&&(d.s=e.s);else if("FeatureCollection"===a.type)for(f=0;f<a.features.length;++f)e=b.f.B(a.features[f],c),d.l+=e.l,e.s&&(d.s=e.s);return d};b.f.R=function(a){var c=b.f.B(a,!0);0<c.l&&(a.crs=c.s)}})(window);