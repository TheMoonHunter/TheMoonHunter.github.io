<?php

// Configuration Settings
$email = "paulo.iza.v@gmail.com";
$subject = "RSVP Submission"
$thankyou_page = "thank_you.html";
$from = "From:" . $email;

// Get info
$full_name = $_REQUEST['fullname'] ;
$guest_name = $_REQUEST['guestname'] ;

// Build Message
$msg = "First Name: " . $first_name . "\r\n" .
			 "Email: " . $email_address . "\r\n" .
			 "Comments: " . $comments ;

mail( $email, $subject, $msg, $from);
header( "Location: $thankyou_page" );
?>