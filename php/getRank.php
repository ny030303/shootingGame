<?php

header("content-type: application/json");

require("db.php");

$sql = "SELECT * FROM `shooting_user` order by score DESC";

$users = fetchAll($con, $sql, []);
if ($users) {
    echo json_encode(array("result" => 1, "users" => $users));
} else {
    echo json_encode(array("result" => 0));
}
