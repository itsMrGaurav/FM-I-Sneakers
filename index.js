
// cart-actions

// store the number of total items
let itemsInCart = 0;

const ptThumbDivs = [$('.pt-th-1'), $('.pt-th-2'), $('.pt-th-3'), $('.pt-th-4')];
const crProductDivs = [$('.ct-cr-item-1'), $('.ct-cr-item-2'), $('.ct-cr-item-3'), $('.ct-cr-item-4')];
const crPtThumbDivs = [$('.cr-pt-th-1'), $('.cr-pt-th-2'), $('.cr-pt-th-3'), $('.cr-pt-th-4')];


// display the cart-active popup
$('.ct-nav-item-cart:nth-child(1)').hover(function () {
        // over
        $('.cart-active').css('display', 'block');
        $('path[fill="#69707d"]').css('fill', '#000')
    }, function () {
        // out
        $('.cart-active').css('display', 'none');
        $('path[fill="#69707d"]').css('fill', '#69707d')
    }
);


$('.atc-btn').click(function (e) { 
    e.preventDefault();
    
    // get num of items to add and display msg
    const productCount = parseInt($('.pt-count-value').text()) + itemsInCart;
    $('.ca-tooltip').css('display', 'block');
    $('.ca-item-count').text(productCount);

    // update for total count
    itemsInCart = productCount;

    // add items into cart-active popup
    $('.ca-empty').css('display', 'none');

    // update cart active contents
    const productImg = $('.th-img-1').attr('src');
    const productTitle = $('.pt-title').text();
    const productPrice = $('.pt-discount-price').text();
    $('.ca-content-img').attr('src', `${productImg}`);
    $('.ca-pt-title').text(productTitle);
    $('.ca-pt-price').text(`${productPrice}x${productCount}`);
    const productTotalPrice = productCount * parseInt(productPrice.slice(1,));
    $('.ca-pt-tprice').text('$' + productTotalPrice.toFixed(2));
    $('.ca-contents').css('display', 'block');
});

// product-img-actions

$('.pt-img').click(function (e) { 
    e.preventDefault();
    let body = document.body, html = document.documentElement;
    let docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );    
    $('.pt-carousel-outer').css('height', docHeight);
    const imgNum = parseInt($(this).attr('src').charAt(28));

    for (let i = 1; i < 5; i++) {
        $(`.ct-cr-item-${i}`).removeClass('active');        
    }
    
    // update carousel thumbnails
    crPtThumbDivs.forEach((ele, id) => {
        ele.removeClass('th-div-active');
        ele.children().removeClass('th-img-active');
    })
    const activeDiv = crPtThumbDivs[imgNum-1];
    activeDiv.addClass('th-div-active');
    activeDiv.children().addClass('th-img-active');    

    // show proper carousel image
    $(`.ct-cr-item-${imgNum}`).addClass('active');
    $('.pt-carousel-outer').css('display', 'block');

});


// product-thumbnail-actions

$('.pt-thumbnails div').click(function (e) {
    e.preventDefault();
    ptThumbDivs.forEach((ele,id) => {
        ele.removeClass('th-div-active');
        ele.children().removeClass('th-img-active');
        if (ele[0] === this) {
            $('.pt-img').attr('src', `assets/images/image-product-${id+1}.jpg`);
        }
    });
    $(this).addClass('th-div-active');
    $(this).children().addClass('th-img-active');    
});

$('.cr-pt-thumbnails div').click(function (e) {
    e.preventDefault();
    
    crPtThumbDivs.forEach((ele, id) => {
        ele.removeClass('th-div-active');
        ele.children().removeClass('th-img-active');
        if (ele[0] === this) {
            $('.carousel-item').removeClass('active');
            $(`.ct-cr-item-${id+1}`).addClass('active');
        }
    })
    $(this).addClass('th-div-active');
    $(this).children().addClass('th-img-active');    
});

// carousel next and prev button hover effects
$('.cr-prev-btn').hover(function () {
        // over
        $('.cr-prev-btn-icon').css('color', '#ff7d1a');
    }, function () {
        // out
        $('.cr-prev-btn-icon').css('color', '#000');
    }
);

$('.cr-next-btn').hover(function () {
        // over
        $('.cr-next-btn-icon').css('color', '#ff7d1a');
    }, function () {
        // out
        $('.cr-next-btn-icon').css('color', '#000');
    }
);




$('.cr-prev-btn').click(function (e) { 
    e.preventDefault();
    crPtThumbDivs.forEach(ele => {
        ele.removeClass('th-div-active');
        ele.children().removeClass('th-img-active');
    })
    for (let i = 0; i < 4; i++ ) {
        const ele = crProductDivs[i];
        if (ele.hasClass('active')){
            if (i === 0) {                
                crPtThumbDivs[3].addClass('th-div-active');
                crPtThumbDivs[3].children().addClass('th-img-active');            
            } else {
                crPtThumbDivs[i-1].addClass('th-div-active');
                crPtThumbDivs[i-1].children().addClass('th-img-active');            
            }
            break;
        }
    }
});

$('.cr-next-btn').click(function (e) { 
    e.preventDefault();
    crPtThumbDivs.forEach(ele => {
        ele.removeClass('th-div-active');
        ele.children().removeClass('th-img-active');
    })
    for (let i = 0; i < 4; i++ ) {
        const ele = crProductDivs[i];
        if (ele.hasClass('active')){
            if (i === 3) {                
                crPtThumbDivs[0].addClass('th-div-active');
                crPtThumbDivs[0].children().addClass('th-img-active');            
            } else {
                crPtThumbDivs[i+1].addClass('th-div-active');
                crPtThumbDivs[i+1].children().addClass('th-img-active');            
            }
            break;
        }
    }
});


$('.carousel-cancel-btn').click(function (e) { 
    e.preventDefault();
    $('.pt-carousel-outer').css('display', 'none');
});


// activate carousel
$('img[alt="pt-thumbnail"').hover(function () {
        // over
        if (!($(this).hasClass('th-img-active'))) {
            $(this).addClass('th-img-active');
        }
    }, function () {
        // out
        if (!($(this).parent().hasClass('th-div-active'))){
            $(this).removeClass('th-img-active');
        };
    }
);


// pt-count-actions
$('.pt-count-sub').click(function (e) { 
    e.preventDefault();
    const count = parseInt($('.pt-count-value').text());
    if (!(count === 1)) {
        $('.pt-count-value').text(`${count-1}`);
    }
});

$('.pt-count-add').click(function (e) { 
    e.preventDefault();
    const count = parseInt($('.pt-count-value').text());
    $('.pt-count-value').text(`${count+1}`);
});
