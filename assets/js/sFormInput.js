$(document).ready(function(){
    $.fn.imgUpload = function(options){
        var eThis = this;
        var app, rule, boxHeight, boxWidth, sThis, ruleI, sImgName, trIndex = '';
        var setting = {
            url:'',
            rule:{},
            boxImg:{},
            sendTo:{},
            table:{}
        };
        options = $.extend(setting, options);

        $(options.boxImg).addClass('sBoxImg');

        return eThis.each(function(){
            var eachThis = $(this);
            var nBtnSave = 'រក្សារទុក';
            var nBtnCancel = 'បោះបង់';
            var fontFamily = 'Hanuman';
            var signBoxImg = '<span class="sSingBoxImg">+</span>';
            var imgLoading = '<div class="boxLoading" style="background-color: rgba(0,0,0,0.5);position: absolute;left: 0;top: 0;z-index: 1;width: 100%;height: 100%;align-items: center;justify-content: space-around;display: flex;"><div style=" border: 10px solid #f3f3f3;border-radius: 50%;border-top: 10px solid #3498db;width: 30px;height: 30px;-webkit-animation: spin 2s linear infinite; /* Safari */animation: spin 2s linear infinite;"></div></div>';
            var iconClose = '<div class="boxIconClose" style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;font-size: 30px;color: red;overflow: hidden;background-color: rgba(0,0,0,0.3);opacity: 0;transition: 0.3s;"><i id="sDelImg" class="fa fa-times sDelImg" style="float: right;margin-top: -5px;cursor: pointer;"></i></div>';

            var selectors, vSelectors, ruleI2, parentSelectors, mThis = '';
            var errMsg = '<span id="errMsg" style="color: red;font-size: 13px;position: absolute;left: 0;"><span id="textMsg"></span></span>';
            var textMsg = ['required *','must be at least','must be the number'];

            var no = '';
            var bgAfterSave = '<div id="bgAfterSave" style="background-color: rgba(255,255,255,0.2);position: fixed; width: 100%;height: 100%;left: 0;top: 0;z-index: 10000;"></div>';
            var loadingAftSave = '<div id="loadingAftSave" style="float: left; border: 4px solid #f3f3f3;border-radius: 50%;border-top: 4px solid gray;width: 20px;height: 20px;-webkit-animation: spin 1s linear infinite; /* Safari */animation: spin 1s linear infinite;"></div>';

            eachThis.prepend('<input type="hidden" value="1" id="xEdit">');

            eachThis.css({
                'font-family':fontFamily
            });

            eThis.prepend('<div class="innerWrapForm"></div>');
            function appearance(){
                var nameForm = eachThis.attr('class');
                app = '<div class="boxContentFrmCate"><div class="modal fade formFadIn" id="'+nameForm+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">' +
                    '<h5 class="modal-title" id="exampleModalLabel">'+nameForm+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close" style="font-size: 30px;margin-top: -25px;"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">' +


                    '</div><div class="modal-footer"><button type="button" id="btnCancel" class="btn btn-secondary btnCancel">'+nBtnCancel+'</button><button type="button" id="btnSave" class="btn btn-primary btnSave">'+nBtnSave+'</button></div></div></div></div><div class="btn btn-primary" data-toggle="modal" data-target="#'+nameForm+'">'+nameForm+'</div></div>';

                eThis.find('.innerWrapForm').html(app);
            }
            appearance();
            var noIdItem = '';

            function sRule(){
                if (options.rule){
                    var type = '';
                    for (var indRuleApp in setting.rule){
                        type = setting.rule[indRuleApp].type;
                        var title = setting.rule[indRuleApp].title;
                        if (type === 'no'){
                            rule = '<div class="form-group"><label style="font-family: '+fontFamily+'">'+title+'</label><input type="text" id="'+indRuleApp+'" class="'+indRuleApp+'" name="'+indRuleApp+'" style="background-color: white ; border: none;color: red;" readonly></div>';
                            noIdItem = indRuleApp;
                        }
                        if (type === 'text'){
                            rule = '<div class="form-group"><label style="font-family: '+fontFamily+'">'+title+' </label><input type="text" id="'+indRuleApp+'" class="'+indRuleApp+' form-control" name="'+indRuleApp+'"></div>';
                        }
                        if (type === 'textarea'){
                            rule = '<div class="form-group"><label style="font-family: '+fontFamily+'">'+title+' </label><textarea id="'+indRuleApp+'" class="'+indRuleApp+' form-control" name="'+indRuleApp+'" style="resize: none;" ></textarea></div>';
                        }
                        if (type === 'select'){
                            var option = options.rule[indRuleApp].option;
                            rule = '<div class="form-group"><label style="font-family: '+fontFamily+'">'+title+' </label><select style="font-family: '+fontFamily+'" id="'+indRuleApp+'" class="'+indRuleApp+' form-control" name="'+ruleI+'">';
                            var reOption = '';
                            for (var i = 0; i<option.length; i++){
                                rule += '<option value="'+i+'">'+option[i]+'</option>';
                            }
                            rule += '</select></div>';
                        }
                        if (typeof type === 'object') {
                            $.ajax({
                                url: options.urlTo,
                                type: 'POST',
                                data: {
                                    option: type.options
                                },
                                catch: false,
                                dataType: 'json',
                                success: function (data) {
                                    var v = data.v.split(',');
                                    var n = data.n.split(',');
                                    var x = '';
                                    for (var i = 0, j = 0; i < v.length - 1, j < n.length - 1; i++, j++) {
                                        x += '<option value="' + v[i] + '">' + n[j] + '</option>';
                                    }
                                    eachThis.find('.optType').html(x);
                                }
                            });
                            rule = '<div class="form-group"><label style="font-family: ' + fontFamily + '">' + title + ' </label><select style="font-family: ' + fontFamily + '" id="' + indRuleApp + '" class="' + indRuleApp + ' optType form-control" name="' + indRuleApp + '"></select></div>';
                        }
                        eThis.find('.innerWrapForm .modal-body').append(rule);
                    }
                }
            }
            sRule();

            var boxImg = function(){
                if (options.boxImg){
                    var multiS, kindSelect = '';
                    var boxImg =
                        '<div class="form-group">' +
                            '<label class="col-form-label" style="font-family: '+fontFamily+'">'+options.boxImg.title+'</label>' +
                            '<div id="boxWrapUploadImg">' +
                                '<div class="sBoxImg">' +
                                    '<span class="sSingBoxImg">+</span>' +
                        '       </div>' +
                            '</div>' +
                        '</div><div style="clear: both;"></div>';
                    eThis.find('.innerWrapForm .modal-body').append(boxImg);

                    if (options.boxImg.kind === 'only'){
                        kindSelect = 'sFileImg';
                        multiS = '';
                    }else if (options.boxImg.kind === 'multi'){
                        kindSelect = 'sFileImg[]';
                        multiS = 'multiple';
                    }
                    var sFile = '<input type="file" class="fileImg" id="fileImg" name="'+kindSelect+'" title="Select images" '+multiS+'><input type="hidden" value="'+options.boxImg.directory+'" name="txtFolderImg"><input type="hidden" value="'+options.boxImg.kind+'" name="txtKindUplImg">';
                    eachThis.find('.innerWrapForm .sBoxImg').append(sFile);
                    cssBoxImg('.innerWrapForm .sBoxImg');

                    eThis.on('change','#fileImg',function(){
                        sThis = $(this);
                        sThis.parents(eThis).find('#boxWrapUploadImg .sBoxImg').append(imgLoading);
                        var form = $(this).closest(eThis);
                        var form_data = new FormData(form[0]);
                        $.ajax({
                            url:options.urlTo,
                            type:'POST',
                            data:form_data,
                            contentType:false,
                            processData:false,
                            catch:false,
                            dataType:'json',
                            success:[appendDataImg]
                        });
                    });
                }

                var appendDataImg = function(data){
                    sThis.parents(eThis).find('.boxLoading').remove();
                    $('#fileImg').val('');
                    var imgName = data.imgName;
                    var imgNameArr = imgName.split(',');
                    var resultImg = '';
                    if (options.boxImg.kind === 'only'){
                        sThis.parent().css({
                            'background-image':'url("'+options.boxImg.directory+imgName+'")',
                            'background-repeat':'no-repeat',
                            'background-size':'contain',
                            'background-position':'center',
                            'background-color':'white',
                            'position':'relative'
                        });
                        sThis.parent().append(iconClose);
                        sThis.parent().find('.boxIconClose').append('<input type="text" name="sTxtImgData[]" class="sTxtImgData" id="txtImgData" value="'+imgName+'">');
                    }else if (options.boxImg.kind === 'multi'){
                        for (var i=0; i<imgNameArr.length-1; i++){
                            resultImg += '<div class="boxSubImg" style="background-image:url('+options.boxImg.directory+imgNameArr[i]+')">'+iconClose+'<input type="hidden" name="sTxtImgData[]" class="sTxtImgData" id="txtImgData" value="'+imgNameArr[i]+'"></div>';
                        }
                        sThis.parents('#boxWrapUploadImg').find('.sBoxImg').before(resultImg);
                    }
                    styleSubBoxImg();
                };

            };
            boxImg();
            deleteImg();
            function deleteImg (data){
                eachThis.find('#boxWrapUploadImg').on('click','.sDelImg',function(){
                    var mThis = $(this);
                    var imgName = '';
                    if (options.boxImg.kind === 'only'){
                        mThis.parents(eThis).find('#boxWrapUploadImg .sBoxImg').append(imgLoading);
                        imgName = mThis.parents('.sBoxImg').find('#txtImgData').val();
                    }else if (options.boxImg.kind === 'multi'){
                        mThis.parents('#boxWrapUploadImg .boxSubImg').append(imgLoading);
                        imgName = mThis.parents('.boxSubImg').find('#txtImgData').val();
                    }

                    var findFile = mThis.parents('#boxWrapUploadImg').find('#fileImg');

                    $.ajax({
                        url:options.urlTo,
                        type:'POST',
                        data:{
                            tblImg:'tbl_img',
                            folder:options.boxImg.directory,
                            imgName:imgName
                        },
                        success:function(data){
                            mThis.parents(eThis).find('.boxLoading').remove();
                            if (options.boxImg.kind === 'only'){
                                mThis.parents('.sBoxImg').find('#txtImgData').remove();
                                mThis.parent().remove();
                                findFile.parent().css({
                                    'background-image':'url("")'
                                });
                            }else if (options.boxImg.kind === 'multi'){
                                mThis.parents('#boxWrapUploadImg .boxSubImg').remove();
                            }
                        }
                    });


                });
            }


            function styleSubBoxImg(){
                boxHeight = eachThis.find('.sBoxImg').outerHeight();
                boxWidth = eachThis.find('.sBoxImg').outerWidth();
                eachThis.find('#boxWrapUploadImg').children().css({
                    'background-repeat':'no-repeat',
                    'background-size':'contain',
                    'background-position':'center',
                    'background-color':'white',
                    'height':boxHeight,
                    'width':boxWidth,
                    'border':'1px solid lightgray',
                    'float':'left',
                    'margin-left':'5px',
                    'margin-bottom':'5px',
                    'position':'relative'
                });
                eThis.find('#boxWrapUploadImg').on('mouseover','.boxIconClose',function(){
                    $(this).css({'opacity':'1'});
                });
                eThis.find('#boxWrapUploadImg').on('mouseleave','.boxIconClose',function(){
                    $(this).css({'opacity':'0'});
                });
            }

            function getId(){
                $.ajax({
                    url:options.urlTo,
                    type:'POST',
                    data:{
                        tblGetId:options.sendTo.tbl
                    },
                    catch:false,
                    dataType:'json',
                    success:function(data){
                        if (noIdItem !== ''){
                            eachThis.find('#'+noIdItem).val(' '+data.id);
                        }
                    }
                });
            }
            getId();


            function cssBoxImg(box){
                eThis.find(box).css({
                    'background-color':'white',
                    'height':'75px',
                    'width':'75px',
                    'border':'1px solid lightgray',
                    'position':'relative'
                });
                var boxHeight = $(box).outerHeight();
                var boxWidth = $(box).outerWidth();
                eThis.find(box+' .fileImg').css({
                    'position':'absolute',
                    'left':0,
                    'top':0,
                    'width':boxWidth,
                    'height':boxHeight,
                    'opacity':0,
                    'cursor':'pointer',
                    'border':'none'
                });
                eThis.find(box+' .sSingBoxImg').css({
                    'font-size':boxHeight/2,
                    'height':boxHeight,
                    'width':boxWidth,
                    'align-items': 'center',
                    'justify-content': 'space-around',
                    'display': 'flex',
                    'color':'lightgray',
                    'transition':'0.3s'
                });
                eThis.find(box).on('mouseover',function(){
                    $(this).find('.sSingBoxImg').css({
                        'color':'darkgray'
                    });
                });
                eThis.find(box).on('mouseleave',function(){
                    $(this).find('.sSingBoxImg').css({
                        'color':'lightgray'
                    });
                });
            }

            eThis.on('click','.clickShowForm',function(){
                var formName = eThis.attr('class');
                $(this).parents(eThis).find('#exampleModalLabel').text(formName);
            });

            eachThis.on('click','.btnSave',function(){
                mThis = $(this);
                event();
            });

            eachThis.on('click','.btnCancel',function(){
                mThis = $(this);
                getId();
                clear();
            });

            var bbbb;
            function event(){
                for (ruleI2 in setting.rule){
                    selectors = mThis.parents('.innerWrapForm').find('#'+ruleI2,'.'+ruleI2);
                    vSelectors = selectors.val();
                    parentSelectors = selectors.parent();
                    if (options.rule[ruleI2].required === true){
                        parentSelectors.css({'position':'relative'});
                        parentSelectors.find('#textMsg').remove();
                        parentSelectors.append(errMsg);
                        bbbb = 1;
                        sErrValidate();
                    }
                }
                if (bbbb == 2){
                    myData();
                }
            }

            function sErrValidate(){
                if (vSelectors === ''){
                    parentSelectors.find('#textMsg').text(textMsg[0]);
                }else if (vSelectors.length <= setting.rule[ruleI2].length){
                    parentSelectors.find('#textMsg').text(textMsg[1]+' '+(parseInt(setting.rule[ruleI2].length+1)+' characters'));
                }else if (setting.rule[ruleI2].number === true && isNaN(vSelectors)){
                    parentSelectors.find('#textMsg').text(textMsg[2]);
                }
                else {
                    parentSelectors.find('#textMsg').text('');
                    bbbb = 2;
                }
            }

            var xEdit = '';
            function myData(){
                xEdit = mThis.parents(eachThis).find('#xEdit').val();
                no = mThis.parents('.modal-content').find('#'+noIdItem).val();
                eThis.parents('body').append(bgAfterSave);
                mThis.html(loadingAftSave);
                var obj = options.sendTo.data;
                var arr = '';
                for (var i=0; i<obj.length; i++){
                    arr += mThis.parents('.modal-content').find('#'+obj[i],'.'+obj[i]).val()+'|/><';
                }
                $.ajax({
                    url:options.urlTo,
                    type:'POST',
                    data:{
                        no:no,
                        xEdit:xEdit,
                        tbl:options.sendTo.tbl,
                        sData:arr
                    },
                    catch:false,
                    success:uplImg
                });
            }

            var strImg = '';
            var uplImg = function(data){
                console.log(data);
                if (options.boxImg){
                    eachThis.find('#boxWrapUploadImg .sTxtImgData').each(function(){
                        sImgName = $(this).val();
                        strImg += sImgName+',';
                        $.ajax({
                            url:options.urlTo,
                            type:'POST',
                            data:{
                                tbl:'tbl_img',
                                no:no,
                                kind:options.sendTo.tbl,
                                sImgName:sImgName
                            },
                            success:function(){

                            }
                        });
                    });
                }
                appendDataToTable();
                getId();
                clear();
            };

            function clear(){
                if (mThis.attr('id') === 'btnCancel'){
                    var sImgName1, strImg1 = '';
                    eThis.parents('body').append(bgAfterSave);
                    mThis.html(loadingAftSave);
                    mThis.parents('form').find('.sTxtImgData').each(function(){
                        sImgName1 = $(this).val();
                        strImg1 += sImgName1+',';
                    });
                    var arrStrImg = strImg1.split(',');
                    if (arrStrImg[0] !== ''){
                        for (var i=0; i<arrStrImg.length-1; i++){
                            $.ajax({
                                url:options.urlTo,
                                type:'POST',
                                data:{
                                    folder:options.boxImg.directory,
                                    imgName:arrStrImg[i]
                                },
                                catch:false,
                                success:function(){
                                    mThis.html(nBtnCancel);
                                    inClear();
                                }
                            });
                        }
                    }else {
                        mThis.html(nBtnCancel);
                        inClear();
                    }

                }else {
                    mThis.html(nBtnSave);
                    inClear();
                }
                for (ruleI2 in setting.rule){
                    selectors = mThis.parents('.innerWrapForm').find('#'+ruleI2,'.'+ruleI2);
                    if (setting.rule[ruleI2].type !== 'select' && typeof setting.rule[ruleI2].type !== 'object'){
                        selectors.val('');
                    }
                }
                bbbb = 1;
            }
            function inClear(){
                $('#bgAfterSave').remove();
                mThis.parents('form').find('#txtImgData').remove();
                mThis.parents('form').find('.boxIconClose').remove();
                mThis.parents('form').find('.boxSubImg').remove();
                mThis.parents('form').find('.sBoxImg').css({
                    'background-image':'url("")'
                });
                mThis.parents(eachThis).find('#xEdit').val(1);
            }

            if (options.table){
                var th = eThis.find('table tr th');
                var td = eThis.find('table tr td');
                var subHeight, subWidth = '';
                var folderImg = options.boxImg.directory;
                var txtUrlTo = eThis.parents('form').find('#txtUrlTo').val();
                th.parent().addClass('sThead');
                td.parent().addClass('sTbody');
                var img = eachThis.find('table tr td img');
                img.parents('tr td').css({
                    'width':'80px',
                    'overflow':'hidden'
                });
                img.css({
                    'width':'auto',
                    'height':'auto',
                    'max-width':'100%',
                    'max-height':'100%',
                    'align-items':'center',
                    'justify-content':'space-around',
                    'display':'flex'
                });
                if (options.table.checkBox === true){
                    var checkBoxTh =
                        '<th style="width:20px;">' +
                        '<label class="i-checks m-b-none">' +
                        '<input type="checkbox"><i></i>' +
                        '</label>' +
                        '</th>';
                    var checkBoxTd = '<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>';
                    eachThis.find('.sThead').prepend(checkBoxTh);
                    eachThis.find('.sTbody').prepend(checkBoxTd);
                }

                if (options.table.action === true){
                    var action =
                        '<td>' +
                        '<i class="fa fa-edit i_edit_row sEdit" title="edit">' +

                        '</i>' +
                        '<i class="fa fa-times text-danger text sDelete" title="delete">' +
                        '</i>' +
                        '</td>';
                    eachThis.find('.sThead').append('<th style="width:30px;"></th>');
                    eachThis.find('.sTbody').append(action);

                    //click edit
                    eachThis.on('click','.sEdit',function(){
                        mThis = $(this);
                        eThis.parents('body').append(bgAfterSave);
                        var pTr = $(this).parents('tr');
                        trIndex = pTr.index();//find index tr of table
                        var tr = $(this).parents('tr').find('td');
                        var id = '';
                        var checkBox = options.table.checkBox;
                        if (checkBox === true){
                            id = tr.eq(1).text();
                        }else {
                            id = tr.eq(0).text();
                        }
                        if (options.sendTo){
                            $.ajax({
                                url:options.urlTo,
                                type:'POST',
                                data:{
                                    fieldEdit:options.sendTo.edit,
                                    tbl:options.sendTo.tbl,
                                    no:id
                                },
                                catch:false,
                                dataType:'json',
                                success:function(data){
                                    var arrDataEdit = data.dataEdit;
                                    var arrImgEdit = data.imgEdit;
                                    if (options.sendTo.transferDataToForm){
                                        for (var i=0, j=0; i<arrDataEdit.length, j<options.sendTo.transferDataToForm.length; i++, j++){
                                            var selectorInput = options.sendTo.transferDataToForm[j];
                                            var textTbl = arrDataEdit[i];
                                            mThis.parents('form').find(selectorInput).parent('.form-group').find(selectorInput).val(textTbl);
                                        }
                                    }


                                    if (arrImgEdit != ''){
                                        var resultImg = '';
                                        for (var img =0; img < arrImgEdit.length; img++){
                                            var strImg = arrImgEdit[img];
                                            var childBoxImg = mThis.parents('form').find('#fileImg');
                                            var inputImg = '<input type="hidden" name="sTxtImgData[]" class="sTxtImgData" id="txtImgData" value="'+strImg+'">';
                                            if (options.boxImg.kind === 'multi') {
                                                resultImg += '<div class="boxSubImg" style="background-image:url('+options.boxImg.directory+strImg+')">'+iconClose+inputImg+'</div>';
                                            }else if (options.boxImg.kind === 'only'){
                                                childBoxImg.parent().find('.boxIconClose').remove();
                                                childBoxImg.parent().append(iconClose+inputImg);
                                                childBoxImg.parent().css({
                                                    'background-image':'url("'+options.boxImg.directory+strImg+'")',
                                                    'background-repeat':'no-repeat',
                                                    'background-size':'contain',
                                                    'background-position':'center',
                                                    'background-color':'white',
                                                    'position':'relative'
                                                });
                                            }
                                        }
                                        mThis.parents('form').find('#boxWrapUploadImg .sBoxImg').parents('#boxWrapUploadImg').find('.boxSubImg').remove();
                                        mThis.parents('form').find('#boxWrapUploadImg .sBoxImg').parents('#boxWrapUploadImg').find('.sBoxImg').before(resultImg);
                                    }else {
                                        inClear();
                                    }
                                    mThis.parents('form').find('.sTxtImgData').attr('class','sxTxtImgData');//change attr to .. when click edit data but after that click cancel and not delete old img
                                    styleSubBoxImg();
                                    var findFrmFadein = mThis.parents('form').find('.formFadIn ').attr('id');
                                    mThis.parents(eachThis).find('#xEdit').val(2);
                                    $('#bgAfterSave').remove();
                                    $('#'+findFrmFadein).modal('show');
                                }
                            });
                        }


                    });
                }
            }

            var dataImg, backgroundImg, cleanup, apInd = '';
            var fieldInput = options.table.fieldInput;
            function appendDataToTable(){
                if (options.table.dataTable === true){
                    //var fieldInput = options.table.fieldInput;
                    var rowTr = '<tr>';
                    var editTd ='';
                    if (options.table.checkBox === true){
                        rowTr += '<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>';
                        editTd = '<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>';
                    }

                    for (apInd=0; apInd<fieldInput.length; apInd++){
                        var tInput = mThis.parents('form').find(fieldInput[apInd]).parent().find('select');
                        var vvInput = mThis.parents('form').find(fieldInput[apInd]).parent().find('input');
                        var vvTextarea = mThis.parents('form').find(fieldInput[apInd]).parent().find('textarea');
                        var x = tInput.find('option:selected').text();
                        var v = vvInput.val();
                        var t = vvTextarea.val();
                        if (tInput){
                            if (x != ''){
                                rowTr += '<td>'+x+'</td>';
                                editTd += '<td>'+x+'</td>';
                            }
                        }
                        if (vvInput){
                            if (typeof v !== 'undefined'){
                                if (v !== ''){
                                    if (fieldInput[apInd] !== '.sBoxImg'){
                                        rowTr += '<td>'+v+'</td>';
                                        editTd += '<td>'+v+'</td>';
                                    }
                                }
                            }
                        }
                        if (vvTextarea){
                            if (typeof t !== 'undefined'){
                                if (t !== ''){
                                    rowTr += '<td>'+t+'</td>';
                                    editTd += '<td>'+t+'</td>';
                                }
                            }

                        }
                    }
                    var imgName = mThis.parents('form').find('#txtImgData').val();
                    dataImg = options.boxImg.directory+imgName;
                    //image
                    if (typeof imgName === 'string'){
                        rowTr += '<td><span class="text-ellipsis"><img src="'+dataImg+'" style="width: auto;height: auto;max-width: 100%;max-height: 100%;align-items:center;justify-content:space-around;display:flex"></span></td>';
                        editTd += '<td><span class="text-ellipsis"><img src="'+dataImg+'" style="width: auto;height: auto;max-width: 100%;max-height: 100%;align-items:center;justify-content:space-around;display:flex"></span></td>';
                    }else {
                        rowTr += '<td><span class="text-ellipsis"></span></td>';
                        editTd += '<td><span class="text-ellipsis"></span></td>';
                    }
                    //action
                    rowTr += '<td>' +
                        '<i class="fa fa-edit i_edit_row sEdit" title="edit">' +

                        '</i>' +
                        '<i class="fa fa-times text-danger text sDelete" title="delete">' +
                        '</i>' +
                        '</td>';
                    editTd += '<td>' +
                        '<i class="fa fa-edit i_edit_row sEdit" title="edit">' +

                        '</i>' +
                        '<i class="fa fa-times text-danger text sDelete" title="delete">' +
                        '</i>' +
                        '</td>';
                    rowTr += '</tr>';
                    if (xEdit == 1){
                        mThis.parents('form').find('tbody').prepend(rowTr);
                    }
                    else if (xEdit == 2){
                        mThis.parents('form').find('table tr:eq('+(trIndex+1)+')').html(editTd);
                    }
                }
            }


        });
    };

});




/*!
 Autosize 3.0.20
 license: MIT
 http://www.jacklmoore.com/autosize
 */
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod);
        global.autosize = mod.exports;
    }
})(this, function (exports, module) {
    'use strict';

    var map = typeof Map === "function" ? new Map() : (function () {
        var keys = [];
        var values = [];

        return {
            has: function has(key) {
                return keys.indexOf(key) > -1;
            },
            get: function get(key) {
                return values[keys.indexOf(key)];
            },
            set: function set(key, value) {
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    values.push(value);
                }
            },
            'delete': function _delete(key) {
                var index = keys.indexOf(key);
                if (index > -1) {
                    keys.splice(index, 1);
                    values.splice(index, 1);
                }
            }
        };
    })();

    var createEvent = function createEvent(name) {
        return new Event(name, { bubbles: true });
    };
    try {
        new Event('test');
    } catch (e) {
        // IE does not support `new Event()`
        createEvent = function (name) {
            var evt = document.createEvent('Event');
            evt.initEvent(name, true, false);
            return evt;
        };
    }

    function assign(ta) {
        if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

        var heightOffset = null;
        var clientWidth = ta.clientWidth;
        var cachedHeight = null;

        function init() {
            var style = window.getComputedStyle(ta, null);

            if (style.resize === 'vertical') {
                ta.style.resize = 'none';
            } else if (style.resize === 'both') {
                ta.style.resize = 'horizontal';
            }

            if (style.boxSizing === 'content-box') {
                heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
            } else {
                heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
            }
            // Fix when a textarea is not on document body and heightOffset is Not a Number
            if (isNaN(heightOffset)) {
                heightOffset = 0;
            }

            update();
        }

        function changeOverflow(value) {
            {
                // Chrome/Safari-specific fix:
                // When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
                // made available by removing the scrollbar. The following forces the necessary text reflow.
                var width = ta.style.width;
                ta.style.width = '0px';
                // Force reflow:
                /* jshint ignore:start */
                ta.offsetWidth;
                /* jshint ignore:end */
                ta.style.width = width;
            }

            ta.style.overflowY = value;
        }

        function getParentOverflows(el) {
            var arr = [];

            while (el && el.parentNode && el.parentNode instanceof Element) {
                if (el.parentNode.scrollTop) {
                    arr.push({
                        node: el.parentNode,
                        scrollTop: el.parentNode.scrollTop
                    });
                }
                el = el.parentNode;
            }

            return arr;
        }

        function resize() {
            var originalHeight = ta.style.height;
            var overflows = getParentOverflows(ta);
            var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

            ta.style.height = 'auto';

            var endHeight = ta.scrollHeight + heightOffset;

            if (ta.scrollHeight === 0) {
                // If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
                ta.style.height = originalHeight;
                return;
            }

            ta.style.height = endHeight + 'px';

            // used to check if an update is actually necessary on window.resize
            clientWidth = ta.clientWidth;

            // prevents scroll-position jumping
            overflows.forEach(function (el) {
                el.node.scrollTop = el.scrollTop;
            });

            if (docTop) {
                document.documentElement.scrollTop = docTop;
            }
        }

        function update() {
            resize();

            var styleHeight = Math.round(parseFloat(ta.style.height));
            var computed = window.getComputedStyle(ta, null);
            var actualHeight = Math.round(parseFloat(computed.height));

            // The actual height not matching the style height (set via the resize method) indicates that
            // the max-height has been exceeded, in which case the overflow should be set to visible.
            if (actualHeight !== styleHeight) {
                if (computed.overflowY !== 'visible') {
                    changeOverflow('visible');
                    resize();
                    actualHeight = Math.round(parseFloat(window.getComputedStyle(ta, null).height));
                }
            } else {
                // Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
                if (computed.overflowY !== 'hidden') {
                    changeOverflow('hidden');
                    resize();
                    actualHeight = Math.round(parseFloat(window.getComputedStyle(ta, null).height));
                }
            }

            if (cachedHeight !== actualHeight) {
                cachedHeight = actualHeight;
                var evt = createEvent('autosize:resized');
                try {
                    ta.dispatchEvent(evt);
                } catch (err) {
                    // Firefox will throw an error on dispatchEvent for a detached element
                    // https://bugzilla.mozilla.org/show_bug.cgi?id=889376
                }
            }
        }

        var pageResize = function pageResize() {
            if (ta.clientWidth !== clientWidth) {
                update();
            }
        };

        var destroy = (function (style) {
            window.removeEventListener('resize', pageResize, false);
            ta.removeEventListener('input', update, false);
            ta.removeEventListener('keyup', update, false);
            ta.removeEventListener('autosize:destroy', destroy, false);
            ta.removeEventListener('autosize:update', update, false);

            Object.keys(style).forEach(function (key) {
                ta.style[key] = style[key];
            });

            map['delete'](ta);
        }).bind(ta, {
            height: ta.style.height,
            resize: ta.style.resize,
            overflowY: ta.style.overflowY,
            overflowX: ta.style.overflowX,
            wordWrap: ta.style.wordWrap
        });

        ta.addEventListener('autosize:destroy', destroy, false);

        // IE9 does not fire onpropertychange or oninput for deletions,
        // so binding to onkeyup to catch most of those events.
        // There is no way that I know of to detect something like 'cut' in IE9.
        if ('onpropertychange' in ta && 'oninput' in ta) {
            ta.addEventListener('keyup', update, false);
        }

        window.addEventListener('resize', pageResize, false);
        ta.addEventListener('input', update, false);
        ta.addEventListener('autosize:update', update, false);
        ta.style.overflowX = 'hidden';
        ta.style.wordWrap = 'break-word';

        map.set(ta, {
            destroy: destroy,
            update: update
        });

        init();
    }

    function destroy(ta) {
        var methods = map.get(ta);
        if (methods) {
            methods.destroy();
        }
    }

    function update(ta) {
        var methods = map.get(ta);
        if (methods) {
            methods.update();
        }
    }

    var autosize = null;

    // Do nothing in Node.js environment and IE8 (or lower)
    if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
        autosize = function (el) {
            return el;
        };
        autosize.destroy = function (el) {
            return el;
        };
        autosize.update = function (el) {
            return el;
        };
    } else {
        autosize = function (el, options) {
            if (el) {
                Array.prototype.forEach.call(el.length ? el : [el], function (x) {
                    return assign(x, options);
                });
            }
            return el;
        };
        autosize.destroy = function (el) {
            if (el) {
                Array.prototype.forEach.call(el.length ? el : [el], destroy);
            }
            return el;
        };
        autosize.update = function (el) {
            if (el) {
                Array.prototype.forEach.call(el.length ? el : [el], update);
            }
            return el;
        };
    }

    module.exports = autosize;
});