var dissect = document.getElementById("dissect")
var btn = document.querySelector("button")
var ip = document.getElementById("ip")
var mId = document.getElementById("mapContainer")

API ="at_ecQNmBlSbn56li1mrbag7H8jsVbEY"
var ip_add
var latLng 
var lat
var lng


function showDetails(ip){
    var url = `https://geo.ipify.org/api/v1?apiKey=${API}&ipAddress=${ip}`
    
    fetch(url)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data.location.lat)
        console.log(data.location.lng)
        show(data);
        lat = data.location.lat
        lng = data.location.lng
        renderMap(lat, lng)
    })
}

btn.addEventListener("click" ,()=>{
    console.log(ip.value)
    ip_add=ip.value
    // console.log(IP_ADD)
    // map = L.map('mapid').LatLng([`${event.location.lat} , ${event.location.lng}`] , 13)
    showDetails(ip_add)
})

showDetails("192.212.174.101")



function show(event){
    dissect.innerHTML=`
    <div class ="part1 b">
        <p>IP ADDRESS</p>
        <h4>${event.ip}</h4>
    </div>
    <div class="part1">
        <p>LOCATION</p>
        <h4>${event.location.city} , ${event.location.country}</h4>
    </div>
    <div class="part1">
        <p>TIMEZONE</p>
        <h4>${event.location.timezone}</h4>
    </div>
    <div class="part1">
        <p>ISP</p>
        <h4>${event.isp}</h4>
    </div>
    `
}

let latLang
const renderMap = (lat, lng)=>{
    // mapid.innerHTML=null
    // latLang = null
    // map = null
    // markers.clearLayers();
    mId.innerHTML= `<div id="mapid"></div>`

    latLng = L.latLng(lat , lng)
    
    map = L.map('mapid',{
            center:latLng,
            zoom: 13,
            zoomControl:false
    });
    
        
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic3V5ZXNoYWEiLCJhIjoiY2twdjh0b3JsMGtmYTJ3cDk2Y2lkaWVhYSJ9.i464Gp2CjT9KfGPvFFWjWA'
        }).addTo(map);
        
    L.marker([lat ,lng]).addTo(map);
}
    

