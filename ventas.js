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
    

    $(document).on('change', '.inp-cantP', (e) => {
        var idProdDet = $(this)[0].activeElement.parentNode.parentNode.getAttribute('prodDetId');
        var CantProdDet = $(this)[0].activeElement.value;
        var idventa_det = $(this)[0].activeElement.parentNode.parentNode.getAttribute('ventDetId');
        console.log(idventa_det);

        const postData = {
            idProdDet: idProdDet,
            CantProdDet: CantProdDet,
            idventa_det: idventa_det 
        };
        $.post('db_php/Ventas/actCantSolicitada.php', postData, (response) => {
            const mensajes = JSON.parse(response);
            console.log(mensajes.mensaje);
            if(mensajes.mensaje == 1){

            }else{
                alert('Valor inválido, no hay suficiente cantidad.');
                var d = $(this)[0].activeElement;
                d.value = 0;
            }

        });
    });
  
  });