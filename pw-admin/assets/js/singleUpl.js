

var iconClose = '<div class="cover-single-img"><i id="sDelImgSingle" class="glyphicon glyphicon-remove sDelImgSingle" title="delete"><img src="http://gdurl.com/saIp"></i><i id="iconFullScreen" title="full image" class="glyphicon glyphicon-fullscreen icon-fullscreen"><img src="http://gdurl.com/VM_f"></i></div>';

var addStringTxtImg = 'SeyhaPluginImg';
var idAndClassTxtImg;
var sThis,dir,thisNameFile, eThisIdClassSelector;

function myColorPicker() {
	var elInput = $('input[type="colorPicker"]');
	if (elInput) {
		elInput.wrap('<div class="input-group colorpicker-component my-color-picker"></div>');
		elInput.each(function () {
			// $(this).data('defaultcolor') data-defaultcolor: to make default color but change when you choose other color
			// $(this).data('selectcolor') data-selectcolor: to make fixed default color
			$(this).parent('.my-color-picker').append('<span class="input-group-addon"><i></i></span>');
			$(this).css({
				'border':'1px solid lightgray'
			});
			var defaultcolor;
			var selectColor;
			if (typeof $(this).data('defaultcolor') !== 'undefined' && $(this).data('defaultcolor') != '') {
				defaultcolor = $(this).data('defaultcolor');
			}else if($(this).data('defaultcolor') == ''){
				defaultcolor = $(this).data('selectcolor');
			}
			if (typeof $(this).data('selectcolor') !== 'undefined') {
				selectcolor = $(this).data('selectcolor');
			}
			if (typeof $(this).data('hidetextcolor') !== 'undefined') {
				$(this).css({
					'display':'none'
				});
			}
			$(this).parent('.my-color-picker').colorpicker({
				customClass: 'colorpicker-2x',
				color: defaultcolor,
				colorSelectors: {
		            'defualt': selectcolor
		        },
		        sliders: {
		            saturation: {
		                maxLeft: 180,
		                maxTop: 180
		            },
		            hue: {
		                maxTop: 180
		            },
		            alpha: {
		                maxTop: 180
		            }
		        }
			});
		});
	}
}
myColorPicker();
function makeFileName(success=''){
	if (success=='') {
		sThis.attr('name','sUplImgFolder[]');
	}else if (success == 'success') {
		sThis.attr('name','');
	}
}
function getImgSingle (dataImg){
	for (var i = 0; i < dataImg.length; i++) {
			sThis.parent().css({
			'background-image':'url("'+dir+dataImg[i]+'")'
		});
	}
	sThis.parent().append(iconClose);
	sThis.parent().append('<input type="hidden" class="'+eThisIdClassSelector+'" id="'+eThisIdClassSelector+'" value="'+dataImg+'" name="'+thisNameFile+'">');
	sThis.parent().find('.loader').remove();
	sThis.parent().find('.sRe-changeNameImg').remove();
    sThis.parent().find('.stxt-tbl-name-directory').remove();
}

$.fn.uplImgToFolder = function(options) {
	var eThis = this;//input type on change [file]
	var setting = {
		urlTo: '../control/action-single.php',
		classForm: '',
		kindUpl: '',//only | multi
		directory:'',
		changeName: false//true is change name when upload false no change
	};
	options = $.extend(setting, options);
	var classForm = options.classForm;
	var urlTo = options.urlTo;
	var kindUpl = options.kindUpl;
	var changeNameImg = options.changeName;
	dir = options.directory;
	return this.each(function(){
		var eachThis = $(this);
		var sThisFile;
		var statusChangeNameImg;
		idAndClassTxtImg = eachThis.attr('id')+addStringTxtImg;
		eachThis.parent().prepend('<input type="hidden" class="stxt-tbl-name-directory" value="'+dir+'">');
		eachThis.wrap('<div class="div-wrap-file-upl"></div>');
		eachThis.on('change',function(){
			sThis = $(this);
			if (typeof changeNameImg === 'boolean') {
				sThis.parent().prepend('<input type="hidden" class="s-changeNameImg" value="'+changeNameImg+'">');
			}
			makeFileName();
			if (typeof eThis.attr('id') !== 'undefined') {
				eThisIdClassSelector = eThis.attr('id')+addStringTxtImg;
			}else if (typeof eThis.attr('class') !== 'undefined') {
				eThisIdClassSelector = eThis.attr('class')+addStringTxtImg;
			}
			var valueImgChangeName = sThis.parent().find('.s-changeNameImg').val();
			var valueDirImg = sThis.parent().find('.stxt-tbl-name-directory').val();
			sThis.parent().prepend('<input type="hidden" class="sRe-changeNameImg" value="'+valueImgChangeName+'" name="s-changeNameImg">');
			sThis.parent().prepend('<input type="text" class="stxt-tbl-name-directory" value="'+dir+'" name="stxt-tbl-name-directory">');
			sThis.parent().prepend('<div class="loader"></div>');
			thisNameFile = sThis.attr('name');
			var form = sThis.closest($(classForm));
            var form_data = new FormData(form[0]);
           	$.ajax({
           		url:urlTo,
           		type: 'POST',
                data: form_data,
                contentType: false,
                processData: false,
                catch: false,
                dataType: 'json',
                success: [changeUplImg]
			});
       	});
       	function changeUplImg (data){ 
       		// makeFileName if success is clear name file as array leave
       		makeFileName('success');
       		// getImgSingle after change file success
       		getImgSingle(data.imgName);
        }
		function delImgUpl() {
			eachThis.parent().on('click','.sDelImgSingle',function(){
				sThis = $(this);
				var imgName = sThis.parents('.div-wrap-file-upl').find('+'+idAndClassTxtImg).val();
				sThis.parents('.div-wrap-file-upl').prepend('<div class="loader"></div>');
				$.ajax({
                    url: urlTo,
                    type: 'POST',
                    data: {
                        tblImg: 'tbl_img',
                        folder:dir,
                        imgName: imgName
                    },
                    success: function(data) {
                    	sThis.parents('.div-wrap-file-upl').find('input[type="file"]').val('');
                    	sThis.parents('.div-wrap-file-upl').find('.loader').remove();
                    	sThis.parents('.div-wrap-file-upl').find('.'+idAndClassTxtImg).remove(); 
                        sThis.parents('.div-wrap-file-upl').css({'background-image': 'url("")'});
                        sThis.parents('.div-wrap-file-upl').find('.cover-single-img').remove(); 
                        $('.coverFullScreenImg').remove();
                    }
                });
			});
		}
		function fullImgUpl(){
			eachThis.parent().on('click','.icon-fullscreen',function(){
				sThis = $(this);
				var txtImg = sThis.parents('.div-wrap-file-upl').find('.'+idAndClassTxtImg).val();
				for (var i = 0; i < dir.length; i++) {
					sThis.parents('.div-wrap-file-upl').find('.coverFullScreenImg').remove();
            		sThis.parents('.div-wrap-file-upl').append('<div class="coverFullScreenImg text-center"><div class="box-img"><img src="'+dir[i]+txtImg+'"><div class="box-cover-close"></div></div></div>');
            	}				
				$('body').css({'position':'fixed'});
			});
			eachThis.parent().on('click','.box-cover-close',function(){
				sThis = $(this);
				sThis.parents('.coverFullScreenImg').remove();
				$('body').css({'position':''});
			});
		}
		delImgUpl();
		fullImgUpl();
		
	});
}

$.fn.insertData = function(options){
	var eThis = this;//button click
	var setting = {
		url: '../control/action-single.php',//url find action.php
		form:[],//not yet set
		tbl:'',//tbl_name
		intFieldAndInput:{},//tbl_field:attr(id,class or...) of input or textarea
		conRequired:[],//you need to enter name of tbl_field as array if you want input have required
		formKindSelect: ' ',//'selectOne' if you want data show at all input of form and query only one data, if 'selectTable' if you want all datas to show as table
		selectCondition: {},//if you want to select record with condition
		updateCondition:[] //if you want to update field with condition data: is field_name
	};
	options = $.extend(setting, options);
	var url = options.url;
	var form = options.form;
	var tbl = options.tbl;
	var dataField = options.intFieldAndInput;
	var conRequired = options.conRequired;
	var kindSelect = options.formKindSelect;
	var selectCondition = options.selectCondition;;
	var updateCondition = options.updateCondition;
	return this.each(function(){
		var eachThis = $(this);
		var noId = '';
		eachThis.parents('form').append('<input type="hidden" class="txt-id-insertonly" value=""><input type="hidden" id="imgBannerTbl" class="imgBannerTbl" name="imgBannerTbl" value="'+tbl+'">');
		//add img array to associative array (dataField is array)
		eachThis.css({'position':'relative'});
		
		function getId() {
			$.ajax({
		        url: url,
		        type: 'POST',
		        data: {
		            tblGetId: tbl
		        },
		        catch: false,
		        dataType: 'json',
		        success: function (data) {
		        	switch(kindSelect){
						case 'selectOne':{
							var idD = data.id;
							if (idD > 1) {
								eachThis.parents('form').find('.txt-id-insertonly').val(data.id-1);
							}else {
								eachThis.parents('form').find('.txt-id-insertonly').val(data.id);
							}
							break;
						}
						case 'selectTable':{
							eachThis.parents('form').find('.txt-id-insertonly').val(data.id);
							break;
						}
					}
			        
		        	noId = eachThis.parents('form').find('.txt-id-insertonly').val();
		        }
		    });
		}
		
		dataField['id'] = '.txt-id-insertonly';
		dataField['kind'] = '.imgBannerTbl';
		var msgErr = ['*required'];
		var obj = {};
		// var objTest = {};
		var noImgOr;
		function getValueToInsert(){
			var dataFieldSelector;
			for (var ind in dataField){
				var findHaveImg = eachThis.parents('form').find(dataField[ind]).parents('.div-wrap-file-upl');
				if (typeof findHaveImg.attr('class') !== 'undefined') {//if input type = file
					dataFieldSelector = dataField[ind]+addStringTxtImg;
				}else {
					dataFieldSelector = dataField[ind];
				}
				var valInput = eachThis.parents('form').find(dataFieldSelector).val();
				obj[ind] = valInput;
				if (ind != 'img') {
					noImgOr = 1;
				}else {
					noImgOr = 2;
				}
			}

		}
		getValueToInsert();
		clickInsert();
		function clickInsert(){
			// add more associative array
			eachThis.on('click',function(){
				var eThis = $(this);
				var mmm = [];
				var conRequiredL = conRequired.length;
				getValueToInsert();
				for (var vali in dataField){//message error of no of form
					for (var i = 0; i < conRequired.length; i++) {
						if (vali === conRequired[i]) {
							var dataV = eThis.parents('form').find(dataField[vali]).val();
							if (dataV != '') {
								mmm.push(obj[conRequired[i]]);		
								eThis.parents('form').find(dataField[vali]).parent().find('.txtErrInput').remove();
							}else{
								eThis.parents('form').find(dataField[vali]).parent().find('.txtErrInput').remove();
								eThis.parents('form').find(dataField[vali]).parent().append('<span class="txtErrInput">'+msgErr[0]+'</span>');
							}
						}
					}
				}
				if (mmm.length === conRequiredL) {
					$(this).parents('form').append('<div class="cover-update-loading"></div>');
					$(this).html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
					var txtStatusUpdate = $(this).parents('form').find('#txt-status-update').val();
					var reTxtStatusUpdate;
					if (txtStatusUpdate == 0) {
						reTxtStatusUpdate = 0;
					}else if (txtStatusUpdate == 1) {
						reTxtStatusUpdate = 1;
					}
					$.ajax({
		                url: options.url,
		                type: 'POST',
		                data: {
		                    tbl: tbl,
		                    intFieldAndInput: obj,
		                    reTxtStatusUpdate: reTxtStatusUpdate,//if selectOne = and if reTxtStatusUpdate (0) no data in tbl so you can insert, if reTxtStatusUpdate (1) you only make update record
		                    noImgOr: noImgOr,//if the form no img(1) or have img (2)
		                    updateCondition: updateCondition
		                },
		                catch: false,
		                dataType: 'json',
		                success: function(data) {
		                	eThis.parents('form').find('.cover-update-loading').remove();
		                	eThis.html('Update');
		                	eThis.parents('body').prepend('<div class="status-success">Successful!<span class="icon-close-box-content-status glyphicon glyphicon-remove"></span></div>');
		                	eThis.parents('body').find('.status-success').stop().animate({'right':0},500,function(){
		                			setTimeout(function(){
				                		eThis.parents('body').find('.status-success').stop().animate({'opacity':0},1200,function(){
				                			$(this).remove();
				                		});
				                	},1500);
		                		});
		                	
		                	// getId();
		                	eThis.parents('form').find('#txt-status-update').val(1);
		                }
		            });
				}
			});
		}

		function selectRord(){
			var fielNameSelect = [];
			obj['no'] = '';
			for (var ind in obj){
				fielNameSelect.push(ind);
			}
			eachThis.parents('form').prepend('<input type="hidden" id="txt-status-update">');

			switch(kindSelect){
				case 'selectOne':{
					$.ajax({
						url: url,
	                    type: 'POST',
	                    data: {
	                        tbl: tbl,
	                        selectRecordSingle: fielNameSelect,
	                        selectCondition: selectCondition
	                    },
	                    catch: false,
		                dataType: 'json',
	                    success:function(data){
	                    	
	                    	var dir = $('.stxt-tbl-name-directory').val();
	                    	for (ind1 in dataField){
	                    		for (ind2 in data.data){
	                    			var findHaveImg = eachThis.parents('form').find(dataField[ind1]).parents('.div-wrap-file-upl');
	                    			if (ind1 == ind2) {
										if (typeof findHaveImg.attr('class') !== 'undefined') {//if input type = file
											var findId = findHaveImg.find(dataField[ind1]).attr('id');
											var findClass = findHaveImg.find(dataField[ind1]).attr('class');
											if (typeof findId !== 'undefined') {
												dataFieldSelector = findId+addStringTxtImg;
											}else if (typeof findClass !== 'undefined') {
												dataFieldSelector = findClass+addStringTxtImg;
											}
											if (typeof data.data[ind2] === 'string') {
												findHaveImg.append('<input type="hidden" class="'+dataFieldSelector+'" id="'+dataFieldSelector+'" value="'+data.data[ind2]+'" name="'+dataFieldSelector+'">');
												findHaveImg.css({
													'background-image':'url("'+dir+data.data[ind2]+'")'
												});
												findHaveImg.append(iconClose);
										    	findHaveImg.find('.loader').remove();
											}
										}else {
											dataFieldSelector = dataField[ind1];
										}
										// findHaveImg.append('<input type="text" value="'+data.data[ind2]+'">');
	                    				eachThis.parents('form').find(dataFieldSelector).val(data.data[ind2]);
	                    				console.log(dataFieldSelector+' | '+data.data[ind2])
	                    				eachThis.parents('form').find('#txt-status-update').val(1);
	                    				
	                    			}
	                    		}
	                    	}
	                    }
					});
					break;
				}
			}
			
		}
		selectRord();
		getId();
		
	});
}
