---
layout: post
title: "Upgrading Jekyll"
date: "2020-04-08 17:54:00 +0200"
---

When I authored last post about the Raspberry Pi as AP I was notified by GitHub bot that dependencies of my Saxuality blog should be upgraded. So I tried new approach to builing Jekyll site locally and used Docker image for it - <https://github.com/envygeeks/jekyll-docker>.

I had version 3.4 and it was quite easy to build it using:

    docker run --rm \
        -v "c:/saxuality:/srv/jekyll" \
        -it jekyll/builder:3.4 \
        jekyll build

Then I upgraded dependencies:

    docker run --rm \
        -v "c:/saxuality:/srv/jekyll" -v jekyll-bundles:/usr/local/bundle \
        -it jekyll/builder:3.8 \
        bundle update

And built the blog:

    docker run --rm \
        -v "c:/saxuality:/srv/jekyll" -v jekyll-bundles:/usr/local/bundle \
        -it jekyll/builder:3.8 \
        jekyll build

Smooth! Once with it let's serve the blog locally - navigate to <http://localhost:4000/saxuality/>:

    docker run --rm \
        -v "c:/saxuality:/srv/jekyll" -v jekyll-bundles:/usr/local/bundle \
        -p 4000:4000 -p 35729:35729 \
        -it jekyll/builder:3.8 \
        jekyll serve --livereload --watch --force_polling
