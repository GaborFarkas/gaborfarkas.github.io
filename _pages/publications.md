---
layout: page
permalink: /publications/
title: publications
description: Publications in reversed chronological order.
years: [2019, 2018, 2017, 2016, 2015]
---

{% for y in page.years %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

<p><a href="https://orcid.org/0000-0002-9871-3556" target="_blank">ORCID</a>, <a href="https://vm.mtmt.hu//search/slist.php?nwi=1&amp;inited=1&amp;ty_on=1&amp;url_on=1&amp;cite_type=2&amp;orderby=3D1a&amp;location=mtmt&amp;stn=1&amp;AuthorID=10054694" target="_blank">MTMT</a></p>

