
$( document ).ready(function() {
    var src = $('.page-image').attr('src');
    $("#HomeBackground").backstretch(src);
    $("#Side").backstretch(src);
});

function LoadComments(){

    var mainContainerWidth = document.getElementById('Main').offsetWidth - 50;
    var button = document.getElementById('commentsButton');

    gapi.comments.render('comments', {
        href: window.location,
        width: mainContainerWidth,
        first_party_property: 'BLOGGER',
        view_type: 'FILTERED_POSTMOD'
    });

    $(button).addClass('hidden');
}