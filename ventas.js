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

    $(document).on('click', '.btn-elDetProd', (e) => {
        const idprod = $(this)[0].activeElement.parentNode.parentNode.getAttribute('prodDetId');
        const idventa_det = $(this)[0].activeElement.parentNode.parentNode.getAttribute('ventDetId');
        console.log(idprod);
        console.log(idventa_det);
        const postData = {
            idprod: idprod,
            idventa_det: idventa_det
        };
        $.post('db_php/Ventas/eliminarProductoCesta.php', postData, (response) => {
            var idvend = document.getElementById('btn-navVend').getAttribute('vendId');
            $.post('db_php/Ventas/consultaVentasVendedor.php', {idvend}, (response) => {
                console.log(response);
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
                  console.log('nadita');
                };
                
                $('#body-tDetVenta').html(template);
    
              });
        });
    });
  
  });