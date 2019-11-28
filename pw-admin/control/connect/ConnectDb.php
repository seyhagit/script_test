<?php
include_once('Interf.php');
class ConnectDb implements Interf{

//    sample inner join
//$slideShow = $db->selectRecord('tbl_slideshow INNER JOIN tbl_img ON tbl_img.id=tbl_slideshow.id','tbl_slideshow.watermark1, tbl_slideshow.watermark2, tbl_slideshow.title, tbl_slideshow.detail, tbl_img.img','tbl_slideshow.action=0 and tbl_img.kind="tbl_slideshow" ORDER BY tbl_slideshow.id ASC LIMIT 0,2');

    protected function connect(){
//        $this->base_url = $_SERVER['HTTP_REFERER'];
//        $this->base_url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);//get path that stand at last file Ex:.js
        $this->hostname = "localhost";
        $this->username = "root";
        $this->password = "";
        $this->databasename = "market"; 
        $cnn = new mysqli( $this->hostname, $this->username, $this->password, $this->databasename);
        $cnn->set_charset('utf8');
        return $cnn;
    }
    function closeCnn(){
        $this->connect()->close();
    }

    function insertRecord($table, $fields){
        // TODO: Implement insertRecord() method.
        $sFields = '';
        $sValue ='';
        $con = 1;
        foreach ($fields as $fieldName => $value){
            if ($con == count($fields)){
                $sFields .= $fieldName;
                $sValue .= "'".$value."'";
            }else {
                $sFields .= $fieldName. ", ";
                $sValue .= "'".mysqli_escape_string($this->connect(),$value)."', ";
            }
            $con++;
        }
        $sql = "INSERT INTO $table($sFields) VALUES($sValue)";
        $this->connect()->query($sql);
        if ($table != 'tbl_img') {
            $status['test'] = $this->getId('id',$table);
            $status['bbbb'] = $fields;
            echo json_encode($status);
        }
    }

    
   
    function insertImgMulti($table, $fields){
        $sql="INSERT INTO ".$table." VALUES (null,$fields) ";
        $this->connect()->query($sql);
    }

    function updateRecord($table, $fields, $where){
        // TODO: Implement updateRecord() method.
        $sql="";
        $condition="";
        foreach($where as $key => $value){
            $condition .= $key . "='" .$value. "' AND ";
        }
        $condition = substr($condition, 0, -5);
        foreach($fields as $key => $value){
            $sql .= $key . "='" .$value. "', ";
        }
        $sql = substr($sql, 0, -2);
        $sql ="UPDATE ".$table." SET ".$sql." WHERE ".$condition." ";
        $this->connect()->query($sql);
    }
    function deleteRecord($table, $condition){
        // TODO: Implement deleteRecord() method.
        // Delete from tableName where field=value;
        $delVal = "";
		$con = 1;
		foreach($condition as $field => $value){
			if($con == count($condition)){
				$delVal .= $field . "='" . $value ."'";
			}else{
				$delVal .= $field . "='" . $value . "' && ";
			}
			$con++;
		}
        $sql = "DELETE FROM $table WHERE $delVal ";
        $this->connect()->query($sql);
        // Unlink folder.value
        if ($sql){
            foreach($condition as $imgName){
                if (is_array($table)) {
                    for ($i=0; $i < count($table); $i++) { 
                        $unlinkRecord = $table[$i].$imgName;
                    }
                }else {
                    $unlinkRecord = $table.$imgName;
                }
                unlink($unlinkRecord);   
            }
        }
    }

    function selectField($table, $field='*'){
        $reField = '';
        if ($field == ''){
            $field = '*';
        }
        $sql = "SELECT ".$field." FROM ".$table." ";
        $result = $this->connect()->query($sql);
        while($row = $result->fetch_field()){
            $reField .= $row->name.',';
        }
        return  $reField;
    }
    function selectFieldArr($table, $field='*'){
        $reField = array();
        if ($field == ''){
            $field = '*';
        }
        $sql = "SELECT ".$field." FROM ".$table." ";
        $result = $this->connect()->query($sql);

        while($row = $result->fetch_field()){
            $reField[] = $row->name;
        }
        return  $reField;
    }

    function selectRecord($table, $field='*', $condition=''){
        // TODO: Implement selectRecord() method.
        $array = array();
        if ($field == ''){
            $field = '*';
        }
        if ($condition==''){
            $sql = "SELECT ".$field." FROM ".$table." ";
        }else {
            $sql = "SELECT ".$field." FROM ".$table." WHERE ".$condition." ";
        }
        $result = $this->connect()->query($sql);
        while($row = $result->fetch_row()){
            $array[] = $row;
        }

        return $array;
    }
    function selectRecord2($table, $field='*', $condition=''){
        // TODO: Implement selectRecord() method.
        $array;
        if ($field == ''){
            $field = '*';
        }
        if ($condition==''){
            $sql = "SELECT ".$field." FROM ".$table." ";
        }else {
            $sql = "SELECT ".$field." FROM ".$table." WHERE ".$condition." ";
        }
        $result = $this->connect()->query($sql);
        while($row = $result->fetch_row()){
            $array = $row;
        }
        return $array;
    }

    function login($table,$condition,$session='',$cookie=''){
        $sFields = '';
        $con = 1;
        $b='';
        $vPassword = '';
        $vaPass = '';
        $vEmail = '';
        $vEmailName = '';
        foreach ($condition as $fieldName2 => $value2){
            if ($fieldName2 == 'password'){
                $b = $fieldName2;
                $vaPass = $value2;
            }else {
                $vEmail = $fieldName2.'="'.$value2.'"';
            }
        }
        $sql2 = $this->selectRecord($table,$b,$vEmail);
        foreach ($sql2 as $value){
            $b = password_verify($vaPass,$value[0]);
            if ($b === true){
                $vPassword = $value[0];
            }
        }
        foreach ($condition as $fieldName => $value){
            if ($con == count($condition)){
                $sFields .= $fieldName;
                if ($fieldName == 'password'){
                    $sFields .= "='".mysqli_escape_string($this->connect(),$vPassword)."'";
                }else {
                    $sFields .= "='".mysqli_escape_string($this->connect(),$value)."'";
                }

            }else {
                $sFields .= $fieldName. "=";
                if ($fieldName == 'password'){
                    $sFields .= "='".mysqli_escape_string($this->connect(),$vPassword)."'";
                }else {
                    $sFields .= "'".mysqli_escape_string($this->connect(),$value)."'and ";
                }
            }
            $con++;
        }
        $sql = "SELECT * FROM ".$table." WHERE ".$sFields." ";
        $result=$this->connect()->query($sql);
        $num=$result->num_rows;
        if ($num > 0){
            $status['success'] = 1;
        }else {
            $status['msg'] = '<div id="massageLogin" style="background-color: darkred;color: white;padding: 10px 15px;position: fixed;right: 0;top: 0;font-size: 16px;box-shadow: 0 0 3px rgba(0,0,0,0.5);display: none;">Invalid Email* or Password*</div>';
            $status['success'] = 2;
        }

        $status['test'] = $vEmail;
        echo json_encode($status);
    }

    function selectCount($table, $condition){
        $sql = "SELECT COUNT(*) AS total FROM ".$table." WHERE ".$condition." ";
        $result=$this->connect()->query($sql);
        $rowCount=$result->fetch_row();
        return $rowCount[0];
    }

    function selectTblName(){
        $array = array();
        $sql = " SHOW TABLES FROM ".$this->databasename." ";
        $result=$this->connect()->query($sql);
        while ($row = $result->fetch_row()){
            $array[] = $row;
        }
        return $array;
    }

    function uploadImageMulti($file, $folder,$nameGenerate=''){
//        $base_url = $_SERVER['HTTP_REFERER'];
        // TODO: Implement uploadImage() method.
        $output= array();
        if(is_array($_FILES)) {
            $file = $_FILES[$file];
            foreach ($file['name'] as $name => $value) {
                $file_name = explode(".", $file['name'][$name]);
                $t = time();
                $status['size'] = $file['size'];
                $allow_extension = $this->allowExtension;
                if (in_array($file_name[1], $allow_extension)) {
                    if ($nameGenerate=='' || $nameGenerate=='yes') {
                        $new_name = rand(10000, 99999999999999999) . $t . '.' . $file_name[1];
                    }elseif ($nameGenerate == 'no') {
                        $new_name = $file_name[0] . '.' . $file_name[1];
                    }
                    $sourcePath = $file['tmp_name'][$name];
                    $targetPath = $folder . $new_name;
                    if (move_uploaded_file($sourcePath, $targetPath)) {

                        $output[] = $new_name;
                        $status['imgName'] = $output;
                        $status['folder']=$folder;
//                        $status['baseUrl']=$base_url;
                    }
                }
            }
            echo json_encode($status);
        }
    }

    function uploadVideo($file, $folder){
        $output='';
        if(is_array($_FILES)) {
            $file = $_FILES[$file];
            foreach ($file['name'] as $name => $value) {
                $file_name = explode(".", $file['name'][$name]);
                $t = time();
                $allow_extension = $this->allowExtensionVideo;
                if (in_array($file_name[1], $allow_extension)) {
                    $new_name = explode(' ',$file_name[0]);
                    $new_name = implode('_',$new_name);
                    $new_name = $new_name . '_' . $t . '.' . $file_name[1];
                    $sourcePath = $file['tmp_name'][$name];
                    $targetPath = $folder . $new_name;
                    if (move_uploaded_file($sourcePath, $targetPath)) {
                        $output .= $new_name.',';
                        $status['videoName'] = $output;
                    }
                }
            }
            echo json_encode($status);
        }
    }


//    if upload img with generae of name
    function uploadOneImage($file, $folder){
        // TODO: Implement uploadImage() method.
        $file = $_FILES[$file];
        $temp = explode(".",$file["name"]);
        if(in_array($temp[1], $this->allowExtension)){
            $t=time();
            $img_name= rand(10000,99999999999999999).$t. '.' .end($temp);
            $tmp=$file['tmp_name'];
            move_uploaded_file($tmp,$folder.$img_name);
            $status['imgName']=$img_name;
            $status['folder']=$folder;
            echo json_encode($status);
        }
    }
    //if you don't want to generate the name of img
    function uploadOneImageNoGenerateName($file, $folder){
        $file = $_FILES[$file];
        $temp = explode(".",$file["name"]);
        if(in_array($temp[1], $this->allowExtension)){
            $img_name= $temp[0]. '.' .end($temp);
            $tmp=$file['tmp_name'];
            move_uploaded_file($tmp,$folder.$img_name);
            $status['imgName']=$img_name;
            $status['folder']=$folder;
            $status['test'] = $temp;
            echo json_encode($status);
        }
    }
    //if you don't want to generate the name of img array directory
    function uploadOneImageNoGenerateNameArrDir($file, $folder){
        $file = $_FILES[$file];
        $temp = explode(".",$file["name"]);
        if(in_array($temp[1], $this->allowExtension)){
            $img_name= $temp[0]. '.' .end($temp);
            $tmp=$file['tmp_name'];
            for ($i=0; $i < count($folder); $i++) { 
                move_uploaded_file($tmp,$folder[$i].$img_name);
            }
            $status['imgName']=$img_name;
            $status['folder']=$folder;
            $status['test'] = $temp;
            echo json_encode($status);
        }
    }

    function getId($field, $tbl){
        $sql = "SELECT ".$field." FROM ".$tbl." ORDER BY id DESC ";
        $result = $this->connect()->query($sql);
        $num = $result->num_rows;
        if($num>0){
            $row = $result->fetch_array();
            $lastId = $row[0]+1;
            return $lastId;
        }else{
            return 1;
        }
    }

    function selectOneRecord($field, $tbl, $where=""){
        if ($where == '') {
            $sql = "SELECT ".$field." FROM ".$tbl." ORDER BY id DESC LIMIT 0,1";
        }else {
            $sql = "SELECT ".$field." FROM ".$tbl." WHERE ".$where." ORDER BY id DESC LIMIT 0,1";
        }
        $result = $this->connect()->query($sql);
        $row = $result->fetch_array();
        return $row[0];
    }


    public function getHostname()
    {
        return $this->hostname;
    }
    public function setHostname($hostname)
    {
        $this->hostname = $hostname;
    }


    public function getBaseUrl()
    {

        $path_with_query=$_SERVER['HTTP_REFERER'];
//        $path=explode("?",$path_with_query);
//        $filename=basename($path[0]);
        $filename=basename($path_with_query);
//        $query=$path[1];
        return $filename;
    }


//    get time
    function getTimePost($time,$date){
        $previousTimeStamp = strtotime($time." ".$date);
        $lastTimeStamp = strtotime(date("Y-m-d h:i:sa"));
        $menos=$lastTimeStamp-$previousTimeStamp;
        $mins=$menos/60;
        if($mins<1){
            $showing= strip_tags( "Just now" );
        }
        else{
            $minsfinal=floor($mins);
            $secondsfinal=$menos-($minsfinal*60);
            $hours=$minsfinal/60;
            if($minsfinal==1){
                $showing= strip_tags( $minsfinal . " min" );
            }
            else if($hours<1){
                $showing= strip_tags( $minsfinal . " mins" );
            }
            else{
                $hoursfinal=floor($hours);
                $minssuperfinal=$minsfinal-($hoursfinal*60);
                $days=$hoursfinal/24;
                if($days<1){
                    if($hoursfinal==1){
                        $showing= strip_tags( $hoursfinal . " hr" );
                    }else{
                        $showing= strip_tags( $hoursfinal . " hrs" );
                    }
                }
                else if($days<2){
                    $showing= strip_tags( " Yesterday at ".$date );
                }
                else{
                    $d= strip_tags( date("d",strtotime($time)) );
                    $m= strip_tags( date("m",strtotime($time)) );
                    $y= strip_tags( date("Y",strtotime($time)) );
                    if($m==1){
                        $m='January';
                    }
                    else if($m==2){
                        $m='February';
                    }
                    else if($m==3){
                        $m='March';
                    }
                    else if($m==4){
                        $m='April';
                    }
                    else if($m==5){
                        $m='May';
                    }
                    else if($m==6){
                        $m='June';
                    }
                    else if($m==7){
                        $m='July';
                    }
                    else if($m==8){
                        $m='August';
                    }
                    else if($m==9){
                        $m='September';
                    }
                    else if($m==10){
                        $m='October';
                    }
                    else if($m==11){
                        $m='November';
                    }
                    else if($m==12){
                        $m='December';
                    }
                    $showing= strip_tags( $m." ".$d.", ".$y );
//                    $showing= strip_tags( $m."-".$d."-".$y ." at ". $date );
                }
            }
        }
        return $showing;
    }

    /**
     * @return mixed
     */
    public function getSession($sessionName)
    {
        $reSession = '';
        if (isset($_SESSION[$sessionName])){
            $reSession = $_SESSION[$sessionName];
        }
        return $reSession;
    }

    /**
     * @param mixed $session
     */
    public function setSession($session)
    {
        session_start();
        $con = 1;
        foreach ($session as $fieldName => $value){
            if ($con == count($session)){
                $sFields = $fieldName;
                $sValue = "'".$value."'";
                $_SESSION[$sFields] = $sValue;
            }else {
                $sFields = $fieldName;
                $sValue = "".mysqli_escape_string($this->connect(),$value)."";
                $_SESSION[$sFields] = $sValue;
            }
            $con++;
        }
    }

    /**
     * @return mixed
     */
    public function getCookie()
    {

        return $this->cookie;
    }

    /**
     * @param mixed $cookie
     */
    public function setCookie($cookie)
    {
        $this->cookie = $cookie;
    }



    private $cookie;
    private $session;
    private $base_url;
    private $hostname;
    private $username;
    private $password;
    private $databasename;
    private $allowExtension = array("jpg","jpeg","png","gif","svg");
    private $allowExtensionVideo = array("mp4","avi","flv","wmv");
}

