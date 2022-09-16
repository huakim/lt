(function(){

this.getImg = function(i){
    return `<div class="col-sm-4 wowload fadeInUp"><a href=`
    +i+` class="gallery-image" data-gallery><img src=`
    +i+` class="img-responsive"></a></div>`;
}

this.shuffle = function(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

this.gl1 = function (){
    list = [];
    var i = 0;
    while (i < GALLERY_SIZE){
        i++;
        list.push(i);
    }
    return function(){
        shuffle(list);
        var t = $("#wd-gallery");
        var g = '';
        for (i of list){
            g+= getImg(i + '.png');
        }
        t.html(g);
    }
}();

var t = gettxt('gallery.body.html'); 

defBody("gallery", t, function(){
s = getLangData('gallery');
$("#gl-title").html(s[0]);
});
})()
