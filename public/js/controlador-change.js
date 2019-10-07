var user = '';
(function(){
    $.ajax({
        url:"/obtener-usuario",
        data:"",
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            if (respuesta.usuario !== '') {
                user = respuesta.usuario;
                $("#btn-salir").css("display", "block");
                $("#btn-goLogin").css("display", "none");
            } else {
                user = '';
                $("#btn-salir").css("display", "none");
                $("#btn-goLogin").css("display", "block");
            }
            console.log(respuesta);
        }
    });
})();