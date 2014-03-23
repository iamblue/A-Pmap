var yt;
yt = 0;
angular.module('socialfight').run([].concat(function(){
  var clickyt;
  return clickyt = function(obj){
    console.log(yt);
    return yt = 1;
  };
})).factory('mySocket', function(){
  return io.connect('http://localhost:8880');
}).controller('mainCtrl', ['mySocket', '$timeout', '$window', '$http', '$scope', '$rootScope', '$location', '$localStorage'].concat(function(mySocket, $timeout, $window, $http, $scope, $rootScope, $location, $localStorage){
  var styles, styledMap, iconBase, icons, cities, mapOptions, infoWindow, createMarker, init;
  $scope.$on('onmsg', function(){
    return $scope.inputmsg = !$scope.inputmsg;
  });
  $scope.leavemsg = function(){
    return $scope.$emit('onmsg');
  };
  $scope.selectmsgtag = [
    {
      id: 0,
      name: '求救'
    }, {
      id: 1,
      name: '警方情報'
    }
  ];
  $scope.selValue = 0;
  $timeout(function(){
    return console.log(yt);
  }, 100);
  $scope.msg = '讀取消息中...';
  mySocket.on('news', function(data){
    console.log(data.g0v);
    if (data.g0v) {
      $scope.msg = data.g0v;
      $scope.frommsg = 1;
    }
    if (data.main) {
      $scope.msg = data.main;
      $scope.frommsg = 0;
    }
    $scope.$apply();
    return mySocket.emit('my other event', {
      my: 'data'
    });
  });
  mySocket.on('sos', function(data){}, 3000);
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
      desc: 'This is the second best city in the world!<a href="" onclick="clickyt(2)">123</a>',
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
    zoomControl: false,
    scaleControl: false,
    center: new google.maps.LatLng(25.0435, 121.5210),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.HYBRID, 'map_style']
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
      console.log(e);
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      return infoWindow.open($scope.map, marker);
    });
    google.maps.event.addDomListener($scope.map, 'click', function(e, r, y){
      $scope.tagposition = e.latLng;
      console.log($scope.tagposition);
      $scope.$emit('onmsg');
      return $scope.$apply();
    });
    $scope.markers.push(marker);
  };
  init = function(){
    var i$, to$, i, results$ = [];
    for (i$ = 0, to$ = cities.length - 1; i$ <= to$; ++i$) {
      i = i$;
      results$.push(createMarker(cities[i]));
    }
    return results$;
  };
  init();
  return $scope.sendmsg = function(){
    var _tmp;
    _tmp = {
      lat: $scope.tagposition.k,
      long: $scope.tagposition.A,
      icon: icons.parking.icon
    };
    cities.push(_tmp);
    init();
    mySocket.emit('sos', {
      p: $scope.tagposition,
      icon: 1
    });
    return $scope.$emit('onmsg');
  };
}));