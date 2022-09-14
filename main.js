//<link rel=stylesheet href=main.css />
var hd = document.getElementsByTagName("head")[0];
var ln = document.createElement('link');
ln.href = 'main.css';
ln.rel='stylesheet';
hd.appendChild(ln);
hd = document.getElementsByTagName("body")[0];
/*
        <iframe src=main.html id=er>
        </iframe>
*/
ln = document.createElement('iframe');
ln.src = 'main.html';
hd.appendChild(ln);
delete hd;
var dirName;
var tt = this;
ln.addEventListener("load", function() {
    ln.contentWindow.main.call(tt, START_PAGE);
});
