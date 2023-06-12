(function(){

defBody("introduction", gettxt("introduction.body.html"), function(){
s = getLangData('introduction');
$("#in-title").html(s[0])
$("#page-1").html(s[1]);
$("#page-2").html(s[2]);
$("#page-3").html(s[3]);
});

})();
