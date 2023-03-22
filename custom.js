let key = CryptoJS.enc.Hex.parse("ab3bc981fc93bc129ec47df910060fff");
let iv = key.clone();

function encrypt(s){
    const dataHex = CryptoJS.enc.Utf8.parse(s);
    return (CryptoJS.AES.encrypt(dataHex, key, {
        iv: iv
    }).toString());
}
function encJson(s){
    return encrypt(JSON.stringify(s));
}
function decrypt(s){
    return (CryptoJS.AES.decrypt(s, key, {
        iv: iv
    }).toString(CryptoJS.enc.Utf8));
}
function decJson(s){
    return JSON.parse(decrypt(s));
}
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
}
try{
    let key = getQueryString("key");
    let data = decJson(key);
    var beastDictArr = data["words"];
    var dname = data["name"];
    var bg = data["background"];
    $("#background>h2")[0].innerHTML=bg.repeat(10000);
    $("title")[0].innerHTML=dname+"转换器";
    $("#title>h1")[0].innerHTML=dname+"转换器";
    $("#ptm")[0].innerHTML="转换为"+dname;
    $("#mao").attr("placeholder",dname)
    delete data;
}catch(e){
    console.error(e);
    alert("key不正确/已过期！");
}

function encode(rawStr) {
    let charArr = rawStr.split("")
    let unicodeHexStr = ""
    for (let i = 0; i < charArr.length; i++) {
        let charHexStr = charArr[i].charCodeAt(0).toString(16)
        while (charHexStr.length < 4) {
            charHexStr = "0" + charHexStr
        }
        unicodeHexStr += charHexStr
    }
    let k = 0
    let unicodeHexStrArr = unicodeHexStr.split("")
    let beastStr = ""
    for (let i = 0; i < unicodeHexStrArr.length; i++) {
        let unicodeHexCharValue = parseInt("0x" + unicodeHexStrArr[i])
        k = unicodeHexCharValue + (i % 0x10)
        if (k >= 0x10) {
            k = k - 0x10;
        }
        beastStr += beastDictArr[parseInt(k / 4)] + beastDictArr[(k % 4)]
    }
    return beastStr
}

function decode(beastStr) {
    let unicodeHexStr = ""
    let beastStrArr = beastStr.split("")
    for (let i = 0; i <= (beastStr.length - 2); i += 2) {
        let beastCharStr = ""
        let pos1 = 0
        beastCharStr = beastStrArr[i];
        for (; pos1 <= 3; pos1++) {
            if (beastCharStr == beastDictArr[pos1]) {
                break
            }
        }
        let pos2 = 0
        beastCharStr = beastStrArr[i + 1]
        for (; pos2 <= 3; pos2++) {
            if (beastCharStr == beastDictArr[pos2]) {
                break;
            }
        }
        let k = (pos1 * 4) + pos2;
        let unicodeHexCharValue = k - (parseInt(i / 2) % 0x10);
        if (unicodeHexCharValue < 0) {
            unicodeHexCharValue += 0x10;
        }
        unicodeHexStr += unicodeHexCharValue.toString(16)
    }
    let rawStr = ""
    let start = 0
    let end = 4
    while (end <= unicodeHexStr.length) {
        let charHexStr = unicodeHexStr.substring(start, end);
        let charStr = String.fromCharCode(parseInt("0x" + charHexStr))
        rawStr += charStr
        start += 4
        end += 4
    }
    return rawStr
}

$("#ptm").click(function (e) { 
    try {
        var peo=$("#peo").val();
        $("#mao").val(encode(peo));
    } catch (error) {
        console.error(error);
    }
});
$("#mtp").click(function (e) { 
    try{
        var mao=$("#mao").val();
        $("#peo").val(decode(mao));
    } catch (error) {
        console.error(error);
    }
});