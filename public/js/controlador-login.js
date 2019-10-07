$("#btn-login").click(function(){
    $.ajax({
        url:"/login",
        data:"usuario="+$("#inputUser").val()+"&contrasena="+$("#inputPassword").val(),
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            if (respuesta.estatus == 0)
                //alert("Credenciales correctas");    
                window.location.href ="home.html";
            else
                alert("Credenciales incorrectas");
            console.log(respuesta);
        }
    });
});