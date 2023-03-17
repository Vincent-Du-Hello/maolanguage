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