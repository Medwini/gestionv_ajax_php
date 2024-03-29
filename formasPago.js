$(function () {
  obtenerFormaPago();
  var arrayPrecios = [];
  var arrayTotal = [];
  var arrayDescuentos = [];

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
    $.post('db_php/Pagos/agregarFormaPago.php', { idforma_pago }, (response) => {

    });
  });


  $('#btn-formaPago').click(e => {
    var idvend = document.getElementById('btn-navVend').getAttribute('vendId');
    var monto_tt = document.getElementById('monto_total').innerText;
    const postData = {
      idvend: idvend,
      monto_tt: monto_tt
    };
    $.post('db_php/Pagos/agregarFormaPago.php', postData, (response) => {
      $.post('db_php/Ventas/crearVentaVendedor.php', { idvend }, (response) => {
        consultarVentaVendedor(idvend);
      });
    });
  });

  function consultarVentaVendedor(idvend) {
    $.post('db_php/Ventas/consultaVentasVendedor.php', { idvend }, (response) => {
      const ventas_det = JSON.parse(response);
      let template = '';
      if (ventas_det.length > 0) {
        ventas_det.forEach(venta_det => {
          var monto_subTotal = venta_det.precio_base * venta_det.cantidad;
          var monto_totalProd = monto_subTotal * 1.16;
          arrayPrecios.push(monto_subTotal);
          arrayTotal.push(monto_totalProd);
          if (venta_det.cantidad > 0) {
            arrayDescuentos.push(venta_det.descuento);
          }
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
      } else {

      };
      actualizarTotales(arrayPrecios, arrayTotal, arrayDescuentos);
      arrayPrecios = [];
      arrayTotal = [];
      arrayDescuentos = [];

      $('#body-tDetVenta').html(template);

    });
  }

  function actualizarTotales(arrayPrecios, arrayTotal, arrayDescuentos) {
    let ttPrecios = 0.00;
    let ttTotal = 0.00;
    let ttDescuentos = 0.00;

    arrayPrecios.forEach(e => {
      ttPrecios += parseFloat(e);
    });
    arrayTotal.forEach(e => {
      ttTotal += parseFloat(e);
    });
    arrayDescuentos.forEach(e => {
      ttDescuentos += parseFloat(e);
    });

    document.getElementById('monto_subTotal').innerHTML = ttPrecios;
    document.getElementById('monto_total').innerHTML = ttTotal;
    document.getElementById('monto_descuento').innerHTML = ttDescuentos+'%';

    ttPrecios = 0.00;
    ttTotal = 0.00;
    ttDescuentos = 0.00;
  }

});
