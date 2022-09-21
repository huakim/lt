(function(){
var stl = document.createElement("style");
stl.innerText = `body {
    margin: 0;
    padding: 0;
}
iframe {
    display: block;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    margin: 0;
    padding: 0;
    border: 0 none;
    box-sizing: border-box;
}`;

this.document.head.appendChild(stl);
 
var fr = document.createElement("iframe");
fr.src = "https://huakim.github.io/lt/main.html";
document.body.appendChild(fr);  

funcmap = new Object();

funcmap.title = function(a){
    document.title = a[1];
}

funcmap.href = function(a){
    let t = a[1];
    history.pushState({name: t}, '', t + '.html');
}


this.getjson = function(i){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", i, false);
    xhr.send();
    return JSON.parse(xhr.response);
}

this.postjson = function(i, obj){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", i, false);
    xhr.send(JSON.stringify(obj));
    return JSON.parse(xhr.response);
}

window.addEventListener('message', function(e) {
	e = JSON.parse(e.data);
    t = e[0];
    funcmap[e[0]](e) ;
}, false);

tt = this;

this.postObj = function(wn, obj, org){
    wn.postMessage(JSON.stringify(obj), org);
}

fr.addEventListener("load", function() {
    let wn = fr.contentWindow;
    
    const org = "https://huakim.github.io/lt/";
    
    funcmap.getFdb = function(a){
        t = tt.getjson("/feedback.php");
        tt.postObj(wn, ["getFdb", t], org);
    }
    
    funcmap.postFdb = function(a){
        var fdb = a[1]
        t = tt.postjson("/feedback.php", fdb);
        tt.postObj(wn, ["postFdb", t, fdb[1], fdb[2], fdb[3]], org);
    }
    
    funcmap.postRes = function(a){
        t = tt.postjson("/reservation.php", a[1]);
        tt.postObj(wn, ["postRes", t], org);
    }
    
    
    
    tt.postObj(wn, ['setDir', location.protocol+"//"+location.host+"/", tt.START_PAGE], org);
    
    tt.addEventListener('popstate', function(e){
        tt.postObj(wn, ['getBody', e.state.name], org);
    } );
});

})();
