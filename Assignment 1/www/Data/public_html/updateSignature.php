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
$sig = $_POST['signature'];

//Find entry in database where entered Username exists
$sql = "UPDATE UserAccounts
SET Signature = '".$sig."'
WHERE UserName = '".$username."'";

if ($conn->query($sql) === TRUE) {
	
}
else
{
	echo "Error: " . $sql . "<br>" .$conn->error;
}
$conn->close();
?>