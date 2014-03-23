angular.module('socialfight').factory('mySocket', function(){
  return io.connect('http://localhost:8880');
}).controller('mainCtrl', ['mySocket', '$timeout', '$window', '$http', '$scope', '$rootScope', '$location', '$localStorage'].concat(function(mySocket, $timeout, $window, $http, $scope, $rootScope, $location, $localStorage){
  var styles, styledMap, iconBase, icons, cities, mapOptions, infoWindow, createMarker, i$, to$, i, results$ = [];
  mySocket.on('news', function(data){
    console.log(data);
    return mySocket.emit('my other event', {
      my: 'data'
    });
  });
  $scope.kerker = function(){
    return alert('12333');
  };
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
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{
        visibility: 'off'
      }]
    }, {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{
        visibility: 'off'
      }]
    }, {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{
        visibility: 'off'
      }]
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
      stylers: [
        {
          color: '#000000'
        }, {
          visibility: "off"
        }
      ]
    }, {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: '#999999'
        }, {
          lightness: 13
        }
      ]
    }, {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: '#eeeeee'
        }, {
          lightness: 13
        }, {
          visibility: "off"
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
      city: '青島轉播',
      desc: 'This city is aiiiiite!',
      lat: 25.0441,
      long: 121.5210,
      icon: icons.parking.icon
    }, {
      city: '濟南轉播',
      desc: 'This is the second best city in the world!<a ng-click="kerker(123)">123</a>',
      lat: 25.0430,
      long: 121.5203,
      icon: icons.parking.icon
    }, {
      city: '議場轉播',
      desc: 'This city is live!',
      lat: 25.04360,
      long: 121.5210,
      icon: icons.parking.icon,
      editable: true
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
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
    $scope.aaa = 0;
    google.maps.event.addListener(marker, 'click', function(e, b){
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      return infoWindow.open($scope.map, marker);
    });
    $scope.markers.push(marker);
  };
  for (i$ = 0, to$ = cities.length - 1; i$ <= to$; ++i$) {
    i = i$;
    results$.push(createMarker(cities[i]));
  }
  return results$;
}));