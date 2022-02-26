
// navbar section


// navbar - cart hide and show
$('.nav-cart').hover(function () {
        // over
        $('.cart-active').animate({
            display: "show"
        }, 150, function(){
            $(this).css("display", "block");
        });  
    }, function () {
        // out
        $('.cart-active').animate({
            display: "hide"
        }, 150, function(){
            $(this).css("display", "none");
        });  
    }
);

