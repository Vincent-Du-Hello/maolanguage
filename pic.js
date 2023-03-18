$("#up").change(function (e) { 
    try {
        console.log("up occur")
        console.log(e);
        var f=e.currentTarget.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
            let data = e.target.result;
            $("#mao").val(encode(data));
        };
        reader.readAsDataURL(f);
    } catch (error) {
        console.error(error);
    }
});
$("#mao").bind("input propertychange",function (e) { 
    try{
        console.log("mao occur")
        var mao=$("#mao").val();
        $("#peo").attr("src",decode(mao));
    } catch (error) {
        console.error(error);
    }
});
function getBase64(img){//传入图片路径，返回base64
    function getBase64Image(img,width,height) {
      var canvas = document.createElement("canvas");
      canvas.width = width ? width : img.width;
      canvas.height = height ? height : img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var dataURL = canvas.toDataURL();
      return dataURL;
    }
    var image = new Image();
    image.src = img;
    var deferred=$.Deferred();
    if(img){
      image.onload =function (){
        deferred.resolve(getBase64Image(image));//将base64传给done上传处理
      }
      return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
    }
}