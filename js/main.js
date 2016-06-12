
$(document).ready(function(){
  
    /*
    * Set bindings for items in div.content
    */
    function setContentBindings() {
      //link to projects
      $(".content a#projects").click(function(){
        $("#my-navbar li a#projects").click();
      });
    }
 
    /*
    * Fades the div out, loads new content, and fades back in
    */
    function fadeAndLoad(content_url) {
      
       
       $( ".content" ).fadeOut(300, function(){
           $( ".content" ).load(content_url, function(){
               $( ".content" ).fadeIn(300);
               setContentBindings();
           });
       });
    }
 
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
      }
    }
 
    /*
     * Code to change content when menubar item is clicked (load internal content)
     */
      $("#my-navbar li a.internal").click(function() {
        //if the element clicked is not an external link
        if($(this).attr("id") != [])
        {
            //if the element is not already active
            if( ! $(this).hasClass("active")   ) {

                //load the content (should be an HTML file in root directory with name being `the id`.html)
                fadeAndLoad("./" + $(this).attr("id") + ".html");

                //set the item as the active item
                setActive($(this).parent());
                //update the window hash and title, based on the id and name
                window.location.hash = "#" + $(this).attr("id");
                document.title = $(this).text() + " – David Etler";

            }
        }
    });
    
     /*
     * Open Resume in new window
     */
    $("#my-navbar li a#resume").click(function() {
        var win = window.open('./content/Resume/david_etler.pdf', '_blank');
        if(win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //if popups are blocked, just open the resume here
            window.location.href = 'content/Resume/david_etler.pdf';
        }
    });
    
    $(document).click(function (event) {
      
        var clickover = $(event.target);
        var _opened = $("#my-navbar li a#about").is(":visible") && $("button.navbar-toggle").is(":visible");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });
    
    $('.nav a').click(function(){
      // close the menu once an item has been chosen, only if in mobile mode and open
      if($("button.navbar-toggle").is(":visible") && $("#my-navbar li a#about").is(":visible")) {
        setTimeout( function() {$('.navbar-collapse').collapse('hide');}, 600);
      }
    });

    
    // Initialize the document
    
    $('.active').toggleClass("active");         //turn off all active buttons

    //load content based on hash
    var id = window.location.hash;
    //if the ID'd element exists and `id` isn't blank, set it active
    if(!( $(id) == [] ) && $(id).hasClass("internal"))
    {
        $(id).click();
    }
    //if no content to load default to about
    else {
        $("#about").click();
    }
    
});