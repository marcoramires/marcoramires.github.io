
$( document ).ready(function() {
    var src = $('.page-image').attr('src');
    $("#HomeBackground").backstretch(src);
    $("#Side").backstretch(src);
});

function LoadComments(){
    var comments = document.getElementById('comments');
    var button = document.getElementById('commentsButton');
    $(comments).removeClass('hidden');
    $(button).addClass('hidden');
}