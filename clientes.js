$(function () {
    obtenerClientes();

    var editar =false;
  
    // Busqueda de clientes
    $('#buscarCliente').submit(e => {
        e.preventDefault();
        let busquedaCed =  $(this)[0].activeElement.parentNode.childNodes[3].value;
        let busquedaNom =  $(this)[0].activeElement.parentNode.childNodes[5].value;
        buscarClientes(busquedaCed,busquedaNom);
    });

    function buscarClientes(busquedaCed) {
        // const valor = $(this)[0].activeElement.value;
        const postData = {
            busquedaCed: busquedaCed,
        };
        console.log(postData);
        $.post('db_php/Clientes/buscarCliente.php', postData, (response) => {
            console.log(response);
            const clientes = JSON.parse(response);
            console.log(clientes.length);
            if (clientes.length > 1){
                alert('Hay mas de un cliente con el mismo número de identidad, a continuación se presentarán, seleccione el cliente que requiera presionando el botón aceptar.');
                var c = clientes.every(cliente => {
                    let select= confirm(`Identificación: ${cliente.cedula} \nCliente: ${cliente.nombre}`);
                    if(select){
                        var template = '';
                        template += `
                            <span class="input-group-text" id="inputGroup-sizing-sm">Cliente: ${cliente.idcliente}</span>
                            <input type="text" id="cedula-detV" class="form-control" value="${cliente.cedula}">
                            <input type="text" id="nombre-detV" class="form-control" disabled value="${cliente.nombre}">
                            <button id="btnb-cliente" type="submit" class="btn btn-outline-success" style="width: 20%;">Buscar</button>
                            `

                        $('#busc-Cliente').html(template);
                        return false;
                    }else if (!select){
                        return true;
                    }
                });
                if (c == true ){
                    alert('No seleccionó cliente.');
                    var template = '';
                        template += `
                        <span class="input-group-text" id="inputGroup-sizing-sm">Cliente:</span>
                        <input type="text" id="cedula-detV" class="form-control" placeholder="V- | G- | J-">
                        <input type="text" id="nombre-detV" class="form-control" disabled placeholder="Nombre...">
                        <button id="btnb-cliente" type="submit" class="btn btn-outline-success" style="width: 20%;">Buscar</button>
                            `

                        $('#busc-Cliente').html(template);
                }


            }else if (clientes.length < 1){
                alert('No existen datos de ese cliente.');
                var template = '';
                        template += `
                        <span class="input-group-text" id="inputGroup-sizing-sm">Cliente:</span>
                        <input type="text" id="cedula-detV" class="form-control" placeholder="V- | G- | J-">
                        <input type="text" id="nombre-detV" class="form-control" disabled placeholder="Nombre...">
                        <button id="btnb-cliente" type="submit" class="btn btn-outline-success" style="width: 20%;">Buscar</button>
                            `

                        $('#busc-Cliente').html(template);
            }else{
                let template = '';
                clientes.forEach(cliente => {
                template += `
                  <span class="input-group-text" id="inputGroup-sizing-sm">Cliente: ${cliente.idcliente}</span>
                  <input type="text" id="cedula-detV" class="form-control" value="${cliente.cedula}">
                  <input type="text" id="nombre-detV" class="form-control" disabled value="${cliente.nombre}">
                  <button id="btnb-cliente" type="submit" class="btn btn-outline-success" style="width: 20%;">Buscar</button>
                    `
                });
                $('#busc-Cliente').html(template);
            }
            
        });
    }
  
    // Crear clientes
    $('#crearCliente').submit(e => {
      e.preventDefault();
      const postData = {
        cedula: $('#ident_cliente').val(),
        nombre: $('#nombre_cliente').val(),
        telefono: $('#tel_cliente').val(),
        direccion: $('#dir_cliente').val(),
      };
      $.post('db_php/Clientes/crearCliente.php', postData, (response) => {
        alert(response);
        $('#crearCliente').trigger('reset');
  
      });
      $('#crearCliente').hide();
      $('#btnc-Cliente').show();
      obtenerClientes();
    });
  
    // Obtener todos los clientes
    function obtenerClientes() {
      $.ajax({
        url: 'db_php/Clientes/consultaCliente.php',
        type: 'GET',
        success: function (response) {
          const clientes = JSON.parse(response);
          let template = '';
          clientes.forEach(cliente => {
            template += `
                  <tr>
                    <th scope="row">${cliente.idcliente}</th>
                    <td>${cliente.cedula}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.direccion}</td>
                  </tr>
                  `
          });
          $('#body-tCliente').html(template);
        }
      });
    };

  
  });