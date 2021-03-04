<?php

include('db.php');

$name = $_GET['name'];
$comp_ind = $_GET['comp_ind'];
$email = $_GET['email'];
$phone = $_GET['phone'];
$project = $_GET['project'];
$desc = $_GET['description'];


$sqlnew = "INSERT INTO sendservice (NAME, COMP_IND, EMAIL, PHONE, PROJECT, DESCRIPTION, status) VALUES ('$name', '$comp_ind', '$email', '$phone','$project', '$desc', 0);";
$pdo->query($sqlnew);

header("location:subs?email=$email");

// header('location:services');
?>