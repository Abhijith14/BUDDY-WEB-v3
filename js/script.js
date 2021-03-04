"use strict";
(function () {
	// Global variables
	var
			userAgent = navigator.userAgent.toLowerCase(),
			initialDate = new Date(),

			$document = $(document),
			$window = $(window),
			$html = $("html"),
			$body = $("body"),

			isDesktop = $html.hasClass("desktop"),
			isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false,
			isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1,
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
			isTouch = "ontouchstart" in window,
			detailsBlock = document.getElementsByClassName('block-with-details'),
			windowReady = false,
			isNoviBuilder = false,
			livedemo = true,

			plugins = {
				bootstrapDateTimePicker:    $('[data-time-picker]'),
				bootstrapModal:             $('.modal'),
				bootstrapModalNotification: $('.notification'),
				bootstrapTabs:              $('.tabs-custom'),
				bootstrapTooltip:           $('[data-toggle="tooltip"]'),
				buttonNina:                 $('.button-nina'),
				checkbox:                   $('input[type="checkbox"]'),
				circleJPlayer:              $('.jp-player-circle-init'),
				customToggle:               $('[data-custom-toggle]'),
				customWaypoints:            $('[data-custom-scroll-to]'),
				d3Charts:                   $('.d3-chart'),
				facebookWidget:             $('#fb-root'),
				flickrfeed:                 $('.flickr'),
				gradientMove:               $('.gradient-move'),
				jPlayer:                    $('.jp-jplayer'),
				jPlayerInit:                $('.jp-player-init'),
				jPlayerVideo:               $('.jp-video-init'),
				lightGallery:               $('[data-lightgallery="group"]'),
				lightGalleryItem:           $('[data-lightgallery="item"]'),
				lightDynamicGalleryItem:    $('[data-lightgallery="dynamic"]'),
				owl:                        $('.owl-carousel'),
				preloader:                  $('.page-loader'),
				parallaxText:               $('.parallax-text'),
				popover:                    $('[data-toggle="popover"]'),
				productThumb:               $('.product-thumbnails'),
				radio:                      $('input[type="radio"]'),
				rdNavbar:                   $('.rd-navbar'),
				scroller:                   $('.scroll-wrap'),
				search:                     $('.rd-search'),
				searchResults:              $('.rd-search-results'),
				selectFilter:               $('.select-filter'),
				slick:                      $('.slick-slider'),
				statefulButton:             $('.btn-stateful'),
				stepper:                    $('input[type="number"]'),
				styleSwitcher:              $('.style-switcher'),
				swiper:                     $('.swiper-slider'),
				twitterfeed:                $('.twitter'),
				typedjs:                    $('.typed-text-wrap'),
				vide:                       $('.vide'),
				videoGallery:               $('#video-gallery'),
				viewAnimate:                $('.view-animate'),
				layoutPanel:                $('.layout-panel'),
				copyrightYear:              $('.copyright-year'),
				rdMailForm:                 $('.rd-mailform'),
				rdInputLabel:               $('.form-label'),
				regula:                     $('[data-constraints]'),
				captcha:                    $('.recaptcha'),
				campaignMonitor:            $('.campaign-mailform'),
				mailchimp:                  $('.mailchimp-mailform'),
				materialParallax:           $('.parallax-container'),
				wow:                        $('.wow'),
				maps:                       $('.google-map-container'),
				isotope:                    $('.isotope-wrap'),
				countDown:                  $('.countdown'),
				counter:                    document.querySelectorAll('.counter'),
				dateCountdown:              document.querySelectorAll('.DateCountdown'),
				progressLinear:             document.querySelectorAll('.progress-linear'),
				progressCircle:             document.querySelectorAll('.progress-circle'),
			};


	/**
	 * @desc Check the element was been scrolled into the view
	 * @param {object} elem - jQuery object
	 * @return {boolean}
	 */
	function isScrolledIntoView(elem) {
		if (isNoviBuilder) return true;
		return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
	}


	/**
	 * @desc Calls a function when element has been scrolled into the view
	 * @param {object} element - jQuery object
	 * @param {function} func - init function
	 */
	function lazyInit(element, func) {
		var scrollHandler = function () {
			if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
				func.call(element);
				element.addClass('lazy-loaded');
			}
		};

		scrollHandler();
		$window.on('scroll', scrollHandler);
	}


	// Initialize scripts that require a loaded window
	$window.on('load', function () {
		// Page loader & Page transition
		if (plugins.preloader.length && !isNoviBuilder) {
			pageTransition({
				target:            document.querySelector('.page'),
				delay:             0,
				duration:          500,
				classIn:           'fadeIn',
				classOut:          'fadeOut',
				classActive:       'animated',
				conditions:        function (event, link) {
					return link
							&& !/(\#|javascript:void\(0\)|callto:|tel:|mailto:|:\/\/)/.test(link)
							&& !event.currentTarget.hasAttribute('data-lightgallery')
							&& !event.currentTarget.hasClass('jp-playlist-item')
							&& !document.documentElement.classList.contains('navbar-demo');
				},
				onTransitionStart: function (options) {
					setTimeout(function () {
						plugins.preloader.removeClass('loaded');
					}, options.duration * .75);
				},
				onReady:           function () {
					plugins.preloader.addClass('loaded');
					windowReady = true;
				}
			});
		}

		// Material Parallax
		if (plugins.materialParallax.length) {
			if (!isNoviBuilder && !isIE && !isMobile) {
				plugins.materialParallax.parallax();
			} else {
				for (var i = 0; i < plugins.materialParallax.length; i++) {
					var $parallax = $(plugins.materialParallax[i]);

					$parallax.addClass('parallax-disabled');
					$parallax.css({"background-image": 'url(' + $parallax.data("parallax-img") + ')'});
				}
			}
		}

		// Isotope
		if (plugins.isotope.length) {
			for (var i = 0; i < plugins.isotope.length; i++) {
				var
						wrap = plugins.isotope[i],
						filterHandler = function (event) {
							event.preventDefault();
							for (var n = 0; n < this.isoGroup.filters.length; n++) this.isoGroup.filters[n].classList.remove('active');
							this.classList.add('active');
							this.isoGroup.isotope.arrange({filter: this.getAttribute("data-isotope-filter") !== '*' ? '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]' : '*'});
						},
						resizeHandler = function () {
							this.isoGroup.isotope.layout();
						};

				wrap.isoGroup = {};
				wrap.isoGroup.filters = wrap.querySelectorAll('[data-isotope-filter]');
				wrap.isoGroup.node = wrap.querySelector('.isotope');
				wrap.isoGroup.layout = wrap.isoGroup.node.getAttribute('data-isotope-layout') ? wrap.isoGroup.node.getAttribute('data-isotope-layout') : 'masonry';
				wrap.isoGroup.isotope = new Isotope(wrap.isoGroup.node, {
					itemSelector: '.isotope-item',
					layoutMode:   wrap.isoGroup.layout,
					filter:       '*',
					columnWidth:  (function () {
						if (wrap.isoGroup.node.hasAttribute('data-column-class')) return wrap.isoGroup.node.getAttribute('data-column-class');
						if (wrap.isoGroup.node.hasAttribute('data-column-width')) return parseFloat(wrap.isoGroup.node.getAttribute('data-column-width'));
					}())
				});

				for (var n = 0; n < wrap.isoGroup.filters.length; n++) {
					var filter = wrap.isoGroup.filters[n];
					filter.isoGroup = wrap.isoGroup;
					filter.addEventListener('click', filterHandler);
				}

				window.addEventListener('resize', resizeHandler.bind(wrap));
			}
		}
	});


	// Initialize scripts that require a finished document
	$(function () {
		isNoviBuilder = window.xMode;

		/**
		 * @desc Initialize Bootstrap tooltip with required placement
		 * @param {string} tooltipPlacement
		 */
		function initBootstrapTooltip(tooltipPlacement) {
			plugins.bootstrapTooltip.tooltip('dispose');

			if (window.innerWidth < 480) {
				plugins.bootstrapTooltip.tooltip({placement: 'bottom'});
			} else {
				plugins.bootstrapTooltip.tooltip({placement: tooltipPlacement});
			}
		}

		/**
		 * @desc Google map function for getting latitude and longitude
		 */
		function getLatLngObject(str, marker, map, callback) {
			var coordinates = {};
			try {
				coordinates = JSON.parse(str);
				callback(new google.maps.LatLng(
						coordinates.lat,
						coordinates.lng
				), marker, map)
			} catch (e) {
				map.geocoder.geocode({'address': str}, function (results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						var latitude = results[0].geometry.location.lat();
						var longitude = results[0].geometry.location.lng();

						callback(new google.maps.LatLng(
								parseFloat(latitude),
								parseFloat(longitude)
						), marker, map)
					}
				})
			}
		}

		/**
		 * @desc Initialize Google maps
		 */
		function initMaps() {
			var key;

			for (var i = 0; i < plugins.maps.length; i++) {
				if (plugins.maps[i].hasAttribute("data-key")) {
					key = plugins.maps[i].getAttribute("data-key");
					break;
				}
			}

			$.getScript('//maps.google.com/maps/api/js?' + (key ? 'key=' + key + '&' : '') + 'sensor=false&libraries=geometry,places&v=quarterly', function () {
				var head = document.getElementsByTagName('head')[0],
						insertBefore = head.insertBefore;

				head.insertBefore = function (newElement, referenceElement) {
					if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
						return;
					}
					insertBefore.call(head, newElement, referenceElement);
				};
				var geocoder = new google.maps.Geocoder;
				for (var i = 0; i < plugins.maps.length; i++) {
					var zoom = parseInt(plugins.maps[i].getAttribute("data-zoom"), 10) || 11;
					var styles = plugins.maps[i].hasAttribute('data-styles') ? JSON.parse(plugins.maps[i].getAttribute("data-styles")) : [];
					var center = plugins.maps[i].getAttribute("data-center") || "New York";

					// Initialize map
					var map = new google.maps.Map(plugins.maps[i].querySelectorAll(".google-map")[0], {
						zoom:        zoom,
						styles:      styles,
						scrollwheel: false,
						center:      {
							lat: 0,
							lng: 0
						}
					});

					// Add map object to map node
					plugins.maps[i].map = map;
					plugins.maps[i].geocoder = geocoder;
					plugins.maps[i].keySupported = true;
					plugins.maps[i].google = google;

					// Get Center coordinates from attribute
					getLatLngObject(center, null, plugins.maps[i], function (location, markerElement, mapElement) {
						mapElement.map.setCenter(location);
					});

					// Add markers from google-map-markers array
					var markerItems = plugins.maps[i].querySelectorAll(".google-map-markers li");

					if (markerItems.length) {
						var markers = [];
						for (var j = 0; j < markerItems.length; j++) {
							var markerElement = markerItems[j];
							getLatLngObject(markerElement.getAttribute("data-location"), markerElement, plugins.maps[i], function (location, markerElement, mapElement) {
								var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
								var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
								var info = markerElement.getAttribute("data-description") || "";
								var infoWindow = new google.maps.InfoWindow({
									content: info
								});
								markerElement.infoWindow = infoWindow;
								var markerData = {
									position: location,
									map:      mapElement.map
								}
								if (icon) {
									markerData.icon = icon;
								}
								var marker = new google.maps.Marker(markerData);
								markerElement.gmarker = marker;
								markers.push({
									markerElement: markerElement,
									infoWindow:    infoWindow
								});
								marker.isActive = false;
								// Handle infoWindow close click
								google.maps.event.addListener(infoWindow, 'closeclick', (function (markerElement, mapElement) {
									var markerIcon = null;
									markerElement.gmarker.isActive = false;
									markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
									markerElement.gmarker.setIcon(markerIcon);
								}).bind(this, markerElement, mapElement));


								// Set marker active on Click and open infoWindow
								google.maps.event.addListener(marker, 'click', (function (markerElement, mapElement) {
									if (markerElement.infoWindow.getContent().length === 0) return;
									var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
									for (var k = 0; k < markers.length; k++) {
										var markerIcon;
										if (markers[k].markerElement === markerElement) {
											currentInfoWindow = markers[k].infoWindow;
										}
										gMarker = markers[k].markerElement.gmarker;
										if (gMarker.isActive && markers[k].markerElement !== markerElement) {
											gMarker.isActive = false;
											markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")
											gMarker.setIcon(markerIcon);
											markers[k].infoWindow.close();
										}
									}

									currentMarker.isActive = !currentMarker.isActive;
									if (currentMarker.isActive) {
										if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")) {
											currentMarker.setIcon(markerIcon);
										}

										currentInfoWindow.open(map, marker);
									} else {
										if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")) {
											currentMarker.setIcon(markerIcon);
										}
										currentInfoWindow.close();
									}
								}).bind(this, markerElement, mapElement))
							})
						}
					}
				}
			});
		}

		/**
		 * @desc Attach form validation to elements
		 * @param {object} elements - jQuery object
		 */
		function attachFormValidator(elements) {
			// Custom validator - phone number
			regula.custom({
				name:           'PhoneNumber',
				defaultMessage: 'Invalid phone number format',
				validator:      function () {
					if (this.value === '') return true;
					else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test(this.value);
				}
			});

			for (var i = 0; i < elements.length; i++) {
				var o = $(elements[i]), v;
				o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
				v = o.parent().find(".form-validation");
				if (v.is(":last-child")) o.addClass("form-control-last-child");
			}

			elements.on('input change propertychange blur', function (e) {
				var $this = $(this), results;

				if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
				if ($this.parents('.rd-mailform').hasClass('success')) return;

				if ((results = $this.regula('validate')).length) {
					for (i = 0; i < results.length; i++) {
						$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
					}
				} else {
					$this.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			}).regula('bind');

			var regularConstraintsMessages = [
				{
					type:       regula.Constraint.Required,
					newMessage: "The text field is required."
				},
				{
					type:       regula.Constraint.Email,
					newMessage: "The email is not a valid email."
				},
				{
					type:       regula.Constraint.Numeric,
					newMessage: "Only numbers are required"
				},
				{
					type:       regula.Constraint.Selected,
					newMessage: "Please choose an option."
				}
			];


			for (var i = 0; i < regularConstraintsMessages.length; i++) {
				var regularConstraint = regularConstraintsMessages[i];

				regula.override({
					constraintType: regularConstraint.type,
					defaultMessage: regularConstraint.newMessage
				});
			}
		}

		/**
		 * @desc Check if all elements pass validation
		 * @param {object} elements - object of items for validation
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function isValidated(elements, captcha) {
			var results, errors = 0;

			if (elements.length) {
				for (var j = 0; j < elements.length; j++) {

					var $input = $(elements[j]);
					if ((results = $input.regula('validate')).length) {
						for (var k = 0; k < results.length; k++) {
							errors++;
							$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
						}
					} else {
						$input.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}

				if (captcha) {
					if (captcha.length) {
						return validateReCaptcha(captcha) && errors === 0
					}
				}

				return errors === 0;
			}
			return true;
		}

		/**
		 * @desc Validate google reCaptcha
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function validateReCaptcha(captcha) {
			var captchaToken = captcha.find('.g-recaptcha-response').val();

			if (captchaToken.length === 0) {
				captcha
				.siblings('.form-validation')
				.html('Please, prove that you are not robot.')
				.addClass('active');
				captcha
				.closest('.form-wrap')
				.addClass('has-error');

				captcha.on('propertychange', function () {
					var $this = $(this),
							captchaToken = $this.find('.g-recaptcha-response').val();

					if (captchaToken.length > 0) {
						$this
						.closest('.form-wrap')
						.removeClass('has-error');
						$this
						.siblings('.form-validation')
						.removeClass('active')
						.html('');
						$this.off('propertychange');
					}
				});

				return false;
			}

			return true;
		}

		/**
		 * @desc Initialize Google reCaptcha
		 */
		window.onloadCaptchaCallback = function () {
			for (var i = 0; i < plugins.captcha.length; i++) {
				var $capthcaItem = $(plugins.captcha[i]);

				grecaptcha.render(
						$capthcaItem.attr('id'),
						{
							sitekey:  $capthcaItem.attr('data-sitekey'),
							size:     $capthcaItem.attr('data-size') ? $capthcaItem.attr('data-size') : 'normal',
							theme:    $capthcaItem.attr('data-theme') ? $capthcaItem.attr('data-theme') : 'light',
							callback: function (e) {
								$('.recaptcha').trigger('propertychange');
							}
						}
				);
				$capthcaItem.after("<span class='form-validation'></span>");
			}
		};

		/**
		 * @desc Initialize owl carousel plugin
		 * @param {object} carousel - carousel jQuery object
		 */
		function initOwlCarousel(carousel) {
			var
					aliaces = ['-', '-sm-', '-md-', '-lg-', '-xl-', '-xxl-'],
					values = [0, 480, 768, 992, 1200, 1600],
					responsive = {};

			for (var j = 0; j < values.length; j++) {
				responsive[values[j]] = {};
				for (var k = j; k >= -1; k--) {
					if (!responsive[values[j]]['items'] && carousel.attr('data' + aliaces[k] + 'items')) {
						responsive[values[j]]['items'] = k < 0 ? 1 : parseInt(carousel.attr('data' + aliaces[k] + 'items'), 10);
					}
					if (!responsive[values[j]]['stagePadding'] && responsive[values[j]]['stagePadding'] !== 0 && carousel.attr('data' + aliaces[k] + 'stage-padding')) {
						responsive[values[j]]['stagePadding'] = k < 0 ? 0 : parseInt(carousel.attr('data' + aliaces[k] + 'stage-padding'), 10);
					}
					if (!responsive[values[j]]['margin'] && responsive[values[j]]['margin'] !== 0 && carousel.attr('data' + aliaces[k] + 'margin')) {
						responsive[values[j]]['margin'] = k < 0 ? 30 : parseInt(carousel.attr('data' + aliaces[k] + 'margin'), 10);
					}
				}
			}

			// Initialize lightgallery items in cloned owl items
			carousel.on('initialized.owl.carousel', function () {
				initLightGalleryItem(carousel.find('[data-lightgallery="item"]'), 'lightGallery-in-carousel');
			});

			carousel.owlCarousel({
				autoplay:           isNoviBuilder ? false : carousel.attr('data-autoplay') !== 'false',
				autoplayTimeout:    carousel.attr("data-autoplay-time-out") ? Number(carousel.attr("data-autoplay-time-out")) : 3000,
				autoplayHoverPause: true,
				URLhashListener:    carousel.attr('data-hash-navigation') === 'true' || false,
				startPosition:      'URLHash',
				loop:               isNoviBuilder ? false : carousel.attr('data-loop') !== 'false',
				items:              1,
				autoHeight:         carousel.attr('data-auto-height') === 'true',
				center:             carousel.attr('data-center') === 'true',
				dotsContainer:      carousel.attr('data-pagination-class') || false,
				navContainer:       carousel.attr('data-navigation-class') || false,
				mouseDrag:          isNoviBuilder ? false : carousel.attr('data-mouse-drag') !== 'false',
				nav:                carousel.attr('data-nav') === 'true',
				dots:               carousel.attr('data-dots') === 'true',
				dotsEach:           carousel.attr('data-dots-each') ? parseInt(carousel.attr('data-dots-each'), 10) : false,
				animateIn:          carousel.attr('data-animation-in') ? carousel.attr('data-animation-in') : false,
				animateOut:         carousel.attr('data-animation-out') ? carousel.attr('data-animation-out') : false,
				responsive:         responsive,
				navText:            carousel.attr('data-nav-text') ? $.parseJSON(carousel.attr('data-nav-text')) : [],
				navClass:           carousel.attr('data-nav-class') ? $.parseJSON(carousel.attr('data-nav-class')) : ['owl-prev', 'owl-next']
			});
		}

		/**
		 * @desc Sets the actual previous index based on the position of the slide in the markup. Should be the most recent action.
		 * @param {object} swiper - swiper instance
		 */
		function setRealPrevious(swiper) {
			var element = swiper.$wrapperEl[0].children[swiper.activeIndex];
			swiper.realPrevious = Array.prototype.indexOf.call(element.parentNode.children, element);
		}

		/**
		 * @desc Sets slides background images from attribute 'data-slide-bg'
		 * @param {object} swiper - swiper instance
		 */
		function setBackgrounds(swiper) {
			let swipersBg = swiper.el.querySelectorAll('[data-slide-bg]');

			for (let i = 0; i < swipersBg.length; i++) {
				let swiperBg = swipersBg[i];
				swiperBg.style.backgroundImage = 'url(' + swiperBg.getAttribute('data-slide-bg') + ')';
			}
		}

		/**
		 * @desc Animate captions on active slides
		 * @param {object} swiper - swiper instance
		 */
		function initCaptionAnimate(swiper) {
			var
					animate = function (caption) {
						return function () {
							var duration;
							if (duration = caption.getAttribute('data-caption-duration')) caption.style.animationDuration = duration + 'ms';
							caption.classList.remove('not-animated');
							caption.classList.add(caption.getAttribute('data-caption-animate'));
							caption.classList.add('animated');
						};
					},
					initializeAnimation = function (captions) {
						for (var i = 0; i < captions.length; i++) {
							var caption = captions[i];
							caption.classList.remove('animated');
							caption.classList.remove(caption.getAttribute('data-caption-animate'));
							caption.classList.add('not-animated');
						}
					},
					finalizeAnimation = function (captions) {
						for (var i = 0; i < captions.length; i++) {
							var caption = captions[i];
							if (caption.getAttribute('data-caption-delay')) {
								setTimeout(animate(caption), Number(caption.getAttribute('data-caption-delay')));
							} else {
								animate(caption)();
							}
						}
					};

			// Caption parameters
			swiper.params.caption = {
				animationEvent: 'slideChangeTransitionEnd'
			};

			initializeAnimation(swiper.$wrapperEl[0].querySelectorAll('[data-caption-animate]'));
			finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll('[data-caption-animate]'));

			if (swiper.params.caption.animationEvent === 'slideChangeTransitionEnd') {
				swiper.on(swiper.params.caption.animationEvent, function () {
					initializeAnimation(swiper.$wrapperEl[0].children[swiper.previousIndex].querySelectorAll('[data-caption-animate]'));
					finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll('[data-caption-animate]'));
				});
			} else {
				swiper.on('slideChangeTransitionEnd', function () {
					initializeAnimation(swiper.$wrapperEl[0].children[swiper.previousIndex].querySelectorAll('[data-caption-animate]'));
				});

				swiper.on(swiper.params.caption.animationEvent, function () {
					finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll('[data-caption-animate]'));
				});
			}
		}

		/**
		 * initCustomScrollTo
		 * @description  init smooth anchor animations
		 */
		function initCustomScrollTo(obj) {
			var $this = $(obj);
			if (!isNoviBuilder) {
				$this.on('click', function (e) {
					e.preventDefault();
					$("body, html").stop().animate({
						scrollTop: $($(this).attr('data-custom-scroll-to')).offset().top
					}, 1000, function () {
						$window.trigger("resize");
					});
				});
			}
		}

		/**
		 * Parallax text
		 * @description  function for parallax text
		 */
		function scrollText($this) {
			var translate = (scrollTop - $($this).data('orig-offset')) / $window.height() * 35;
			$($this).css({transform: 'translate3d(0,' + translate + '%' + ', 0)'});
		}

		/**
		 * initNinaButtons
		 * @description  Make hover effect for nina buttons
		 */
		function initNinaButtons(ninaButtons) {
			for (var i = 0; i < ninaButtons.length; i++) {
				var btn = ninaButtons[i],
						origContent = btn.innerHTML.trim();

				if (!origContent) {
					continue;
				}

				var textNode = Array.prototype.slice.call(ninaButtons[i].childNodes).filter(function (node) {
					return node.nodeType === 3;
				}).pop();
				if (textNode == null) {
					continue;
				}

				var dummy = document.createElement('div');
				btn.replaceChild(dummy, textNode);
				dummy.outerHTML = textNode.textContent.split('').map(function (letter) {
					return "<span>" + letter.trim() + "</span>";
				}).join('');

				Array.prototype.slice.call(btn.childNodes).forEach(function (el, count) {
					el.style.transition = 'opacity .22s ' + 0.03 * count + 's,' + ' transform .22s ' + 0.03 * count + 's' + ', color .22s';
				});

				btn.innerHTML += "<span class='button-original-content'>" + origContent + "</span>";

				var delay = 0.03 * (btn.childElementCount - 1);
				// btn.getElementsByClassName('button-original-content')[0].style.transitionDelay = delay + 's';
				btn.getElementsByClassName('button-original-content')[0].style.transition = 'background .22s, color .22s, transform .22s ' + delay + 's';

				btn.addEventListener('mouseenter', function (e) {
					e.stopPropagation();
				});

				btn.addEventListener('mouseleave', function (e) {
					e.stopPropagation();
				});
			}
		}

		/**
		 * Live Search
		 * @description  create live search results
		 */
		function liveSearch(options) {
			options.live.removeClass('cleared').html();
			options.current++;
			options.spin.addClass('loading');

			$.get(handler, {
				s:          decodeURI(options.term),
				liveSearch: options.element.attr('data-search-live'),
				dataType:   "html",
				liveCount:  options.liveCount,
				filter:     options.filter,
				template:   options.template
			}, function (data) {
				options.processed++;
				var live = options.live;
				if (options.processed == options.current && !live.hasClass('cleared')) {
					live.find('> #search-results').removeClass('active');
					live.html(data);
					setTimeout(function () {
						live.find('> #search-results').addClass('active');
					}, 50);
				}
				options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
			})
		}

		/**
		 * @desc Initialize the gallery with set of images
		 * @param {object} itemsToInit - jQuery object
		 * @param {string} [addClass] - additional gallery class
		 */
		function initLightGallery(itemsToInit, addClass) {
			if (!isNoviBuilder) {
				$(itemsToInit).lightGallery({
					thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
					selector:  "[data-lightgallery='item']",
					autoplay:  $(itemsToInit).attr("data-lg-autoplay") === "true",
					pause:     parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
					addClass:  addClass,
					mode:      $(itemsToInit).attr("data-lg-animation") || "lg-slide",
					loop:      $(itemsToInit).attr("data-lg-loop") !== "false"
				});
			}
		}

		/**
		 * @desc Initialize the gallery with dynamic addition of images
		 * @param {object} itemsToInit - jQuery object
		 * @param {string} [addClass] - additional gallery class
		 */
		function initDynamicLightGallery(itemsToInit, addClass) {
			if (!isNoviBuilder) {
				$(itemsToInit).on("click", function () {
					$(itemsToInit).lightGallery({
						thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
						selector:  "[data-lightgallery='item']",
						autoplay:  $(itemsToInit).attr("data-lg-autoplay") === "true",
						pause:     parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
						addClass:  addClass,
						mode:      $(itemsToInit).attr("data-lg-animation") || "lg-slide",
						loop:      $(itemsToInit).attr("data-lg-loop") !== "false",
						dynamic:   true,
						dynamicEl: JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
					});
				});
			}
		}

		/**
		 * @desc Initialize the gallery with one image
		 * @param {object} itemToInit - jQuery object
		 * @param {string} [addClass] - additional gallery class
		 */
		function initLightGalleryItem(itemToInit, addClass) {
			if (!isNoviBuilder) {
				$(itemToInit).lightGallery({
					selector:            "this",
					addClass:            addClass,
					counter:             false,
					youtubePlayerParams: {
						modestbranding: 1,
						showinfo:       0,
						rel:            0,
						controls:       0
					},
					vimeoPlayerParams:   {
						byline:   0,
						portrait: 0
					}
				});
			}
		}

		/**
		 * layoutPanel
		 * @description  Enables layoutPanel
		 */
		if (plugins.layoutPanel.length > 0) {
			var altColorToggle = plugins.layoutPanel.find('.alt-color-toggle'),
					pageHead = document.head,
					defaultCss = $(pageHead).find('link[href="css/style.css"]');

			var altColorLink = document.createElement("link");
			altColorLink.href = "css/style-alt-colors.css";
			altColorLink.type = "text/css";
			altColorLink.rel = "stylesheet";


			if (altColorToggle[0].checked) {
				defaultCss.after(altColorLink);
			}

			altColorToggle.click(function (e) {
				if (e.target.checked) {
					defaultCss.after(altColorLink);
				} else {
					pageHead.removeChild(altColorLink);
				}
			});
		}

		// Copyright Year (Evaluates correct copyright year)
		if (plugins.copyrightYear.length) {
			plugins.copyrightYear.text(initialDate.getFullYear());
		}

		/**
		 * Is Mac os
		 * @description  add additional class on html if mac os.
		 */
		if (navigator.platform.match(/(Mac)/i)) $html.addClass("mac-os");

		/**
		 * Is Safari
		 * @description  add additional class on html if safari.
		 */
		if (isSafari) $html.addClass("safari");

		// Adds some loosing functionality to IE browsers (IE Polyfills)
		if (isIE) {
			if (isIE === 12) $html.addClass("ie-edge");
			if (isIE === 11) $html.addClass("ie-11");
			if (isIE < 10) $html.addClass("lt-ie-10");
			if (isIE < 11) $html.addClass("ie-10");
		}

		/**
		 * JQuery mousewheel plugin
		 * @description  Enables jquery mousewheel plugin
		 */
		if (plugins.scroller.length) {
			var i;
			for (i = 0; i < plugins.scroller.length; i++) {
				var scrollerItem = $(plugins.scroller[i]);

				scrollerItem.mCustomScrollbar({
					theme:         scrollerItem.attr('data-theme') ? scrollerItem.attr('data-theme') : 'minimal',
					scrollInertia: 100,
					scrollButtons: {enable: false}
				});
			}
		}

		/**
		 * Facebook widget
		 * @description  Enables official Facebook widget
		 */
		if (plugins.facebookWidget.length) {
			lazyInit(plugins.facebookWidget, function () {
				(function (d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) return;
					js = d.createElement(s);
					js.id = id;
					js.src = "//connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v2.5";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			});
		}

		/**
		 * Radio
		 * @description Add custom styling options for input[type="radio"]
		 */
		if (plugins.radio.length) {
			var i;
			for (i = 0; i < plugins.radio.length; i++) {
				var $this = $(plugins.radio[i]);
				$this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
			}
		}

		/**
		 * Checkbox
		 * @description Add custom styling options for input[type="checkbox"]
		 */
		if (plugins.checkbox.length) {
			var i;
			for (i = 0; i < plugins.checkbox.length; i++) {
				var $this = $(plugins.checkbox[i]);
				$this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
			}
		}

		/**
		 * Popovers
		 * @description Enables Popovers plugin
		 */
		if (plugins.popover.length) {
			if (window.innerWidth < 767) {
				plugins.popover.attr('data-placement', 'bottom');
				plugins.popover.popover();
			} else {
				plugins.popover.popover();
			}
		}

		/**
		 * Bootstrap Buttons
		 * @description  Enable Bootstrap Buttons plugin
		 */
		if (plugins.statefulButton.length) {
			$(plugins.statefulButton).on('click', function () {
				var statefulButtonLoading = $(this).button('loading');

				setTimeout(function () {
					statefulButtonLoading.button('reset')
				}, 2000);
			})
		}

		// RD Navbar
		if (plugins.rdNavbar.length) {
			var
					navbar = plugins.rdNavbar,
					aliases = {
						'-':      0,
						'-sm-':   480,
						'-md-':   768,
						'-lg-':   992,
						'-xl-':   1200,
						'-xxl-':  1600,
						'-xxxl-': 1800
					},
					responsive = {};

			for (var alias in aliases) {
				var link = responsive[aliases[alias]] = {};
				if (navbar.attr('data' + alias + 'layout')) link.layout = navbar.attr('data' + alias + 'layout');
				if (navbar.attr('data' + alias + 'device-layout')) link.deviceLayout = navbar.attr('data' + alias + 'device-layout');
				if (navbar.attr('data' + alias + 'hover-on')) link.focusOnHover = navbar.attr('data' + alias + 'hover-on') === 'true';
				if (navbar.attr('data' + alias + 'auto-height')) link.autoHeight = navbar.attr('data' + alias + 'auto-height') === 'true';
				if (navbar.attr('data' + alias + 'stick-up-offset')) link.stickUpOffset = navbar.attr('data' + alias + 'stick-up-offset');
				if (navbar.attr('data' + alias + 'stick-up')) link.stickUp = navbar.attr('data' + alias + 'stick-up') === 'true';
				if (isNoviBuilder) link.stickUp = false;
				else if (navbar.attr('data' + alias + 'stick-up')) link.stickUp = navbar.attr('data' + alias + 'stick-up') === 'true';
			}

			plugins.rdNavbar.RDNavbar({
				anchorNav:    !isNoviBuilder,
				stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
				responsive:   responsive,
				callbacks:    {
					onStuck:        function () {
						var navbarSearch = this.$element.find('.rd-search input');

						if (navbarSearch) {
							navbarSearch.val('').trigger('propertychange');
						}
					},
					onDropdownOver: function () {
						return !isNoviBuilder;
					},
					onUnstuck:      function () {
						if (this.$clone === null)
							return;

						var navbarSearch = this.$clone.find('.rd-search input');

						if (navbarSearch) {
							navbarSearch.val('').trigger('propertychange');
							navbarSearch.trigger('blur');
						}

					}
				}
			});
		}

		/**
		 * RD Search
		 * @description Enables search
		 */
		if (plugins.search.length || plugins.searchResults) {
			var handler = "bat/rd-search.php";
			var defaultTemplate = '<h5 class="search_title"><a target="_top" href="#{href}" class="search_link">#{title}</a></h5>' +
					'<p>...#{token}...</p>' +
					'<p class="match"><em>Terms matched: #{count} - URL: #{href}</em></p>';
			var defaultFilter = '*.html';

			if (plugins.search.length) {

				plugins.search = $('.' + plugins.search[0].className);

				for (i = 0; i < plugins.search.length; i++) {
					var searchItem = $(plugins.search[i]),
							options = {
								element:   searchItem,
								filter:    (searchItem.attr('data-search-filter')) ? searchItem.attr('data-search-filter') : defaultFilter,
								template:  (searchItem.attr('data-search-template')) ? searchItem.attr('data-search-template') : defaultTemplate,
								live:      (searchItem.attr('data-search-live')) ? (searchItem.find('.' + searchItem.attr('data-search-live'))) : false,
								liveCount: (searchItem.attr('data-search-live-count')) ? parseInt(searchItem.attr('data-search-live')) : 4,
								current:   0,
								processed: 0,
								timer:     {}
							};

					if ($('.rd-navbar-search-toggle').length) {
						var toggle = $('.rd-navbar-search-toggle');
						toggle.on('click', function () {
							if (!($(this).hasClass('active'))) {
								searchItem.find('input').val('').trigger('propertychange');
							}
						});
					}

					if (options.live) {
						options.clearHandler = false;

						searchItem.find('input').on("keyup input propertychange", $.proxy(function () {
							var ctx = this;

							this.term = this.element.find('input').val().trim();
							this.spin = this.element.find('.input-group-addon');

							clearTimeout(ctx.timer);

							if (ctx.term.length > 2) {
								ctx.timer = setTimeout(liveSearch(ctx), 200);

								if (ctx.clearHandler == false) {
									ctx.clearHandler = true;

									$("body").on("click", function (e) {
										if ($(e.toElement).parents('.rd-search').length == 0) {
											ctx.live.addClass('cleared').html('');
										}
									})
								}

							} else if (ctx.term.length == 0) {
								ctx.live.addClass('cleared').html('');
							}
						}, options, this));
					}

					searchItem.submit($.proxy(function () {
						$('<input />').attr('type', 'hidden')
						.attr('name', "filter")
						.attr('value', this.filter)
						.appendTo(this.element);
						return true;
					}, options, this))
				}
			}

			if (plugins.searchResults.length) {
				var regExp = /\?.*s=([^&]+)\&filter=([^&]+)/g;
				var match = regExp.exec(location.search);

				if (match != null) {
					$.get(handler, {
						s:        decodeURI(match[1]),
						dataType: "html",
						filter:   match[2],
						template: defaultTemplate,
						live:     ''
					}, function (data) {
						plugins.searchResults.html(data);
					})
				}
			}
		}

		/**
		 * ViewPort Universal
		 * @description Add class in viewport
		 */
		if (plugins.viewAnimate.length) {
			var i;
			for (i = 0; i < plugins.viewAnimate.length; i++) {
				var $view = $(plugins.viewAnimate[i]).not('.active');
				$document.on("scroll", $.proxy(function () {
					if (isScrolledIntoView(this)) {
						this.addClass("active");
					}
				}, $view))
				.trigger("scroll");
			}
		}

		/**
		 * RD Flickr Feed
		 * @description Enables RD Flickr Feed plugin
		 */
		if (plugins.flickrfeed.length > 0) {
			var i;
			for (i = 0; i < plugins.flickrfeed.length; i++) {
				var flickrfeedItem = $(plugins.flickrfeed[i]);
				flickrfeedItem.RDFlickr({
					callback: function () {
						var items = flickrfeedItem.find("[data-lightgallery]");

						if (items.length) {
							for (var j = 0; j < items.length; j++) {
								var image = new Image();
								image.setAttribute('data-index', j);
								image.onload = function () {
									items[this.getAttribute('data-index')].setAttribute('data-size', this.naturalWidth + 'x' + this.naturalHeight);
								};
								image.src = items[j].getAttribute('href');
							}
						}
					}
				});
			}
		}

		// RD Twitter Feed
		if (plugins.twitterfeed.length > 0) {
			var i;
			for (i = 0; i < plugins.twitterfeed.length; i++) {
				$(plugins.twitterfeed[i]).RDTwitter({});
			}
		}

		// Bootstrap tabs
		if (plugins.bootstrapTabs.length) {
			for (var i = 0; i < plugins.bootstrapTabs.length; i++) {
				var bootstrapTab = $(plugins.bootstrapTabs[i]);

				//If have slick carousel inside tab - resize slick carousel on click
				if (bootstrapTab.find('.slick-slider').length) {
					bootstrapTab.find('.tabs-custom-list > li > a').on('click', $.proxy(function () {
						var $this = $(this);
						var setTimeOutTime = isNoviBuilder ? 1500 : 300;

						setTimeout(function () {
							$this.find('.tab-content .tab-pane.active .slick-slider').slick('setPosition');
						}, setTimeOutTime);
					}, bootstrapTab));
				}

				var tabs = plugins.bootstrapTabs[i].querySelectorAll('.nav li a');

				for (var t = 0; t < tabs.length; t++) {
					var tab = tabs[t];

					if (t === 0) {
						tab.parentElement.classList.remove('active');
						$(tab).tab('show');
					}

					tab.addEventListener('click', function (event) {
						event.preventDefault();
						$(this).tab('show');
					});
				}
			}
		}

		/**
		 * Enable parallax by mouse
		 */
		var parallaxJs = document.getElementsByClassName('parallax-scene-js');
		if (parallaxJs && !isNoviBuilder) {
			for (var i = 0; i < parallaxJs.length; i++) {
				var scene = parallaxJs[i];
				new Parallax(scene);
			}
		}

		/**
		 * jpFormatePlaylistObj
		 * @description  format dynamic playlist object for jPlayer init
		 */
		function jpFormatePlaylistObj(playlistHtml) {
			var playlistObj = [];

			// Format object with audio
			for (var i = 0; i < playlistHtml.length; i++) {
				var playlistItem = playlistHtml[i],
						itemData = $(playlistItem).data();
				playlistObj[i] = {};

				for (var key in itemData) {
					playlistObj[i][key.replace('jp', '').toLowerCase()] = itemData[key];
				}
			}

			return playlistObj;
		}

		/**
		 * initJplayerBase
		 * @description Base jPlayer init
		 */
		function initJplayerBase(index, item, mediaObj) {
			return new jPlayerPlaylist({
				jPlayer:             item.getElementsByClassName("jp-jplayer")[0],
				cssSelectorAncestor: ".jp-audio-" + index // Need too bee a selector not HTMLElement or Jq object, so we make it unique
			}, mediaObj, {
				playlistOptions:   {
					enableRemoveControls: false
				},
				supplied:          "ogv, m4v, oga, mp3",
				useStateClassSkin: true,
				volume:            0.4
			});
		}

		/**
		 * Jp Audio player
		 * @description  Custom jPlayer script
		 */
		if (plugins.jPlayerInit.length) {
			$html.addClass('ontouchstart' in window || 'onmsgesturechange' in window ? 'touch' : 'no-touch');

			$.each(plugins.jPlayerInit, function (index, item) {
				$(item).addClass('jp-audio-' + index);

				var mediaObj = jpFormatePlaylistObj($(item).find('.jp-player-list .jp-player-list-item')),
						playerInstance = initJplayerBase(index, item, mediaObj);

				if ($(item).data('jp-player-name')) {
					var customJpPlaylists = $('[data-jp-playlist-relative-to="' + $(item).data('jp-player-name') + '"]'),
							playlistItems = customJpPlaylists.find("[data-jp-playlist-item]");

					// Toggle audio play on custom playlist play button click
					playlistItems.on('click', customJpPlaylists.data('jp-playlist-play-on'), function (e) {
						var mediaObj = jpFormatePlaylistObj(playlistItems),
								$clickedItem = $(e.delegateTarget);

						if (!JSON.stringify(playerInstance.playlist) === JSON.stringify(mediaObj) || !playerInstance.playlist.length) {
							playerInstance.setPlaylist(mediaObj);
						}

						if (!$clickedItem.hasClass('playing')) {
							playerInstance.pause();

							if ($clickedItem.hasClass('last-played')) {
								playerInstance.play();
							} else {
								playerInstance.play(playlistItems.index($clickedItem));
							}

							playlistItems.removeClass('playing last-played');
							$clickedItem.addClass('playing');
						} else {
							playlistItems.removeClass('playing last-played');
							$clickedItem.addClass('last-played');
							playerInstance.pause();
						}

					});


					// Callback for custom playlist
					$(playerInstance.cssSelector.jPlayer).bind($.jPlayer.event.play, function (e) {

						var toggleState = function (elemClass, index) {
							var activeIndex = playlistItems.index(playlistItems.filter(elemClass));

							if (activeIndex !== -1) {
								if (playlistItems.eq(activeIndex + index).length !== 0) {
									playlistItems.eq(activeIndex)
									.removeClass('play-next play-prev playing last-played')
									.end()
									.eq(activeIndex + index)
									.addClass('playing');
								}
							}
						};

						// Check if user select next or prev track
						toggleState('.play-next', +1);
						toggleState('.play-prev', -1);

						var lastPlayed = playlistItems.filter('.last-played');

						// If user just press pause and than play on same track
						if (lastPlayed.length) {
							lastPlayed.addClass('playing').removeClass('last-played play-next');
						}
					});


					// Add temp marker of last played audio
					$(playerInstance.cssSelector.jPlayer).bind($.jPlayer.event.pause, function (e) {
						playlistItems.filter('.playing').addClass('last-played').removeClass('playing');

						$(playerInstance.cssSelector.cssSelectorAncestor).addClass('jp-state-visible');
					});

					// Add temp marker that user want to play next audio
					$(item).find('.jp-next')
					.on('click', function (e) {
						playlistItems.filter('.playing, .last-played').addClass('play-next');
					});

					// Add temp marker that user want to play prev audio
					$(item).find('.jp-previous')
					.on('click', function (e) {
						playlistItems.filter('.playing, .last-played').addClass('play-prev');
					});
				}
			});

		}

		/**
		 * Instance CirclePlayer
		 *
		 * CirclePlayer(jPlayerSelector, media, options)
		 *   jPlayerSelector: String - The css selector of the jPlayer div.
		 *   media: Object - The media object used in jPlayer("setMedia",media).
		 *   options: Object - The jPlayer options.
		 *
		 * @description  Multiple instances must set the cssSelectorAncestor in the jPlayer options.
		 */
		if (plugins.circleJPlayer.length) {
			$.each(plugins.circleJPlayer, function (index, item) {
				$(item).find('.cp-jplayer').addClass('cp-jplayer-' + index);
				$(item).find('.cp-container').addClass('cp-container-' + index);

				new CirclePlayer(".cp-jplayer-" + index,
						{
							oga: $(item).data('jp-oga'),
							m4a: $(item).data('jp-m4a'),
							mp3: $(item).data('jp-mp3')
						}, {
							cssSelectorAncestor: ".cp-container-" + index,
							supplied:            "mp3, m4a",
							volume:              0.4
						});
			});
		}

		/**
		 * Jp Video player
		 * @description  Custom jPlayer video initialization
		 */
		if (plugins.jPlayerVideo.length) {
			$.each(plugins.jPlayerVideo, function (index, item) {
				var $item = $(item);

				$item.find('.jp-video').addClass('jp-video-' + index);

				new jPlayerPlaylist({
					jPlayer:             item.getElementsByClassName("jp-jplayer")[0],
					cssSelectorAncestor: ".jp-video-" + index // Need too bee a selector not HTMLElement or Jq object, so we make it unique
				}, jpFormatePlaylistObj($(item).find('.jp-player-list .jp-player-list-item')), {
					playlistOptions:   {
						enableRemoveControls: false
					},
					size:              {
						width:  "100%",
						height: "auto",
					},
					supplied:          "webmv, ogv, m4v",
					useStateClassSkin: true,
					volume:            0.4
				});

				$(item).find(".jp-jplayer").on('click', function (e) {
					var $this = $(this);
					if ($('.jp-video-' + index).hasClass('jp-state-playing')) {
						$this.jPlayer("pause");
					} else {
						$this.jPlayer("play");
					}
				});

				var initialContainerWidth = $item.width();
				// this is the overall page container, so whatever is relevant to your page

				$window.resize(function () {
					if ($item.width() !== initialContainerWidth) {
						// checks current container size against it's rendered size on every resize.
						initialContainerWidth = $item.width();
						$item.trigger('resize', $item);
						//pass off to resize listener for performance
					}
				});
			});

			$window.on('resize', function (e) {
				$('.jp-video').each(function (index) {
					// find every instance of jplayer using a class in their default markup
					var $parentContainer = $(this).closest('.jp-video-init'),
							// finds jplayers closest parent element from the ones you give it (can chain as many as you want)
							containerWidth = $parentContainer.width(),
							//takes the closest elements width
							ARWidth = 1280,
							ARHeight = 720;

					// Width and height figures used to calculate the aspect ratio (will not restrict your players to this size)

					var aspectRatio = ARHeight / ARWidth;

					var videoHeight = Math.round(aspectRatio * containerWidth);
					// calculates the appropriate height in rounded pixels using the aspect ratio
					$(this).find('.jp-jplayer').width(containerWidth).height(videoHeight);
					// and then apply the width and height!
				});
			})
			.trigger('resize');
		}

		/**
		 * Button Nina
		 * @description Handle button Nina animation effect
		 */
		if (plugins.buttonNina.length && !isNoviBuilder) {
			initNinaButtons(plugins.buttonNina);
		}

		// Bootstrap Date time picker
		if (plugins.bootstrapDateTimePicker.length) {
			for (var i = 0; i < plugins.bootstrapDateTimePicker.length; i++) {
				var
						$dateTimePicker = $(plugins.bootstrapDateTimePicker[i]),
						options = {
							date:      $dateTimePicker.attr("data-time-picker") === "date",
							time:      $dateTimePicker.attr("data-time-picker") === "time",
							shortTime: true
						};

				if (options.date) {
					options.format = 'DD-MM-YYYY';
					options.minDate = new Date();
				} else if (options.time) {
					options.format = 'HH:mm';
				} else {
					options.format = 'dddd DD MMMM YYYY - HH:mm';
				}

				$dateTimePicker.bootstrapMaterialDatePicker(options);
			}
		}

		/**
		 * Stepper
		 * @description Enables Stepper Plugin
		 */
		if (plugins.stepper.length) {
			plugins.stepper.stepper({
				labels: {
					up:   "",
					down: ""
				}
			});
		}

		/**
		 * typedjs
		 * @description Enables Stepper Plugin
		 */
		if (plugins.typedjs.length && !isNoviBuilder) {
			// var e = ["tech", "cooking", "gardening", "personal", "design", "travel", "adventure", "crafts", "family", "team"];
			var e = ["auction", "taxi", "private airlines", "it", "maritime", "theatre", "movie", "trucking", "environmental", "SEO"];
			$('.typed-text').typed({
				strings:   e,
				typeSpeed: 150,
				loop:      !0,
				backDelay: 1500
			});
		}

		/**
		 *  Notification modal
		 * */
		if (plugins.bootstrapModalNotification.length) {
			$('body').css('overflow', 'visible')
			plugins.bootstrapModalNotification.on('shown.bs.modal', function () {
				$(this).addClass('notification-open');
			});
		}

		/**
		 * Parallax text
		 * */
		if (plugins.parallaxText.length && !isNoviBuilder) {
			var scrollTop = $window.scrollTop();

			plugins.parallaxText.each(function () {
				$(this).data('orig-offset', $(this).offset().top);
				scrollText($(this));
			});

			$window.scroll(function () {
				scrollTop = $window.scrollTop();
				plugins.parallaxText.each(function () {
					scrollText($(this));
				});
			});

			$window.on('resize', function () {
				scrollTop = $window.scrollTop();
				plugins.parallaxText.each(function () {
					$(this).data('orig-offset', $(this).offset().top);
					scrollText($(this));
				});
			});
		}

		/**
		 * Custom Waypoints
		 */
		if (plugins.customWaypoints.length && !isNoviBuilder) {
			initCustomScrollTo(plugins.customWaypoints);
		}

		// jQuery Countdown
		if (plugins.countDown.length) {
			var i;
			for (i = 0; i < plugins.countDown.length; i++) {

				var countDownItem = plugins.countDown[i],
						d = new Date(),
						time = countDownItem.getAttribute('data-time'),
						type = countDownItem.getAttribute('data-type'), // {until | since}
						format = countDownItem.getAttribute('data-format') ? countDownItem.getAttribute('data-format') : 'YYYY/MM/DD hh:mm:ss',
						expiryText = countDownItem.getAttribute('data-expiry-text') ? countDownItem.getAttribute('data-expiry-text') : 'Countdown finished',
						labels = countDownItem.getAttribute('data-labels') ? countDownItem.getAttribute('data-labels') : '',
						layout = countDownItem.getAttribute('data-layout') ? countDownItem.getAttribute('data-layout') : '{yn} {yl} {on} {ol} {dn} {dl} {hnn}{sep}{mnn}{sep}{snn}',
						settings = [];


				if (labels.length > 0) {
					settings['labels'] = JSON.parse(labels);
				}

				d.setTime(Date.parse(time)).toLocaleString();
				settings[type] = d;
				settings['expiryText'] = expiryText;
				settings['format'] = format;
				settings['alwaysExpire'] = true;
				settings['padZeroes'] = true;
				settings['layout'] = layout;
				settings['onExpiry'] = function () {
					this.classList += ' countdown-expired';
					this.innerHtml = expiryText;
				};

				$(countDownItem).countdown(settings);
			}
		}

		/**
		 * Style Switcher
		 * @description  Enable style switcher
		 */
		if (plugins.styleSwitcher.length) {
			for (i = 0; i < plugins.styleSwitcher.length; i++) {
				var $currentSwitcher = $(plugins.styleSwitcher[i]),
						$switcherContainer,
						$switcherSection = $($currentSwitcher.find('> .style-switcher-container > .section')[0]),
						$switcherPanel = $($currentSwitcher.find('> .style-switcher-panel-wrap .style-switcher-panel')[0]),
						$switcherToggle = $($currentSwitcher.find('.style-switcher-toggle')[0]);


				// Init section-reverse toggle
				if ($switcherToggle) {
					$switcherToggle.click((function ($switcherSection) {
						return function () {
							$switcherSection.toggleClass('section-reverse');
						}
					})($switcherSection));
				}

				// If switchable container is custom element (not .section)
				if ($currentSwitcher.attr('data-container')) {
					$switcherContainer = $($currentSwitcher.find($currentSwitcher.attr('data-container')));
				} else {
					$switcherContainer = $switcherSection;
				}

				// Find active switcher panel item
				var $activeButton = $($switcherPanel.find('li.active > .button')[0]);
				if (!$activeButton.length) {
					$activeButton = $($switcherPanel.find('li > .button')[0]);
				}

				if (!$activeButton.length) continue;

				// Add handler to style switcher controls
				$switcherPanel.find('li > .button').click((function ($switcherContainer, $activeButton) {
					var currentClassSet = '',
							currentButton = $activeButton,
							prevButton = $activeButton;

					return function () {
						currentButton.parent().removeClass('active');
						prevButton = currentButton;
						currentButton = $(this);
						var newClassSet = currentButton.attr('data-customize-class');
						currentButton.parent().addClass('active');

						$switcherContainer.removeClass(currentClassSet);
						$switcherContainer.addClass(newClassSet);
						currentClassSet = newClassSet;

						if (prevButton != currentButton) {
							// $switcherSection.removeClass('section-reverse');
						}
					}
				})($switcherContainer, $activeButton));

				$activeButton.click();
			}
		}

		/**
		 * Slick carousel
		 * @description  Enable Slick carousel plugin
		 */
		if (plugins.slick.length) {
			var i;
			for (i = 0; i < plugins.slick.length; i++) {
				var $slickItem = $(plugins.slick[i]);

				$slickItem.slick({
					slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll')) || 1,
					asNavFor:       $slickItem.attr('data-for') || false,
					dots:           $slickItem.attr("data-dots") === "true",
					infinite:       isNoviBuilder ? false : $slickItem.attr("data-loop") === "true",
					focusOnSelect:  true,
					arrows:         $slickItem.attr("data-arrows") === "true",
					prevArrow:      $slickItem.attr('data-custom-arrows') === 'true' ? $('.slick-prev[data-slick="' + $slickItem.attr('id') + '"]') : '',
					nextArrow:      $slickItem.attr('data-custom-arrows') === 'true' ? $('.slick-next[data-slick="' + $slickItem.attr('id') + '"]') : '',
					swipe:          $slickItem.attr("data-swipe") === "true",
					autoplay:       $slickItem.attr("data-autoplay") === "true",
					vertical:       $slickItem.attr("data-vertical") === "true",
					centerMode:     $slickItem.attr("data-center-mode") === "true",
					centerPadding:  $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
					mobileFirst:    true,
					touchMove:      false,
					adaptiveHeight: true,
					responsive:     [
						{
							breakpoint: 0,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-items')) || 1,
							}
						},
						{
							breakpoint: 479,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-xs-items')) || 1,
							}
						},
						{
							breakpoint: 767,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-sm-items')) || 1,
							}
						},
						{
							breakpoint: 991,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-md-items')) || 1,
							}
						},
						{
							breakpoint: 1199,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-lg-items')) || 1,
							}
						}
					]
				})
				.on('afterChange', function (event, slick, currentSlide, nextSlide) {

					var $this = $(this),
							childCarousel = $this.attr('data-child');


					if (childCarousel) {
						$(childCarousel + ' .slick-slide').removeClass('slick-current');
						$(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
					}
				});

				window.addEventListener('resize', function () {
					$slickItem.slick('refresh');
				});
			}
		}

		if (plugins.productThumb.length) {
			var i;
			for (i = 0; i < plugins.productThumb.length; i++) {
				var thumbnails = $(plugins.productThumb[i]);
				thumbnails.find("li").on('click', function () {
					var item = $(this);
					item.parent().find('.active').removeClass('active');
					var image = item.parents(".product-single").find(".product-image-area");
					image.removeClass('animateImageIn');
					image.addClass('animateImageOut');
					item.addClass('active');
					setTimeout(function () {
						var src = item.find("img").attr("src");
						if (item.attr('data-large-image')) {
							src = item.attr('data-large-image');
						}
						image.attr("src", src);
						image.removeClass('animateImageOut');
						image.addClass('animateImageIn');
					}, 300);
				})
			}
		}

		var $body = $('body'),
				$pagination = $('.slick-books-wrap .slick-dots li'),
				$toggle = $('.block-with-details');

		/*
		* Booking products
		* */
		$toggle.each(function (index) {
			var $this = $($toggle[index]);

			$body.on('click', $this, function (event) {
				$this.removeClass('details-open');
				console.log('body click');
			});

			$this.on('click', function (event) {
				event.stopPropagation();
				$toggle.not($this).removeClass('details-open');
				$this.toggleClass('details-open');
				console.log('toggle click: ' + index);
			});

			$pagination.on('click', function (event) {
				$toggle.removeClass('details-open');
				console.log('pagination click');
			});

			$(this).children('.show-details').on('click', function (event) {
				event.preventDefault();
			});
		});

		/**
		 * D3 Charts
		 * @description Enables D3 Charts plugin
		 */
		if (plugins.d3Charts.length) {
			// for (i = 0; i < plugins.d3Charts.length; i++) {
			//   var d3ChartsItem = $(plugins.d3Charts[i]),
			//     d3ChartItemObject = parseJSONObject(d3ChartsItem, 'data-graph-object');
			//   c3ChartsArray.push(c3.generate(d3ChartItemObject));
			// }
		}

		function fillNumbers(n) {
			return Array.apply(null, {length: n}).map(Function.call, Number);
		}

		var lineChart,
				lineChartObject = {
					bindto:     '#line-chart',
					color:      {
						pattern: ['#a820d3', '#ed1c94']
					},
					point:      {
						show: false,
						r:    4
					},
					padding:    {
						left:   30,
						right:  30,
						top:    0,
						bottom: 0
					},
					data:       {
						x:       'x',
						columns: [
							['x', '2019-03-01', '2019-04-01', '2019-05-01', '2019-06-01', '2019-07-01', '2019-08-01', '2019-09-01', '2019-10-01', '2019-11-01'],
							['data1', 24600, 27900, 29200, 32200, 37300, 41500, 42950, 43100, 42900, 43000],
							['data2', 22900, 25600, 26800, 28200, 32700, 36200, 37500, 36700, 35100, 33700]
						],
						axes:    {
							data1: 'y'
						},
						type:    'spline',
						names:   {
							data1: 'Profit',
							data2: 'Expenses'
						}
					},
					legend:     {
						show:     true,
						position: 'bottom'
					},
					grid:       {
						x: {
							show: true
						},
						y: {
							show: false
						}
					},
					labels:     true,
					axis:       {
						x: {
							type:    'timeseries',
							min:     '2019-02-01',
							tick:    {
								format: '%b %Y',
								outer:  false
							},
							padding: {
								left:  0,
								right: 10
							}
						},
						y: {
							min:     16000,
							max:     49000,
							label:   {
								text:     '$',
								position: 'inner-top'
							},
							tick:    {
								format: function (x) {
									if (x > 1000) {
										return Math.round(x / 1000) + 'K';
									} else {
										return x;
									}
								},
								outer:  false
							},
							padding: {
								top:    0,
								bottom: 0
							}
						}
					},
					line:       {
						connectNull: true
					},
					oninit:     wrapLabels(),
					onrendered: wrapLabels(),
					onresized:  wrapLabels(),
					onmouseout: wrapLabels()
				};

		function wrap(text, width) {
			text.each(function () {
				var text = d3.select(this);
				if (text.selectAll('tspan').size() > 1) return;

				var words = text.text().split(/\s+/).reverse(),
						word,
						line = [],
						lineNumber = 0,
						lineHeight = 1.2, // ems
						y = text.attr("y"),
						dy = parseFloat(text.attr("dy")),
						tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

				while (word = words.pop()) {
					line.push(word);
					tspan.text(line.join(" "));
					if (tspan.node().getComputedTextLength() > width) {
						line.pop();
						tspan.text(line.join(" "));
						line = [word];
						tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
					}
				}
			});
		}

		lineChart = c3.generate(lineChartObject);
		wrapLabels();

		$window.on('resize orientationchange', function () {
			wrapLabels();
		});

		function wrapLabels() {
			d3.select('#line-chart').selectAll(".c3-axis-x .tick text")
			.attr('dy', '0.5em')
			.call(wrap, 30);
		}

		d3.select('.d3-chart-wrap').insert('div', '.d3-chart + *').attr('class', 'd3-chart-legend').selectAll('span')
		.data(['data1', 'data2'])
		.enter().append('span')
		.attr('data-id', function (id) {
			return id;
		})
		.html(function (id) {
			return lineChartObject.data.names[id] ? lineChartObject.data.names[id] : id;
		})
		.on('mouseover', function (id) {
			lineChart.focus(id);
		})
		.on('mouseout', function (id) {
			lineChart.revert();
		});


		// lightGallery
		if (plugins.lightGallery.length) {
			for (var i = 0; i < plugins.lightGallery.length; i++) {
				initLightGallery(plugins.lightGallery[i]);
			}
		}

		// lightGallery item
		if (plugins.lightGalleryItem.length) {
			// Filter carousel items
			var notCarouselItems = [];

			for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
				if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
						!$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
						!$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
					notCarouselItems.push(plugins.lightGalleryItem[z]);
				}
			}

			plugins.lightGalleryItem = notCarouselItems;

			for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
				initLightGalleryItem(plugins.lightGalleryItem[i]);
			}
		}

		// Dynamic lightGallery
		if (plugins.lightDynamicGalleryItem.length) {
			for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
				initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
			}
		}

		// Google ReCaptcha
		if (plugins.captcha.length) {
			$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
		}

		// RD Input Label
		if (plugins.rdInputLabel.length) {
			plugins.rdInputLabel.RDInputLabel();
		}

		// Regula
		if (plugins.regula.length) {
			attachFormValidator(plugins.regula);
		}

		// MailChimp Ajax subscription
		if (plugins.mailchimp.length) {
			for (i = 0; i < plugins.mailchimp.length; i++) {
				var $mailchimpItem = $(plugins.mailchimp[i]),
						$email = $mailchimpItem.find('input[type="email"]');

				// Required by MailChimp
				$mailchimpItem.attr('novalidate', 'true');
				$email.attr('name', 'EMAIL');

				$mailchimpItem.on('submit', $.proxy(function ($email, event) {
					event.preventDefault();

					var $this = this;

					var data = {},
							url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
							dataArray = $this.serializeArray(),
							$output = $("#" + $this.attr("data-form-output"));

					for (i = 0; i < dataArray.length; i++) {
						data[dataArray[i].name] = dataArray[i].value;
					}

					$.ajax({
						data:       data,
						url:        url,
						dataType:   'jsonp',
						error:      function (resp, text) {
							$output.html('Server error: ' + text);

							setTimeout(function () {
								$output.removeClass("active");
							}, 4000);
						},
						success:    function (resp) {
							$output.html(resp.msg).addClass('active');
							$email[0].value = '';
							var $label = $('[for="' + $email.attr('id') + '"]');
							if ($label.length) $label.removeClass('focus not-empty');

							setTimeout(function () {
								$output.removeClass("active");
							}, 6000);
						},
						beforeSend: function (data) {
							var isNoviBuilder = window.xMode;

							var isValidated = (function () {
								var results, errors = 0;
								var elements = $this.find('[data-constraints]');
								var captcha = null;
								if (elements.length) {
									for (var j = 0; j < elements.length; j++) {

										var $input = $(elements[j]);
										if ((results = $input.regula('validate')).length) {
											for (var k = 0; k < results.length; k++) {
												errors++;
												$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
											}
										} else {
											$input.siblings(".form-validation").text("").parent().removeClass("has-error")
										}
									}

									if (captcha) {
										if (captcha.length) {
											return validateReCaptcha(captcha) && errors === 0
										}
									}

									return errors === 0;
								}
								return true;
							})();

							// Stop request if builder or inputs are invalide
							if (isNoviBuilder || !isValidated)
								return false;

							$output.html('Submitting...').addClass('active');
						}
					});

					return false;
				}, $mailchimpItem, $email));
			}
		}

		// Campaign Monitor ajax subscription
		if (plugins.campaignMonitor.length) {
			for (i = 0; i < plugins.campaignMonitor.length; i++) {
				var $campaignItem = $(plugins.campaignMonitor[i]);

				$campaignItem.on('submit', $.proxy(function (e) {
					var data = {},
							url = this.attr('action'),
							dataArray = this.serializeArray(),
							$output = $("#" + plugins.campaignMonitor.attr("data-form-output")),
							$this = $(this);

					for (i = 0; i < dataArray.length; i++) {
						data[dataArray[i].name] = dataArray[i].value;
					}

					$.ajax({
						data:       data,
						url:        url,
						dataType:   'jsonp',
						error:      function (resp, text) {
							$output.html('Server error: ' + text);

							setTimeout(function () {
								$output.removeClass("active");
							}, 4000);
						},
						success:    function (resp) {
							$output.html(resp.Message).addClass('active');

							setTimeout(function () {
								$output.removeClass("active");
							}, 6000);
						},
						beforeSend: function (data) {
							// Stop request if builder or inputs are invalide
							if (isNoviBuilder || !isValidated($this.find('[data-constraints]')))
								return false;

							$output.html('Submitting...').addClass('active');
						}
					});

					// Clear inputs after submit
					var inputs = $this[0].getElementsByTagName('input');
					for (var i = 0; i < inputs.length; i++) {
						inputs[i].value = '';
						var label = document.querySelector('[for="' + inputs[i].getAttribute('id') + '"]');
						if (label) label.classList.remove('focus', 'not-empty');
					}

					return false;
				}, $campaignItem));
			}
		}

		// RD Mailform
		if (plugins.rdMailForm.length) {
			var i, j, k,
					msg = {
						'MF000': 'Successfully sent!',
						'MF001': 'Recipients are not set!',
						'MF002': 'Form will not work locally!',
						'MF003': 'Please, define email field in your form!',
						'MF004': 'Please, define type of your form!',
						'MF254': 'Something went wrong with PHPMailer!',
						'MF255': 'Aw, snap! Something went wrong.'
					};

			for (i = 0; i < plugins.rdMailForm.length; i++) {
				var $form = $(plugins.rdMailForm[i]),
						formHasCaptcha = false;

				$form.attr('novalidate', 'novalidate').ajaxForm({
					data:         {
						"form-type": $form.attr("data-form-type") || "contact",
						"counter":   i
					},
					beforeSubmit: function (arr, $form, options) {
						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
								inputs = form.find("[data-constraints]"),
								output = $("#" + form.attr("data-form-output")),
								captcha = form.find('.recaptcha'),
								captchaFlag = true;

						output.removeClass("active error success");

						if (isValidated(inputs, captcha)) {

							// veify reCaptcha
							if (captcha.length) {
								var captchaToken = captcha.find('.g-recaptcha-response').val(),
										captchaMsg = {
											'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
											'CPT002': 'Something wrong with google reCaptcha'
										};

								formHasCaptcha = true;

								$.ajax({
									method: "POST",
									url:    "bat/reCaptcha.php",
									data:   {'g-recaptcha-response': captchaToken},
									async:  false
								})
								.done(function (responceCode) {
									if (responceCode !== 'CPT000') {
										if (output.hasClass("snackbars")) {
											output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

											setTimeout(function () {
												output.removeClass("active");
											}, 3500);

											captchaFlag = false;
										} else {
											output.html(captchaMsg[responceCode]);
										}

										output.addClass("active");
									}
								});
							}

							if (!captchaFlag) {
								return false;
							}

							form.addClass('form-in-process');

							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
								output.addClass("active");
							}
						} else {
							return false;
						}
					},
					error:        function (result) {
						if (isNoviBuilder)
							return;

						var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
								form = $(plugins.rdMailForm[this.extraData.counter]);

						output.text(msg[result]);
						form.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						}
					},
					success:      function (result) {
						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
								output = $("#" + form.attr("data-form-output")),
								select = form.find('select');

						form
						.addClass('success')
						.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						}

						result = result.length === 5 ? result : 'MF255';
						output.text(msg[result]);

						if (result === "MF000") {
							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active success");
							}
						} else {
							if (output.hasClass("snackbars")) {
								output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active error");
							}
						}

						form.clearForm();

						if (select.length) {
							select.select2("val", " ");
						}

						form.find('input, textarea').trigger('blur');

						setTimeout(function () {
							output.removeClass("active error success");
							form.removeClass('success');
						}, 3500);
					}
				});
			}
		}

		// Vide
		if (plugins.vide.length) {
			for (let i = 0; i < plugins.vide.length; i++) {
				let
						$element = $(plugins.vide[i]),
						options = $element.data('vide-options'),
						path = $element.data('vide-bg');

				if (!isMobile) {
					$element.vide(path, options);

					let
							videObj = $element.data('vide').getVideoObject(),
							scrollHandler = (function ($element) {
								if (isScrolledIntoView($element)) this.play();
								else this.pause();
							}).bind(videObj, $element);

					scrollHandler();
					if (isNoviBuilder) videObj.pause();
					else document.addEventListener('scroll', scrollHandler);
				} else {
					$element.css({'background-image': 'url(' + path + '.jpg)'});
				}
			}
		}

		// Owl carousel
		if (plugins.owl.length) {
			for (var i = 0; i < plugins.owl.length; i++) {
				var carousel = $(plugins.owl[i]);
				plugins.owl[i].owl = carousel;
				initOwlCarousel(carousel);
			}
		}

		// WOW
		if ($html.hasClass("wow-animation") && plugins.wow.length && !isNoviBuilder && isDesktop) {
			new WOW().init();
		}

		// Google maps
		if (plugins.maps.length) {
			lazyInit(plugins.maps, initMaps);
		}

		// UI To Top
		if (isDesktop && !isNoviBuilder) {
			$().UItoTop({
				easingType:     'easeOutQuad',
				containerClass: 'ui-to-top fa fa-angle-up'
			});
		}

		// Swiper
		if (plugins.swiper.length) {
			for (var i = 0; i < plugins.swiper.length; i++) {

				var
						sliderMarkup = plugins.swiper[i],
						swiper,
						options = {
							loop:             sliderMarkup.getAttribute('data-loop') === 'true' || false,
							effect:           isIE ? 'slide' : sliderMarkup.getAttribute('data-slide-effect') || 'slide',
							direction:        sliderMarkup.getAttribute('data-direction') || 'horizontal',
							speed:            sliderMarkup.getAttribute('data-speed') ? Number(sliderMarkup.getAttribute('data-speed')) : 1000,
							separateCaptions: sliderMarkup.getAttribute('data-separate-captions') === 'true' || false,
							simulateTouch:    sliderMarkup.getAttribute('data-simulate-touch') && !isNoviBuilder ? sliderMarkup.getAttribute('data-simulate-touch') === "true" : false,
							watchOverflow: true
						};

				if (sliderMarkup.getAttribute('data-autoplay')) {
					options.autoplay = {
						delay:                Number(sliderMarkup.getAttribute('data-autoplay')) || 3000,
						stopOnLastSlide:      false,
						disableOnInteraction: true,
						reverseDirection:     false,
					};
				}

				if (sliderMarkup.getAttribute('data-keyboard') === 'true') {
					options.keyboard = {
						enabled:        sliderMarkup.getAttribute('data-keyboard') === 'true',
						onlyInViewport: true
					};
				}

				if (sliderMarkup.getAttribute('data-mousewheel') === 'true') {
					options.mousewheel = {
						releaseOnEdges: true,
						sensitivity:    .1
					};
				}

				if (sliderMarkup.querySelector('.swiper-button-next, .swiper-button-prev')) {
					options.navigation = {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					};
				}

				if (sliderMarkup.querySelector('.swiper-pagination')) {
					options.pagination = {
						el:        '.swiper-pagination',
						type:      'bullets',
						clickable: true
					};
				}

				if (sliderMarkup.querySelector('.swiper-scrollbar')) {
					options.scrollbar = {
						el:        '.swiper-scrollbar',
						hide:      true,
						draggable: true
					};
				}

				options.on = {
					init: function () {
						setBackgrounds(this);
						setRealPrevious(this);
						initCaptionAnimate(this);

						// Real Previous Index must be set recent
						this.on('slideChangeTransitionEnd', function () {
							setRealPrevious(this);
						});
					}
				};

				swiper = new Swiper(plugins.swiper[i], options);
			}
		}

		// Counter
		if (plugins.counter) {
			for (var i = 0; i < plugins.counter.length; i++) {
				var
						node = plugins.counter[i],
						counter = aCounter({
							node:     node,
							duration: node.getAttribute('data-duration') || 1000
						}),
						scrollHandler = (function () {
							if (Util.inViewport(this) && !this.classList.contains('animated-first')) {
								this.counter.run();
								this.classList.add('animated-first');
							}
						}).bind(node),
						blurHandler = (function () {
							this.counter.params.to = parseInt(this.textContent, 10);
							this.counter.run();
						}).bind(node);

				if (isNoviBuilder) {
					node.counter.run();
					node.addEventListener('blur', blurHandler);
				} else {
					scrollHandler();
					window.addEventListener('scroll', scrollHandler);
				}
			}
		}

		// Countdown
		if (plugins.dateCountdown.length) {
			for (var i = 0; i < plugins.dateCountdown.length; i++) {
				var
						node = plugins.dateCountdown[i],
						countdown = aCountdown({
							node:  node,
							from:  node.getAttribute('data-from'),
							to:    node.getAttribute('data-to'),
							count: node.getAttribute('data-count'),
							tick:  100,
						});
			}
		}

		// Progress Bar
		if (plugins.progressLinear) {
			for (var i = 0; i < plugins.progressLinear.length; i++) {
				var
						container = plugins.progressLinear[i],
						counter = aCounter({
							node:     container.querySelector('.progress-linear-counter'),
							duration: container.getAttribute('data-duration') || 1000,
							onStart:  function () {
								this.custom.bar.style.width = this.params.to + '%';
							}
						});

				counter.custom = {
					container: container,
					bar:       container.querySelector('.progress-linear-bar'),
					onScroll:  (function () {
						if ((Util.inViewport(this.custom.container) && !this.custom.container.classList.contains('animated')) || isNoviBuilder) {
							this.run();
							this.custom.container.classList.add('animated');
						}
					}).bind(counter),
					onBlur:    (function () {
						this.params.to = parseInt(this.params.node.textContent, 10);
						this.run();
					}).bind(counter)
				};

				if (isNoviBuilder) {
					counter.run();
					counter.params.node.addEventListener('blur', counter.custom.onBlur);
				} else {
					counter.custom.onScroll();
					document.addEventListener('scroll', counter.custom.onScroll);
				}
			}
		}

		// Progress Circle
		if (plugins.progressCircle) {
			for (var i = 0; i < plugins.progressCircle.length; i++) {
				var
						container = plugins.progressCircle[i],
						counter = aCounter({
							node:     container.querySelector('.progress-circle-counter'),
							duration: 500,
							onUpdate: function (value) {
								this.custom.bar.render(value * 3.6);
							}
						});

				counter.params.onComplete = counter.params.onUpdate;

				counter.custom = {
					container: container,
					bar:       aProgressCircle({node: container.querySelector('.progress-circle-bar')}),
					onScroll:  (function () {
						if (Util.inViewport(this.custom.container) && !this.custom.container.classList.contains('animated')) {
							this.run();
							this.custom.container.classList.add('animated');
						}
					}).bind(counter),
					onBlur:    (function () {
						this.params.to = parseInt(this.params.node.textContent, 10);
						this.run();
					}).bind(counter)
				};

				if (isNoviBuilder) {
					counter.run();
					counter.params.node.addEventListener('blur', counter.custom.onBlur);
				} else {
					counter.custom.onScroll();
					window.addEventListener('scroll', counter.custom.onScroll);
				}
			}
		}

		// Bootstrap Tooltips
		if (plugins.bootstrapTooltip.length) {
			var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
			initBootstrapTooltip(tooltipPlacement);

			$window.on('resize orientationchange', function () {
				initBootstrapTooltip(tooltipPlacement);
			})
		}

		// Select 2
		if (plugins.selectFilter.length) {
			for (var i = 0; i < plugins.selectFilter.length; i++) {
				var select = $(plugins.selectFilter[i]);

				select.select2({
					theme:                   "bootstrap",
					dropdownParent:          $('.page'),
					placeholder:             select.attr('data-placeholder') || null,
					minimumResultsForSearch: select.attr('data-minimum-results-search') || Infinity,
					containerCssClass:       select.attr('data-container-class') || null,
					dropdownCssClass:        select.attr('data-dropdown-class') || null
				});
			}
		}

		// Bootstrap Modal
		if (plugins.bootstrapModal.length) {
			for (var i = 0; i < plugins.bootstrapModal.length; i++) {
				var modalItem = $(plugins.bootstrapModal[i]);

				modalItem.on('hidden.bs.modal', $.proxy(function () {
					var activeModal = $(this),
							rdVideoInside = activeModal.find('video'),
							youTubeVideoInside = activeModal.find('iframe');

					if (rdVideoInside.length) {
						rdVideoInside[0].pause();
					}

					if (youTubeVideoInside.length) {
						var videoUrl = youTubeVideoInside.attr('src');

						youTubeVideoInside
						.attr('src', '')
						.attr('src', videoUrl);
					}
				}, modalItem))
			}
		}

		// Custom Toggles
		if (plugins.customToggle.length) {
			for (var i = 0; i < plugins.customToggle.length; i++) {
				var $this = $(plugins.customToggle[i]);

				$this.on('click', $.proxy(function (event) {
					event.preventDefault();

					var $ctx = $(this);
					$($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
				}, $this));

				if ($this.attr("data-custom-toggle-hide-on-blur") === "true") {
					$body.on("click", $this, function (e) {
						if (e.target !== e.data[0]
								&& $(e.data.attr('data-custom-toggle')).find($(e.target)).length
								&& e.data.find($(e.target)).length === 0) {
							$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
						}
					})
				}

				if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
					$body.on("click", $this, function (e) {
						if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length === 0 && e.data.find($(e.target)).length === 0) {
							$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
						}
					})
				}
			}
		}
	});
}());
