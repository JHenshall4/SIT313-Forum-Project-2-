<?php
//Probably unsecure to have this information in the main PHP file. Should probably store this elsewhere and call it.
$servername = "localhost";
$username = "id2985726_admin";
$password = "admin";
$dbname = "id2985726_sit313";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//Get variables
$title = $_POST['title'];
$post = $_POST['post'];
$category = $_POST['threadCategory'];
$author = $_POST['_user'];

//Find how many topics to append topic ID
$sql = "SELECT * FROM Threads";
$result = $conn->query($sql);
$num_rows = mysqli_num_rows($result) + 1;

$sql2 = "SELECT * FROM Posts";
$result2 = $conn->query($sql2);
$num_rows2 = mysqli_num_rows($result2) + 1;


$sql3 = "INSERT INTO Threads (TopicTitle, PostContents, Author, Category, TopicID, PostID)
VALUES ('".$title."', '".$post."', '".$author."', '".$category."', '".$num_rows."', '".$num_rows2."')";

if ($conn->query($sql3) === TRUE) {
	
}
else
{
	echo "Error: " . $sql3 . "<br>" .$conn->error;
}
$conn->close();
?>