<?php
session_start();
include_once('../_config_inc.php');
include_once('connect/ConnectDb.php');
$db = new ConnectDb();


if (isset($_POST['tblGetId'])){
    $id = $_POST['tblGetId'];
    $getId = $db->getId('id',$id);
    $status['id'] = $getId;
    echo json_encode($status);
}

// new plugin insert single
if (isset($_POST['intFieldAndInput']) && empty($_POST['reTxtStatusUpdate']) && $_POST['reTxtStatusUpdate'] < 1) {
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
    $db->insertRecord($tbl, $newArr);
    if ($noImgOr != 1) {
        $db->insertRecord($tblImg, $newArrImg);
    }
}

// new plugin update single
if (isset($_POST['intFieldAndInput']) && !empty($_POST['reTxtStatusUpdate']) &&  $_POST['reTxtStatusUpdate'] == 1) {
    $input = $_POST['intFieldAndInput'];
    $tbl = $_POST['tbl'];
    $updateCondition = $_POST['updateCondition'];
    $reFieldArr = $db->selectFieldArr($tbl);
    $date = date("Y/m/d");
    $time=date("h:i:sa");

    $dataArr = array();
    $conUpdate = array();
    foreach ($input as $key => $value) {
        if ($key != 'no' && $key != 'kind') {
            foreach ($reFieldArr as $keyF => $valueF) {
                if ($key == $keyF) {//if have field in table
                    $dataArr[$key] = $value;
                }
            }
            foreach ($updateCondition as $keyCon => $valueCon) {
                if ($key == $valueCon) {
                    $conUpdate[$key] = $value;
                }
            }
            
        }
    }
    $dataArr['date_modify'] = $date;
    $db->updateRecord($tbl,$dataArr,$conUpdate);

    $status['testUpdate'] = $dataArr;
    echo json_encode($status);
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
    $status['test'] = $selectRecordSingle;
    echo json_encode($status);
}


// upload image to folder
if (isset($_FILES['sUplImgFolder'])) {
    $folder = $_POST['stxt-tbl-name-directory'];
    $file = 'sUplImgFolder';
    $changeNameImg = $_POST['s-changeNameImg'];
    if ($changeNameImg == 'true') {
        $db->uploadImageMulti($file, $folder,'no');
    }elseif ($changeNameImg == 'false') {
        $db->uploadImageMulti($file, $folder);
    }
}



$db->closeCnn();

