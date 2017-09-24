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

//Get variables user is attempting to login with:

//Find entry in database where entered Username exists
$sql = "SELECT * FROM Threads";
$result = $conn->query($sql);
$html = "<ul id='example'><div class='theLine2'></div>";

if ($result->num_rows > 0) {


    while($row = $result->fetch_assoc()) {

	$html .= "<li class='testList'><div class='forumDivContainer' id='".$row["TopicID"]."'><div class='threadCategory'>".$row["Category"]."</div>
	<div class='threadTitle'>".$row["TopicTitle"]."</div>
	<div class='threadAuthor-Date'>".$row["Author"]." - Fake date</div><div class='theLine'></div></div></li>";
	
    }
	
	$html .= "</ul>";
	
	echo($html);
} else {
    echo "Sorry, invalid username or password";
}
$conn->close();
?>