$('head').append(`
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
    
.details,
.show,
.hide:target {
  display: none;
}
.hide:target + .show,
.hide:target ~ .details {
  display: block;
}
    
.star-widget-container{
  position: relative;
  width: 220px;
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}


.star-widget label{
  font-size: 16px;
  color: #444;
  float: right;
  padding: 10px;
}


.check label{
  color: #fd4;
}


.all_check label{
  color: #fe7;
  text-shadow: 0 0 20px #952;
}

        .star_rating{
            user-select: none;
            color: white;
            background-color: white;
            padding: 1.4rem 2.5rem;
            margin: 2rem;
            border-radius: .4rem;
			animation: slide-up 1s ease;
        }

        @keyframes slide-up{
            0%{
                opacity: 0;
                transform: scale(.5);
            }

            100%{
                opacity: 1;
                transform: scale(1);
            }
        }
        

        .rating_heading{
            color: white;
            animation: scale-up 1s ease;
        }

        @keyframes scale-up{
            0%{
                opacity: 0;
                transform: translateY(50px);
            }

            100%{
                opacity: 1;
                transform: translateY(0px);
            }
        }

        .star{
            font-size: 3rem;
            color: #ff9800;
            background-color: unset;
            border: none;
            outline: none;
        }

        .star:hover{
            cursor: pointer;
        } 
    </style>
`
);

var getCSSRules = (el, css = document.styleSheets) => 
    [].concat(...[...css].map(s => [...s.cssRules||[]])) /* 1 */
    .filter(r => {
        return el ==r.selectorText;});            /* 2 */




const exp1 = {
    uid: 0,
    uidr: 0,
    bodyget: function(){
        var bd = '';
        var ar = Object.values($.get({
            url: 'feedback.php',
            dataType: 'json',
            async: false
        }).responseJSON);

        for (var k of ar){
            bd += getFdb(k[0], k[1], k[2], k[3]);
        }
        this.body = bd;
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
    star: function(i){
        this.level = i;
        $("#fd-form").slideToggle(500);
        for (var i of getCSSRules('#fd-form')){
            i.style.removeProperty('display');
        }
        this.star = function(g){
            this.level = g;
        };
    }
};

function getStar(){
        const allstar = document.querySelectorAll(".star");

        allstar.forEach((star, i) => {
            star.onclick = function() {
                let current_star_level_value = i + 1;
                exp1.star(current_star_level_value);
                allstar.forEach((star, j) => {
                    if( current_star_level_value >= j+1 )
                    {
                        star.innerHTML = '&#9733';
                    }else{
                        star.innerHTML = '&#9734';
                    }
                })
            }
        });
}

function setStar(i){ 
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

function index(){
    getStar();
    setStar(exp1.level);
    exp1.bodyget();
    $(exp1.feedback).css("display", "none");
    $(exp1.callback).css("display", "none");
}

function getRate(rate){
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

function getFdb(name, rate, text, dt){
    return  `
    <div class="wowload zoomIn">
    <p>
    <br/>
    </p>
    <div style="float: right;" class=body1>`+dt+`&emsp;</div>
    <k class="body3">`+name+`</k>
    
    ` + getRate(rate) + `
    <k class="body2">
    `+text+`
    </k>
    </div>
    `;
}

function fd_sbm(){
    if (exp1.chk(500)){
        $("#fm-thank").slideToggle(500);
        exp1.feedback = "#fm-feed";
        $("#fm-feed").slideToggle(500);
    }
    
    var name = $("#fd-name").val(); 
    var level = exp1.level;
    var text = $("#fd-text-message").val();
    
    var df = (getFdb(name, level, text, moment().format(dt1)));
    
    var uid = exp1.uid;
    
    var obj = [uid, name, level, text];
    
    var uit = parseInt($.post({
        url: 'feedback.php',
        data: JSON.stringify(obj),
        async: false
    }).responseText);
    
    if (uid != uit){
		exp1.body += exp1.usrb;
	}
	$("#rw-det").html(exp1.body + df);
	
	exp1.uid = uit;
	exp1.usrb = df;
}

function fd_rep(){
    if (exp1.chk(500)){
        $("#fm-feed").slideToggle(500);
        exp1.feedback = "#fm-thank";
        $("#fm-thank").slideToggle(500);
    }
}

function rs_sbm(){
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
        
    exp1.uidr = parseInt($.post({
        url: 'reservation.php',
        data: JSON.stringify(obj),
        async: false
    }).responseText);
}

function rs_rep(){
    if (exp1.chk(500)){
        $("#rs-feed").slideToggle(500);
        exp1.callback = "#rs-thank";
        $("#rs-thank").slideToggle(500);
    }
}

defBody("index", `
<div class="index">
	<div class="banner">
		<img src="`+imgRef("banner.png")+`" class="img-responsive"
			alt="slide">
			<div class="welcome-message">
				<div class="wrap-info">
					<div class="information" id="in-welcome">
					</div>
					<a href="#information"
						class="arrow-nav scroll wowload fadeInDownBig">
						<i class="fa fa-angle-down"></i>
					</a>
				</div>
			</div>
	</div>

	<div id="information" class="spacer reserve-info ">
        <div class="container" id="rs-thank">
            <h3 id="in-th3"></h3>
            <h3 id="in-th4"></h3>
            <button type=button class="btn btn-default" id="wd-repeat"
                    onclick=rs_rep()></button>
        </div>
		<div class="container" id="rs-feed">
			<h3 id="in-res"></h3>
			<form role="form" class="wowload fadeInRight">
				<div class="form-group">
					<input type="text" class="form-control" id="wd-name">
				</div>
				<div class="form-group">
					<input type="email" class="form-control" id="wd-email">
				</div>
				<div class="form-group">
					<input type="Phone" class="form-control" id="wd-phone">
				</div>
				<div class="form-group">
                    <div class="row">
                    <div class="col-xs-6">
                        <input type="number" class="form-control" id="wd-adults"
						min='1'>
                    </div>
                    
                    <div class="col-xs-6">
                        <input type="number" class="form-control" id="wd-childs"
						min='1'>
                    </div>
                    </div>
				</div>
				<div class="form-group">
                    <div class="row">
                    <div class="col-xs-6">
					<input  
                        type="text" 
                        onfocus="(this.type='datetime-local')" 
                        onblur="if(this.value==''){this.type='text'}"
                    class="form-control" id="wd-date">
                    </div>
                    <div class="col-xs-6">
					<input  
                        type="text" 
                        onfocus="(this.type='datetime-local')" 
                        onblur="if(this.value==''){this.type='text'}"
                    class="form-control" id="wd-datedep">
                    </div>
                    </div>
				</div>
				<div class="form-group">
					<textarea class="form-control" id="wd-text-message"
						rows="4"></textarea>
				</div>
				<button type=button class="btn btn-default" id="wd-submit"
                    onclick=rs_sbm()></button>
			</form>
			<p>
				<br />
			</p>




		</div>
        
        <div class="container">
        <p>
        <br/>
        </p>
			<div class="sum" onclick=exp1.run()>
				<k3 id="trg">▸ </k3>
				<k3 id="in-reviews"></k3>
			</div>
        <div id="collapse-able">
				<div id="rw-det" style="padding-left: 30px;">

				</div>

				<div class="col-sm-6 col-sm-offset-3" style="padding-top: 70px;">
                    <div id="fm-feed">
                        <h3 id="in-feedback"></h3>
                        <div class="star_rating">
                            <button class="star" type="button">☆</button>
                            <button class="star" type="button">☆</button>
                            <button class="star" type="button">☆</button>
                            <button class="star" type="button">☆</button>
                            <button class="star" type="button">☆</button>
                        </div>
    
                        <script>
                            index();
                        </script>
    
                        <div id="fd-form">
    
                            <form role="form">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="fd-name">
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control" id="fd-text-message"
                                        rows="4"></textarea>
                                </div>
                                <button type=button class="btn btn-default" id="fd-submit"
                                    onclick=fd_sbm()></button>
                            </form>
    
                        </div>
                    </div>
                    
                    <div id="fm-thank">
                        <h3 id="in-fd2"></h3>
                        <button type=button class="btn btn-default" id="fd-repeat"
                                    onclick=fd_rep()></button>
                    </div>
                    
				</div>
			</div>
	</div>
    
    </div>

	<div class="spacer services wowload fadeInUp">
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<!-- RoomCarousel -->
					<div id="RoomCarousel" class="carousel slide"
						data-ride="carousel">
						<div class="carousel-inner">
							<div class="item active">
								<img src="`+
                            imgRef("1.png")
                            +`" class="img-responsive"
									alt="slide">
							</div>
							<div class="item  height-full">
								<img src="`+
                            imgRef("2.png")
                            +`" class="img-responsive"
									alt="slide">
							</div>
							<div class="item  height-full">
								<img src="`+
                            imgRef("3.png")
                            +`" class="img-responsive"
									alt="slide">
							</div>
						</div>
						<!-- Controls -->
						<a class="left carousel-control" href="#RoomCarousel"
							role="button" data-slide="prev">
							<i class="fa fa-angle-left"></i>
						</a>
						<a class="right carousel-control" href="#RoomCarousel"
							role="button" data-slide="next">
							<i class="fa fa-angle-right"></i>
						</a>
					</div>
					<!-- RoomCarousel -->
					<div class="caption">
						<k id='wd-rooms'></k>
						<a onclick=getBody( " rooms-tariff " href="#" class="pull-right">
							<i class="fa fa-edit"></i>
						</a>
					</div>
				</div>


				<div class="col-sm-4">
					<!-- RoomCarousel -->
					<div id="TourCarousel" class="carousel slide"
						data-ride="carousel">
						<div class="carousel-inner">
							<div class="item active">
								<img src="`+
                            imgRef("4.png")
                            +`" class="img-responsive"
									alt="slide">
							</div>
							<div class="item  height-full">
								<img src="`+
                            imgRef("5.png")
                            +`" class="img-responsive"
									alt="slide">
							</div>
							<div class="item  height-full">
								<img src="`+
                            imgRef("6.png")
                            +`" class="img-responsive"
									alt="slide">
							</div>
						</div>
						<!-- Controls -->
						<a class="left carousel-control" href="#TourCarousel"
							role="button" data-slide="prev">
							<i class="fa fa-angle-left"></i>
						</a>
						<a class="right carousel-control" href="#TourCarousel"
							role="button" data-slide="next">
							<i class="fa fa-angle-right"></i>
						</a>
					</div>
					<!-- RoomCarousel -->
					<div class="caption">
						<k id='wd-tours'></k>
						<a onclick=getBody( " gallery " href="#" class="pull-right">
							<i class="fa fa-edit"></i>
						</a>
					</div>
				</div>


				<div class="col-sm-4">
					<!-- RoomCarousel -->
					<div id="FoodCarousel" class="carousel slide"
						data-ride="carousel">
						<div class="carousel-inner">
							<div class="item active">
								<img src="`+
                            imgRef("7.png")
                            +`" class="img-responsive"
									alt="slide">
							</div>
							<div class="item  height-full">
								<img src="`+
                            imgRef("8.png")
                            +`" class="img-responsive"
									alt="slide">
							</div>
							<div class="item  height-full">
								<img src="`+
                            imgRef("9.png")
                            +`" class="img-responsive"
									alt="slide">
							</div>
						</div>
						<!-- Controls -->
						<a class="left carousel-control" href="#FoodCarousel"
							role="button" data-slide="prev">
							<i class="fa fa-angle-left"></i>
						</a>
						<a class="right carousel-control" href="#FoodCarousel"
							role="button" data-slide="next">
							<i class="fa fa-angle-right"></i>
						</a>
					</div>
					<!-- RoomCarousel -->
					<div class="caption">
						<k id='wd-food'></k>
						<a onclick=getBody( " gallery " href="#" class="pull-right">
							<i class="fa fa-edit"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`, function(){
s = getLangData('index');
$("#in-welcome").html(`
<p class="animated fadeInUp id="index-main1">`+s[1]+`</p>     
<h1  class="animated fadeInDown" id="index-welcome">`+s[0]+`</h1>   
                `
);
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


            
