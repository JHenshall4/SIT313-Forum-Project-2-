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
$username = $_POST['user'];

//Find how many topics to append topic ID
$sql = "SELECT * FROM Threads WHERE Author = '".$username."'";
$result = $conn->query($sql);
//Create the same HTML table we used in assignment 1.
$temp = "<ul id='example'><div class='theLine2'></div>";

if ($result->num_rows > 0) 
{	
	//Output data of each row -- Thanks to W3 Schools
	while($row = $result->fetch_assoc())
	{
		$temp .= "<li>
		<div class='forumDivContainer' id='" .$row["TopicID"]. "'>
		<div class='threadCategory'>" .$row["Category"]."</div>
		<div class='threadTitle'>" .$row["TopicTitle"]. "</div>
		<div class='threadAuthor-Date'>" .$row["Author"]. "</div>
		<div class='theLine'></div>
		</div>
		</li>";
	//	echo "Title: " .$row["TopicTitle"]. "Post: " .$row["PostContents"]. "Author: " .$row["Author"]. "Category: " .$row["Category"]. "TopicID: " .$row["TopicID"]. "PostID: " .$row["PostID"]. "<br>";
	}
	$temp .= '</ul>';
	
	echo($temp);
}
	else
	{

	}
$conn->close();	
?>