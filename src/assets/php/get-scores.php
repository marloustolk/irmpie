<?php
$host = "10.184.19.128:3306";
$username = "p407651_Admin";
$password = "PrutsPi3r-";
$databaseName = "p407651_Irmpier";

$mysqli = mysqli_connect($host, $username, $password, $databaseName);

$query = "SELECT * FROM score";
$result = mysqli_query($mysqli,$query);

$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($rows)
?>