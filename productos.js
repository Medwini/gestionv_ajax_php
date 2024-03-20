$(function () {
    obtenerProductos();
  
    // Crear formas de pago
    $('#crearProducto').submit(e => {
      e.preventDefault();
      const postData = {
        codbarra: $('#codBarra_Prod').val(),
        descripcion: $('#desc_Prod').val(),
        costo_base: $('#costoB_Prod').val(),
        rentabilidad: $('#rent_Prod').val(),
        precio_base: $('#precioB_Prod').val(),
        cantidad: $('#cant_Prod').val(),
        descuento: $('#descuento_Prod').val()
      };
      $.post('db_php/Productos/crearProducto.php', postData, (response) => {
        alert(response);
        $('#crearProducto').trigger('reset');
  
      });
      $('#crearProducto').hide();
      $('#btnc-Prod').show();
      obtenerProductos();
    });
  
    // Obtener todos los Productos
    function obtenerProductos() {
      $.ajax({
        url: 'db_php/Productos/consultaProducto.php',
        type: 'GET',
        success: function (response) {
            console.log(response);
          const productos = JSON.parse(response);
          let template = '';
          productos.forEach(producto => {
            template += `
                  <tr>
                    <th scope="row">${producto.idproducto}</th>
                    <td>${producto.codbarra}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.costo_base}</td>
                    <td>${producto.rentabilidad}</td>
                    <td>${producto.precio_base}</td>
                    <td>${producto.cantidad}</td>
                    <td>
                      <button FpId="${producto.idproducto}" class="btn btn-info btn-sm">Editar</button>
                      <button FpId="${producto.idproducto}" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                  </tr>
                  `
          });
          $('#body-tProd').html(template);
        }
      });
    };

  
  });