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
$_topicID = $_POST['_topicID'];

//Find how many topics to append topic ID
$sql = "SELECT * FROM Threads WHERE TopicID = '".$_topicID."'";
$result = $conn->query($sql);


if ($result->num_rows > 0) 
{	
	//Output data of each row -- Thanks to W3 Schools
	while($row = $result->fetch_assoc())
	{
		$topictitle = $row["TopicTitle"];
		$topicauthor = $row["Author"];
		$topicOP = $row["PostContents"];
		
	//	echo "Title: " .$row["TopicTitle"]. "Post: " .$row["PostContents"]. "Author: " .$row["Author"]. "Category: " .$row["Category"]. "TopicID: " .$row["TopicID"]. "PostID: " .$row["PostID"]. "<br>";
	}
		$array = array($topictitle, $topicauthor, $topicOP);
		$myJSON = json_encode($array);
		echo $myJSON;
}
	else
	{
		echo "0 Results";
	}
$conn->close();	
?>