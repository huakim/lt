
(function(){

$('head').append(`<style>@import url("map/leaflet.css");
.img1{vertical-align:middle;width:40px;height:40px;}</style>`);
this.scl = function(image, link, text){
  return `<a class=body3 href="`+link+`"><img src='`
  +image+`' class=img1 />`+text+`<br/></a>`;
}

getjs('map/leaflet.js');

this.cn1 = function(){
    var opts = {
        center: [42.09208, 47.59508],
        zoom: 19
    }
         
    var map = new L.map('mymap', opts);
    var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    var marker = L.marker([42.0921228, 47.5947804]).addTo(map);
    
    $("#links").html(
scl("telegram.png", "https://t.me/kubachi_guest_house_yut", "kubachi_guest_house_yut") +
scl("whatsapp.png", "https://api.whatsapp.com/send/?phone=79094808005&text&type=phone_number&app_absent=0", "+79094808005") 
    );
}

defBody("contact", gettxt("contact.body.html")
, function(){
s = getLangData('contact');
$("#house-map").html(s[0]);
$("#social-links").html(s[1]);
});

})()
