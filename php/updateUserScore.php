<?php
header('Content-Type: application/json');

require("db.php");

$score = $_GET["score"];
$id = $_GET["id"];

$sql = "UPDATE `shooting_user` SET `score`= ? WHERE `id` = ?";

$result = execsql($con, $sql, [$score, $id]);

echo json_encode(array("result" => $result));