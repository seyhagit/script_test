<?php  

if (isset($_POST['sUplImgFolder'])) {
    $img = $_POST['sUplImgFolder'];
    $status['img'] = "ddddd";
    echo json_encode($status);
}

?>