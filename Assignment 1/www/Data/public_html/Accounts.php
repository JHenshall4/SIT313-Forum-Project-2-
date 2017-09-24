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
$uname = $_POST['uName'];
$pass = md5($_POST['pWord']);

//Find entry in database where entered Username exists
$sql = "SELECT * FROM UserAccounts WHERE UserName = '".$uname."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	// Similar to while OCIFetch login statement -- Found similar solution from W3Schools and modified for my needs.
    while($row = $result->fetch_assoc()) {
		// If null is returned, the username doesn't exist. --> It could be argued that for security purposes, we should display a more vague error (Username OR Password is incorrect) but as a user
		// is able to lookup any other user within the app, this seems redundant and assist users who may have forgotten their account name.
        if ($row["Password"] == "")
		{
			echo "Invalid Username";
		} 
		else
		//If the password stored in the database doesn't match what the user entered, return invalid password.
		// This is more of an extra security precaution. Technically we only need to confirm that the password is correct. Completely redundant? Probably.
		if ($pass != $row["Password"])
		{
			echo("Invalid Password");
		} 
		else
		//If the password is correct, return success which will execute login
		if ($pass == $row["Password"])
		{
			echo($row["AccessLevel"]);
		}
    }
} else {
    echo "Sorry, invalid username or password";
}
$conn->close();
?>