<?php

include('../db.php');


$sql = "UPDATE stats SET VISITORS = 4000 WHERE id = 1";
$pdo->query($sql);

$sql = "DELETE FROM unique_visitors";
$pdo->query($sql);

echo "Changed to 4000";
?>