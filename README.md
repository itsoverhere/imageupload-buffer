# Storing uploaded files as MongoDB buffer types. NodeJS + express + mongoose + hbs

**Photos are saved as buffer types in MongoDB. Buffer types are converted into base64 in the hbs file using this hbs helper:**


`` hbs.handlebars.registerHelper('tobase64', function(buffer) {``
``      return btoa(buffer)``
``})``

_btoa npm page here: https://www.npmjs.com/package/btoa_

**Here's the hbs helper to call tobase64:**

``{{#tobase64 img.data}}{{/tobase64}}``


**The photos are shown as an image in html following this format:**

``data:image/{{img.contentType}};base64,{{#tobase64 img.data}}{{/tobase64}}``

_To learn more about base64 data URI check out this mdn page: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs_



**Also, make sure that you have an uploads folder to temporary store the images while they are being converted into buffer types"




