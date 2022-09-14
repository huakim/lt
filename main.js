var rc = new XMLHttpRequest();
rc.open("GET", "https://huakim.github.io/lt/main.html", false);
rc.send();

document.querySelector('html').innerHTML = rc.response;
