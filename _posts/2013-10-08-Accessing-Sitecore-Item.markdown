---
layout: post
title:  "Accessing an Item in Sitecore"
date:   2013-10-08 23:25:00
category: sitecore
image: /img/3755454491_5b5aee8af7_o.jpg
image-author: Peter Rosbjerg
image-license: http://www.flickr.com/photos/peterrosbjerg/3755454491/
---

Sitecore API provides different ways to access items in C#.

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

It's also quite common to use a "dictionary" static class to provide the
Ids using the [System Guid Structure](http://msdn.microsoft.com/en-us/library/system.guid.aspx).

{% highlight c# %}
public static class SitecoreItemGuids
    {
        public static readonly Guid SiteRootId = new Guid("{067B8FA1-D83F-4620-9EFC-971B504B85E5}");
        public static readonly Guid TemplateItemId = new Guid("{7477DB70-3305-4191-B870-BE1C8C35FDDF}");
    }
{% endhighlight%}
Using the Item ID from the static class:
{% highlight c# %}
protected void Page_Load(object sender, EventArgs e)
{
    Item item = Context.Database.GetItem(SitecoreItemGuids.SiteRootId);
    Item itemTwo = Context.Database.GetItem(ID.Parse(SitecoreItemGuids.TemplateItemId);
}
{% endhighlight%}


**Tech Links:**

*   [Sitecore](http://www.sitecore.net/)
*   [Sitecore CMS API](http://sdn.sitecore.net/reference/sitecore%206/sitecore_6_api_reference.aspx)
