$(document).ready(function(){
    $('.boxOptionCate').on('click','ul > li',function(){
        var eThis = $(this);
        var relThis = eThis.attr('rel');
        $('.boxOptionCate  ul > li').removeClass('active');
        eThis.addClass('active');
        $('.contentFormAddCategory').hide();
        $('#'+relThis).show();
    });

    $('.frmAddCategories').imgUpload(
        {
            urlTo:'../control/uploadImgToFolder.php',
            rule:{
                txtNo:{
                    title:'លេខរៀង',
                    type:'no'
                },
                name:{
                    title:'ឈ្មោះ',
                    type:'text',
                    required:true
                },
                action:{
                    title:'បង្ហាញ ឬមិនបង្ហាញ',
                    type:'select',
                    option:['បង្ហាញ','មិនបង្ហាញ']
                }
            },
            boxImg:{
                kind:'only',
                directory:'../assets/pic/categories/',
                title:'ជ្រើសរើសរូបភាព'
            },
            sendTo:{
                tbl:'tbl_categories',
                data:['txtNo','name','action'],
                edit:['no','name'],
                transferDataToForm:['#txtNo', '#name']//allow with tbl fields when click edit and transfer data to form
            },
            table:{
                action:true,
                fieldInput:['#txtNo', '#name', '.sBoxImg'],
                dataTable:true
            }
        }
    );

    $('.frmAddSubcategories').imgUpload(
        {
            urlTo:'../control/uploadImgToFolder.php',//find file action.php//default
            rule:{//to build input type
                txtNo:{//make id, class, and name Ex: id="txtNo"
                    title:'លេខរៀង',//title in label
                    type:'no'//type of input EX: no, text, {} is object, select, textarea
                },
                name:{
                    title:'ឈ្មោះ',
                    type:'text',
                    required:true,//required = true, input need have data
                    length:3//amount value as length of input
                    //number:true//input,enter only number
                },
                noCate:{
                    title:'ប្រភេទទំនិញ',
                    type:{
                        options:'tbl_categories'//type is object => and options is tblName and get data from tbl to make option in select
                    }
                },
                action:{
                    title:'បង្ហាញ ឬមិនបង្ហាញ',
                    type:'select',//type is select and only make option by you self
                    option:['បង្ហាញ','មិនបង្ហាញ']//if type = select so you can build option as array by you self
                }
            },
            boxImg:{//to upload img
                kind:'only',//upload as one img(only) or more(multi)
                directory:'../assets/pic/categories/',//upload img to directory name
                title:'ជ្រើសរើសរូបភាព'//title in label
            },
            sendTo:{//to send to database
                tbl:'tbl_subcategories',//tbl name that you want to store data
                data:['txtNo','name','action','noCate'],//allow array name with tbl fields and input value by name input //Ex: tbl => name|action|no_cate *No or ID no need input in data[]
                edit:['no','name','no_cate'],//enter name tbl fields when click edit and get data from tbl
                transferDataToForm:['#txtNo', '#name', '#noCate']//allow with tbl fields when click edit and transfer data to form
            },
            table:{//to throw data to table
                checkBox:false,//if you want checkBox in table
                action:true,//if you you want action[edit,del] in table
                fieldInput:['#txtNo', '#name', '#noCate'],//allow with table when click save and append to table
                dataTable:true//you want to append data to table or not
            }
        }
    );

    $('.frmAddDataItems').imgUpload({
        urlTo:'../control/uploadImgToFolder.php',
        rule:{
            txtNo:{
                title:'លេខរៀង',
                type:'no'
            },
            name:{
                title:'ចំណងជើង',
                type:'text',
                required:true,
                length:5
            },
            detail:{
                title:'លម្អិត',
                type:'textarea'
            },
            noSubcate:{
                title:'ម៉ាកផលិតផល',
                type:{
                    options:'tbl_subcategories'
                }
            },
            price:{
                title:'តម្លៃ',
                type:'text',
                required:true,
                number:true
            },
            action:{
                title:'បង្ហាញ ឬមិនបង្ហាញ',
                type:'select',
                option:['បង្ហាញ','មិនបង្ហាញ']
            }
        },
        boxImg:{
            kind:'multi',
            directory:'../assets/pic/items/',
            title:'ជ្រើសរើសរូបភាព'
        },
        sendTo:{
            tbl:'tbl_items',
            data:['date','time','noSubcate','name','detail','price','view','action']//allow with tbl fiels name put at all ecepted no,
            edit:['no','no_optsub','name','detail','price'],
            transferDataToForm:['#txtNo','#noSubcate','#name','#detail','#price']
        },
        table:{
            checkBox:false,
            action:true,
            fieldInput:['#txtNo','#name','#detail','#noSubcate','#price'],
            dataTable:true
        }

    });



    autosize(document.querySelectorAll('.detail'));


});
