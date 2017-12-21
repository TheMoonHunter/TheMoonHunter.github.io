<?php

$email = "paulo.iza.v@gmail.com";
$rsvp_page = "rsvp.html";
$error_page = "error.html";
$thankyou_page = "thank_you.html";
$full_name = $_REQUEST['fullname'] ;
$guest_name = $_REQUEST['guestname'] ;
$msg = "First Name: " . $first_name . "\r\n" .
			 "Email: " . $email_address . "\r\n" .
			 "Comments: " . $comments ;
$headers = "From:" . $email;

function isInjected($str) {
	$injections = array('(\n+)',
	'(\r+)',
	'(\t+)',
	'(%0A+)',
	'(%0D+)',
	'(%08+)',
	'(%09+)'
	);
	$inject = join('|', $injections);
	$inject = "/$inject/i";
	if(preg_match($inject,$str)) {
		return true;
	}
	else {
		return false;
	}
}

// If the user tries to access this script directly, redirect them to the feedback form,
if (!isset($_REQUEST['fullname'])) {
	header( "Location: $feedback_page" );
}

// If the form fields are empty, redirect to the error page.
elseif (empty($full_name)) {
	header( "Location: $error_page" );
}

elseif ( isInjected($fullname) || isInjected($guestname)) {
	header( "Location: $error_page" );
}

else {
	mail( "$email", "RSVP submission", $msg, $headers);
	header( "Location: $thankyou_page" );
}
?>