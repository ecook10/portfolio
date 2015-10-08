$(document).ready(function() {
    
    var activeQuery = "#" + $('#activeId').val();
    $(activeQuery).addClass("active");

    //Color menu items on hover... I hate this and there has to be a better way
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
        if (!$(this).hasClass("active")) {
            $(this).css("color", "black");
        }
    });

    $(activeQuery).trigger("mouseenter");


    $('#showAddForm').click(overlayActive);
    
    $('#cancel').click(function(event) {
        event.preventDefault();
        $('.overlay').css("display", "none");
        $('.overlay').removeClass("active");
    });

    $('.delete').click(function() {
        //Send DELETE request to server
        $.ajax({
            url: './deleteentry',
            type: 'DELETE',
            data: {id: this.id}
        })
            .done(function() {
                window.location.replace("./");
            });
    });

    $('#links a').click(scrollToHeading);

    $('#content-left').scroll(trackScroll);
});


function overlayActive() {
    
    //Show Add Form
    $('.overlay').css("display", "");
    
    //Handle click outside of div
    $(document).click(function(event) {
        
        //Checks that click is not inside overlay div
        if (!$(event.target).parents('#addForm, .mce-container').length) {

            //Accounts for clicking 'Add Form' link removing overlay
            if (!$(event.target).is($('#showAddForm'))) {
                console.log(event.target);
                //console.log($('#addForm, #mceu_31, #mceu_32, #mecu_37'));
                $('.overlay').css("display", "none");
                $('.overlay').removeClass("active");
            }
        }
    });

    $('.overlay').addClass("active");
}

function scrollToHeading(event) {
    event.preventDefault();
    
    var classes = $(event.target).attr("class").split(" ");
    var contentTarget = '#' + classes[0];

    //Only change active class if link not already active
    if (classes.length == 1) {
        $('.active').removeClass("active");
        $(event.target).addClass("active");
        $(contentTarget).addClass("active");
    }

    var toScroll = $(contentTarget).position().top - $('#content-left').offset().top + 
        $('#content-left').scrollTop();

    $('#content-left').scrollTop(toScroll); 
}

//If div is scrolled to an h2 in content, activate link with class
function trackScroll() {
    var scroll = $('#content-left').scrollTop();
    $('#content-left h2').each(function() {
        var pos = Math.round($(this).position().top - $('#content-left').offset().top);

        if (pos < 10 && pos > -10 && !$(this).hasClass('active')) {
            console.log("change active thingy");
            $('.active').removeClass("active");
            $("." + $(this).attr('id')).addClass("active");
            $(this).addClass("active");
        }
    });
}

