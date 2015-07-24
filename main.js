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
    $('#content_panel').load('/about.html');
    $('.active').toggleClass("active");
    $('#about').toggleClass("active");
});
$( "#projects" ).click(function() {
    $('#content_panel').load('/projects.html');
    $('.active').toggleClass("active");
    $('#projects').toggleClass("active");
});

/*
 * Download resume rather than displaying
 */
$('#resume').click(function() {
    var win = window.open('/content/Resume/david_etler.pdf', '_blank');
    if(win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Broswer has blocked it
        alert('Please allow popups for this site');
    }
});

/*
 * Comand to run when window is resized, or first created
 * Dynamically adjusts content based on screen size
 */
function resize()
{
    $(".sidebar").height($(document).height() - $(".sidebar").offset().top);
    //for smaller devices, have content take up screen
    if($(window).width() < 1028) {
        $(".sidebar").width(180);
        $(".content").outerWidth($(window).width() - $(".sidebar").outerWidth() -100);
    }
    //for larger devices, limit content to 800px
    else {
        $(".content").width(800);
        $(".sidebar").width(220);
    }

    //if the content panel is too tall, extend the sidebar for the entire document
    if($(document).height() > $(window).height()) {
        $(".sidebar").height($(".content").height());
    }
    //otherwise set the length to the screen length (can't use else in case previous expression made the document smaller)
    if ($('.content').height() < $(window).height()) {
        $(".sidebar").height($(window).height() - $(".sidebar").offset().top);
    }


}
$(window).on('resize',function(){
    resize();
});
