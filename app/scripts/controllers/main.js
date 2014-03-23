angular.module('socialfight').controller('mainCtrl', ['$timeout', '$window', '$http', '$scope', '$rootScope', '$location', '$localStorage'].concat(function($timeout, $window, $http, $scope, $rootScope, $location, $localStorage){
  var styles, styledMap, iconBase, icons, cities, mapOptions, infoWindow, createMarker, i$, to$, i, results$ = [];
  styles = [
    {
      featureType: "water",
      stylers: [{
        color: '#021019'
      }]
    }, {
      featureType: 'landscape',
      stylers: [{
        color: '#08304b'
      }]
    }, {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: '#0c4152'
        }, {
          lightness: 5
        }
      ]
    }, {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{
        color: '#000000'
      }]
    }, {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: '#0b434f'
        }, {
          lightness: 25
        }
      ]
    }, {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [{
        color: '#000000'
      }]
    }, {
      featureType: "road.arterial",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: '#0b3d51'
        }, {
          lightness: 16
        }
      ]
    }, {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{
        color: '#000000'
      }]
    }, {
      elementType: "labels.text.fill",
      stylers: [{
        color: '#ffffff'
      }]
    }, {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: '#000000'
        }, {
          lightness: 13
        }
      ]
    }, {
      featureType: "transit",
      stylers: [{
        color: '#146474'
      }]
    }, {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{
        color: '#000000'
      }]
    }, {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: '#144b53'
        }, {
          lightness: 14
        }, {
          weight: 1.4
        }
      ]
    }
  ];
  styledMap = new google.maps.StyledMapType(styles, {
    name: 'Styled Map'
  });
  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  icons = {
    parking: {
      icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
      icon: iconBase + 'library_maps.png'
    },
    info: {
      icon: iconBase + 'info-i_maps.png'
    }
  };
  cities = [
    {
      city: 'New York',
      desc: 'This city is aiiiiite!',
      lat: 25.0435,
      long: 121.5210,
      icon: icons.parking.icon
    }, {
      city: 'Chicago',
      desc: 'This is the second best city in the world!',
      lat: 25.0435,
      long: 121.5210,
      icon: icons.parking.icon
    }, {
      city: 'Los Angeles',
      desc: 'This city is live!',
      lat: 25.0435,
      long: 121.5210,
      icon: icons.parking.icon
    }, {
      city: 'Las Vegas',
      desc: 'Sin City...nuff said!',
      lat: 25.0435,
      long: 121.5210,
      icon: icons.parking.icon
    }
  ];
  mapOptions = {
    zoom: 18,
    center: new google.maps.LatLng(25.0435, 121.5210),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  $scope.map.mapTypes.set('map_style', styledMap);
  $scope.map.setMapTypeId('map_style');
  $scope.markers = [];
  infoWindow = new google.maps.InfoWindow();
  createMarker = function(info){
    var marker;
    console.log(info.lat);
    marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.lat, info.long),
      title: info.city,
      icon: info.icon
    });
    console.log(icons.parking);
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open($scope.map, marker);
    });
    google.maps.event.addListener(marker, 'dragstart', function(){
      alert('123');
    });
    $scope.markers.push(marker);
  };
  for (i$ = 0, to$ = cities.length - 1; i$ <= to$; ++i$) {
    i = i$;
    results$.push(createMarker(cities[i]));
  }
  return results$;
}));