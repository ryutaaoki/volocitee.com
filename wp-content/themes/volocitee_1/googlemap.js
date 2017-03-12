function initializeGoogleMap(lat, lng, canvasDivName, contentString) {
    var map;
    var MAPTYPE_ID = 'VOLOCITE Inc. MAP';
    var corporateColor = "#0095D9";
    var latLng = new google.maps.LatLng(lat, lng);

    var mapColor = [
    {
        "featureType": "road",
        "stylers": [
            { "color":  corporateColor}
        ]
    },

    {
        "featureType": "road.arterial",
        "stylers": [
            { "lightness": -22 }
        ]
    },

    {
        "featureType": "road.highway",
        "stylers": [
            { "lightness": -45 }
        ]
    },

    {
        "featureType": "transit.station",
        "stylers": [
            { "hue": "#ff0000" },
            { "lightness": 22 }
        ]
    }
    ];

    var mapOptions = {
        zoom: 17,
        center: latLng,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MAPTYPE_ID]
        },
        panControl: false,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        mapTypeId: MAPTYPE_ID
    };

    map = new google.maps.Map(document.getElementById(canvasDivName), mapOptions);

    var styledMapOptions = {name: MAPTYPE_ID};
    var styledMapType = new google.maps.StyledMapType(mapColor, styledMapOptions);

    var marker = new google.maps.Marker({
        map:map,
        draggable:true,
        animation: google.maps.Animation.DROP,
        position: latLng
        });

    var infowindow = new google.maps.InfoWindow({
        content: contentString
        });

    google.maps.event.addListener(marker, 'click', toggleBounce);
    function toggleBounce() {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 1400);
        infowindow.open(map,marker);
    }

    map.mapTypes.set(MAPTYPE_ID, styledMapType);
}
