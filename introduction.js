defBody("introduction", `<div class="container">

       <h1 class="title" id="in-title"></h1>
       <div class="row">
              <div class="col-sm-4" id="page-1"><</p></div>
              <div class="col-sm-4" id="page-2"><</p></div>
              <div class="col-sm-4" id="page-3"><</p></div>
        </div>
        <div class="spacer">
        </div>
</div>
`, function(){
s = getLangData('introduction');
$("#in-title").html(s[0])
$("#page-1").html(s[1]);
$("#page-2").html(s[2]);
$("#page-3").html(s[3]);
});
