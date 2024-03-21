$(function () {
    obtenerVendedores();
    var vend = document.getElementById('btn-navVend');
    vend.innerText = 'Vendedor';
  
    
  
    // Obtener todos los vendedores
    function obtenerVendedores() {
      $.ajax({
        url: 'db_php/Vendedores/consultaVendedor.php',
        type: 'GET',
        success: function (response) {
          const vendedores = JSON.parse(response);
          let template = '';
          vendedores.forEach(vendedor => {
            template += `
                  <tr>
                    <th scope="row">${vendedor.idvendedor}</th>
                    <td>${vendedor.cedula}</td>
                    <td>${vendedor.nombre}</td>
                    <td>${vendedor.telefono}</td>
                    <td>${vendedor.direccion}</td>
                    <td>
                      <button FpId="${vendedor.idvendedor}" class="btn btn-info btn-sm">Editar</button>
                      <button FpId="${vendedor.idvendedor}" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                  </tr>
                  `
          });
          $('#body-tVend').html(template);
        }
      });
    };
    obtenerVendedor();

    // Modal de selección de vendedor
    function obtenerVendedor() {
      $.ajax({
        url: 'db_php/Vendedores/consultaVendedor.php',
        type: 'GET',
        success: function (response) {
          console.log(response);
          const vendedores = JSON.parse(response);
          let template = '';
          vendedores.forEach(vendedor => {
            template += `
                  <option value="${vendedor.idvendedor}" class="">${vendedor.nombre}</option>
                  `
          });
          $('#inputSelectVendedor').html(template);
        }
      });
    };

    // Crear vendedores
    $('#crearVendedor').submit(e => {

      const postData = {
        cedula: $('#ident_vend').val(),
        nombre: $('#nombre_vend').val(),
        telefono: $('#tel_vend').val(),
        direccion: $('#dir_vend').val(),
      };
      $.post('db_php/Vendedores/crearVendedor.php', postData, (response) => {
        alert(response);
        $('#crearVendedor').trigger('reset');
      });
      $('#crearVendedor').hide();
      $('#btnc-Vend').show();
      obtenerVendedores();
      e.preventDefault();
    });
    
    // Selección de vendedor
    $(document).on('change', '.forma-pago-2', (e) => {
      const idvendedor = $(this)[0].activeElement.value;
      $.post('db_php/Vendedores/seleccionarVendedor.php', {idvendedor}, (response) => {
        const vendedores = JSON.parse(response);
        vendedores.forEach(vendedor => {
          vend.setAttribute('vendId', vendedor.idvendedor);
          vend.innerText = vendedor.nombre;
          var idvend=vendedor.idvendedor;
          $.post('db_php/Ventas/consultaVentasVendedor.php', {idvend}, (response) => {
            console.log(response);
            const ventas_det = JSON.parse(response);
            let template = '';
            if(ventas_det.length > 0){
              ventas_det.forEach(venta_det => {
                var monto_subTotal = venta_det.precio_base * venta_det.cantidad;
                var monto_totalProd = monto_subTotal * 1.16;
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
                      <td class="monto_bCantidad">${monto_subTotal}</td>
                      <td>${venta_det.impuesto}</td>
                      <td class="monto_subTotal">${monto_totalProd}</td>
                    </tr>
                      `
              });
            }else{
              $.post('db_php/Ventas/crearVentaVendedor.php', {idvend}, (response) => {
                console.log(response);
              });
            };
            
            $('#body-tDetVenta').html(template);

          });
        });
        $('#cont-selVendedorM').hide();
      });
    });
  
  });