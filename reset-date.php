<?php

include('db.php');

date_default_timezone_set("Asia/kolkata");

$date = date("Y-m-d");

$sqlnew = "DELETE FROM unique_visitors WHERE DATE_VISITORS IS NOT '$date';";
$pdo->query($sqlnew);



// WARNING : ERROR IN THIS FILE !!!!


?>