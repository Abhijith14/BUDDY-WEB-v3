<?php

include('db.php');

$fname = $_GET['name'];
$lname = $_GET['last-name'];
$email = $_GET['email'];
$phone = $_GET['phone'];
$message = $_GET['message'];


echo $fname.'<br>';
echo $lname.'<br>';
echo $email.'<br>';
echo $phone.'<br>';
echo $message.'<br>';

$name = $fname.' '.$lname;
$sqlnew = "INSERT INTO sendmsg (NAME, EMAIL, PHONE, MESSAGE, status) VALUES ('$name', '$email', '$phone', '$message', 0);";
$pdo->query($sqlnew);


header("location:subs?email=$email");

?>