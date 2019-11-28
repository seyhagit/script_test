
<form action="test.php" method="post" enctype="multipart/form-data">
	<input type="text" name="name[]" value="xxx">
	<input type="text" name="name[]" value="nnn">
	<input type="submit">
</form>
<?php  
	if (isset($_POST['name'])) {
		$testValue = $_POST['name'];
		var_dump($testValue);
		foreach ($testValue as $key => $value) {
			echo $value.'ccc';
		}
	}
?>