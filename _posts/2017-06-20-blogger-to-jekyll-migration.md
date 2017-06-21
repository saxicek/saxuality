---
layout: post
title: Blogger to Jekyll migration
---
I thought this would be a simple task to do initially but things get complicated
as you dig deeper - they always do.

I'm on Windows platform which makes things a bit more difficult. Had to install
Ruby version 2.2 and since I already had 1.9.3 I have to change PATH variable
to use correct version.

I want to publish the blog on GitHub Pages but also be able to build it locally -
another pain since it seems documentation is not always in sync with current
state. Original github-pages changed a bit since initial launch and some docs
don't reflect that. Also GitHub does not use latest Jekyll version as since the
config file changes it poses another problem. So what did I do?

1. Install Jekyll and create new blogger

   It is well [documented](http://jekyllrb.com/docs/quickstart/) and it just
   works.

2. Change dependencies

   Changed `Gemfile` to only include `gem 'github-pages'` to match configuration
   used by GitHub.

   [Dependencies used by Github](https://pages.github.com/versions/)

2. Import from Blogger

   It works as described in [manual](http://import.jekyllrb.com/docs/blogger/).
   The only downside is that it creates posts in HTML format - if you want
   markdown, you have to rewrite it manually.

   [Markdown quick reference](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet),
   [Kramdown reference](https://kramdown.gettalong.org/quickref.html)

3. Play with the theme

   When you import posts from Blogger they all have layout set to post. But this
   layout is supported only by `minima` theme - all other have just `default`
   layout defined. So you have to dig into HTML and create layouts for index
   page and then for posts.

   [Layouts into](https://learn.cloudcannon.com/jekyll/introduction-to-jekyll-layouts/)
