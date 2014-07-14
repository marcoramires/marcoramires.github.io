$(document).ready(function () {
    var src = $('.page-image').attr('src');
    $("#HomeBackground").backstretch(src);
    $("#Side").backstretch(src);

    var $window = $(window);
    var $image = $('.backstretch');

    $window.on('scroll', function () {
        var top = $window.scrollTop();

        if (top < 0 || top > 1500) return;
        $image
            .css('transform', 'translate3d(0px, ' + top / 3 + 'px, 0px)')
            .css('opacity', 1 - Math.max(top / 500, 0));
    });
    $window.trigger('scroll');
});