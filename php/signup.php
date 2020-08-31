<?php

header('Content-Type: application/json');

require("db.php");

$id = $_POST["id"];
$pwd = $_POST["pwd"];
$name = $_POST["name"];


$query = "INSERT INTO `shooting_user`(`id`, `pwd`, `score`, `name`) VALUES (?,password(?), 0, ?)";
$bRes = execsql($con, $query, [$id, $pwd, $name]);

echo json_encode(array("result" => $bRes));

?>