
(function(){
var dir = this.dirName

$('head').append(gettxt("index.head.html"));
/*
var getCSSRules = (el, css = document.styleSheets) => 
    [].concat(...[...css].map(s => [...s.cssRules||[]])) 
    .filter(r => {
        return el ==r.selectorText;});           
*/
var tt = this;

this.setFdb = function(bd){
    if ($("#collapse-able").css('display') != 'none'){
        $("#rw-det").html(bd);
    }
}

this.funcmap.getFdb = function(e){
    var ar = e[1];
    var bd = '';
    for (var k of ar){
        bd += tt.getFdb(k[0], k[1], k[2], k[3]);
    }
    exp1.body = bd;
    tt.setFdb(bd);
}

this.funcmap.postFdb = function(e){
    var uid = exp1.uid;
    var uit = e[1];
    
    if (uid != uit){
		exp1.body += exp1.usrb;
	}
    
    var df = tt.getFdb(e[2], e[3], e[4], moment().format(dt1));
    
	tt.setFdb(exp1.body + df);
	
	exp1.uid = uit;
	exp1.usrb = df;
}

this.funcmap.postRes = function(e){
    exp1.uidr = e[1];
}

this.exp1 = {
    uid: 0,
    uidr: 0,
    bodyget: function(){
        var bd = '';
        tt.postObj(["getFdb"]);
    },
    body: "",
    usrb: "",
    time: new Date().getTime(),
    chk: function(i){
        var y = new Date().getTime();
        var t = this.time; this.time = y;
        t = y - t;
        return t > i;
    },
    run: function(){
        if (this.chk(500)){
            var div = $("#collapse-able");
            if (div.css('display') == 'none'){
                $("#rw-det").html(this.body);
                $("#trg").html("▾ ");
            } else {
                $("#trg").html("▸ ");
            }
            div.slideToggle(500);
        }
    },
    level: 0, 
    feedback: "#fm-thank",
    callback: "#rs-thank",
    hide_fd_form: true,
    star: function(i){
        this.level = i;
        $("#fd-form").slideToggle(500);
        this.hide_fd_form = false;
        
        this.star = function(i){
            this.level = i;
        }
    }
};

this.getStar = function(){
        const allstar = document.querySelectorAll(".star");

        allstar.forEach((star, i) => {
            i = i + 1;
            star.onclick = function() {
                exp1.star(i);
                setStar(i);
            }
        });
}

this.setStar = function(i){ 
        const allstar = document.querySelectorAll(".star");
        
        allstar.forEach((star, d) => {
            if( d < i )
            {
                star.innerHTML = '&#9733';
            }else{
                star.innerHTML = '&#9734';
            }
        });
}

this.index = function(){
    getStar();
    setStar(exp1.level);
    exp1.bodyget();
    
    if (!exp1.hide_fd_form) {$("#fd-form").css("display", "inline"); }
    $(exp1.feedback).css("display", "none");
    $(exp1.callback).css("display", "none");
}

this.getRate = function(rate){
    str = `<div class="star-widget-container">
      <div class="star-widget">`
      
    var i;
    var d = '<label class="fas fa-star"></label>';
    if (rate == 5){
        str+="<i class=\"all_check\">";
        i = 0;
    } else {
        i = 5 - rate;
    }
    if (i > 0){
        do{
            str += d;
            i --;
        } while (i > 0);
        str += "<i class=\"check\">";
    }
    do{
        rate --;
        str += d;
    }while (rate > 0);
    str += "</i></div></div>";
    return str;
}

this.getFdb = function(name, rate, text, dt){
    return  (
`<div class="wowload zoomIn"><p><br/></p><div style=float:right; class=body1>`+
    dt+`&emsp;</div><k class=body3>`+name+`</k>` + getRate(rate) + 
    `<textarea class=body2 readonly>`+text+`</textarea></div>`);
}

this.fd_sbm = function(){
    if (exp1.chk(500)){
        $("#fm-thank").slideToggle(500);
        exp1.feedback = "#fm-feed";
        $("#fm-feed").slideToggle(500);
    }
    
    var name = $("#fd-name").val(); 
    var level = exp1.level;
    var text = $("#fd-text-message").val();
    
    var uid = exp1.uid;
    
    var obj = [uid, name, level, text];
    this.postObj(["postFdb", obj]);
    /*
    var uit = pstobj( "" + dir + 'feedback.php', obj);
    
    if (uid != uit){
		exp1.body += exp1.usrb;
	}
	$("#rw-det").html(exp1.body + df);
	
	exp1.uid = uit;
	exp1.usrb = df;*/
}

this.fd_rep = function(){
    if (exp1.chk(500)){
        $("#fm-feed").slideToggle(500);
        exp1.feedback = "#fm-thank";
        $("#fm-thank").slideToggle(500);
    }
}

this.rs_sbm = function(){
    if (exp1.chk(500)){
        $("#rs-thank").slideToggle(500);
        exp1.callback = "#rs-feed";
        $("#rs-feed").slideToggle(500);
    }
    var name = $("#wd-name").val();
    var email = $("#wd-email").val();
    var phone = $("#wd-phone").val();
    var adults = parseInt($("#wd-adults").val());
    var childs = parseInt($("#wd-childs").val());
    var date = moment(new Date($("#wd-date").val())).format(dt1);
    var daterep = moment(new Date($("#wd-datedep").val())).format(dt1);
    var text = $("#wd-text-message").val();
    var obj = [exp1.uidr, name, email, phone, adults, 
        childs, date, daterep, text];
        
    this.postObj(["postRes", obj]);
}

this.rs_rep = function(){
    if (exp1.chk(500)){
        $("#rs-feed").slideToggle(500);
        exp1.callback = "#rs-thank";
        $("#rs-thank").slideToggle(500);
    }
}


defBody("index", gettxt("index.body.html")
, function(){
s = getLangData('index');
$("#in-welcome").html("<p class='animated fadeInDown'>"+s[1]+
"</p><h1 class='animated fadeInUp'>"+s[0]+`</h1>`);
$("#in-res").html(s[2]);
$("#wd-name").attr('placeholder',s[3]);
$("#fd-name").attr('placeholder',s[3]);
$("#wd-email").attr('placeholder',s[4]);
$("#wd-phone").attr('placeholder',s[5]);
$("#wd-adults").attr('placeholder',s[6]);
$("#wd-date").attr('placeholder',s[7]);
$("#wd-text-message").attr('placeholder',s[8]);
$("#fd-text-message").attr('placeholder',s[8]);
$("#wd-submit").html(s[9]);
$("#fd-submit").html(s[9]);
$("#wd-rooms").html(s[10]);
$("#wd-tours").html(s[11]);
$("#wd-food").html(s[12]);
$("#in-reviews").html(s[13]);
$("#in-feedback").html(s[14]);
$("#in-fd2").html(s[15]);
$("#fd-repeat").html(s[16]);
$("#wd-repeat").html(s[16]);
$("#in-th3").html(s[17]);
$("#in-th4").html(s[18]);
$("#wd-childs").attr('placeholder',s[19]);
$("#wd-datedep").attr('placeholder',s[20]);
});

} )()
