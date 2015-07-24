/*
 * Runs when the document is finished rendering. Toggles the sidebar selection to
 * defualt and dynamically sizes the content
 */
$(document).ready(function(){
    //$('#content_panel').load('/about.html');   //load the about me
    resize();

    $(".item>.sublist").hide();                 //hide all submenus
    $('.active').toggleClass("active");         //turn off all active buttons

    //load content based on hash
    var id = window.location.hash;
    //if the ID'd element exists and `id` isn't blank, set it active
    if(!( $(id) == [] ) && !( id == "" ))
    {
        //if the content linked to supports direct loading
        if($(id).hasClass("direct_sidebar"))
        {
            $(id).click();
        }
    }
    //if no content to load defualt to about
    else {
        $("#about").click();
    }

});

/*
 * Code to change content when menubar item is clicked
 */
$( "#about" ).click(function() {
    $('#content_panel').load('/about.html');
    setActive($("#about"));
    window.location.hash = "#about";
});
$( "#projects" ).click(function() {
    $('#content_panel').load('/projects.html');
    setActive($("#projects"));
    window.location.hash = "#projects";
});

/*
 * Open Resume in new window
 */
$("#resume").click(function() {
    var win = window.open('/content/Resume/david_etler.pdf', '_blank');
    if(win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //if popups are blocked, just open the resume here
        window.location.href = '/content/Resume/david_etler.pdf';
    }
});

/*
 * Sets the specified element as active, and deactivates all others
 */
function setActive(element)
{
    //if the selected element isn't already active
    if(!element.hasClass("active"))
    {
        $('.active').toggleClass("active"); //turn off all active elements
        element.toggleClass("active");      //set the current element to active
        $('.item>.sublist').slideUp();         //hide all the sublists
        element.find('.sublist').slideDown();
    }
}

/*
 * Comand to run when window is resized, or first created
 * Dynamically adjusts content based on screen size
 */
function resize()
{
    //sidebar always takes up height of document, and a little more as buffer (doesn't matter, won't scroll)
    $(".sidebar").height($(document).height() - $(".sidebar").offset().top + 10);
    //sidebar width is constant
    $(".sidebar").width(220);
    $(".content").offset({top: 0, left: 255});

    //for smaller devices, have content take up screen
    if($(window).width() < 1028) {
        //content takes up everything minus sidebar and sum arbitrary but necessary padding
        $(".content").outerWidth($(window).width() - $(".sidebar").outerWidth() -100);
    }
    //for larger devices, limit content to 800px
    else {
        $(".content").width(800);
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
