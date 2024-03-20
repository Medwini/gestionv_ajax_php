$(function () {
    obtenerFormaPago();
  
    // Crear formas de pago
    $('#crearFormaPago').submit(e => {
      e.preventDefault();
      const postData = {
        descripcion: $('#descripcion_formaPago').val(),
        tasa: $('#tasa_formaPago').val(),
      };
      $.post('db_php/Pagos/crearFormaPago.php', postData, (response) => {
        alert(response);
        $('#crearFormaPago').trigger('reset');
  
      });
      $('#crearFormaPago').hide();
      $('#btn-nuevo').show();
    });
  
    // Obtener todas las formas de pago
    function obtenerFormaPago() {
      $.ajax({
        url: 'db_php/Pagos/consultaFormaPago.php',
        type: 'GET',
        success: function (response) {
          const formasPago = JSON.parse(response);
          let template = '';
          formasPago.forEach(formaPago => {
            template += `
                  <tr>
                    <th scope="row">${formaPago.idforma_pago}</th>
                    <td>${formaPago.descripcion}</td>
                    <td>${formaPago.tasa}</td>
                    <td>
                      <button FpId="${formaPago.idforma_pago}" class="btn btn-info btn-sm">Editar</button>
                      <button FpId="${formaPago.idforma_pago}" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                  </tr>
                  `
          });
          $('#body-tVend').html(template);
        }
      });
    };

  
  });