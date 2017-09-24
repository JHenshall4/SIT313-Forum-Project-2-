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
$username = $_POST['username'];

//Find entry in database where entered Username exists
$sql = "SELECT * FROM UserAccounts WHERE UserName = '".$username."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {


    while($row = $result->fetch_assoc()) {

	$html = $row["Signature"];
    }

	echo($html);
	
} else {

}
$conn->close();
?>