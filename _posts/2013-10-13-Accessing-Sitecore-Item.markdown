---
layout: post
title:  "Accessing an Item in Sitecore"
date:   2013-10-13 01:00:00
category: sitecore
image: /img/3755454491_5b5aee8af7_o.jpg
image-author: Peter Rosbjerg
image-license: http://www.flickr.com/photos/peterrosbjerg/3755454491/
---

Brief Description about Sitecore API...

{% highlight c# %}
protected void Page_Load(object sender, EventArgs e)
{
    Sitecore.Data.Database master = Sitecore.Configuration.Factory.GetDatabase("master");
    Item item = master.GetItem("/sitecore/content/item name");
    //or
    Sitecore.Data.Database context = Sitecore.Context.Database;
    Item item = context.GetItem("/sitecore/content/item name");
    //or
    Item item = Context.Database.GetItem("/sitecore/content/item name");
    //or
    Item item = Context.Database.GetItem(ID.Parse("{11111111-1111-1111-1111111111111111"});
}
{% endhighlight %}


**Tech Links:**

*   [Sitecore](http://www.sitecore.net/)
