    <?php include_once('../header.php'); ?>
    <!-- ============================================================== -->
    <!-- wrapper  -->
    <!-- ============================================================== -->
    <style>
        
    </style>
    <div class="dashboard-wrapper">
        <div class="container-fluid dashboard-content">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h3 class="text-center">General All the Webpage (Desktop & Mobile-site)</h3>
                    <div class="main-box-tab">
                        <h4>ផ្នែកនៃការដូរព័ណ</h4>
                        <ul class="s-tab-menu">
                            <li class="s-active">ទូទៅ</li>
                            <li>សម្រាប់កំព្យូទ័រ</li>
                            <li>សម្រាប់ទូរសព្ទ័</li>
                        </ul>

                        <div>
                            <form class="frm-upl-general-logo" method="post" enctype="multipart/form-data">
                                <input type="hidden" value="tbl_color" id="kindColor">
                                <div class="content-tab-menu">
                                    <div class="form-group">
                                        <label>ព័ណរបស់អក្សរ</label>
                                        <input id="colorText" type="colorPicker"  data-hidetextcolor data-selectcolor="#4138e3" data- data-defaultcolor="<?php echo $db->selectOneRecord('color_text','tbl_general','kind1="tbl_color"'); ?>">
                                    </div>
                                    <div class="form-group">
                                        <label>ព័ណរបស់ចំណងជើងនៃ Section</label>
                                        <input id="colorTitle" type="colorPicker" data-hidetextcolor data-selectcolor="#e3387f" data-defaultcolor="<?php echo $db->selectOneRecord('color_title','tbl_general','kind1="tbl_color"'); ?>" name="colorSubtitle">
                                    </div>
                                    <div class="form-group">
                                        <label>ព័ណដែលអ្នកចង់បង្ហាញថ្មីៗ</label>
                                        <input id="colorCurently" type="colorPicker" data-hidetextcolor data-defaultcolor="<?php echo $db->selectOneRecord('color_curent','tbl_general','kind1="tbl_color"'); ?>" data-selectcolor="rgba(77,22,145,0.39)" name="colorCurent">
                                    </div>
                                </div>
                                <div class="content-tab-menu">
                                    <div class="form-group">
                                        <label>ព័ណផ្ទៃខាងក្រោយនៃ Header</label>
                                        <input type="colorPicker" data-hidetextcolor data-selectcolor="#384de3" data-defaultcolor="<?php echo $db->selectOneRecord('color_desk','tbl_general','kind1="tbl_color"'); ?>" id="backgroundColorDesk" name="background-color-desk">
                                    </div>
                                </div>
                                <div class="content-tab-menu">
                                    <div class="form-group">
                                        <label>ព័ណផ្ទៃខាងក្រោយនៃ Header</label>
                                        <input type="colorPicker" data-hidetextcolor data-selectcolor="#384de3" data-defaultcolor="<?php echo $db->selectOneRecord('color_bg_mobile','tbl_general','kind1="tbl_color"'); ?>" id="backgroundColorMobile" name="background-color-mobile">
                                    </div>
                                </div>
                                <div id="btn-save-color" class="btn-save-color btn btn-default btn-update">Upade</div>
                            </form>
                        </div>
                    </div>

                    <div class="main-box-tab">
                        <h4>ផ្នែកនៃការបញ្ចូលទិន្នន័យទូទៅនៃក្បាលទំព័រ</h4>
                        <ul class="s-tab-menu">
                            <li class="s-active">សម្រាប់កំព្យូទ័រ</li>
                            <li>សម្រាប់ទូរសព្ទ័</li>
                            <li>SEO</li>
                        </ul>
                        <div>
                            <form class="frm-upl-general-logo" method="post" enctype="multipart/form-data">
                                <input type="hidden" value="tbl_header" id="kindHeader">
                                <div class="content-tab-menu">
                                    <div class="form-group">
                                        <label>ស្លាកសញ្ញា (Logo)<span>Image Size (width=auto, height=50px)</span></label>
                                        <input type="hidden" id="logoDesktop" class="form-control" name="logoDesktop" value="logo-desktop">
                                        <div class="box-upload">
                                            <input type="file" id="uplImgLogoDesk" class="uplImgLogoDesk" name="uplImgLogoDesk">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>រូបតំណាង (Shortcut Icon)<span>Image Size (width=40px, height=40px)</span></label>
                                        <input type="hidden" id="logoIcon" class="form-control" name="logoIcon" value="logo-icon">
                                        <div class="box-upload">
                                            <input type="file" id="uplImgShortcutIcon" name="uplImgShortcutIcon">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>ស្លាកសញ្ញារបស់ជើងទំព័រ (Logo Footer)</label>
                                         <input type="hidden" id="logoFooter" class="form-control" name="logoFooter" value="logo-footer">
                                        <div class="box-upload">
                                            <input type="file" id="uplImgFooter" name="uplImgFooter">
                                        </div>
                                    </div>
                                </div>
                                <div class="content-tab-menu">
                                     <div class="form-group">
                                        <label>ស្លាកសញ្ញា (Logo)<span>Image Size (width=auto, height=50px)</span></label>
                                        <input type="hidden" id="logoDesktop" class="form-control" name="logoDesktop" value="logo-desktop">
                                        <div class="box-upload">
                                            <input type="file" id="uplImgFolder" name="uplImgFolder">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="content-tab-menu">
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea id="seoDescription" class="form-control" name="seoDescription"></textarea>
                                    </div>
                                     <div class="form-group">
                                        <label>Keywords</label>
                                        <textarea id="seoKeyword" class="form-control" name="seoKeyword"></textarea>
                                    </div>
                                </div>
                                <div id="btn-save-header" class="btn btn-default btn-update">Upade</div>
                            </form>
                           
                        </div>
                    </div>

                    <div class="main-box-tab">
                        <h4>Social Media</h4>
                        <ul class="s-tab-menu">
                            <li class="s-active">Media</li>
                        </ul>

                        <div>
                            <form class="frm-upl-general-logo" method="post" enctype="multipart/form-data">
                                <input type="hidden" value="tbl_color" id="kindColor">
                                <div class="content-tab-menu" style="width: 70%;">
                                     <div class="form-group">
                                        <label>Icon <span>Image Size (width=30px, height=30px)</span></label>
                                        <input type="hidden" id="logoDesktop" class="form-control" name="logoDesktop" value="logo-desktop">
                                        <div class="box-upload">
                                            <input type="file" id="uplImgFolder" name="uplImgFolder">
                                        </div>
                                    </div>
                                    <div class="form-group" style="width: 49%;float: left;">
                                        <label>Iitle</label>
                                        <input type="text" id="nameIconMedia" class="form-control" name="nameIconMedia">
                                    </div>
                                     <div class="form-group" style="width: 49%; float: right;">
                                        <label>Link</label>
                                        <input type="text" id="linkIconMedia" class="form-control" name="linkIconMedia">
                                    </div>

                                    <div id="btn-save-media" class="btn-save-media btn btn-default btn-update" style="float: right;margin-bottom: 15px;">Upade</div>

                                    <table class="table table-hover table-media">
                                        <thead>
                                            <tr>
                                                <th>Icon</th>
                                                <th>Name</th>
                                                <th>Link</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <script>
                                                for (var i = 0; i < 2; i++) {
                                                    document.write('<tr><td><span class="td-img"><img src="../assets/images/logo.png" alt=""></span></td><td>Facebook</td><td><a href="https://www.facebook.com/seyha.mean" target="_blank">https://www.facebook.com/seyha.mean</a></td><td><span class="td-status-active btn-success"></span></td><td><span class="btn btn-danger">Del</span><span class="btn btn-info">Edit</span></td></tr>');
                                                }
                                            </script>
                                        </tbody>
                                    </table>
                                </div>
                                
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ============================================================== -->
    <?php include_once('../footer.php'); ?>