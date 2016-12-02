---
layout: post
title:  "Express Generator + Gulp"
date:   2015-02-01 14:00:00
category: Node
comments: true
image: /img/16141275429_e976d1dbee_h.jpg
image-author: Olia Gozha
image-license: http://www.flickr.com/photos/90022080@N02/16141275429/
---

I really like the [Express Generator](http://expressjs.com/starter/generator.html) and thought it would be interesting to see how it works with Gulp.

***Git Repository:*** [https://github.com/marcoramires/express-generator-gulp](https://github.com/marcoramires/express-generator-gulp)

Install the generator:

{% highlight php %}
$ npm install express-generator -g
{% endhighlight%}

Display the command options with the -h option:

{% highlight php %}
$ express -h

        Usage: express [options] [dir]

        Options:

          -h, --help          output usage information
          -V, --version       output the version number
          -e, --ejs           add ejs engine support (defaults to jade)
              --hbs           add handlebars engine support
          -H, --hogan         add hogan.js engine support
          -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass) (defaults to plain css)
          -f, --force         force on non-empty directory
{% endhighlight%}

I will keep everything default apart from the template engine. I will use [Handlebars](http://handlebarsjs.com/) for this example.

{% highlight php %}
$ express --hbs --git

        create : .
        create : ./package.json
        create : ./app.js
        create : ./.gitignore
        create : ./public
        create : ./public/javascripts
        create : ./public/images
        create : ./routes
        create : ./routes/index.js
        create : ./routes/users.js
        create : ./public/stylesheets
        create : ./public/stylesheets/style.css
        create : ./views
        create : ./views/index.hbs
        create : ./views/layout.hbs
        create : ./views/error.hbs
        create : ./bin
        create : ./bin/www

        install dependencies:
          $ cd . && npm install

        run the app:
          $ DEBUG=express-generator-gulp-prototype:* ./bin/www
{% endhighlight%}

Then install dependencies:

{% highlight php %}
$ npm install
{% endhighlight%}

Add Gulp and Gulp Nodemon in the solution:

{% highlight php %}
$ npm install gulp gulp-nodemon --save-dev
{% endhighlight%}

Add a Gulpfile.js in the root folder.

Add the dependencies and tasks in the gulp file:

{% highlight javascript %}
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

// express generator
gulp.task('server', function () {
    nodemon({
        script: './bin/www',
        env: { 'NODE_ENV': 'development' },
        nodeArgs: ['--debug']
    });
});

//default
gulp.task('default', ['server'], function() {

});
{% endhighlight%}

Run Gulp:

{% highlight php %}
$ gulp
  [20:41:14] Using gulpfile ~/ExpressGenerator/Gulpfile.js
  [20:41:14] Starting 'server'...
  [20:41:14] Finished 'server' after 1.13 ms
  [20:41:14] Starting 'default'...
  [20:41:14] Finished 'default' after 14 μs
  [gulp] [nodemon] v1.3.6
  [gulp] [nodemon] to restart at any time, enter `rs`
  [gulp] [nodemon] watching: *.*
  [gulp] [nodemon] starting `node --debug ./bin/www`
  debugger listening on port 5858
{% endhighlight%}

View Express Generator Application on localhost:

[http://localhost:3000/](http://localhost:3000/)

**Useful Links:**

*   [Gulp](http://gulpjs.com/)
*   [Express Generator](http://expressjs.com/starter/generator.html)
*   [gulp-nodemon](https://github.com/JacksonGariety/gulp-nodemon)
*   [Handlebars](http://handlebarsjs.com/)
*   [Git Repository](https://github.com/marcoramires/express-generator-gulp)
