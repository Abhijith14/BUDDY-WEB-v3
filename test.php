<?php
date_default_timezone_set("Asia/kolkata");

$d="2020-11-29 00:00:00";

$create = date("y-m-d H:i:s", strtotime($d));
$curr = date("y-m-d H:i:s");
echo "Created date is " . $create. "<br>";
echo "Today is " . $curr. "<br>";

if ($create > $curr)
{
	echo "YES";
}
else
{
	echo "NO";
}

?>