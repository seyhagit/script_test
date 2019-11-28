<?php
include_once('../_config_inc.php');
$BATH_URL = BASE_URL;
include_once('connect/ConnectDb.php');
$db = new ConnectDb();

if (isset($_POST['message'])){
    if(isset($_POST['captcha']) && !empty($_POST['captcha'])){
        $captcha = $_POST['captcha'];
        //your site secret key
        $secret = '6LdZAC4UAAAAAMYLDn0FU4SGP9zvbG8IUuCwREJ9';
        //ip
        $ip = $_SERVER['REMOTE_ADDR'];
        //get verify response data
        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret="'.$secret.'"&response="'.$captcha.'"&remoteip="'.$ip.'" ');
        $responseData = json_decode($verifyResponse);
        if($responseData->success){
            //captacha validated successfully.
            $date = date("Y/m/d");
            $time=date("h:i:sa");
            $no = $_POST['no'];
            $name = $_POST['name'];
            $email = $_POST['email'];
            $subject = $_POST['subject'];
            $message = $_POST['message'];
            $tbl = 'tbl_usercontact';
            $fieldData = array(
                "id" => $no,
                "date" => $date,
                "time" => $time,
                "name" => $name,
                "email" => $email,
                "subject" => $subject,
                "message" => $message,
                "action" => 0
            );
            $db->insertRecord($tbl,$fieldData);
            $status['msg'] = "you had send successfully.";
        }else {
            $status['msg'] = "Robot verification failed, please try again.";
        }
    }else{
        $status['msg'] = 'please complete i\'m not robot.';
    }

    echo json_encode($status);
}

?>

