$(document).ready(function() {
    
    //Color menu items on hover
    $('#about').mouseenter(function() {
        $(this).css("color", "blue");
    });
    $('#projects').mouseenter(function() {
        $(this).css("color", "green");
    });
    $('#contact').mouseenter(function() {
        $(this).css("color", "yellow");
    });
    $('#blog').mouseenter(function() {
        $(this).css("color", "purple");
    });
    $('#navbar a').mouseleave(function() {
        $(this).css("color", "black");
    });

});
