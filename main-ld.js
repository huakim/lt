

(function(){
    
    this.hexToBytes = function(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
    this.Hex = '0123456789abcdef';

    this.hexFromBytes = function(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }
    

         this.utf8ToBytes = function(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        this.utf8FromBytes = function(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

    

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

fr.src = this.LOAD_PAGE+"main.html";
document.body.appendChild(fr);  

funcmap = new Object();

funcmap.title = function(a){
    document.title = a[1];
}

this.bytesToInt = function(x){
    var val = 0;
    var i = 0;
    while (i < 4) {
        val = val << 8;
        val += x[i];
        i ++;
    }
    return val;
}

this.intToBytes = function(x, bytes){
    var i = 4;
    while (i){
        i --;
        bytes[i] = x % 256;
        x = x >> 8;
    }
    return bytes;
}

this.randomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

this.randomBytes = function(size, res){
    while (size > 0){
        size --;
        res.push(randomInt(1, 255));
    }
    return res;
}

this.randomHash = function(size){
    var g = randomBytes(size, []);
    return hexFromBytes(g);
}


this.decrypt = function(hex, ecb){
    hex = hexToBytes(hex);
    if (hex.length == 0) {
        return {};
    }
    hex = ecb.decrypt(hex);
    len = this.bytesToInt(hex);
    var obj = hex.slice(4, len);
    obj = JSON.parse(this.utf8FromBytes(obj));
    return obj;
}

this.encrypt = function(obj, ecb){
    obj = utf8ToBytes(JSON.stringify(obj));
    var len = obj.length;
    var ret = this.intToBytes(len, [])
    ret.push(...obj);
    len += 4;
    ret = this.randomBytes((16-(len%16)), ret);
    obj = ecb.encrypt(ret);
    obj = hexFromBytes(obj);
    return obj;  
}

funcmap.href = function(a){
    let t = a[1];
    history.pushState({name: t}, '', t + '.html');
}

this.getjson = function(i, id, cr){
    var xhr = new XMLHttpRequest();
    req = {};
    req.path = "get/" + i;
    xhr.open("POST", '/tk', false);
    xhr.send(id + ':' + this.encrypt(req, cr));
    return decrypt(xhr.response, cr);
}

this.postjson = function(i, obj, id, cr){
    var xhr = new XMLHttpRequest();
    req = {};
    req.path = "post/" + i;
    req.obj = obj;
    xhr.open("POST", '/tk', false);
    xhr.send(id + ':' + this.encrypt(req, cr));
    return decrypt(xhr.response, cr);
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

this.refresh = function(ft){
    req = {};
    req.path = "check";
    var xhr = new XMLHttpRequest();
    alert("post begun");
    var cr = ft.cr;
    var id = ft.id;
    alert(cr);
    alert(cr.encrypt);
    xhr.open("POST", '/tk', false);
    var tr = this.encrypt(req, cr);
    xhr.send(id + ':' + tr);
    try{
        var tr = decrypt(xhr.response, cr);
        alert(tr);
    } catch (E){
        ft.id = xhr.response;
        ft.cr = new this.aesjs.ModeOfOperation.ecb(tr);
        alert("die");
    }
}

fr.addEventListener("load", function() {
    let wn = fr.contentWindow;
    
    alert("loading");
    
    const org = tt.LOAD_PAGE;
    
    raw = randomBytes(randomInt(128, 4096), []);

    var cr = raw.slice(0,32);

    var id = randomHash(8);
     
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/tk', false);
    xhr.send(id + ':' + hexFromBytes(raw));
    
    crypto = new aesjs.ModeOfOperation.ecb(cr);
    
    alert(crypto.encrypt);
    
    ft = {
        id: xhr.response,
        cr: crypto
    };
    alert("crypto");
    refresh(ft);
    
    funcmap.getFdb = function(a){
        // t is array of $r
        // $r is 
        // r[0] is name
        // r[1] is rate
        // r[2] is text
        // r[3] is time
        tt.refresh(ft);
        t = tt.getjson("feedback", ft.id, ft.cr);
        tt.postObj(wn, ["getFdb", t], org);
        
    }
    
    funcmap.postFdb = function(a){
        var fdb = a[1]
        // t is identificator
        // fdb[0] is old identificator
        // fdb[1] is name
        // fdb[2] is rate
        // fdb[3] is text
        tt.refresh(ft);
        t = tt.postjson("feedback", fdb, ft.id, ft.cr);
        tt.postObj(wn, ["postFdb", t, fdb[1], fdb[2], fdb[3]], org);
    }
    
    funcmap.postRes = function(a){
        //id
        //name
        //email
        //phone
        //adults, 
        //childs
        //datearrival
        //datereparture
        //text
        // t is identificator
        tt.refresh(ft);
        t = tt.postjson("reservation", a[1], ft.id, ft.cr);
        tt.postObj(wn, ["postRes", t], org);
    }
    
    
    
    tt.postObj(wn, ['setDir', location.protocol+"//"+location.host+"/", tt.START_PAGE], org);
    
    tt.addEventListener('popstate', function(e){
        tt.postObj(wn, ['getBody', e.state.name], org);
    } );
});

})();
