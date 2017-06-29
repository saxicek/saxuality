---
layout: post
title: "Swagger API generator for Angular"
date: "2017-06-29 07:39:55 +0200"
---

I have a [Swagger](http://swagger.io/) API definition and need API client
generator for Angular. Following are notable projects I evaluated.

1. [Swagger Codegen](http://swagger.io/swagger-codegen/)

  Official Swagger project for client generation. Supports many languages,
  Angular is one of them (typescript-angular2).

  Pros:
  - Output is customizable with Mustache templates
  - Files can be ignored using `.swagger-codegen-ignore` Files

  Cons:
  - You need to compile yourself the not yet released version 2.3.0 to get
    file naming as per Angular [style guide](https://angular.io/guide/styleguide).
  - It generates API module with non-standard method `forConfig` where
    `forRoot` should be used. It is tracked as
    [issue #5608](https://github.com/swagger-api/swagger-codegen/issues/5608)
    though.
  - Maven project. NPM package would better fit the Angualr ecosystem.

2. [angular2-swagger-apiclient-generator](https://github.com/mike4263/angular2-swagger-client-generator)

  Inspired by Swagger Codegen but implemented in JavaScript.

  Pros:
  - NPM package
  - Mustache templates

  Cons:
  - Generates one client that includes all endpoints for all resources. This is
    a showstopper when I have definitions like `resource1/search` and
    `resource2/search` which results in 2 similar API client methods `search()`.

  > Tried this one but note that there are many forks on GitHub from the
    original <https://github.com/zemacik/angular2-swagger-apiclient-generator>.

And that's all - not many to choose from. My recommendation is to use Swagger
Codegen since it seems more mature with better future support.Will try to help
them improve weak areas.
