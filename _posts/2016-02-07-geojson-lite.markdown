---
layout: post
title: GeoJSON Lite
date: 2016-02-07
description: "GeoJSON is one of the most widely used vector formats in the web mapping, and WebGIS world. It has a nice, robust way of storing various feature types along with their coordinates, and properties. On the top of that, it can be parsed as an ordinary JSON object, thus JavaScript has a native support for it. This is the format supported by every client side web mapping library (I have come across so far), thus it is the perfect candidate for testing the feature parsing, and rendering performance of them. However, what is the best way of generating random features in arbitrary numbers?"
comments: true
---
GeoJSON is one of the most widely used vector formats in the web mapping, and WebGIS world. It has a nice, robust way of storing various feature types along with their coordinates, and properties. On the top of that, it can be parsed as an ordinary JSON object, thus JavaScript has a native support for it. This is the format supported by every client side web mapping library (I have come across so far), thus it is the perfect candidate for testing the feature parsing, and rendering performance of them. However, what is the best way of generating random features in arbitrary numbers? There were two paths I seriously considered:

- Use an existing client side GeoJSON library. There is the NPM package [geojson](https://www.npmjs.com/package/geojson), which could have been a potential candidate. However, writing a wrapper around it, which have a random generator seemed to be as troublesome as writing a new library for this purpose.
- Generate the features on the server side. There is the Python package [geojson](https://pypi.python.org/pypi/geojson/), which is perfect, as it has a random feature generator. The downside of this path is the involvement of a server. I would rather have a library, which can generate the features on the client side, thus showcasing the results is not bound to a specific server.

By measuring the benefits, and disadvantages of using one of the two methods, I quickly decided to write my own library for this purpose. It is dead simple, small (11.6 KB compiled), and capable of validating GeoJSON objects (based on the official [specs](http://geojson.org/geojson-spec.html)), and generating random ones. As a consequence of its small size, and limited capabilities, it is called [GeoJSON Lite](https://github.com/GaborFarkas/geojson_lite).

### Architectural considerations

#### GeoJSON objects

The first, and most important consideration was about the GeoJSON objects. They should be as lightweight as possible, but still functional. Thus, every GeoJSON constructors store their properties in the constructed objects directly. They have two methods: `isValid`, and `stringify`. However, those methods are stored in their prototype chains, or their parents’ prototype chains.

#### Inheritance

GeoJSON Lite uses the Closure Library style pseudoclassical inheritance model. The child’s prototype gets entirely replaced by the parent’s prototype, and its constructor function gets restored in the end.

``` javascript
//Helper function for maintaining class inheritance. Adapted from goog.inherits, from Google's Closure Library.
gjl.inherits = function (parent, child) {
 var Temp = function () {};
 Temp.prototype = parent.prototype;
 child.prototype = new Temp();
 child.prototype.constructor = child;
};
```

#### Factory constructor

There are two kind of constructors in the library: GeoJSON object constructors, and a factory constructor. The factory constructor is the opposite of the GeoJSON object constructor. It has one purpose: it must generate all kind of valid GeoJSON objects (expect CRS, BBOX, and other misc objects). It can be as bloated as it must be in order to achieve that task. It stores a bunch of parameters, has a bunch of functions on its prototype chain, etc. etc.

#### Node.js

The library uses Node.js, and NPM for compiling, unit testing, and generating API documentation. It uses the Closure Compiler’s advanced compilation algorithm, however it does not use the Closure Library. This comes with some naming conventions. Closure Compiler only exports associative assignments from a native JavaScript code.

Furthermore, there is one method, which uses a browser-only feature. With that, Node.js support is not planned, as the library would break in some circumstances (link validation in a CRS object). It is still possible to load the library in Node.js, however we must come around the *window is not defined* problem. One method is adding a `window` object to the global scope as the global scope:

``` javascript
GLOBAL.window = GLOBAL;
```

#### Development

Developing the library takes some extra hassle, however I think that is the price we can pay for a smooth development process. Every third-party dependency can be installed with Node.js’s package manager NPM. There aren’t much, Closure Compiler for compiling the code, Jasmine for unit testing, and JSDoc 3 for generating documentation. To start development, you just have to clone into the library’s repository, and install the dependencies (assuming you have Node.js, and git installed, and using a Unix system):

``` bash
git clone https://github.com/GaborFarkas/geojson_lite.git
cd geojson_lite/
npm install
```

#### Modifying the code

As in every development process, the key step is modifying, or extending the code. I won’t write any guidelines, or considerations here, they can be found in the project’s page. However, there is one rule, you must follow, if you wouldn’t want Closure Compiler to mess up your part of the code. If you want to export something, you must have a reference to it in an associative way.

``` javascript
//var gjl = {};
//window['gjl'] = gjl;

gjl.myConstructor = function (number) {
    this.number = number;
};
gjl['myConstructor'] = gjl.myConstructor;

//Compiled code will look like something like this (with significantly more "a"-s):
//var a={};window.gjl=a;a.b=function(c){this.d=c;};a.myConstructor=a.b;
```

#### Compiling the code

For compiling the code, you just have to run the utility script **compile.js** in the root folder. It compiles **src/gjl.js** to **build/gjl.js**.

``` bash
node compile.js
```

#### Testing the code

There are two main reasons to run tests: avoiding regressions, and testing new features. I wrote the code with great care, however I cannot guarantee it doesn’t have any hidden bugs. If you modify the code, you can easily uncover one, creating a regression. The easiest way avoiding such unexpected consequences, is running the test suite:

``` bash
npm test
```

It runs Jasmine (specifically jasmine-node) on the spec folder’s content. If you’re extending the original code, Travis CI will take care of testing, however if you’re doing local modifications, you should run the test suite after compiling the code. Creating additional tests for newly implemented features are also useful. You can read about creating tests with Jasmine [here](http://2ality.com/2011/10/jasmine.html).

The next post will give some practical advices for using GeoJSON Lite. Until then, here are some useful links related to the project:

- [GeoJSON Lite on GitHub](https://github.com/GaborFarkas/geojson_lite)
- [GeoJSON Lite on NPM](https://www.npmjs.com/package/geojson_lite)
- [GeoJSON Lite API Documentation](https://gaborfarkas.github.io/geojson_lite/v1.0.1/api/)

