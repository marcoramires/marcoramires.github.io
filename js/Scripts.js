$(document).ready(function () {
    $("body").css("display", "none");

    var src = $('.page-image').attr('src');
    $("#HomeBackground").backstretch(src);
    $("#Side").backstretch(src);

    var $window = $(window);
    var $image = $('.backstretch');

    $("body").fadeIn(1000);

    function redirectPage(linkLocation) {
        window.location = linkLocation;
    }
    $("a").click(function(event){
        event.preventDefault();
        var linkLocation = this.href;
        $("body").fadeOut(1000, redirectPage(linkLocation));
    });

    $window.on('scroll', function () {
        var top = $window.scrollTop();

        if (top < 0 || top > 1500) return;
        $image
            .css('transform', 'translate3d(0px, ' + top / 3 + 'px, 0px)')
            .css('opacity', 1 - Math.max(top / 500, 0));
    });
    $window.trigger('scroll');
});