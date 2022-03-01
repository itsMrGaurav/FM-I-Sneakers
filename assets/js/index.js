const LG_SCR = 992;
const MD_SCR = 768;
const SM_SCR = 480;


// cart related action handlers

let numOfDiffItemsInCart = 0;
let totalNumOfItemsInCart = 0

// navbar-cart hide and show
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

// handle product count increase or decrease
$('.pa-count-sub').click(function (e) { 
    e.preventDefault();
    const target = $('.pa-count-value');
    let count = parseInt(target.text());
    if (count > 1){
        target.text(`${--count}`);
    }
});

$('.pa-count-add').click(function (e) { 
    e.preventDefault();
    const target = $('.pa-count-value');
    let count = parseInt(target.text());
    target.text(`${++count}`);
});

// add to cart btn handler

$('.atc-btn').click(function (e) { 
    e.preventDefault();
    
    // show/update tooltip
    const ptCount = $('.pa-count-value').text();
    totalNumOfItemsInCart += parseInt(ptCount);
    $('.ca-item-count').text(`${totalNumOfItemsInCart}`);
    $('.ca-tooltip').css('display', "block");    

    // add products
    numOfDiffItemsInCart++;
    if (numOfDiffItemsInCart > 1){
        $('.ca-contents').prepend($('.ca-content').slice(0,1).clone());
    }

    // get product thumbnail and details
    const ptImg = (($('.pt-img').attr('src')).slice(0,-4))+'-thumbnail.jpg';
    let ptTitle = '';
    if ($(window).width() >= SM_SCR){
        ptTitle = $('.pt-title').text();
    } else {
        ptTitle = $('.pt-title').text().slice(0, 20) + '...';
    }
    const ptPrice = $('.pt-discount-price').text();
    const total = parseInt(ptCount) * parseFloat(ptPrice.slice(1,)); 

    // set product details
    $('.ca-content-img').slice(0,1).attr('src', ptImg);
    $('.ca-pt-title').slice(0,1).text(ptTitle);
    $('.ca-pt-price').slice(0,1).text(`${ptPrice}x${ptCount}`);
    $('.ca-pt-tprice').slice(0,1).text('$' + total.toFixed(2));



    // hide empty cart
    $('.ca-empty').css('display', 'none');
    $('.ca-contents').css('display', 'grid');

});

// delete from cart action
$('.ca-contents').on('click', '.ca-del-icon', function (e) { 
    e.preventDefault();
    numOfDiffItemsInCart--;
    if (numOfDiffItemsInCart == 0){
        // hide contents section
        $('.ca-contents').fadeOut(function(){            
            // show cart empty message
            $('.ca-empty').css('display', 'block');
        });


        // hide tooltip and update it value
        $('.ca-tooltip').css('display', 'none');
        totalNumOfItemsInCart = 0;
    } else {
        $(this).parent().fadeOut().remove();
        const removedItems = ($(this).siblings('.ca-content-info').children('.ca-pt-price').text().split('x'))[1];
        totalNumOfItemsInCart -= parseInt(removedItems);
        $('.ca-item-count').text(totalNumOfItemsInCart);
    } 
});

// sm-menu related action handlers

// sm-menu show
$('.nav-toggler-icon').click(function (e) { 
    $('div#sm-navbar').css('height', $(document).height());
    const windowWidth = $(window).width();
    if (windowWidth < SM_SCR){
        e.preventDefault();
        $('div#sm-navbar').animate({
            width: '100%',
            display: "show"
        }, 500, function(){
            $(this).css('display', "block");
            $(this).css('width', "100%");
        });
    }
});

// sm-menu hide
$('.sm-navbar-cancel').click(function (e) { 
    e.preventDefault();
    $('div#sm-navbar').animate({
        width: 'toggle'
    }, 500, function(){
        $(this).css('width', "0");
    });
});


// carousel related action handlers

// show carousel
$('.pt-img').click(function (e) { 
    e.preventDefault();
    const imgNum = $(this).attr('data-img-id');
    const carousel = $('.pt-carousel-outer');
    carousel.css('height', $(document).height());
    $('.cr-pt-img').each(function() {
        if ($(this).attr('data-img-id') == imgNum){
            $('.ct-cr-item').removeClass('active');
            $(this).parent().addClass('active');
        }
    })
    if ($(window).width()>= LG_SCR) {
        carousel.fadeIn();
    }
});

// hide carousel
$('.cr-cancel-btn').click(function (e) { 
    e.preventDefault();
    $('.pt-carousel-outer').fadeOut();
});



// product thumbnail related action handlers

// thumbnail-hover effects

$('.th-img, .cr-th-img').hover(function () {
        // over
        if ($(this).hasClass('th-img')){
            $('.th-img').each(() => {
                if (!($(this).parent().hasClass('th-div-active'))){
                    $(this).removeClass('th-img-active');
                }
            });
        } else {
            $('.cr-th-img').each(() => {
                if (!($(this).parent().hasClass('th-div-active'))){
                    $(this).removeClass('th-img-active');
                }
            });
        }
        if (!($(this).parent().hasClass('th-div-active'))){
            $(this).addClass('th-img-active');
        }

    }, function () {
        // out
        if (!($(this).parent().hasClass('th-div-active'))){
            $(this).removeClass('th-img-active');
        }
    }
);

// thumbnail click handler
$('.th-img, .cr-th-img').click(function (e) { 
    e.preventDefault();

    // load desired image
    const imgNum = $(this).attr('data-img-id');
    const path = `assets/images/image-product-${imgNum}.jpg`
    if ($(this).hasClass('th-img')){
        $('.pt-img').attr('src', path);
        $('.pt-img').attr('data-img-id', imgNum);
        $('.th-div').removeClass('th-div-active');
        $('.th-img').removeClass('th-img-active');
    } else {
        $('.ct-cr-item').removeClass('active');
        $('.cr-th-div').removeClass('th-div-active');
        $('.cr-th-img').removeClass('th-img-active');
        $('.cr-pt-img').each(function() {
            if ($(this).attr('data-img-id') == imgNum){
                $(this).parent().addClass('active');
            }
        })
    }

    // activate desired thumbnail
    $(this).addClass('th-img-active');
    $(this).parent().addClass('th-div-active');
});