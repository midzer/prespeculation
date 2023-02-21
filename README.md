# prespeculation

Prefetch/preload links on hover and prerender on click via Speculation Rules API

## Features

* ultra-tiny (> 1kB gzipped)
* bandwidth-friendly (load on hover)
* memory-friendly (removes event handler gracefully)

## Inspiration

This library is heavily influenced by

* [instant.page](https://github.com/instantpage/instant.page)
* [quicklink](https://github.com/GoogleChromeLabs/quicklink)

## Support

* Chrom* M110+
* Firefox (prefetch only)
* Safari 11.1+ (preload only)
* IE11 (prefetch only, needs Intersection Observer polyfill, untested)
