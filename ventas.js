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
    };

    $(document).on('keyup', '.inp-cantP', (e) => {
        var idProdDet = $(this)[0].activeElement.parentNode.parentNode.getAttribute('prodDetId');
        var CantProdDet = $(this)[0].activeElement.value;
        var idventa_det = $(this)[0].activeElement.parentNode.parentNode.getAttribute('ventDetId');

        const postData = {
            idProdDet: idProdDet,
            CantProdDet: CantProdDet,
            idventa_det: idventa_det 
        };
        $.post('db_php/Ventas/actCantSolicitada.php', postData, (response) => {
            const mensajes = JSON.parse(response);
            if(mensajes.mensaje == 1){
                var valor_cant = $(this)[0].activeElement.parentNode.parentNode.childNodes[9].childNodes[0].value;
                var valor_precio = $(this)[0].activeElement.parentNode.parentNode.childNodes[5].innerText;
                var monto_subTotal = '';
                monto_subTotal = valor_precio * valor_cant;
                var monto_totalProd = '';
                monto_totalProd = monto_subTotal * 1.16;
                var camp_monto = $(this)[0].activeElement.parentNode.parentNode.childNodes[11];
                var camp_totalProd = $(this)[0].activeElement.parentNode.parentNode.childNodes[15];
                camp_monto.innerText = monto_subTotal;
                camp_totalProd.innerText = monto_totalProd;
            }else{
                alert('Valor inválido, no hay suficiente cantidad.');
                var inpCant = $(this)[0].activeElement;
                inpCant.value = 0;

                
            }

        });
    });

    $(document).on('click', '.btn-elDetProd', (e) => {
        const idprod = $(this)[0].activeElement.parentNode.parentNode.getAttribute('prodDetId');
        const idventa_det = $(this)[0].activeElement.parentNode.parentNode.getAttribute('ventDetId');
        const postData = {
            idprod: idprod,
            idventa_det: idventa_det
        };
        $.post('db_php/Ventas/eliminarProductoCesta.php', postData, (response) => {
            var idvend = document.getElementById('btn-navVend').getAttribute('vendId');
            $.post('db_php/Ventas/consultaVentasVendedor.php', {idvend}, (response) => {
                const ventas_det = JSON.parse(response);
                let template = '';
                if(ventas_det.length > 0){
                  ventas_det.forEach(venta_det => {
                    template += `
                        <tr prodDetId="${venta_det.idproducto}" ventDetId="${venta_det.idventa_det}">
                          <th scope="row">
                            <a class="btn-elDetProd" href="#">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
                                <path d="M9 9l6 6m0 -6l-6 6" />
                              </svg>
                            </a>
                          </th>
                          <td>${venta_det.descripcion}</td>
                          <td>${venta_det.precio_base}</td>
                          <td>${venta_det.cantActual}</td>
                          <td><input type="text" class="inp-cantP" style="border: none; padding: .3rem;" value="${venta_det.cantidad}"></td>
                          <td class="monto_bCantidad"></td>
                          <td></td>
                          <td>${venta_det.impuesto}</td>
                          <td class="monto_subTotal"></td>
                        </tr>
                          `
                  });
                }else{

                };
                
                $('#body-tDetVenta').html(template);
    
              });
        });
    });
  
  });