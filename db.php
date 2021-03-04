<?php


$host = "";
$user = "";
$pass = "";
$database = "";
$port = "";

try{

	$dsn = "pgsql:host = " . $host . ";port=" . $port . ";dbname=" . $database . ";user =" . $user . ";password=" . $pass;

	$pdo = new PDO($dsn, $user, $pass);
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
	$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
	echo 'Connection Failed!! : ' . $e->getMessage(); 
}

?>