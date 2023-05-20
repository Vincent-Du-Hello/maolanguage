let key = CryptoJS.enc.Hex.parse("ab3bc981fc93bc129ec47df910060fff");
let iv = key.clone();
const passwords = ["L/W8o5aucuL8G5X059BimQ=="];
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
var pass=encrypt(prompt("要使用该工具，你需要输入密码",""));
if(!passwords.includes(pass)){
    alert("密码错误！");
    location.reload();
}
$("#mask").hide();
alert("密码正确，欢迎使用自定义工具");
$("#gen").click(function (e) { 
    $("#mao").val((!$("#lc").prop("checked")?"https://yuyanmc.github.io/maolanguage/custom.html?key=":"file:///Users/vincent/Documents/VSCode/maolan/custom.html?key=")+encJson({"words":[$("#c1").val(),$("#c2").val(),$("#c3").val(),$("#c4").val()],"background":$("#bg").val(),"name":$("#name").val()}))
    $("#pv").attr("src",$("#mao").val())
});
