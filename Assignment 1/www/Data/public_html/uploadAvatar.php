<?php
header('Access-Control-Allow-Origin: *');
$ftp_server = "files.000webhost.com";
$ftp_user_name = "deakin-assignment";
$ftp_user_pass = "lol987";

	$user = $_POST['user'];
	define('UPLOAD_DIR', '/storage/ssd1/726/2985726/public_html/userImages/');
	$img = $_POST['img'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = UPLOAD_DIR . $user . '.png';
	$success = file_put_contents($file, $data);
	print $success ? $file : 'Unable to save the file.';

?>