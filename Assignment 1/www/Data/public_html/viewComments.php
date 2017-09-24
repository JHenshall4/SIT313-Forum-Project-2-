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
$sql = "SELECT Posts.Author, Posts.PostContents, Posts.postID, Posts.topicID, UserAccounts.Signature
FROM Posts
LEFT OUTER JOIN UserAccounts ON Posts.Author=UserAccounts.UserName
WHERE Posts.topicID = '".$_topicID."'";

$result = $conn->query($sql);
$html = "<ul id='example'><div class='theLine2'></div>";

if ($result->num_rows > 0) 
{	
	//Output data of each row -- Thanks to W3 Schools
	while($row = $result->fetch_assoc())
	{
		//comment_post
				$html .= "<li>
		<div class='forumDivContainer' id='".$row["postID"]."'>
		<div class='threadCategory'></div>
		<div class='replyContents' id='".$row["postID"]."edit'>" .$row["PostContents"]. "</div>
		<div class='threadAuthor-Date'></div>
		<div class='commentSig' id='".$row["Author"]."'>".$row["Signature"]."</div>
		<div class='theLine'></div>
		</div>
		</li>";
		
		//$html .= "<div class='threadCategory' id='comment_post'>" .$row["PostContents"]. "</div>";

	//	echo "Title: " .$row["TopicTitle"]. "Post: " .$row["PostContents"]. "Author: " .$row["Author"]. "Category: " .$row["Category"]. "TopicID: " .$row["TopicID"]. "PostID: " .$row["PostID"]. "<br>";
	}
	
	$html .= "</ul>";
	echo($html);
}
	else
	{

	}
$conn->close();	
?>