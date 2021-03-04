<?php


include('db.php');


if (isset($_GET['email'])) {

	$email = $_GET['email'];
	// echo $email;

	$sqlupdate = "SELECT * FROM subs WHERE EMAIL = '$email'";
	$stmt = $pdo->prepare($sqlupdate);
	$stmt->execute();
	$row = $stmt->rowCount();

	if($row == 0)
	{
		$sql = "INSERT INTO subs (EMAIL, status) VALUES ('$email', 0);";
		$pdo->query($sql);
	}
	header('location:index');
}
else
{
	header('location:index');
}


?>