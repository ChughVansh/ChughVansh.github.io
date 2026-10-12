---
layout: single
permalink: /music/
title: "Music"
description: "Performances and music by Vansh Chugh, who releases under the name 1shh: videos and clips."
---
What is the language of languages?

In no particular order,

1. Love
2. Music
3. Math

MIR combines the last two. Some of these snippets combine the first two!

<h2>Some singing snippets</h2>
<p>Some stories from <a href="https://www.instagram.com/_.vansh_chugh._/" rel="noopener">my account</a>. Feel free to check the highlights for similar content!</p>
<div class="clips">
  {% for clip in site.data.music.clips %}{% include clip.html clip=clip %}{% endfor %}
</div>
<p><a class="button" href="https://www.instagram.com/_.vansh_chugh._/" rel="noopener">See more on Instagram</a></p>

{% if site.data.music.performances.size > 0 %}
<h2>Select Performances</h2>
{% for piece in site.data.music.performances %}
<article class="entry">
  <h3 class="entry__title">{{ piece.title }}</h3>
  <p class="entry__meta">{% if piece.composer %}By {{ piece.composer }}. {% endif %}{% if piece.event %}Part of {{ piece.event }}. {% endif %}{% if piece.group %}With the {{ piece.group }}. {% endif %}{% if piece.venue %}{{ piece.venue }}. {% endif %}{% if piece.year %}{{ piece.year }}.{% endif %}</p>
  {% if piece.role %}<p class="entry__meta">Role: {{ piece.role }}.</p>{% endif %}
  {% if piece.note %}<p>{{ piece.note }}</p>{% endif %}
  {% if piece.setlist %}
  <ol class="setlist">
    {% for song in piece.setlist %}
    {% if song.start %}
      {% assign parts = song.start | split: ":" %}
      {% assign seconds = parts[0] | times: 60 | plus: parts[1] %}
    {% endif %}
    <li>
      {% if piece.link %}<a href="{{ piece.link }}{% if song.start %}&amp;t={{ seconds }}s{% endif %}" rel="noopener">{{ song.title }}</a>{% else %}{{ song.title }}{% endif %}{% if song.artist %}, {{ song.artist }}{% endif %}{% if song.year %} ({{ song.year }}){% endif %}.{% if song.role %} {{ song.role }}.{% endif %}{% if song.start %}{% endif %}
    </li>
    {% endfor %}
  </ol>
  {% endif %}
  {% if piece.youtube %}
  <div class="media media--landscape">
    <iframe class="media__frame" src="https://www.youtube-nocookie.com/embed/{{ piece.youtube }}" title="{{ piece.youtube_title | default: piece.title }}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
  {% endif %}
  {% if piece.clips %}
  <div class="clips">
    {% for clip in piece.clips %}{% include clip.html clip=clip %}{% endfor %}
  </div>
  {% endif %}
  {% if piece.link %}
  <ul class="entry__links">
    <li><a href="{{ piece.link }}" rel="noopener">{{ piece.link_label | default: "More about this" }}</a></li>
  </ul>
  {% endif %}
</article>
{% endfor %}
{% endif %}

<h2>YouTube</h2>
{% for video in site.data.music.videos %}
<div class="media media--landscape">
  <iframe class="media__frame" src="https://www.youtube-nocookie.com/embed/{{ video.youtube }}" title="{{ video.title }}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
{% if video.note %}<p>{{ video.note }}</p>{% endif %}
{% endfor %}