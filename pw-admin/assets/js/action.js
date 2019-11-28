$(document).ready(function() {
    $('#btn-save-color').insertData({
        tbl: 'tbl_general',
        formKindSelect: 'selectOne',
        intFieldAndInput: {
            color_text: '#colorText',
            color_title: '#colorTitle',
            color_curent: '#colorCurently',
            color_desk: '#backgroundColorDesk',
            color_bg_mobile : '#backgroundColorMobile',
            kind1: '#kindColor'
        },
        updateCondition : [
            'id',
            'kind1'
        ],
        selectCondition: {
            kind1: 'tbl_color',
        }
    });

    // header
    $('.uplImgLogoDesk').uplImgToFolder({ //logo desktop
        classForm: '.frm-upl-general-logo',
        kindUpl: 'only',
        directory: '../../assets/pic/test/',
        changeName: true
    });
    $('#uplImgShortcutIcon').uplImgToFolder({ //logo desktop
        classForm: '.frm-upl-general-logo',
        kindUpl: 'only',
        directory: '../../assets/pic/test/'
    });
     $('#uplImgFooter').uplImgToFolder({ //logo desktop
        classForm: '.frm-upl-general-logo',
        kindUpl: 'only',
        directory: '../../assets/pic/test/',
        changeName: true
    });
    $('#btn-save-header').insertData({
        tbl: 'tbl_general',
        formKindSelect: 'selectOne',
        intFieldAndInput: {
            logo_desk: '#uplImgLogoDesk',
            shortcut_icon: '#uplImgShortcutIcon',
            logo_footer:'#uplImgFooter',
            seo_keyword: '#seoDescription',
            seo_description: '#seoKeyword',
            kind1: '#kindHeader'
        },
        updateCondition : [
            'id',
            'kind1'
        ],
        selectCondition: {
            kind1: 'tbl_header',
        }
    });
});