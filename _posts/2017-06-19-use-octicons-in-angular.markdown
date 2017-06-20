---
layout: default
title: Use octicons in Angular
date: '2017-06-19T16:28:00.001+02:00'
author: Libor Nenadál
tags:
modified_time: '2017-06-19T16:28:42.777+02:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-2151064012529803476
blogger_orig_url: http://saxuality.blogspot.com/2017/06/use-octicons-in-angular.html
---

[Octicons](https://octicons.github.com/) are GitHub's SVG icons. How can you use
them in Angular?

First install octicons using yarn or NPM:

```
yarn add octicons
```

or

```
npm install octicons --save
```

Then you can just go to `node_modules/octicons/build/svg`, find the icon you need
and copy&paste its content to your template (whole `<svg>` tag).

Simple solution but you when octicons are updated you would have to repeat the
copy&paste again. It is better to import the definition.

You can import the package to your `*.ts` file and use innerHTML binding:

```typescript
import octicons from 'octicons';

const calendarIcon = octicons.calendar.toSVG();
```

That gives you SVG element as string. But wait - when you bind it to the
template, nothing is shown:

```HTML
<div [innerHTML]="calendarIcon">
```

It is because SVG is sanitized by default and you have to explicitly mark it as
secure:

```typescript
export class MyComponent implements OnInit {

  public calendarIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.calendarIcon = this.sanitizer.bypassSecurityTrustHtml(
      octicons.calendar.toSVG()
    );
  }

}
```

Or you can create a pipe for this as shown on [StackOverflow](https://stackoverflow.com/a/39858064/121261).
