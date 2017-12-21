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
$msg = "Full Name:  " . $full_name . "\r\n" .
			 "Guest Name: " . $guest_name . "\r\n" .

mail( $email, $subject, $msg, $from);
header( "Location: $thankyou_page" );
?>