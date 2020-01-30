## Summary

This is a web widget which will connect to the Dash Insight server and
monitor for transactions to addresses specified in an HTML page.

## Usage

In an HTML page, add this to the `<head>`:
```html
<script src="https://seigler.github.io/monitor-dash-address/index.js"></script>
<link rel="stylesheet" href="https://seigler.github.io/monitor-dash-address/styles.css">
```

...and add this in the page where you want an address to be monitored:
```html
<div data-dash-address-watch="XmGw5qrhtJcmp3qebCDg9aLZH4ugraeakx"></div>
```

You may prefer to save these JS and CSS files and host them locally instead,
which should work fine. You can also omit the stylesheet and style the component
yourself. The structure is:

```html
<div data-dash-address-watch="XmGw5qrhtJcmp3qebCDg9aLZH4ugraeakx">
  <div class="dash-address-watch-label">XmGw5qrhtJcmp3qebCDg9aLZH4ugraeakx</div>
  <div class="dash-address-watch-status">Watching...</div>
  <div class="dash-address-watch-log"></div>
</div>
```

## [Demo](https://seigler.github.io/monitor-dash-address/)
