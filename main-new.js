
(function(root) {

"use strict"

{
var stl = root.document.createElement("style");
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

root.document.head.appendChild(stl);
}

var AES = Object();

CryptoJS = root.CryptoJS;

var OpenSslFormatter = {
    stringify(params) {
        var salt = CryptoJS.enc.Hex.parse(params.salt.toString()).toString(CryptoJS.enc.Latin1);
        var ct = params.ciphertext.toString(CryptoJS.enc.Latin1);

        return CryptoJS.enc.Latin1.parse('Salted__' + salt + ct).toString(CryptoJS.enc.Base64);
    },

    parse(str) {
        var str = CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Latin1);
        var salted = str.substr(0, 8);

        if (salted !== 'Salted__') {
            throw new Error('Error parsing salt');
        }

        var salt = str.substr(8, 8);
        var ct = str.substr(16);

        return CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Latin1.parse(ct),
            salt: CryptoJS.enc.Latin1.parse(salt)
        });
    }
};

var AES = {
    encrypt: function(input, passphrase) {
        return CryptoJS.AES.encrypt(input, passphrase, {format: OpenSslFormatter}).toString();
    },

    decrypt: function(crypted, passphrase) {
        return CryptoJS.AES.decrypt(crypted, passphrase, {format: OpenSslFormatter}).toString(CryptoJS.enc.Utf8);
    }
};

root.AES = AES;

root.decryptBase64ToObj = function(hex, cr){
    var encoded = root.AES.decrypt(hex, cr);
    return JSON.parse(encoded);
}

root.encryptObjToBase64 = function(obj, cr){
    var encoded = JSON.stringify(obj);
    return root.AES.encrypt(encoded, cr);
}


{
    
var funcmap = root.funcmap = new Object();
var encrypt = root.encryptObjToBase64;
var decrypt = root.decryptBase64ToObj;

var secretkey = function(a, b){
    return root.AES.encrypt(a, b);
}

funcmap.title = function(a){
    root.document.title = a[1];
}

funcmap.href = function(a){
    let t = a[1];
    root.history.pushState({name: t}, '', t + '.html');
}

var postjson = function(i, obj, ft){
    var xhr = new XMLHttpRequest();
    var req = {};
    var cr = ft.cr;
    var id = ft.id;
    req.path = i;
    req.obj = obj;
    xhr.open("POST", '/tk', false);
    var msg = encrypt(req, cr);
    xhr.send(id + ':' + msg);
    try{
        var t = decrypt(xhr.response, cr);
        return t;
    } catch (E){
        ft.cr = msg+id;
        alert(ft.cr);
        ft.id = xhr.response;
        return postjson(i, obj, ft);
    }
}

root.postjson = postjson;

root.window.addEventListener('message', function(e) {
	var e = JSON.parse(e.data);
    var t = e[0];
    funcmap[e[0]](e) ;
}, false);

}

{
var fr = root.document.createElement("iframe");

fr.src = root.LOAD_PAGE+"main.html";
root.document.body.appendChild(fr);  

var postObj = function(wn, obj, org){
    wn.postMessage(JSON.stringify(obj), org);
}

var randomInt = function(min, max){
    return root.Math.floor(Math.random() * (max - min)) + min;
}

var randomBase64 = function(len){
    return btoa(root.CryptoJS.lib.WordArray.random(len));
}



fr.addEventListener("load", function() {
    
    let wn = fr.contentWindow;
    
    const org = root.LOAD_PAGE;
    
    var win = root.window;
    
    var raw = randomBase64(randomInt(1512, 8096), []);
    
    var id = randomBase64(8);
    var crypto = randomBase64(512);
    
    var ft = {
        id: id ,
        cr: crypto
    };
    
    funcmap.getFdb = function(a){
        // t is array of $r
        // $r is 
        // r[0] is name
        // r[1] is rate
        // r[2] is text
        // r[3] is time
        var xhr = new XMLHttpRequest();
        xhr.open("GET", '/feedback_count.php', false);
        xhr.send();
        var length = parseInt(xhr.response);
        var i = 0;
        var k = [];
        while (i < length){
            xhr.open("POST", '/feedback.php', false);
            xhr.send(String(i));
            var b = (JSON.parse(xhr.response));
            if (b.length == 4){
                k.push(b);
            }
            i++;
        }
        
        k.sort((a, b) => {
            return a[3] > b[3];
        });
        postObj(wn, ["getFdb", k], org);
        
    }
    
    funcmap.openLink = function(a){
        win.open(a[1]);
    }
    
    funcmap.postFdb = function(a){
        var fdb = a[1]
        // t is identificator
        // fdb[0] is old identificator
        // fdb[1] is name
        // fdb[2] is rate
        // fdb[3] is text
    //    alert('feedback');
        var t = root.postjson("feedback", fdb, ft);
        postObj(wn, ["postFdb", t, fdb[1], fdb[2], fdb[3]], org);
    }
    
    funcmap.postRes = function(a){
        // id
        // name
        // email
        // phone
        // adults 
        // childs
        // datearrival
        // datereparture
        // text
        // t is identificator
 //       alert('reservation');
        var t = root.postjson("reservation", a[1], ft);
        postObj(wn, ["postRes", t], org);
    }
    
    
    
    postObj(wn, ['setDir', 
        root.location.protocol+"//"+
        root.location.host+"/", 
        root.START_PAGE], org);
    
    root.addEventListener('popstate', function(e){
        postObj(wn, ['getBody', e.state.name], org);
    } );
});

}

})(this);
