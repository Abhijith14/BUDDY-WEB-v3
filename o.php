<?php

include('db.php');



//$sql = "UPDATE stats SET VISITORS = VISITORS + 1 WHERE id = 1";
//$pdo->query($sql);

$sqlupdate = "SELECT * FROM stats";
$stmt = $pdo->prepare($sqlupdate);
$stmt->execute();
$row = $stmt->rowCount();
$details = $stmt->fetch();

$result = (array) $details;

print_r($result['visitors']);

// print_r($details['visitors']);

// $sqlselect = "SELECT * FROM stats";

// foreach ($pdo->query($sqlselect) as $row) {
// 	print "<br/>";
// 	print $row['ID'].'-'.$row['VISITORS'].'<br/>';
// }

?>