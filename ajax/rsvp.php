<?php
session_start();
ob_start();

/* Post Control*/
if($_POST){
	

	
	/*Your Website Email*/
	$your_email = "support@webyzona.com";
	$subject = "RSVP New Entry";
		
	/*Form Post*/
	$name			= $_POST['name'];
	$email 			= $_POST['email']; 
	$phone			= $_POST['phone']; 
	$guests  		= $_POST['guests'];
	$attend  		= $_POST['attend'];
	$mbody			= "Name: ".$name."\n"."Phone: ".$phone."\n"."Guests: ".$guests."\n"."Attending: ".$attend;
	
		
		/*Check the free space*/
		if(!$name || !$email || !$phone || !$guests || !$attend)
		{

		?>
        <div class="alert alert-danger heading">All Fields Are Required</div>	
		
		<?php
		}else{
			

		$headers   = array();
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-type: text/plain; charset=utf-8";
		$headers[] = "From: $name <$email>"; // Sender name and email address
		$headers[] = "Reply-To: Recipient Name <$your_email>"; // Your site e-mail address
		$headers[] = "X-Mailer: PHP/".phpversion();
		
		mail($your_email, $subject, $mbody, implode("\r\n", $headers));							 
						  
								  
		?>
        <div class="simform"><span class="final-message show">Thank you! Waiting You There.</span></div>	
		
		<?php
			}

	
	}else{
		?>
        <div class="simform"><span class="final-message show">Server Error, Try again later</span></div>	
		
		<?php
		}

 ?>