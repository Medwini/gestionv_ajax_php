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
    $('#btnc-FP').show();
    obtenerFormaPago();
  });

  // Obtener todas las formas de pago
  function obtenerFormaPago() {
    $.ajax({
      url: 'db_php/Pagos/consultaFormaPago.php',
      type: 'GET',
      success: function (response) {
        console.log(response);
        const formasPago = JSON.parse(response);
        let template = '';
        formasPago.forEach(formaPago => {
          template += `
                <option value="${formaPago.idforma_pago}" class="">${formaPago.descripcion}</option>
                `
        });
        $('#inputGroupSelect01').html(template);
        let template2 = '';
        formasPago.forEach(formaPago => {
          template2 += `
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
        $('#body-tFP').html(template2);
      }
    });
  };


  $(document).on('change', '.forma-pago', (e) => {
    const idforma_pago = $(this)[0].activeElement.value;
    console.log(idforma_pago);
    $.post('db_php/Pagos/agregarFormaPago.php', {idforma_pago}, (response) => {
      console.log(response);
    });
  });

});
