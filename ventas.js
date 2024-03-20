$(function () {
    
    obtenerIdVend();
    var idvend = document.getElementById('btn-navVend').getAttribute('vendId');
    
    function obtenerIdVend() {
        var idvend = document.getElementById('btn-navVend').getAttribute('vendId');
        if (idvend == null){
            idvend = 0;
        }
    }
    
    obtenerVenta(idvend);
    // Obtener venta
    function obtenerVenta(idvend) {
        obtenerIdVend();
        console.log(idvend);
    };
  
  });