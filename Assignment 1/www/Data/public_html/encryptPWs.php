<?php
$servername = "localhost";
$username = "id2985726_admin";
$password = "admin";
$dbname = "id2985726_sit313";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

//variables
$username = $_POST['username'];
$password = md5($_POST['password']);

/* $encryptionMethod = "AES-256-CBC";
$secretHash = "deakin";
$iv = mcrypt_create_iv(16, MCRYPT_RAND);
$encryptedPW = openssl_encrypt($password,$encryptionMethod,$secretHash, 0, $iv); */


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO UserAccounts (UserName, Password, AccessLevel, Signature)
VALUES ('".$username."', '".$password."', '1', '')";

if ($conn->query($sql) === TRUE) {
	
}
else
{
	echo "Error: " . $sql . "<br>" .$conn->error;
}
$conn->close();

?>