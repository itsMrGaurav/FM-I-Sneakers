
// cart-actions

// store the number of total items
let itemsInCart = 0;

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


$('.pt-add-btn').click(function (e) { 
    e.preventDefault();
    
    // get num of items to add and display msg
    const productCount = parseInt($('.pt-count-value').text()) + itemsInCart;
    $('.cart-sticky').css('display', 'block');
    $('.cart-item-count').text(productCount);

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
    $('.pt-carousel-outer').css('display', 'block');
});


// product-thumbnail-actions

const ptThumbImgs = [$('.pt-th-1'), $('.pt-th-2'), $('.pt-th-3'), $('.pt-th-4')];
const crProductThumbImgs = [$('.cr-pt-th-1'), $('.cr-pt-th-2'), $('.cr-pt-th-3'), $('.cr-pt-th-4')];

$('.pt-thumbnails div').click(function (e) {
    e.preventDefault();
    ptThumbImgs.forEach((ele,id) => {
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
    crProductThumbImgs.forEach((ele,id) => {
        ele.removeClass('th-div-active');
        ele.children().removeClass('th-img-active');
        if (ele[0] === this) {
            $('.cr-pt-img').attr('src', `assets/images/image-product-${id+1}.jpg`);
        }
    });
    $(this).addClass('th-div-active');
    $(this).children().addClass('th-img-active');    
});

$('.carousel-cancel-btn').click(function (e) { 
    e.preventDefault();
    $('.pt-carousel-outer').css('display', 'none');
});

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
