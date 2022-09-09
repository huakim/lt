function getImg(i){
    return `<div class="col-sm-4 wowload fadeInUp"><a href=`
    +i+` class="gallery-image" data-gallery><img src=`
    +i+` class="img-responsive"></a></div>`;
}

function shuffle(array) {
  let curId = array.length;
  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

gl_list = [];
var t = GALLERY_SIZE;
while (t > 0){
    gl_list.push(t);
    t--;
}

function gl_add(){
    shuffle(gl_list);
    t = $("#gl-body");
    for (var i of gl_list){
        t.append(getImg(imgRef(""+i+".png")));
    }
}

defBody("gallery", `<div class="container"><h1 class="title" id="gl-title">
</h1><div class="row gallery" id="gl-body">
</div></div>
<script>
gl_add();
</script>
`, function(){
s = getLangData('gallery');
$("#gl-title").html(s[0]);
});


