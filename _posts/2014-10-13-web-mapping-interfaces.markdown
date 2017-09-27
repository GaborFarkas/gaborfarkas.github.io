---
layout: post
title: Web mapping interfaces
date: 2014-10-13
description: "When you start to develop your web GIS application, the first consideration will be the the interface you wish to work with. There is a wide range of open source GUIs. There are a lot of similarities in them, like they are written in JavaScript (the library which you will use to publish your maps if not the whole software), they use similar sets of values, they use similar methods to reach servers or handle geospatial data. There are lot of comparisons between various GUIs, but in reality there isn't such a thing like best and worst interfaces. Well, maybe there are worse ones, but I won't write about all of them. I will show some of the most popular ones, without attempting to be comprehensive. This post will be a prelude to using these interfaces, showing general considerations and methods to use them."
comments: true
---
When you start to develop your web GIS application, the first consideration will be the the interface you wish to work with. There is a wide range of open source GUIs. There are a lot of similarities in them, like they are written in JavaScript (the library which you will use to publish your maps if not the whole software), they use similar sets of values, they use similar methods to reach servers or handle geospatial data. There are lot of comparisons between various GUIs, but in reality there isn’t such a thing like best and worst interfaces. Well, maybe there are worse ones, but I won’t write about all of them. I will show some of the most popular ones, without attempting to be comprehensive. This post will be a prelude to using these interfaces, showing general considerations and methods to use them.

### Major GUIs on the web

As mentioned above, there is a wide range of mapping interfaces available. As they are JavaScript libraries, they are free to utilize, but there are major restrictions in some of them. For example the market leader GIS developer company, ESRI has an [online interface](https://developers.arcgis.com/javascript/) to use with their maps. However it is a closed source software, so I won’t deal with it (it’s also a great tool). Google Maps API has similar issues. It’s not only closed source, it can only be used with Google Maps. Although it’s a great and free platform, the lack of styling options makes it repetitive and boring.

Open source mapping libraries are usually harder to use. They require more coding to make and style your maps, but in return, they provide a huge freedom in controlling them. The most popular interfaces are OpenLayers, Leaflet, GeoExt and MapBox. MapBox is technically a Leaflet plugin, therefore I’m not planning to cover its usage (if you can use Leaflet, you can surely use MapBox, too).

### Getting the code

Mapping libraries basically come with two major files. One of them is the initializing script, the other is the stylesheet. Some of them include a request for the stylesheet in the script file, like OpenLayers 2. If this is the case, you don’t have to include it individually, but remember, if you change library, you might get an error because of a missing stylesheet.

There are two ways to include an interface in your project. The first one is to use a hosted version of the library. It will take extra requests to the hosting site and you will depend on it’s uptime. It will be slower, but you don’t have to care about updating the code, because it will be automatically the freshest one. The second one is to make a physical copy of the library, so you can run it from your server. It is the way a major project goes. You don’t have to worry about the hosting server, however you have to update the code at times, if you wish to use a new feature.

If you want or have to store a library on your hard disk, there are some utilities available for you. First of all, you have to check the installation options on your preferred frameworks page. Most of these open source libraries are available on GitHub, therefore you can download it via the command line application `git`. There is a chance, your preferred library is packed with some method, like Leaflet is packed with Node.js. In this case, you have to obtain the required packaging software and install the library.

After you have a library, you have to include it in your project. This can be done in the `<head>` and the `<body>` section, however it is better to include in the `<head>`, because when your browser gets to your map code, the library has been already processed and can be accessed. For including your library stored on your hard disk, you can use absolute or relative path. Let’s see some examples. Assume, that your project is in the **/var/www** folder, while your library is in the **/var/www/lib/leaflet** folder, called **leaflet.js**.

``` html
<script type="text/javascript" src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js" ></script>
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />

<script type="text/javascript" src="/var/www/lib/leaflet/leaflet.js" ></script>
<link rel="stylesheet" href="/var/www/lib/leaflet/leaflet.css" />

<script type="text/javascript" src="./lib/leaflet/leaflet.js" ></script>
<link rel="stylesheet" href="./lib/leaflet/leaflet.css" />
```

These are three different approaches to include your library in your project. In the first one, you access it from a hosting site. In the second and third examples the library is on your hard disk and you access it with absolute and relative paths.

### Installing Leaflet

GitHub is a Version Control System (VCS), a server designed to handle software source codes, which are in production. It tracks the different versions the software has while in development. GitHub has a Linux command line utility, `git`, which can be used to clone GitHub repositories to your hard disk. It isn’t provided in a default Linux setup, so you have to download it, if you haven’t configured your Linux setup as a web server. You can install `git` with the following code in root:

Debian:

``` bash
apt-get install git
```

Fedora:

``` bash
yum install git
```

The [Git Documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) recommends some other packages which `git` can depend on, however just to download repositories, you only need the basic package. If you have the tool, you just have to use `git clone` to download the library. Note that you have to replace “http://” with “git://” and have to include a “.git” extension after the URI. For example to download Leaflet to a folder named “Leaflet” (in your working directory), you have to type the following command:

``` bash
git clone git://github.com/Leaflet/Leaflet.git Leaflet
```

As Leaflet is packaged with Node.js, you have to install it, and use its command line application `npm`. Node.js is a downloadable library and you can install it from source code with the `make` command. You have to download the source package from the Node.js download page, unpack the “tar.gz” file, cd to the “node-vx” folder, finally, install the package with `make`. If you can’t compile the package with `make`, you have to install the `gcc` C compiler and `g++` C++ compiler (the package is named “gcc-c++” on Fedora 20).

``` bash
tar -zxvf node-v0.10.32.tar.gz
cd node-v0.10.32/
make
make install
```

Alternatively you can follow the directions in the Node.js GitHub page, but you will need the curl package for that. After you have installed Node.js, you can install the leaflet library with the npm command (as root). Npm installs all the dependencies of the target package, concatenates, and compresses it . You can bypass this step, however it is not recommended. You have to run `npm` in the downloaded Leaflet directory.

``` bash
npm install -g jake
npm install
jake build
```

For the sake of completeness, Leaflet is packed with Jake, part of the Node.js project. It resembles the Linux package `make`, but it is written in JavaScript. When you run the first line, you install `jake` globally (-g), so next time if you encounter a jake-compressed library, you can type `jake build` directly to install the source code. The compressed output file will be at **Leaflet/dist/leaflet.js**. If you want to download other libraries, first always consult the library’s home page. For example OpenLayers 3 can be downloaded from the OpenLayers 3 release page.

### What GUI should I go with?

This is a very important consideration.None of the mapping frameworks are perfect, so they have advantages and disadvantages as well. Leaflet is outstanding in its small and fast code, easy to use API, and smooth style. It is a lightweight GUI, which supports retina displays (Apple smartphone standard), too. On the other hand, it has a very limited set of functions. If you have to use advanced functions, you will have to get them from 3rd party plugins.

OpenLayers is a more complex library, integrating a wide set of functions in a very thought out way. It is more stable (no plugins), and have the ability to build a simple GIS applications with it. On the other hand, it is bigger, slower, requires more time to learn its usage, and takes more time to configure and implement.

These are the regularly compared libraries, however there are a more of them out there. GeoExt is described as OpenLayers 2 + glue. It’s nice, easy to use, doesn’t lack in functions. Mapstraction technically is a translator, which can translate the same code to different libraries. For example, if you want to change between Leaflet and OpenLayers rapidly, with Mapstraction you just have to change the included libraries and the Mapstraction provider ID (openlayers, leaflet, nokia, etc.). The rest of the code remains the same.

### Other considerations

The only thing left is to think through, what other frameworks you want to work with. Pure JavaScript, CSS and HTML or a PHP server is a way to go, but there are other libraries which you can use to make a nice webpage around your map. You can use Dojo, jQuery, Backbone.js, AngularJS or Ember.js, just to mention a few of them. You have to look up the best for you. The most important question is the usefulness. Is it enough for you to accomplish your goal easier? The next question is the aspect of time. Do you know how to use the framework? Is your project big and complicated enough to learn to use it? Will the learning period pay off in time? The last question is the speed and size. Is your server enough to serve a page with a framework using shiny widgets? Do you need style or speed better? If you answer all of these questions, you can start to look for other frameworks to use. They can ease your life, but there are a lot of them, and you have to choose one which can fully serve your needs.

For further details, please read the following resources:

L. Hsu - R. Obe: [Integrating PostGIS in Web Applications](https://www.slideshare.net/pgconf/integrating-postgis-in-web-applications), 2010.

A. Santiago: [The OpenLayers fallen and Leaflet arise… sure???](http://www.acuriousanimal.com/blog/2013/05/05/the-problem-with-openlayers/), 2013.

StackExchange Contributors: [How do various JavaScript mapping libraries compare?](https://gis.stackexchange.com/questions/8032/comparing-various-javascript-mapping-libraries), 2011.

