---
layout: single
permalink: /
title: "About"
description: "Vansh Chugh: audio and machine learning research, projects, and music."
---
Hello!!

I'm Vansh Chugh. I am currently a fourth-year undergraduate student at Knox College, where I am majoring in Data Science and minoring in Mathematics and Popular Music Studies. Because of my experiences as a self-taught artist, I enjoy developing and democratizing technologies that assist musicians. My works span audio effects representation learning, real-time human–AI music co-creation, prompt-based music recommendation systems, deployed optical music recognition web apps, and democratization of MIR research.

**I am currently applying for PhD applications for Fall 2027.**

I really enjoy telling stories through my music, especially ones that are catered to a specific audience (more on the music page!). I have composed and performed several [15+ minute performance pieces](https://youtu.be/tGkx_-2FDhs). I have also released some music under a pseudonym. My [best performing single](https://www.youtube.com/watch?v=V1yAOLLeyXg) reached over 10k+ views in a week! More performances and snippets across instruments and venues can be found on the [Music page](/music/). Enjoy!

<div id="chord-viz" data-chord-viz></div>
<p class="note"><a href="https://www.youtube.com/shorts/N94jI1qEDAg" rel="noopener" aria-label="Inspiration: Every note secretly contains a chord, by MichaelsMusicMind">Inspiration</a></p>

{% if site.data.updates.size > 0 %}
<h2>Updates</h2>
<ul class="updates">
  {% for u in site.data.updates %}
  <li class="updates__item">
    <time class="updates__date" datetime="{{ u.date | date: '%Y-%m-%d' }}">{{ u.date | date: "%B %-d, %Y" }}</time>
    {{ u.text }}{% if u.url %} <a href="{{ u.url }}" rel="noopener">Link</a>{% endif %}
  </li>
  {% endfor %}
</ul>
{% else %}
<!-- TODO(content): Updates go in _data/updates.yml. The section appears when there is one. -->
{% endif %}

<script type="module" src="/assets/js/chord-viz/mount.js"></script>
