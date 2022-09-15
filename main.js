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
})();
