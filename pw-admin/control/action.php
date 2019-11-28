<?php
session_start();
include_once('../_config_inc.php');
include_once('connect/ConnectDb.php');
$db = new ConnectDb();
//upload video to folder

if (isset($_FILES['sUplImgFolder'])) {
    $folder = $_POST['stxt-tbl-name-directory'];
    $file = 'sUplImgFolder';
    $db->uploadOneImageNoGenerateNameArrDir($file,$folder);
}

if (isset($_POST['notKindImgVideo'])){
    $notKindImgVideo = $_POST['notKindImgVideo'];
    if ($notKindImgVideo == 1){
        if (isset($_FILES['sFileImg'])){
            $file = 'sFileImg';
            $folder = $_POST['txtFolderImg'];
            $kindUpl = $_POST['txtKindUplImg'];
            if ($kindUpl === 'only'){
                $db->uploadOneImageNoGenerateName($file, $folder);
            }else if ($kindUpl === 'multi'){
                $db->uploadImageMulti($file, $folder);
            }
        }
    }else if ($notKindImgVideo == 2){
        //upload video to folder
        if (isset($_FILES['fileVideo'])){
            $file = 'fileVideo';
            $folder = $_POST['txtFolderVideo'];
            $db->uploadVideo($file, $folder);
        }
    }
}


if (isset($_POST['fieldAndData'])){
    $tbl = $_POST['tbl'];
    $fieldAndData = $_POST['fieldAndData'];
    $session = $_POST['session'];
    $cookie = $_POST['cookie'];
    $db->login($tbl,$fieldAndData,$session,$cookie);
}


if (isset($_POST['consSession'])){
    $consSession = $_POST['consSession'];
    $fieldAndData2 = $_POST['fieldAndData2'];
    if ($consSession == 1){
        $db->setSession($fieldAndData2);
    }
}

//delete img from $folder
if (isset($_POST['folder'])){
    $tblImg = $_POST['tblImg'];
    $folder = $_POST['folder'];
    $imgName = $_POST['imgName'];
    $where = array(
        'img' => $imgName
    );
    $db->deleteRecord($tblImg, $where);
    $db->deleteRecord($folder, $where);
}
if (isset($_POST['tblGetId'])){
    $id = $_POST['tblGetId'];
    $getId = $db->getId('id',$id);
    $status['id'] = $getId;
    echo json_encode($status);
}
//inset data to tbl
if (isset($_POST['sData'])){
    $reArr = array();
    $sDataTest = $_POST['sData'];
    $tbl = $_POST['tbl'];
    $xEdit = $_POST['xEdit'];
    $date = date("Y/m/d");
    $time=date("h:i:sa");
    $no = $_POST['no'];
    $reField = $db->selectField($tbl);
    $arrField = explode(',', $reField);//make dataFields as array with explode
    $editDate = '';
    $editTIme = '';
    for ($i=1,$j=0; $i<count($arrField)-1,$j<count($sDataTest); $i++,$j++){
        if ($arrField[$i] !== ''){
            if ($xEdit == 1){//insert
                if ($arrField[$i] === 'date'){
                    $reArr[$arrField[$i]] = $date;
                }else if ($arrField[$i] === 'date_modify'){
                    $reArr[$arrField[$i]] = $date;
                }else if ($arrField[$i] === 'time'){
                    $reArr[$arrField[$i]] = $time;
                }else if ($arrField[$i] === 'view'){
                    $reArr[$arrField[$i]] = 0;
                }else if ($arrField[$i] === 'password'){
                    $reArr[$arrField[$i]] = password_hash($sDataTest[$j],PASSWORD_DEFAULT);
                }else {
                    $reArr[$arrField[$i]] = $sDataTest[$j];//output: fieldsName => dataValue
                }
            }else if ($xEdit == 2){//update
                if ($arrField[$i] === 'date'){//get date and time when you update because we don't update date and time
                    $getDate = $db->selectRecord($tbl,'date,time','id = '.$no.'');
                    foreach ($getDate as $value){
                        $editDate = $value[0];
                        $editTIme = $value[1];
                    }
                }
                if ($arrField[$i] === 'date'){
                    $reArr[$arrField[$i]] = $editDate;
                }else if ($arrField[$i] === 'date_modify'){
                    $reArr[$arrField[$i]] = $date;
                }else if ($arrField[$i] === 'time'){
                    $reArr[$arrField[$i]] = $editTIme;
                }else if ($arrField[$i] === 'view'){
                    $reArr[$arrField[$i]] = 0;
                }else if ($arrField[$i] === 'password'){
                    $editPass = $_POST['editPass'];
                    if($editPass == 2){
                        $reArr[$arrField[$i]] = password_hash($sDataTest[$j],PASSWORD_DEFAULT);
                    }
                }else {
                    $reArr[$arrField[$i]] = $sDataTest[$j];
                }
            }
        }

    }

    if ($xEdit == 1){
        $db->insertRecord($tbl, $reArr);
    }else if ($xEdit == 2 || $xEdit == 3){
        if (isset($_POST['updateOtherTbl'])){
            $tblOther = $_POST['updateOtherTbl'];
            $fieldOther = $_POST['updateOtherField'];
            $fieldNameOther = $_POST['updateOtherCondition'];
            $fieldNameOther = implode(',',$fieldNameOther);//field name [name] that get from tbl that you you want to update
            $fieldOther = implode(',',$fieldOther);//order tbl field-name: to make condition that you want to update other field => update auto
            $getCondition = $db->selectRecord($tbl,$fieldNameOther,'id = '.$no.'');//query data before update to make condition=>tbl that you update
            $getCondition = implode(',',$getCondition[0]);
            $reArrOther = array(
                $fieldOther => $reArr[$fieldNameOther]
            );
            $whereOther = array(
                $fieldOther => $getCondition
            );
            $db->updateRecord($tblOther,$reArrOther,$whereOther);
        }

        if ($xEdit == 3){//click edit action single
            $reArr = array(
                'action' => $sDataTest
            );
        }
        $where = array(
            'id' => $no
        );
        $db->updateRecord($tbl, $reArr, $where);
    }
    $db->setSession($reArr);
//    $_SESSION['email'] = 'dddd';
}


//insert img // it default
if (isset($_POST['sImgName'])){
    $tbl = $_POST['tbl'];
    $no = $_POST['no'];
    $kind = $_POST['kind'];
    $img = $_POST['sImgName'];
    $action = $_POST['action'];
    $date = date("Y/m/d");
    $time=date("h:i:sa");

    $fieldImg = array(//name of tbl is default
        "id" => $no,
        "date" => $date,
        "time" => $time,
        "kind" => $kind,
        "img" => $img,
        "action" => $action
    );
    $db->insertRecord($tbl,$fieldImg);
}

//insert video // it default
if (isset($_POST['sVideo'])){
    $tbl = $_POST['tbl'];
    $no = $_POST['no'];
    $kind = $_POST['kind'];
    $video = $_POST['sVideo'];
    $kindTab = $_POST['kindTab'];
    $xEdit = $_POST['xEdit'];
    $action = $_POST['action'];
    $date = date("Y/m/d");
    $time=date("h:i:sa");

    $deWhere = array(
        'id' => $no
    );
    $db->deleteRecord($tbl, $deWhere);
    if (!empty($video)){
        $fieldVideo = array(//name of tbl is default
            "id" => $no,
            "date" => $date,
            "time" => $time,
            "kind" => $kind,
            "kind_tab" => $kindTab,
            "video" => $video,
            "action" => $action
        );
        $db->insertRecord($tbl,$fieldVideo);
    }
}

//get option when javascript: type select = object
if (isset($_POST['option'])){
    $tbl = $_POST['option'];
    $id = $_POST['id'];
    $rId = array();
    $sId = '';
    if ($id != ''){
        for ($i = 0; $i < count($id); $i++){
            $rId[] = 'id = '.$id[$i];
            $sId = implode(' or ',$rId);
        }
    }else {
        $sId = 'id';
    }
    $result = $db->selectRecord($tbl,'','action=1 or action=0 and '.$sId.' ORDER BY id DESC');
    $v = '';
    $name = '';
    foreach ($result as $value){
        $v .= $value[1].',';
        $name .= $value[2].',';
        $status['v'] = $v;
        $status['n'] = $name;
        $status['id'] = $sId;
        $status['con'] = $id;
    }
    echo json_encode($status);
}

//get data from fields of tbl and throw data to form through off fieldEdit[]
if (isset($_POST['fieldEdit'])){
    $fieldEdit = $_POST['fieldEdit'];//array name of tbl fields
    $tbl = $_POST['tbl'];
    $no = $_POST['no'];
    $arrN = array();
    $arrNu = array();
    $imN = '';
    for ($i = 0; $i < count($fieldEdit); $i++){
        $arrN[] = $fieldEdit[$i];//make fields name as array object
        $imN = implode(',',$arrN);//implode ',' into array and make fields name as string by implode
    }
    $nnn = array();
    $arrImg = array();
    $arrVideo = array();
    $dataVideo = '';
    $testS = $db->selectRecord($tbl,$imN,'id = '.$no.' ');//select data at any fields as you want
    foreach ($testS as $value){//get data
        for ($i = 0; $i < count($value); $i++){//find index of fields to get data through off index $i
            $nnn[] = $value[$i];//make data as array object
        }
    }
    $imgEdit = $db->selectRecord('tbl_img','','id = '.$no.' and kind = "'.$tbl.'" ');//select img
    foreach ($imgEdit as $imValue){
        $arrImg[] = $imValue[5];//make img as array object
    }

    $videoEdit = $db->selectRecord('tbl_video','','id = '.$no.' and kind = "'.$tbl.'" ');//select img
    foreach ($videoEdit as $videoValue){
        $arrVideo[] = $videoValue[6];//make video as array object
        $dataVideo = $videoValue[5];//make data-video as array object
    }

    $status['imgEdit'] = $arrImg;//convert img to json
    $status['videoEdit'] = $arrVideo;//convert data to json
    $status['dataVideo'] = $dataVideo;//single numner
    $status['dataEdit'] = $nnn;//convert data to json
    echo json_encode($status);
}

if (isset($_POST['tblRowCountData2'])){
    $reConCount = '';
    $tblRowCountData = $_POST['tblRowCountData2'];
    $amountData = $_POST['amountData'];
    $getDataRowCount = $db->selectCount($tblRowCountData,'no');
    $reGetDataRowCount = $getDataRowCount / $amountData;
    $reDetermineRowCount = '';
    if (ceil($reGetDataRowCount) > 5){
        $reDetermineRowCount = 5;
    }else {
        $reDetermineRowCount = ceil($reGetDataRowCount);
    }
    $link = $db->getBaseUrl();
    $status['rowCount'] = ceil($reGetDataRowCount);
    $status['determineRowCount'] = $reDetermineRowCount;
    $status['amountData'] = $getDataRowCount;
    $status['baseUrl'] = $link;
    echo json_encode($status);
}

if (isset($_POST['tblRowCountData'])){
    $reConCount = '';
    $tblRowCountData = $_POST['tblRowCountData'];
    $amountData = $_POST['amountData'];
    $conCount = $_POST['conCount'];
    if ($conCount == 'allAcNo'){
        $reConCount = 'no';
    }else if ($conCount == 'user'){
        $reConCount = 'no and action = 0';
    }else if ($conCount == 'deactive'){
        $reConCount = 'no and action = 1';
    }

    $sId = '';
    $sName = '';
    if (isset($_POST['idSpecificSelect'])){
        $idSpecificSelect = $_POST['idSpecificSelect'];
        $fieldNameOnlyOneDataMenu = $_POST['fieldNameOnlyOneDataMenu'];
        $rId = array();
        $rName = array();
        if ($idSpecificSelect != ''){
            for ($i = 0; $i < count($idSpecificSelect); $i++){
                $rId[] = ''.$fieldNameOnlyOneDataMenu.' = '.$idSpecificSelect[$i];
                $sId = implode(' or ',$rId);
            }
            $sId = ''.$sId.' and ';
        }else {
            $sId = '';
        }
    }


    $getDataRowCount = $db->selectCount($tblRowCountData,' '.$sId.' '.$reConCount.' ');
//    $getDataRowCount = $db->selectCount($tblRowCountData,'no');
    $reGetDataRowCount = $getDataRowCount / $amountData;
    $reDetermineRowCount = '';
    if (ceil($reGetDataRowCount) > 5){
        $reDetermineRowCount = 5;
    }else {
        $reDetermineRowCount = ceil($reGetDataRowCount);
    }
    $link = $db->getBaseUrl();
    $newLink = substr($link,16);
    $status['rowCount'] = ceil($reGetDataRowCount);
    $status['determineRowCount'] = $reDetermineRowCount;
    $status['amountData'] = $getDataRowCount;
    $status['baseUrl'] = $link;
    $status['testSId'] = $sId;
    echo json_encode($status);
}

if (isset($_POST['dataPageStand'])){
    $dataPageStand = $_POST['dataPageStand'];
    $status['dataPageStand']=$dataPageStand;
    echo json_encode($status);
}

if (isset($_POST['fieldQuery'])){
    $tbl = $_POST['tbl'];
    $fieldQuery = $_POST['fieldQuery'];
    $statusDb = $_POST['status'];
    $amountData = $_POST['amountData'];
    $amountStartPagi = $_POST['amountStartPagi'];
    $subAmountData = '';
    $arrTh = $_POST['arrTh'];

    $arrN = array();
    $img = array();
    $impN = '';
    $impNSearch = '';
    $getDataFeild = '';
    $reStatusDb = '';
    $reStatusDb2 = '';
    $dataSearch = '';
    $sId = '';
    $sName = '';
    $Test = '';
    for ($i = 0; $i < count($fieldQuery); $i++){
        $arrN[] = $fieldQuery[$i];//make fields name as array object
        $impN = implode(',',$arrN);//implode ',' into array and make fields name as string by implode
    }

    if ($statusDb == 'admin'){
        if (isset($_POST['idSpecificSelect']) && $_POST['idSpecificSelect'] != ''){
            $idSpecificSelect = $_POST['idSpecificSelect'];
            $fieldNameOnlyOneDataMenu = $_POST['fieldNameOnlyOneDataMenu'];
            $rId = array();
            if ($idSpecificSelect != ''){
                for ($i = 0; $i < count($idSpecificSelect); $i++){
                    $rId[] = ''.$fieldNameOnlyOneDataMenu.' = "'.$idSpecificSelect[$i].'" ';
                    $reStatusDb = implode(' or ',$rId);
                }
                $reStatusDb = ''.$reStatusDb.' and action = 0 or '.$reStatusDb.' and action = 1';
            }else {
                $reStatusDb = '';
            }
        }else {
            $reStatusDb = 'action = 0 or action = 1';
        }

        $subAmountData = $amountData * ($amountStartPagi-1);
//        $subAmountData = 0;
    }else if ($statusDb == 'user'){
        if (isset($_POST['idSpecificSelect']) && $_POST['idSpecificSelect'] != ''){
            $idSpecificSelect = $_POST['idSpecificSelect'];
            $fieldNameOnlyOneDataMenu = $_POST['fieldNameOnlyOneDataMenu'];
            $rId = array();
            if ($idSpecificSelect != ''){
                for ($i = 0; $i < count($idSpecificSelect); $i++){
                    $rId[] = ''.$fieldNameOnlyOneDataMenu.' = "'.$idSpecificSelect[$i].'" ';
                    $reStatusDb = implode(' or ',$rId);
                }
                $reStatusDb = ''.$reStatusDb.' and action = 0';
            }else {
                $reStatusDb = '';
            }
        }else {
            $reStatusDb = 'action = 0';
        }

        $subAmountData = $amountData * ($amountStartPagi);
//        $subAmountData = 0;
    }else if ($statusDb == 'deactive'){
        if (isset($_POST['idSpecificSelect']) && $_POST['idSpecificSelect'] != ''){
            $idSpecificSelect = $_POST['idSpecificSelect'];
            $fieldNameOnlyOneDataMenu = $_POST['fieldNameOnlyOneDataMenu'];
            $rId = array();
            if ($idSpecificSelect != ''){
                for ($i = 0; $i < count($idSpecificSelect); $i++){
                    $rId[] = ''.$fieldNameOnlyOneDataMenu.' = "'.$idSpecificSelect[$i].'" ';
                    $reStatusDb = implode(' or ',$rId);
                }
                $reStatusDb = ''.$reStatusDb.' and action = 1';
            }else {
                $reStatusDb = '';
            }
        }else {
            $reStatusDb = 'action = 1';
        }

        $subAmountData = $amountData * ($amountStartPagi-1);
    }else if ($statusDb == 'allAcNo'){
        if (isset($_POST['idSpecificSelect']) && $_POST['idSpecificSelect'] != ''){
            $idSpecificSelect = $_POST['idSpecificSelect'];
            $fieldNameOnlyOneDataMenu = $_POST['fieldNameOnlyOneDataMenu'];
            $rId = array();
            if ($idSpecificSelect != ''){
                for ($i = 0; $i < count($idSpecificSelect); $i++){
                    $rId[] = ''.$fieldNameOnlyOneDataMenu.' = "'.$idSpecificSelect[$i].'" ';
                    $reStatusDb = implode(' or ',$rId);
                }
                $reStatusDb = ''.$reStatusDb.' and action = 0 or '.$reStatusDb.' and action = 1';
            }else {
                $reStatusDb = '';
            }
        }else {
            $reStatusDb = 'action = 0 or action = 1';
        }

        $subAmountData = 0;
    }else if ($statusDb == 'searchLive'){
        $dataSearch = $_POST['dataSearch'];
        $arrDataS = explode('#',$dataSearch);


        if (isset($_POST['idSpecificSelect'])){
            $idSpecificSelect = $_POST['idSpecificSelect'];
            $fieldNameOnlyOneDataMenu = $_POST['fieldNameOnlyOneDataMenu'];
            $rId = array();
            if ($idSpecificSelect != ''){
                for ($i = 0; $i < count($idSpecificSelect); $i++){
                    $rId[] = ''.$fieldNameOnlyOneDataMenu.' = "'.$idSpecificSelect[$i].'" ';
                    $reStatusDb = implode(' or ',$rId);
                }

                if ($dataSearch == '*0' || $dataSearch == '*active'){
                    $impNSearch = $reStatusDb.' and action = 0 ';//implode ',' into array and make fields name as string by implode
                }else if ($dataSearch == '*1' || $dataSearch == '*deactive'){
                    $impNSearch = $reStatusDb.' and action = 1 ';//implode ',' into array and make fields name as string by implode
                }else if ($dataSearch[0] == '#'){
                    for ($reS = 0; $reS < count($arrDataS); $reS++){
                        $impNSearch = $reStatusDb.' and id = '.$arrDataS[$reS].' ';
                    }
                }else {
                    $impNSearch = implode(' LIKE \'%'.$dataSearch.'%\' or '.$reStatusDb.' and ',$arrN);//implode ',' into array and make fields name as string by implode
                    $impNSearch =$reStatusDb.' and '.$impNSearch.' LIKE \'%'.$dataSearch.'%\' ';//implode ',' into array and make fields name as string by implode
                }
                $reStatusDb = $impNSearch;
            }else {
                $reStatusDb = '';
            }
        }else {
            if ($dataSearch == '*0' || $dataSearch == '*active'){
                $impNSearch = ' action = 0 ';//implode ',' into array and make fields name as string by implode
            }else if ($dataSearch == '*1' || $dataSearch == '*deactive'){
                $impNSearch = ' action = 1 ';//implode ',' into array and make fields name as string by implode
            }else if ($dataSearch[0] == '#'){
                for ($reS = 0; $reS < count($arrDataS); $reS++){
                    $impNSearch = ' id = '.$arrDataS[$reS].' ';
                }
            }else {
                $impNSearch = implode(' LIKE \'%'.$dataSearch.'%\' or ',$arrN);//implode ',' into array and make fields name as string by implode
                $impNSearch = $impNSearch.' LIKE \'%'.$dataSearch.'%\' ';//implode ',' into array and make fields name as string by implode
            }
        }
        $reStatusDb = $impNSearch;
        $subAmountData = 0;
    }else if ($statusDb == 'pagination'){
        $subAmountData = $amountData * ($amountStartPagi-1);
        $reStatusDb = 'action = 0 or action = 1';
    }


    $result = array();
    $getDataFeild = $db->selectRecord($tbl,$impN,'  '.$reStatusDb.' ORDER BY id DESC LIMIT '.$subAmountData.','.$amountData.' ');//select data at any fields as you want
    foreach ($getDataFeild as $key => $value){
        $imgsId = $value[0];
        $resultSubImg = $db->selectRecord('tbl_img','','id='.$imgsId.' and kind="'.$tbl.'" LIMIT 0,1');
        foreach ($resultSubImg as $valueImg){
            $img[$valueImg[1]] = $valueImg[5];
        }
        $arrMbSubstr = array();
        for ($mb = 0; $mb < count($value); $mb++){
            $str = strip_tags($value[$mb]);
            $arrMbSubstr[] = mb_substr($str,0,40);
        }
        $result[] = $arrMbSubstr;
    }

    $tblName = $db->selectTblName();
    $status['tblName'] = $tblName;
    $status['img'] = $img;
    $status['fieldName'] = $fieldQuery;
    $status['dataTable'] = $result;//convert data to json
    $status['arrTh']=$arrTh;
    echo json_encode($status);
}

if (isset($_POST['fieldQueryInd'])){
    $tbl = $_POST['tbl'];
    $fieldQueryInd = $_POST['fieldQueryInd'];//[]
    $reFieldName = implode(',',$fieldQueryInd);//[] => string1, string2...
    $amountQuery = $_POST['amountQuery'];//number
    $reAmountQuery;
    if ($amountQuery != ''){
        $reAmountQuery = 'LIMIT 0,'.$amountQuery.'';
    }else if ($amountQuery == ''){
        $reAmountQuery = '';
    }
    $condition = $_POST['condition'];
    $reGetDataFeild = array();
    $getDataFeild = $db->selectRecord($tbl,'id,'.$reFieldName,' '.$condition.' ORDER BY id DESC '.$reAmountQuery.' ');
    foreach ($getDataFeild as $value){
        $imgsId = $value[0];
        $resultSubImg = $db->selectRecord('tbl_img','','id='.$imgsId.' and kind="'.$tbl.'" LIMIT 0,1');
        foreach ($resultSubImg as $valueImg){
            $img[$valueImg[1]] = $valueImg[5];
        }
        $arrMbSubstr = array();
        for ($mb = 0; $mb < count($value); $mb++){
            $str = strip_tags($value[$mb]);
            $arrMbSubstr[] = mb_substr($str,0,40);
        }
        $reGetDataFeild[] = $arrMbSubstr;
    }
    $status['dataInd'] = $reGetDataFeild;
    if (!empty($img)){
        $status['img'] = $img;
    }

    echo json_encode($status);
}

if (isset($_POST['idDelete'])) {
    $tbl = $_POST['tbl'];
    $idDelete = $_POST['idDelete'];
    $folder = $_POST['folderBtnDel'];
    $img = array();

    $delDataRecord = array(
        'id' => $idDelete
    );
    $delVidRecord = array(
        'id' => $idDelete
    );
    $delImgRecord = array(
        'id' => $idDelete,
        'kind' => $tbl
    );
    $resultSubImg = $db->selectRecord('tbl_img','','id = '.$idDelete.' and kind = "'.$tbl.'" ');//select img
    foreach ($resultSubImg as $valueImg){
        // $img[] = $valueImg[3];
        $delImgFolder = array(
            'img' => $valueImg[5]
        );
        $db->deleteRecord($folder,$delImgFolder);
    }

    $db->deleteRecord($tbl,$delDataRecord);
    $db->deleteRecord('tbl_video',$delVidRecord);
    $db->deleteRecord('tbl_img',$delImgRecord);
}

if (isset($_POST['tblImgData'])){
    $tbl = $_POST['tblImgData'];
    $kind = $_POST['kind'];
    $reImg = $db->selectRecord($tbl,'','kind = "'.$kind.'" ORDER BY no DESC ');
    $status['tblImgDataT'] = $reImg;
    echo json_encode($status);
}



// new plugin insert single
if (isset($_POST['intFieldAndInput'])) {
    $reTxtStatusUpdate = $_POST['reTxtStatusUpdate'];
    $noImgOr = $_POST['noImgOr'];
    $tbl = $_POST['tbl'];
    $tblImg = 'tbl_img';
    $input = $_POST['intFieldAndInput'];
    $newArr = array();
    $newArrImg = array();
    $date = date("Y/m/d");
    $time=date("h:i:sa");
    $action=0;
    $conText;
    $conImg;
    $reField = $db->selectField($tbl);
    $arrField = explode(',', $reField);//make dataFields as array with explode
    $arrayTest = array();
    foreach ($input as $key => $value) {
        if ($key != 'no') {
            if ($key == 'img' || $key == 'id' || $key == 'kind') {
                $newArrImg[$key] = $value;
                $newArrImg['date'] = $date;
                $newArrImg['time'] = $time;
            }
            if ($key != 'img'){
                for ($i=0; $i < count($arrField)-1; $i++) {
                    if ($arrField[$i] == $key) {
                        $newArr[$key] = $value;
                        $newArr['date'] = $date;
                        $newArr['time'] = $time;
                        $newArr['date_modify'] = $date;
                    }
                }
            }
        }
        if ($key == 'id') {//get id to make condition when data is update
            $arrayTest[$key] = $value;
        }
    }
    $newArr['action'] = $action;
    $newArrImg['action'] = $action;
    if (empty($reTxtStatusUpdate) && $reTxtStatusUpdate < 1) {// insert
        $db->insertRecord($tbl, $newArr);
        if ($noImgOr != 1) {
            $db->insertRecord($tblImg, $newArrImg);
        }
    }else {// update
        $db->updateRecord($tbl,$newArr,$arrayTest);
    }
}
$idOrNo = 'id';
if (isset($_POST['selectRecordSingle'])) {
    $tbl = $_POST['tbl'];
    $selectRecordSingle = $_POST['selectRecordSingle'];
    $selectCondition = $_POST['selectCondition'];
    $reField = $db->selectFieldArr($tbl);
    $reValue = '';
    $reFieldCon = '';
    $count = 1;
    $countCon = 1;

    foreach ($selectRecordSingle as $key => $value) {
        foreach ($reField as $key2 => $value2) {
            if ($value == $value2) {
                if ($count == count($selectRecordSingle)) {
                    $reValue .= $value;
                }else {
                    $reValue .= $value.',';
                }
            }
        }
        $count ++;
    }
    foreach ($selectCondition as $key => $value) {
        if ($countCon == count($selectCondition)) {
            $reFieldCon .= $key.'="'.$value.'"';
        }else {
            $reFieldCon .= $key.'="'.$value.'" and ';
        }
        $countCon ++;
    }
    $data = $db->selectRecord2($tbl,$reValue,$reFieldCon);
    $dataObj = array();
    for ($i=0, $j=0; $i < count($selectRecordSingle), $j < count($data); $i++, $j++) {
        $dataObj[$selectRecordSingle[$i]] = $data[$j];
    }
    foreach ($dataObj as $key => $value) {
        if ($key == 'id') {
            $img = $db->selectRecord('tbl_img','img','id = '.$value.'');
            foreach ($img as $valueImg) {
                $img = $valueImg;
                $dataObj['img'] = $img;
            }
        }
    }
    $status['data'] = $dataObj;
    $status['test'] = $data;
    echo json_encode($status);
}





$db->closeCnn();

