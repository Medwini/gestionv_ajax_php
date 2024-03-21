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

    function actPrecio() {
      let rentabilidad =  $('#rent_Prod').val();
      let costo_b = $('#costoB_Prod').val();
      let desc = $('#descuento_Prod').val();
      let rent = (100 - rentabilidad)/100;
      var precioU = costo_b / rent;
      let precioNU = precioU-(precioU * desc)/100;
      $('#precioB_Prod').val(precioNU);
    }


    $(document).on('keyup', '#costoB_Prod', (e) => {
      actPrecio();
    });

    $(document).on('keyup', '#descuento_Prod', (e) => {
      actPrecio();
    });

    $(document).on('keyup', '#rent_Prod', (e) => {
      actPrecio();
    });

    // Buscar productos

    $('#buscador').submit(e => {
      const descripcion = $(this)[0].activeElement.parentNode.childNodes[1].value;
      $.post('db_php/Productos/buscarProducto.php', {descripcion}, (response) => {
        console.log(response);
        const productos = JSON.parse(response);
        console.log(productos.length);
        if(productos.length > 0){
          var template = '';
          productos.forEach(producto => {
            let rent = (100 - producto.rentabilidad)/100;
            var precioU = producto.costo_base / rent;
            let precioNU = precioU-(precioU * producto.descuento)/100;
            template += `
              <div prodSeleId="${producto.idproducto}" class="col">
                <div class="card" style="width: 10rem;">
                  <button type="button" class="btn btn-outline-success btn-select">Seleccionar</button>
                  <img src="#" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${producto.descripcion}</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span>Cantidad: </span>${producto.cantidad}</li>
                    <li class="list-group-item"><span>Descuento:</span>${producto.descuento}</li>
                    <li class="list-group-item"><span>Precio T:</span>${precioNU}</li>
                  </ul>
                </div>
              </div>
                `
          });
          $('#cont-cardsProducto').html(template);
        }else{
          $('#cont-busqProductosM').hide();
          alert('No existen datos sobre su búsqueda.');
        }
      });
    });

    
    $(document).on('click', '.btn-select', (e) => {
      const idproducto = $(this)[0].activeElement.parentNode.parentNode.getAttribute('prodSeleId');
      var idvend = document.getElementById('btn-navVend').getAttribute('vendId');
      const postData = {
        idproducto: idproducto,
        idvend: idvend,
      };
      $.post('db_php/Ventas/agregarProducto.php', postData, (response) => {
        console.log(response);
        const mensajes = JSON.parse(response);
        if(mensajes.mensaje == 1){
          $('#cont-busqProductosM').hide();
          $.post('db_php/Ventas/consultaVentasVendedor.php', {idvend}, (response) => {
            console.log(response);
            const ventas_det = JSON.parse(response);
            let template = '';
            if(ventas_det.length > 0){
              ventas_det.forEach(venta_det => {
                template += `
                    <tr prodDetId=${venta_det.idventa_det}>
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
                      <td><input type="text" class="inp-cantP" style="border: none; padding: .5rem;" placeholder="Pedido..."></td>
                      <td class="monto_bCantidad"></td>
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
        }else{
          $('#cont-busqProductosM').hide();
          alert('El producto ya existe en su lista de venta.');
        }
      });
    });
  

  
  });