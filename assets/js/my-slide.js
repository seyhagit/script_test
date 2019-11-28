// JavaScript Document


$(document).ready(function(){
    var slideIndex=1;
    showSlides(slideIndex);
    function plusSlide(n){
        showSlides(slideIndex += n);
    }
    function autoSlide(){
        plusSlide(1);
    }

    function showSlides(n){
        var i;
        var slides = $('.subBoxSlideContent');
        if (n > slides.length){
            slideIndex = 1;
        }
        if (n < 1){
            slideIndex = slides.length;
        }
        for (i = 0 ;i < slides.length; i++){
            slides.eq(i).hide();
        }
        slides.eq(slideIndex-1).show();
    }
    var btnPre=$('.boxSlideConten #btnPre');
    var btnNext=$('.boxSlideConten #btnNext');
    var option={
        pre:btnPre,
        next:btnNext,
        auto:1
    };
    console.log(option);
    function mySlideShowAll(option){
        for (var index in option){
            alert(option[index]);
            if (index=='pre'){
                option[index].on('click',function(){
                    plusSlide(-1);
                });
            }else if (index=='next'){
                option[index].on('click',function(){
                    plusSlide(1);
                });
            }else if (index=='auto'){
                myClearInterval = setInterval(autoSlide,6000);
            }
        }
    }
    mySlideShowAll(option);


});


