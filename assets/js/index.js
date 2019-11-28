/**
 * Created by KAJANH JEK ATJAY on 3/6/2018.
 */
$(document).ready(function(){
    //tool login, register and favorite
    var sBoxRightTop=$('.box_tool_right_navtop .all_box_right');
    var eBoxContentRightTop='.content_box_right';
    myMouseHover(sBoxRightTop,eBoxContentRightTop);
    
    $('#slidShowChange .carousel').each(function() {
        $(this).carousel({
            interval : 3000
        });
    });

    //package of category
    var sCateTop=$('.box_categories_top > ul > li');
    var eContentCateTop=' > .categories_top';
    var eSpanSign='span';
    myMouseHover(sCateTop, eContentCateTop);
    var sSubCateTop=$('.categories_top > ul > li');
    var eConSubCateTop='> ul';
    var tempCateTop='.temp_catetop';
    myMouseHover(sSubCateTop,eConSubCateTop);
    myMouseHover(sSubCateTop,tempCateTop);
    //myMouseHover(sSubCateTop,eSpanSign);

    sSubCateTop.hover(function(){
        var eThis=$(this);
        sSubCateTop.find(eSpanSign).css({'color':'lightgray','margin-right':'0px','font-weight':'normal'});
        eThis.find(eSpanSign).css({'color':'cornflowerblue','margin-right':'-7px','font-weight':'bold'});
    });
    sSubCateTop.mouseleave(function(){
        sSubCateTop.find(eSpanSign).css({'color':'lightgray','margin-right':'0px','font-weight':'normal'});
    });
    function myMouseHover(Sselector,EselectorEvent){
        Sselector.mouseover(function(){
            var eThis=$(this);
            eThis.find(EselectorEvent).show();
        });
        Sselector.mouseleave(function(){
            var eThis=$(this);
            eThis.find(EselectorEvent).hide();
        });
    }
    $('.box_search_panel_top > ul > li').on('click',function(){
        $(this).find(' > ul').fadeToggle(100);
    });

    var winWidth="";
    var windWidthChangeAppearance=$(window).width();
    var windHeight=$(window).height();
    $('.contentHistorySearchInputTopRe').css({'height':windHeight});
    if (windWidthChangeAppearance < 991){
        $('#slidShowChange').insertBefore('#boxOptionToolTop');
    }else {
        $('#slidShowChange').insertAfter('#boxOptionToolTop');
    }


    $(window).resize(function(){
        winWidth=$(this).width();
        if (winWidth > 767){
            $(".coverBoxContentNavLeftRe").hide();
            $('body').removeClass('add_body');
        }
        if (winWidth < 991){
            $('#slidShowChange').insertBefore('#boxOptionToolTop');
        }else {
            $('#slidShowChange').insertAfter('#boxOptionToolTop');
        }
    });

    $(window).scroll(function(){
        //fixed menu
        var navTopHeight=$('.container_fluid_cus').outerHeight();
        var winScrTop=$(this).scrollTop();
        if (winScrTop >= navTopHeight){
            $('.box_option_re').addClass('add_box_option_re');
            $('.box_logo').addClass('add_box_logo');
            $('.container_fluid_cus').addClass('add_container_fluid_cus');
            $('.box_contact_about').hide();
            $('.main_box_tool_right_navtop').hide();
            $('.box_search_panel_top').hide();
            $('.mainBoxNavTop2').addClass('add_mainBoxNavTop2');
            $('.box_categories_top').addClass('add_box_categories_top');
            $('.box_search_navtop').addClass('add_box_search_navtop');
            $('.box_txt_input_search').addClass('add_box_txt_input_search');
            $('.txtSearchNavTop').addClass('add_txtSearchNavTop');
            $('.btnSearchNavTop').addClass('add_btnSearchNavTop');
        }else {
            $('.box_option_re').removeClass('add_box_option_re');
            $('.box_logo').removeClass('add_box_logo');
            $('.container_fluid_cus').removeClass('add_container_fluid_cus');
            $('.box_contact_about').show();
            $('.main_box_tool_right_navtop').show();
            $('.box_search_panel_top').show();
            $('.mainBoxNavTop2').removeClass('add_mainBoxNavTop2');
            $('.box_categories_top').removeClass('add_box_categories_top');
            $('.box_search_navtop').removeClass('add_box_search_navtop');
            $('.box_txt_input_search').removeClass('add_box_txt_input_search');
            $('.txtSearchNavTop').removeClass('add_txtSearchNavTop');
            $('.btnSearchNavTop').removeClass('add_btnSearchNavTop');
        }
    });

    $('.container_fluid_cus').on('click','#boxOptionRe',function(){
        $('.coverBoxContentNavLeftRe').stop().fadeIn();
        if (winWidth<480){
            $('.boxContentNavleftRe').css({'width':'70%'});
        }else {
            $('.boxContentNavleftRe').css({'width':'50%'});
        }
        $('body').addClass('add_body');
    });

    var clearHisSearch=$('.contentHistorySearchInputTop');
    clearOrSaveHisSearch(clearHisSearch);
    var clearHisSearchRe=$('.contentHistorySearchInputTopRe');
    clearOrSaveHisSearch(clearHisSearchRe);
    function clearOrSaveHisSearch(mainSelector){
        mainSelector.on('click','#clearHisSearchTop',function(){
            $(this).text('Save History');
            $(this).attr('id','saveHisSearchTop');
            mainSelector.find('i.signClearEach').show();
            mainSelector.find('span#clearAll').show();
            mainSelector.find('.modal-body > span').addClass('addClass_span');
            mainSelector.find('.modal-body > span > a').addClass('addClas_a');
            mainSelector.find('.modal-body > span > i').addClass('addClass_i');
        });
        mainSelector.on('click','#saveHisSearchTop',function(){
            $(this).text('Clear History');
            $(this).attr('id','clearHisSearchTop');
            mainSelector.find('i.signClearEach').hide();
            mainSelector.find('span#clearAll').hide();
            mainSelector.find('.modal-body > span').removeClass('addClass_span');
            mainSelector.find('.modal-body > span > a').removeClass('addClas_a');
            mainSelector.find('.modal-body > span > i').removeClass('addClass_i');
        });
        $('#saveHisSearchTop').text('Clear History');
        $('#saveHisSearchTop').attr('id','clearHisSearchTop');
        mainSelector.find('i.signClearEach').hide();
        mainSelector.find('span#clearAll').hide();
        mainSelector.find('.modal-body > span').removeClass('addClass_span');
        mainSelector.find('.modal-body > span > a').removeClass('addClas_a');
        mainSelector.find('.modal-body > span > i').removeClass('addClass_i');
    }

    $('#txtSearchNavTop').click(function(){
        $('.container_fluid_cus').addClass('add2_container_fluid_cus');
        $('.boxTopBeforeSearchBox').addClass('add2_boxTopBeforeSearchBox');
        $('.arrowKeySearchTop').addClass('add_arrowKeySearchTop');
        $('.contentHistorySearchInputTopRe').addClass('add_contentHistorySearchInputTopRe');
        $('.txtSearchNavTop').addClass('add2_txtSearchNavTop');
        $('.main_box_contents').addClass('add_main_box_contents');
        $('body').addClass('add2_body');
        $('.contentHistorySearchInputTop').addClass('add_contentHistorySearchInputTop');
    });

    function clearReAndNotReHeaderNavTop(){
        clearOrSaveHisSearch(clearHisSearchRe);
        clearOrSaveHisSearch(clearHisSearch);
        $('.container_fluid_cus').removeClass('add2_container_fluid_cus');
        $('.boxTopBeforeSearchBox').removeClass('add2_boxTopBeforeSearchBox');
        $('.arrowKeySearchTop').removeClass('add_arrowKeySearchTop');
        $('.contentHistorySearchInputTopRe').removeClass('add_contentHistorySearchInputTopRe');
        $('.txtSearchNavTop').removeClass('add2_txtSearchNavTop');
        $('.contentHistorySearchInputTop').removeClass('add_contentHistorySearchInputTop');
        $('.main_box_contents').removeClass('add_main_box_contents');
        $('body').removeClass('add2_body');
    }
    $('#arrowKeySearchTop').click(function(){
        clearReAndNotReHeaderNavTop();
    });

    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        var winWidth2=$(window).width();
        if ( ! $clicked.parents().hasClass("box_option_re") && ! $clicked.parents().hasClass("boxContentNavleftRe")){
            $(".coverBoxContentNavLeftRe").fadeOut();
            $('.boxContentNavleftRe').css({'width':'0'});
            $('body').removeClass('add_body');
        }
        if (winWidth2<=767){
            if (! $clicked.parents().hasClass("container_fluid_cus") && ! $clicked.parents().hasClass("boxContentReTxtSearchTop")){
                clearReAndNotReHeaderNavTop();
            }
        }else {
            if (! $clicked.parents().hasClass("box_txt_input_search") && ! $clicked.parents().hasClass("boxContentReTxtSearchTop")){
                clearReAndNotReHeaderNavTop();
            }
        }

        if (! $clicked.parents().hasClass("box_search_panel_top")){
            $('.box_search_panel_top > ul > li > ul').hide();
        }
    });

    //content index ...........................................................
    //box option and slide
    $('.boxOptionSlideConten').on('mouseover','.boxSlideConten',function(){
        var eThis=$(this);
        var btnPre=eThis.find('.btnPre');
        var btnNext=eThis.find('.btnNext');
        hoverContent('mouseOver',btnPre);
        hoverContent('mouseOver',btnNext);
    });
    $('.boxOptionSlideConten').on('mouseleave','.boxSlideConten',function(){
        var eThis=$(this);
        var btnPre=eThis.find('.btnPre');
        var btnNext=eThis.find('.btnNext');
        hoverContent('mouseLeave',btnPre);
        hoverContent('mouseLeave',btnNext);
    });
    function hoverContent(eventType,selector){
        if (eventType=='mouseOver'){
            selector.css({'width':'35px'});
        }
        if (eventType=='mouseLeave'){
            selector.css({'width':'0'});
        }

    }


    $('.item-recent-view .row').slick({
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 7,
        dots:false,
        nextArrow: '<div class="arrow-right"><i class="fa fa-angle-right"></i></div>',
        prevArrow: '<div class="arrow-left"><i class="fa fa-angle-left"></i></div>'
    });


    //change Appearance template




});