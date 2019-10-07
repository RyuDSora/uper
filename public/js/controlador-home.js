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
                $("#secc-catalogo").css("display", "block");
                $("#btn-salir").css("display", "block");
                $("#btn-goLogin").css("display", "none");
            } else {
                user = '';
                $("#secc-catalogo").css("display", "none");
                $("#btn-salir").css("display", "none");
                $("#btn-goLogin").css("display", "block");
            }
            console.log(respuesta);
        }
    });
})();

function goToChange(){
    if (user !== '')
        window.location.href ="change.html";
    else
        alert("Inicie sesión para ejecutar esta acción.");
}