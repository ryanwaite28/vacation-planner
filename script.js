// New Script //

var map;
var yourMarker;
var vacaMarker;
var infowindow;

function initMap() {

  infowindow = new google.maps.InfoWindow();

  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map-div'), {
    center: {lat: 39.173303, lng: -77.177274},
    scrollwheel: false,
    zoom: 5
  });

}

// Main Angular Application
var App = angular.module("myApp", []);

// Master Angular Controller
App.controller('masterCtrl', function($scope) {

  $scope.currentVaca = '';

	$scope.currentVacaPlaces = [
		{
			place: 'Honolulu, Hawaii',
			img: 'http://media.royalcaribbean.com/content/shared_assets/images/ports/hero/HNL_01.jpg',
			lat: '21.3069444',
			lng: '-157.8583333',
      location: {
               "lat" : 21.3069444,
               "lng" : -157.8583333
            },
			hotelPrice: 180,
			RentalCarPrice: 30,
      planeCost: 400
		},
		{
			place: 'Dubai, United Arab Emirates',
			img: 'http://www.ambreenn.com/admin/upload/dbai1.jpg',
			lat: '25.2048493',
			lng: '55.2707828',
      location: {
               "lat" : 25.2048493,
               "lng" : 55.2707828
            },
			hotelPrice: 250,
			RentalCarPrice: 40,
      planeCost: 365
		},
		{
			place: 'Tokyo, Japan',
			img: 'http://upload.wikimedia.org/wikipedia/commons/9/93/Fuchu-Koen-Dori_in_Fuchu_Tokyo_Japan.jpg',
			lat: '35.7090259',
			lng: '139.7319925',
      location: {
               "lat" : 35.7090259,
               "lng" : 139.7319925
            },
			hotelPrice: 175,
			RentalCarPrice: 25,
      planeCost: 250
		},
		{
			place: 'Paris, France',
			img: 'https://i.ytimg.com/vi/_FYKIhJZdaI/maxresdefault.jpg',
			lat: '48.856614',
			lng: '2.3522219',
      location: {
               "lat" : 48.856614,
               "lng" : 2.3522219
            },
			hotelPrice: 200,
			RentalCarPrice: 50,
      planeCost: 375
		},
		{
			place: 'Moscow, Russia',
			img: 'https://pixabay.com/static/uploads/photo/2015/07/27/20/38/moscow-863528_960_720.jpg',
			lat: '55.755826',
			lng: '37.6173',
      location: {
               "lat" : 55.755826,
               "lng" : 37.6173
            },
			hotelPrice: 215,
			RentalCarPrice: 35,
      planeCost: 300
		},
		{
			place: 'Sydney, Australia',
			img: 'https://www.atp.com.au/Images/UserUploadedImages/123/ATP-%20Sydney-Australia.jpg',
			lat: '-33.8674869',
			lng: '151.2069902',
      location: {
               "lat" : -33.8674869,
               "lng" : 151.2069902
            },
			hotelPrice: 200,
			RentalCarPrice: 40,
      planeCost: 425
		},
		{
			place: 'State of Para, Brazil',
			img: 'http://i.telegraph.co.uk/multimedia/archive/02352/the-giant-christ-t_2352863b.jpg',
			lat: '-1.9981271',
			lng: '-54.9306152',
      location: {
               "lat" : -1.9981271,
               "lng" : -54.9306152
            },
			hotelPrice: 150,
			RentalCarPrice: 60,
      planeCost: 295
		},
		{
			place: 'Cameroon, Africa',
			img: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Fulani_herd_in_the_dust.jpg',
			lat: '7.369721999999999',
			lng: '12.354722',
      location: {
               "lat" : 7.369721999999999,
               "lng" : 12.354722
            },
			hotelPrice: 170,
			RentalCarPrice: 30,
      planeCost: 375
		},
		{
			place: 'Kingston, Jamaica',
			img: 'http://1.bp.blogspot.com/-P7NzPHfFXok/UGGY1w2WvxI/AAAAAAAAjLg/U6h1rsiQcY8/s1600/Kingston-Jamaica.jpg',
			lat: '18.0025847',
			lng: '-76.832093',
      location: {
               "lat" : 18.0178743,
               "lng" : -76.8099041
            },
			hotelPrice: 160,
			RentalCarPrice: 20,
      planeCost: 400
		}
	];

  $scope.loadYourMarker = function() {

    var yourLocation = $('#your-place').val();

    if( yourLocation == '' || yourLocation == undefined ) {
      $scope.msgOne = 'Empty/Invalid Input.';
      setTimeout( function() {
        $scope.msgOne = '';
        $scope.$apply(function(){});
      } , 3000 )
      return null;
    }

    var geocode = "https://maps.googleapis.com/maps/api/geocode/json?address=" + yourLocation + "%20rd&key=AIzaSyCSHPWjouiZzdAI_EhWkuuLsFMEGTgyYWE";

    $.getJSON( geocode , function(data) {

      console.log(geocode);
      console.log(data);

      var imgURL = 'https://maps.googleapis.com/maps/api/streetview?size=150x150&location=' + data.results[0].geometry.location.lat + ',' + data.results[0].geometry.location.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBWq_bL3W2U17sffyrBJdzsxeFT445s9EU';

      var infoBox = '<div>' +
      '<h2 class="text-center">Your Location</h2>' +
      '<h4 class="text-center">' + yourLocation +  '</h4>' +
      '<hr>' +
      '<img style="border: 1px solid black;" class="middlr" src="' + imgURL + '"' +
      '<br>' +
      '</div>';

      if( yourMarker != undefined ) {
        yourMarker.setMap(null);
      }

      yourMarker = new google.maps.Marker({
				map: map,
        title: 'Your Location: ' + yourLocation + '',
				animation: google.maps.Animation.DROP,
				position: data.results[0].geometry.location
			});

      yourMarker.addListener('click', function() {
        infowindow.setContent(infoBox);
        map.setZoom(8);
  			map.setCenter(yourMarker.position);
  			infowindow.open(map, yourMarker);
  			map.panBy(0, -125);

				if (yourMarker.getAnimation() !== null) {
					yourMarker.setAnimation(null);
				}
				else {
					yourMarker.setAnimation(google.maps.Animation.BOUNCE);
				}
				setTimeout(function() {
					yourMarker.setAnimation(null)
				}, 1500);
			});

      infowindow.setContent(infoBox);
      map.setZoom(9);
			map.setCenter(yourMarker.position);
			infowindow.open(map, yourMarker);
			map.panBy(0, -125);

    });

  }

  $scope.loadVacaPlace = function(choice) {

    if( choice == undefined ) {
      return;
    }

    var infoBox = '<div>' +
    '<h2 class="text-center">Vacation Place</h2>' +
    '<h4 class="text-center">' + choice.place +  '</h4>' +
    '<hr>' +
    '<img style="border: 1px solid black;" width="150" height="150" class="middlr" src="' + choice.img + '"' +
    '<br>' +
    '</div>';

    if( vacaMarker != undefined ) {
      vacaMarker.setMap(null);
    }

    vacaMarker = new google.maps.Marker({
      map: map,
      name: choice.place,
      title: 'Vacation Place: ' + choice.place + '',
      animation: google.maps.Animation.DROP,
      position: choice.location
    });

    vacaMarker.addListener('click', function() {
      infowindow.setContent(infoBox);
      map.setZoom(8);
      map.setCenter(vacaMarker.position);
      infowindow.open(map, vacaMarker);
      map.panBy(0, -125);

      if (vacaMarker.getAnimation() !== null) {
        vacaMarker.setAnimation(null);
      }
      else {
        vacaMarker.setAnimation(google.maps.Animation.BOUNCE);
      }
      setTimeout(function() {
        vacaMarker.setAnimation(null)
      }, 1500);
    });

    infowindow.setContent(infoBox);
    map.setZoom(9);
    map.setCenter(vacaMarker.position);
    infowindow.open(map, vacaMarker);
    map.panBy(0, -125);

  }

  $scope.calculateCosts = function() {

    if( $scope.currentVaca == '' || $scope.currentVaca == undefined ) {
      $scope.msgTwo = 'Please Select a Vacation Place.';
      setTimeout( function() {
        $scope.msgTwo = '';
        $scope.$apply(function(){});
      } , 3000 )
      return;
    }

    var yourTotal = $('#remains-ipt').val();

    if( yourTotal == '' || yourTotal <= 0 || isNaN(yourTotal) ) {
      $scope.msgTwo = 'Input Amount Into All Fields.';
      setTimeout( function() {
        $scope.msgTwo = '';
        $scope.$apply(function(){});
      } , 3000 )
      return null;
    }

    var planeTicket = $('#apt-ipt').val();
    var hotel = $('#ht-ipt').val();
    var rentalCar = $('#rc-ipt').val();
    var spendingMoney = $('#spending-ipt').val();
    console.log(spendingMoney);

    if( planeTicket == '' || planeTicket <= 0 ) {
      $scope.msgTwo = 'Input Amount Into All Fields.';
      setTimeout( function() {
        $scope.msgTwo = '';
        $scope.$apply(function(){});
      } , 3000 )
      return null;
    }
    if( hotel == '' || hotel <= 0 ) {
      $scope.msgTwo = 'Input Amount Into All Fields.';
      setTimeout( function() {
        $scope.msgTwo = '';
        $scope.$apply(function(){});
      } , 3000 )
      return null;
    }
    if( rentalCar == '' || rentalCar <= 0 ) {
      $scope.msgTwo = 'Input Amount Into All Fields.';
      setTimeout( function() {
        $scope.msgTwo = '';
        $scope.$apply(function(){});
      } , 3000 )
      return null;
    }
    if( spendingMoney == '' || spendingMoney <= 0 || isNaN(spendingMoney) ) {
      $scope.msgTwo = 'Input Amount Into All Fields.';
      setTimeout( function() {
        $scope.msgTwo = '';
        $scope.$apply(function(){});
      } , 3000 )
      return null;
    }

    console.log('Calculating...');

    $scope.currentSpending = spendingMoney;
    $scope.yourMoney = yourTotal;

    var planeCost = planeTicket * $scope.currentVaca.planeCost;
    var hotelCost = hotel * $scope.currentVaca.hotelPrice;
    var rentalCarCost = rentalCar * $scope.currentVaca.RentalCarPrice;

    var vacaTotal = planeCost + hotelCost + rentalCarCost;
    console.log(vacaTotal);


    $scope.msg1 = 'Your Total Money Available = ' + $scope.yourMoney;
    $scope.msg2 = 'Plane Tickets(' + planeTicket + ')'  + ' * ' +  $scope.currentVaca.planeCost  + ' = ' + planeCost;
    $scope.msg3 = 'Hotel Nights(' + hotel + ')'  + ' * ' +  $scope.currentVaca.hotelPrice  + ' = ' + hotelCost;
    $scope.msg4 = 'Day Renting car(' + rentalCar + ')'  + ' * ' +  $scope.currentVaca.RentalCarPrice  + ' = ' + rentalCarCost;
    $scope.msg5 = 'Your Specified Spending Money: ' + spendingMoney;
    $scope.msg6 = 'Your Total - Vacation Total(' + vacaTotal + ') = ';

    $scope.remaining = yourTotal - vacaTotal;

    $('#remains-ipt').val('');
    $('#apt-ipt').val('');
    $('#ht-ipt').val('');
    $('#rc-ipt').val('');
    $('#spending-ipt').val('');

  }

  $scope.loadInfo = function() {

    if( $scope.currentVaca == '' || $scope.currentVaca == undefined ) {
      $scope.msgTwo = 'Please Select a Vacation Place.';
      setTimeout( function() {
        $scope.msgTwo = '';
        $scope.$apply(function(){});
      } , 3000 )
      return;
    }

    $scope.articles = [];

    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $scope.currentVaca.place + '&sort=newest&api-key=14132d207c54f0e27f34c90f3e5e4e59:9:73463344'

					$.getJSON(nytURL, function(data) {
						console.log(data);

						articles = data.response.docs;

						for (var i = 0; i < articles.length; i++) {
							var article = articles[i];

							var HLK = article.headline.content_kicker;
							var HLM = article.headline.main;
							var HLP = article.headline.print_headline;
							var LP = article.lead_paragraph;
							if(article.byline == null){
								continue;
							}
							var BL = article.byline.original;
							var PD = article.pub_date;
							var WL = article.web_url;

							$scope.articles.push({
								headLineKicker: HLK,
								headLineMain: HLM,
								headLinePrint: HLP,
								leadParagraph: LP,
								byLine: BL,
								pubDate: PD,
								webLink: WL,
							});

						}

						$scope.$apply(function () {
							console.log($scope.articles);
						});

					})

  }

  /* --- Event Listeners */

  $scope.currentImg = '';

  $('#crt-pls').change(function(e) {

    var index = this.selectedIndex;
		index = index - 1;

    if( index == -1 ) {
      /*$('.l1').hide('fast');
      $('.l2').hide('fast');
      $('#planner-div').css({
        'position' : 'absolute',
        'left' : '-9999px'
      })*/
      return;
    }

    /*$('.l1').show('fast');
    $('.l2').show('fast');

    $('#planner-div').css({
      'position' : 'static',
      'left' : '0px'
    })*/

    var choice = $scope.currentVacaPlaces[index];
    $scope.currentVaca = $scope.currentVacaPlaces[index];
    $scope.currentImg = $scope.currentVacaPlaces[index].img;

    $scope.currentPlane = $scope.currentVacaPlaces[index].planeCost;
    $scope.currentHotel = $scope.currentVacaPlaces[index].hotelPrice;
    $scope.currentCar = $scope.currentVacaPlaces[index].RentalCarPrice;

    $scope.loadVacaPlace(choice);

  });

  $(document).ready(function() {

  	var tdl = $('#tdl');
    var l1 = $('.l1');
    var l2 = $('.l2');
    var grandContainer = $('#grand-container');

    var t;

  	$(window).scroll(function(e) {

  		var wHeight = $(window).scrollTop();
      var k = tdl.position();
      //console.log(k);
      var wHeight2 = k.top;
  		//console.log(wHeight);
      //console.log(wHeight2);

  		if( wHeight >= wHeight2 ) {
  			l1.css('position' , 'fixed');
  			l1.css('top' , '0px');
        l2.css('position' , 'fixed');
  			l2.css('top' , '0px');
        //grandContainer.css('padding-top' , '60px');
  		}
  		else {
  			l1.css('position', 'relative');
        l1.css('top' , '');
        l2.css('position', 'relative');
        l2.css('top' , '');
        //grandContainer.css('padding-top' , '0px');
  		}

  	})

    var iconImages = [
      'img/emoji-1.jpg',
      'img/emoji-2.jpg',
      'img/emoji-3.jpg',
      'img/emoji-4.jpg',
      'img/emoji-5.png'
    ]

    var num = 0;

    $scope.currentIcon = iconImages[num];
    $scope.$apply(function(){});

    setInterval(function() {

      if( num > 4 ) {
        num = 0;
      }

      $scope.currentIcon = iconImages[num];
      $scope.$apply(function(){});

      num++;

    } , 2500)

  });

  $('.planner-text').click(function(){

    $('#information-div').css({
      'position' : 'absolute',
      'left' : '-9999px'
    })
    $('#planner-div').css({
      'position' : 'static',
      'left' : '-0px'
    })

  });
  $('.information-text').click(function(){

    $('#planner-div').css({
      'position' : 'absolute',
      'left' : '-9999px'
    })
    $('#information-div').css({
      'position' : 'static',
      'left' : '-0px'
    })

  });

});
