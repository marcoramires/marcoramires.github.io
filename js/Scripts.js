$(document).ready(function () {
    var $window = $(window);
    var src = $('.page-image').attr('src');
    var $image = $('.backstretch');

    $(".backstrech").backstretch(src);
    $('.transition-background').fadeIn(100);
    $('.transition-background .logo').addClass('animated rotateIn infinite');

    setTimeout(function(){
        $(".backstrech").backstretch(src);
        $('.content').fadeIn(300,function(){
            $('.transition-background').fadeOut(100);
        });
    },1000);

    function ajaxPageTransition(linkLocation, successfulFunction, failedFunction){
        $('.transition-background').fadeIn(100, function () {
            $('.content').fadeOut(300);
        });

        setTimeout(function(){
            $.get(linkLocation, function (response) {
                if(response){
                    console.log('Success - ' + linkLocation);
                }
            }).done(function (response, textStatus, jqXHR) {
                if(successfulFunction){
                    successfulFunction(response);
                    $("a.transition").click(function(event){
                        var linkLocation = this.href;
                        addListener(event, linkLocation);
                    });
                }

            }).fail(function (jqXHR, textStatus, errorThrown) {
                if(failedFunction) {
                    failedFunction();
                }
            }).always(function () {
                setTimeout(function(){
                    src = $('.page-image').attr('src');
                    $(".backstrech").backstretch(src);
                    $('.content').fadeIn(300,function(){
                        $('.transition-background').fadeOut(100);
                    });
                },1000);
            });
        }, 500);
    }

    function addListener(event, linkLocation){
        event.preventDefault();
        var successfulFunc = function (data) {
            var source = $('<div>' + data + '</div>');
            var title = source.find('title').html();
            var image = source.find('.page-image').attr('src');

            $('.content').html(source.find('.content').html());
            $(document).prop('title', title);

            if (typeof(window.history.pushState) == 'function') {
                window.history.pushState(null, title, linkLocation);
            } else {
                window.location.hash = '#!' + linkLocation;
            }
        }
        var failedFunc = function (data) {
            //TODO
        }
        ajaxPageTransition(linkLocation, successfulFunc, failedFunc);
    }

    $("a.transition").click(function(event){
        var linkLocation = this.href;
        addListener(event, linkLocation);
    });

    /* ========  Nice Scroll on Articles  =======*/
    $window.on('scroll', function () {
        var top = $window.scrollTop();

        if (top < 0 || top > 1500) return;
        $image
            .css('transform', 'translate3d(0px, ' + top / 3 + 'px, 0px)')
            .css('opacity', 1 - Math.max(top / 500, 0));
    });
    $window.trigger('scroll');
});