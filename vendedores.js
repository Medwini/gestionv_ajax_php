$(function () {
    obtenerVendedores();
    var vend = document.getElementById('btn-navVend');
    vend.innerText = 'Vendedor';
  
    // Crear vendedores
    $('#crearVendedor').submit(e => {
      e.preventDefault();
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
    });
  
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
    
    // Selección de vendedor
    $(document).on('change', '.forma-pago-2', (e) => {
      const idvendedor = $(this)[0].activeElement.value;
      $.post('db_php/Vendedores/seleccionarVendedor.php', {idvendedor}, (response) => {
        console.log(response);
        const vendedores = JSON.parse(response);
        vendedores.forEach(vendedor => {
          vend.setAttribute('vendId', vendedor.idvendedor);
          vend.innerText = vendedor.nombre;
          var idvend=vendedor.idvendedor;
          $.post('db_php/Ventas/consultaVentasVendedor.php', {idvend}, (response) => {

          });
        });
        $('#cont-selVendedorM').hide();
      });
    });
  
  });