$( document ).ready(function() {

	/*------------------------------ Vertical Nav ----------------------*/

	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');

    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}

	/*------------------------------ Page Scrolling ----------------------*/

    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

	/*------------------------------ Tooltips ----------------------*/

	$('.tooltips').tooltip();

	/*------------------------------ Voice Control -----------------*/
	if (annyang) {
	  var commands = {
		'home': function() {
			$('html, body').animate({
				scrollTop: $("#page-top").offset().top
			}, 2000);
		},

		'about': function() {
			$('html, body').animate({
				scrollTop: $("#about").offset().top
			}, 2000);
		},

		'family': function() {
			$('html, body').animate({
				scrollTop: $("#family").offset().top
			}, 2000);
		},

		'moments': function() {
			$('html, body').animate({
				scrollTop: $("#moments").offset().top
			}, 2000);
		},

		'favourites': function() {
			$('html, body').animate({
				scrollTop: $("#favourites").offset().top
			}, 2000);
		},

		'blog': function() {
			$('html, body').animate({
				scrollTop: $("#blog").offset().top
			}, 2000);
		},

		'contact': function() {
			$('html, body').animate({
				scrollTop: $("#contactus").offset().top
			}, 2000);
		},

		'Purchase now': function() {
			window.location = "http://www.themeforest.com"
		}

	  };

	  annyang.addCommands(commands);
	  annyang.start();
	}

	/*------------------------------ Bootstrap Carousel ----------------------*/

	$('#myCarousel').carousel({
		interval: 18000, //changes the speed
		pause: "false"
	})
	//Bootstrap Carousel Progressbar

	$("#progressbar").progressbar({
		value: 1
	});
	$("#progressbar > .ui-progressbar-value").animate({
		width: "100%"
	}, 18000);

	$('#myCarousel').bind('slid.bs.carousel', function (e) {
			$("#progressbar > .ui-progressbar-value").finish();
			$("#progressbar > .ui-progressbar-value").animate({
			width: "0%"
			}, 0);
			$("#progressbar > .ui-progressbar-value").animate({
			width: "100%"
			}, 18000);
	});

	/*------------------------------ Masonry Blog -----------------*/

	var $container = $('#blogs');
	// initialize
	$container.masonry({
	  itemSelector: '.blog'
	});
	// initialize Masonry after all images have loaded
	$container.imagesLoaded( function() {
	  $container.masonry();
	});

	/*------------------------------ OWL Carousel -----------------*/

	$("#owl-venu").owlCarousel({
		singleItem : true,
		lazyLoad : true
	});

	$("#owl-gifts").owlCarousel({
		items : 5,
		lazyLoad : true
	});

	/*------------------------------ Sticky Navigation -----------------*/

	$(".topbar-nav").sticky({topSpacing:0});

	/*------------------------------ Magnific POP -----------------*/

	$('.popup-vimeo').magnificPopup({
		type: 'iframe'
	});
	$('.popup-image').magnificPopup({
	  type: 'image',
	  removalDelay: 500, //delay removal by X to allow out-animation
	  callbacks: {
		beforeOpen: function() {
		  // just a hack that adds mfp-anim class to markup
		   this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
		   this.st.mainClass = this.st.el.attr('data-effect');
		}
	  },
	  closeOnContentClick: true,
	  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

	/*------------------------------ Waypoint Counting -----------------*/

	$('#startcounting').waypoint(function() {
		$('.counts').countTo();
		$('#startcounting').waypoint('disable');
	});

	/*------------------------------ Parallax Effect -----------------*/

	$('.parallax-section').each(function(){
		$(this).parallax("50%", 0.5);
	});

	/*------------------------------ WOW Script ----------------------*/

	new WOW().init();

	/*------------------------------ Twitter Feeds -----------------*/

    $(".footer-tweet").tweet({
		join_text: false,
		username: "envato", // Username
		modpath: "./js/twitter/",
		avatar_size: false,
		count: 3,
		template: "{text} <br> {time}",
		loading_text: "loading twitter feed...",
		seconds_ago_text: "%d seconds ago",
		a_minutes_ago_text: "a minute ago",
		minutes_ago_text: "%d minutes ago",
		a_hours_ago_text: "an hour ago",
		hours_ago_text: "%d hours ago",
		a_day_ago_text: "a day ago",
		days_ago_text: "%d days ago",
		view_text: "view tweet on twitter"
	});

	$(".footer-tweet ul").owlCarousel({singleItem : true,});

	/*------------------------------ Steps Form -----------------*/

	var theForm = document.getElementById( 'theForm' );

	new stepsForm( theForm, {
		onSubmit : function( form ) {
			// hide form
			classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );

			var data = $("#theForm").serialize();
			$.ajax({
				type	: "POST",
				url 	: "ajax/rsvp.php",
				data 	: data,
				success : function(q)
					{
					$("#ContactFormDiv").html(q);
					}
				});
			return false;
		}
	} );


});


/*------------------------------ Count Down ----------------------*/

setInterval(function() {
    var timespan = countdown(new Date("11/20/2018"), new Date());
    var div = document.getElementById('time');
    div.innerHTML = "</div>" + "<div><span>Months</span>" + timespan.months + "</div>" + "<div><span>Days</span>" + timespan.days + "</div>" + "<div><span>Hours</span>" + timespan.hours + "</div>" + "<div><span>Minutes</span>" + timespan.minutes + "</div>" + "<div><span>Seconds</span>" + timespan.seconds + "</div>"
}, 1000);

/*------------------------------ Tooltips ----------------------*/

$.widget.bridge('uitooltip', $.ui.tooltip); // Resolve name collision between jQuery UI and Bootstrap

/*------------------------------ Preloader ----------------------*/

$(window).load(function() {
	$('.spinner').fadeOut();
	$('#preloader').delay(350).fadeOut('slow');
	$('body').delay(350).css({'overflow':'visible'});
});

/*------------------------------ Collapse the navbar on scroll ----------------------*/

$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

/*------------------------------ Google Map ----------------------*/

google.maps.event.addDomListener(window, 'load', init);
function init() {
	var mainPosition = new google.maps.LatLng(-6.2589107, 107.0232115);
	var mapOptions = {
		zoom: 15,
		scrollwheel: false,
		disableDefaultUI: true,
		center: mainPosition, // Melbourne
		styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off","hue": "#ffffff"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]
	};
	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);


	var contentString =
		'<div class="map-content">'+
		'<h3>Our City</h3>'+
		'<p>Melbourne is the capital and most populous city in the state of Victoria, and the second most populous city in Australia.The name "Melbourne" refers to an urban agglomeration area spanning 9,900 km2 that comprises the greater metropolis – as well as being a common name for its metropolitan hub, the Melbourne City Centre.</p>'+
		'</div>'

	var image = 'images/marker.png';
	var myLatLng = new google.maps.LatLng(-6.2589107, 107.0232115);
	var mapMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image,
		title:  'Frostbyte Interactive'
	});
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	google.maps.event.addListener(mapMarker, 'click', function() {
		infowindow.open(map, mapMarker);
	});
}
