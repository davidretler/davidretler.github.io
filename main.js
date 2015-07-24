/*
 * Runs when the document is finished rendering. Toggles the sidebar selection to
 * defualt and dynamically sizes the content
 */

$(document).ready(function(){
    $('#content_panel').load('./about.html');
    $('.active').toggleClass("active");
    $('#about').toggleClass("active");
    resize();
});

/*
 * Code to change content when menubar item is clicked
 */

$( "#about" ).click(function() {
    $('#content_panel').load('./about.html');
    $('.active').toggleClass("active");
    $('#about').toggleClass("active");
});
$( "#projects" ).click(function() {
    $('#content_panel').load('./projects.html');
    $('.active').toggleClass("active");
    $('#projects').toggleClass("active");
});

/*
 * Comand to run when window is resized, or first created
 * Dynamically adjusts content based on screen size
 */
function resize()
{
    $(".sidebar").height($(document).height() - $(".sidebar").offset().top);
    if($(window).width() < 800 + $(".content").offset().left) {
        $(".content").width($(window).width() - $(".content").offset().left);
    }
    else {
        $(".content").width(800);
    }


}
$(window).on('resize',function(){
    resize();
});
