$('head').append(`<style>.img1{vertical-align:middle;width:40px;height:40px;}</style>`);

function scl(image, link, text){
  return `<a class=body3 href="`+link+`"><img src='`
  +image+`' class=img1 />`+text+`<br/></a>`;
}

function genMap(){
    var mapOptions = {
        center: [42.09208, 47.59508],
        zoom: 19
    }
         
    var map = new L.map('mymap', mapOptions);
    var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    var marker = L.marker([42.0921228, 47.5947804]).addTo(map);
}

defBody("contact", 
`<div class=container>
<div class=contact>
<div class=row>
<div class=col-sm-12>
<p>
<h3 id=house-map>
</h3>
<div id=mymap style=width:100%;height:400px>
</div>
<script>genMap()</script>
</div>
<div class="col-sm-6 col-sm-offset-3">
<div class=spacer>
<p>
<h3 id=social-links>
</h3>
<p style=line-height:15px>`
+ scl(imgRef("TqXM/nothJ8sEZ"), "https://t.me/kubachi_guest_house_yut", "kubachi_guest_house_yut") 
  + scl(imgRef("2Fra/HSWQ9rbpx"), "https://api.whatsapp.com/send/?phone=79094808005&text&type=phone_number&app_absent=0", "+79094808005") 
  +`<h4 id=social-site>
  </h4>
  </div></div></div></div></div>`

, function(){
s = getLangData('contact');
$("#house-map").html(s[0]);
$("#social-links").html(s[1]);
});
