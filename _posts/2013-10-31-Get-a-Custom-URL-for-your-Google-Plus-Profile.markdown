---
layout: post
title:  "Get a Custom URL for your Google Plus Profile"
date:   2013-10-31 21:00:00
category: Web Development
image: /img/2667190038_1cf5185ff6_o.jpg
image-author: Bill Selak
image-license: http://www.flickr.com/photos/billselak/2667190038
---

Google started testing custom URLs about a year ago, August 2012 ti me more precise. Although, it became available for Google Staff member only which was quite frustrating for us users/publishers
to share our non-friendly Google Plus profile URL.

The company started notifying individuals and brands with verified accounts that it could be possible again. Now it'’s finally available! :)

You have to meet the eligibility criteria for Google to prepare your custom URL. Google will then send you an invitation email to finally roll to new URL.

Before:

* [https://plus.google.com/104134544059399238057](https://plus.google.com/104134544059399238057)

After:

* [https://plus.google.com/+MarcoRamires](https://plus.google.com/+MarcoRamires)
* [http://google.com/+MarcoRamires](http://google.com/+MarcoRamires)

The Process:

* Create a Page on your Google Plus Profile with the desired name.
* On the Page's Dashboard - Add your website.
* On the Page's About section click on "Link Website" button.
* This will give you the html tags to add in your website.

  {% highlight php %}
    <a href="https://plus.google.com/11223344556677889900" rel="publisher">Google+</a>
    <!-- This can be a link tag in the header -->
    <link href=”https://plus.google.com/11223344556677889900” rel=”publisher”>
  {% endhighlight%}

* Once it's verified, Google will start the process.
* You can now delete the page you've created and wait for the invitation email.

I am pretty sure Google is still working on the custom URL process like many other things in the last couple of weeks.

This may work or not. It's still up in the air what Google has to offer for publishers.

I personally like their job with the comments tool as well as the web author verifier.

Well, It worked for me. I hope it helps ;)

**Useful Links:**

*   [http://www.techwalls.com/set-custom-url-google-plus-profile](http://www.techwalls.com/set-custom-url-google-plus-profile/)
*   [http://thenextweb.com/google/2013/10/29/google-starts-offering-custom-urls-accounts-30-days-old-10-followers-profile-photo](http://thenextweb.com/google/2013/10/29/google-starts-offering-custom-urls-accounts-30-days-old-10-followers-profile-photo/)
*   [http://www.virante.org/blog/2013/06/14/relauthor-or-relpublisher-which-should-i-use](http://www.virante.org/blog/2013/06/14/relauthor-or-relpublisher-which-should-i-use)