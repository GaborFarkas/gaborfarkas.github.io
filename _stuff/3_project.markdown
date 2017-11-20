---
layout: page
title: WebGL engine for OpenLayers
description: A basic, but working WebGL-based vector rendering engine.
---

I started to work on a WebGL rendering engine for rendering vector layers in OpenLayers. The main reason behind this is research. As OpenLayers has a nice, clear, and extendable architecture, a full-fledged Canvas renderer, and a skeleton for a WebGL engine, it was trivial to choose this library for a comparison. With a correct implementation, the benefits of choosing a WebGL engine over a hardware-accelerated Canvas for 2D maps could be measured.

There is a pretty application created to support the upcoming paper about this study. Feel free to check it out [here](https://gaborfarkas.github.io/rendering_pub/profile), and try out the renderer. Furthermore, if you find this feature useful, and find a new bug in the engine, you can create an issue about it at the OpenLayers project’s [GitHub page](https://github.com/openlayers/openlayers/issues).

Hungarian presentation about the renderer at the annual conference of the local OSGeo chapter:

<iframe width="100%" height="500px" src="https://www.youtube.com/embed/HoYizFv1kZM">
</iframe>

