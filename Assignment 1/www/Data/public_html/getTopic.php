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

$sql = "SELECT * FROM Threads WHERE TopicID = '".$topicID."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) 
{	
	//Output data of each row -- Thanks to W3 Schools
	while($row = $result->fetch_assoc())
	{
		$topicTitle = $row["TopicTitle"];
		$Author = $row["Author"];
	}
	
	echo "Replying to:<br /><b>".$topicTitle."</b><br /> By - ".$Author;
}
	else
	{

	}
$conn->close();	
?>