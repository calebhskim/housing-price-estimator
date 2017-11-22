var fs = require('fs');
var maps_api_key = '';
var zillow_key = '';

if (process.argv.length === 4) {
  maps_api_key = process.argv[2];
  zillow_key = process.argv[3];
} else {
  console.log("Usage: ./start [MAPS_API_KEY] [ZWSID]");
  process.exit(1);
}

const template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <link href="//cdn.muicss.com/mui-0.9.27/css/mui.min.css" rel="stylesheet" type="text/css" media="screen" />
    <title>Housing Estimator</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
  </body>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3&key=${maps_api_key}&libraries=geometry,drawing,places"></script>
  <script>
    window.zwsid = "${zillow_key}";
  </script>
  <script type="text/javascript" src="/static/js/bundle.js"></script>
</html>`;

fs.writeFile("./public/index.html", template, function(err) {
    if(err) {
      console.log("Unable to generate template.");
      return console.log(err);
    }
});
