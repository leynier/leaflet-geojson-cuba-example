let map = L.map('map', {
    center: [21.5, -79.371124],
    zoom: 13,
});

$.getJSON('cuba.geojson', function (data) {
    let geojson = L.geoJSON(data.features);
    let ratio = (geojson.getBounds().getNorthEast().lat - geojson.getBounds().getSouthWest().lat) * 0.05;
    geojson.bindTooltip(function (layer) {
        return '<span>' + layer.feature.properties.province + '</span>';
    }, { 'sticky': true });
    geojson.bindPopup(function (layer) {
        let pcode = layer.feature.properties.DPA_province_code;
        let pro = layer.feature.properties.province;
        let result = '';
        result += '<div><h2>' + pro + '</h2></div>';
        result += '<div>Code: ' + pcode + '</div>';
        return result;
    });
    map.addLayer(geojson);
    map.fitBounds(geojson.getBounds());
    map.setMaxBounds(geojson.getBounds().pad(ratio));
});
