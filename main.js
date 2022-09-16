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

window.addEventListener('message', function(e) {
	e = JSON.parse(e.data);
    t = e[0];
    funcmap[e[0]](e) ;
}, false);

tt = this;

fr.addEventListener("load", function() {
    let wn = fr.contentWindow;
    wn.postMessage(JSON.stringify(['setDir', location.host, tt.START_PAGE]));
    /*
    tt.addEventListener('popstate', function(e){
        wn.postMessage(JSON.stringify(['getBody', e.state.name]));
    } );*/
});

})();
