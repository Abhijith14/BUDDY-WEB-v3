<?php

include('db.php');

$sqlupdate = "SELECT * FROM stats";
$stmt = $pdo->prepare($sqlupdate);
$stmt->execute();
$row = $stmt->rowCount();
$details = $stmt->fetch();

$result = (array) $details;

$visitors = $result['visitors'];

// $len = strlen($visitors);
// if ($len == 5)
// {
// 	$visitors = "0".$visitors;
// }
// else if($len == 4)
// {
// 	$visitors = "00".$visitors;
// }
// else if($len == 7)
// {
// 	$visitors = "999999";
// }

echo $visitors;

?>