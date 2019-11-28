<?php

interface Interf{
    function insertRecord($table,$fields);
    function updateRecord($table,$fields,$where);
    function deleteRecord($table,$condition);
    function selectRecord($table,$field='*',$condition='');
    function uploadImageMulti($file,$folder,$nameGenerate='');
    function uploadOneImage($file,$folder);
}