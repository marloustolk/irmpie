<?php  

$host = "10.184.19.128:3306";
$username = "p407651_Admin";
$password = "PrutsPi3r-";
$databaseName = "p407651_Irmpier";

$mysqli = mysqli_connect($host, $username, $password, $databaseName); 

// Insert record (or get error-message)
$name = $_POST['name'];
$score = $_POST['score'];

$query = "INSERT INTO score (name, score) VALUES ('$name', '$score')";
$result = mysqli_query($mysqli, $query) or die ("error");

// Message when record inserted
echo "You sent us the following information:<br><br />";
echo "<table border=1><tr><th>Name</th><th>Score</th></tr>";
echo "<tr><td>".$name."</td><td>".$score."</td></tr>";
echo "</table>";
?>