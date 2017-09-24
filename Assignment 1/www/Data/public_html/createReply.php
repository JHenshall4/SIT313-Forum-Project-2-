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
$topicID = $_POST['topicID'];
$author = $_POST['author'];
$reply = $_POST['reply'];

$sql2 = "SELECT * FROM Posts";
$result2 = $conn->query($sql2);
$num_rows2 = mysqli_num_rows($result2) + 1;

$sql3 = "INSERT INTO Posts (PostContents, Author, TopicID, PostID)
VALUES ('".$reply."', '".$author."', '".$topicID."', '".$num_rows2."')";

if ($conn->query($sql3) === TRUE) {
	
}
else
{
	echo "Error: " . $sql3 . "<br>" .$conn->error;
}
$conn->close();
?>