// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

$(function() {
    var infowindow = new google.maps.InfoWindow;

    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(47.6, -122.3)
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json', function (data) {

        $.each(data, function (i, camera) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(camera.location.latitude, camera.location.longitude),
                map: map,
                imageUrl: camera.imageurl,
                cameraLabel: camera.cameralabel,
            });

            google.maps.event.addListener(marker, 'click', function () {
                map.panTo(marker.getPosition());

                infowindow.setContent('<div>'+
                        '<p>' + marker.cameraLabel + '</p>' +
                        '<img src="' + marker.imageUrl.url + '" alt="camera image"/>' +
                        '</div>');

                infowindow.open(map,marker);
            });

            $('#search').bind('search keyup', function(){
                var text = $(this).val().toLowerCase();

                if(marker.cameraLabel.toLowerCase().indexOf(text) > -1){
                    marker.setMap(map);
                } else {
                    marker.setMap(null);
                }
            });
        });
    });

    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });

    resizeMap();
});

$(window).resize(function () {
    resizeMap();
});

function resizeMap() {
    $('#map').css({"height": $(window).height() - $('#map').position().top - 60});
}