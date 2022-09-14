//<link rel=stylesheet href=main.css />
var hd = document.getElementsByTagName("head")[0];
var ln = document.createElement('link');
var host = "https://huakim.github.io/lt/";
ln.href = host + 'main.css';
ln.rel='stylesheet';
hd.appendChild(ln);
hd = document.getElementsByTagName("body")[0];
ln = document.createElement('iframe');
ln.src = host + 'main.html';
hd.appendChild(ln);
delete hd;
delete host;
var dirName;
var tt = this;
ln.addEventListener("load", function() {
    ln.contentWindow.main.call(tt, START_PAGE);
});
