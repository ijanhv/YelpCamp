
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
    // projection: 'globe' // display the map as a 3D globe
});

map.addControl(new mapboxgl.NavigationControl());

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
    });

new mapboxgl.Marker()
    .setLngLat([-74.5, 40])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) 
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )    
    )
    .addTo(map)