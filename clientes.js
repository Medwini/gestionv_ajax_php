$(function () {
    // obtenerClientes();

    var editar =false;
  
    // Crear formas de pago
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
  
    // Obtener todos los clientes
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
                clientes.every(cliente => {
                    let select= confirm(`Identificación: ${cliente.cedula} \nCliente: ${cliente.nombre}`);
                    if(select){
                        var template = '';
                        template += `
                            <span class="input-group-text" id="inputGroup-sizing-sm">Cliente: ${cliente.idcliente}</span>
                            <input type="text" id="cedula-detV" class="form-control" value="${cliente.cedula}">
                            <input type="text" id="nombre-detV" class="form-control" disabled value="${cliente.nombre}">
                            <button id="btnb-cliente" type="submit" class="btn btn-outline-success" style="width: 20%;">Buscar</button>
                            <button type="button" id="btn-Cliente" class="btn btn-outline-success" style="width: 20%;">Nuevo</button>
                            `

                        $('#busc-Cliente').html(template);
                        return false;
                    }else if (!select){
                        return true;
                    }
                });

            }else if (clientes.length < 1){
                alert('No existen datos de ese cliente.');
            }else{
                let template = '';
                clientes.forEach(cliente => {
                template += `
                    <span class="input-group-text" id="inputGroup-sizing-sm">Cliente: ${cliente.idcliente}</span>
                    <p id="cedula-detV" class="form-control">${cliente.cedula}</p>
                    <p id="nombre-detV" class="form-control">${cliente.nombre}</p>
                    <button type="button" id="btn-Cliente" class="btn btn-outline-success" style="width: 20%;">Nuevo</button>
                    `
                });
                $('#busc-Cliente').html(template);
            }
            
        });
    }

  
  });