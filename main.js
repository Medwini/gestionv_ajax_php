$(function() {
   valoresDefault();

   function valoresDefault() {
      $('#btnc-FP').show();
      $('#crearFormaPago').hide();
      $('#cont-formaPagoM').hide();
      $('#crudFP').hide();
      $('#crudVend').hide();
      $('#crudProd').hide();
      $('#crearVendedor').hide();
      $('#crearProducto').hide();
      $('#cont-config').hide();
      $('#cont-clientesM').hide();
      $('#crearCliente').hide();
      $('#cont-busqProductosM').hide();
      $('#cont-selVendedorM').hide();
      $('#cont-estadisticasM').hide();
   }


   // Mostrar modal de pagos
   $(document).on('click', '.btn-nuevo', (e) =>{
      $('#crearFormaPago').show();
      $('#btnc-FP').hide();
   });

   $(document).on('click', '.btn-cancel', (e) =>{
      $('#crearFormaPago').hide();
      $('#btnc-FP').show();

      $('#crearFormaPago').trigger('reset');
   });


   $('#btn-formaPago').on('click', function () {
      $('#cont-formaPagoM').show();
   });

   $(document).on('click', '.close-modal', (e) =>{
      valoresDefault();
   });

   // Mostrar modal de configuraciones

   $('#btn-config').on('click', function () {
      $('#cont-config').show();
   });

   // Mostrar crud de configuraciones

   $('#act-crudFP').on('click', function () {
      $('#crudFP').show();
      $('#crudVend').hide();
      $('#crudProd').hide();
   });

   $('#act-crudVend').on('click', function () {
      $('#crudVend').show();
      $('#crudFP').hide();
      $('#crudProd').hide();
   });

   

   $('#btnc-Vend').on('click', function(){
      $('#crearVendedor').show();
      $('#btnc-Vend').hide();
   });

   $(document).on('click', '.btn-cancel',(e) =>{
      $('#crearVendedor').hide();
      $('#btnc-Vend').show();

      $('#crearVendedor').trigger('reset');
   });

   $('#act-crudProd').on('click', function () {
      $('#crudProd').show();
      $('#crudFP').hide();
      $('#crudVend').hide();
   });

   $('#btnc-Prod').on('click', function(){
      $('#crearProducto').show();
      $('#btnc-Prod').hide();
   });

   $(document).on('click', '.btn-cancel',(e) =>{
      $('#crearProducto').hide();
      $('#btnc-Prod').show();

      $('#crearProducto').trigger('reset');
   });
   

   // Mostrar modal de Clientes

   $('#btn-cliente').on('click', function () {
      $('#cont-clientesM').show();
   });

   $('#btnc-Cliente').on('click', function(){
      $('#crearCliente').show();
      $('#btnc-Cliente').hide();
   });

   $(document).on('click', '.btn-cancel',(e) =>{
      $('#crearCliente').hide();
      $('#btnc-Cliente').show();

      $('#crearCliente').trigger('reset');
   });

      // Mostrar modal de buscar productos

   // $('#btn-buscarProducto').on('click', function () {
   //   $('#cont-busqProductosM').show();
   // });

   $('#btn-buscarProducto').on('click', (e) => {
      $('#cont-busqProductosM').show();
      e.preventDefault();
    });

   
   $(document).on('click', '.btn-cancel',(e) =>{
      $('#crearCliente').hide();
      $('#btnc-Cliente').show();
      $('#crearCliente').trigger('reset');
   });

   

   $('#btn-navVend').on('click', function () {
      $('#cont-selVendedorM').show();
    });
    
    $(document).on('click', '.btn-cancel',(e) =>{
       $('#crearCliente').hide();
       $('#btnc-Cliente').show();
       $('#crearCliente').trigger('reset');
    });
 
    
    $('#btn-navEst').on('click', function () {
      $('#cont-estadisticasM').show();
      var idvend = document.getElementById('btn-navVend').getAttribute('vendId');
      $.post('db_php/estadisticas/estadisticas.php', (response) => {
         const valores = JSON.parse(response);
         var template= '';
         valores.forEach(e => {
            template += `
               <button class="btn btn-success" disabled type="button">'${e.descripcion}'</button>
            `;
         });
            
         document.getElementById('masvend').innerHTML += template;
         console.log(response);
         
      });
      $.post('db_php/estadisticas/numVentas.php', {idvend},(response) => {
         const valores = JSON.parse(response);
         
         valores.forEach(valor => {
            console.log(valor.totales);
            document.getElementById('txtVentasNum').value = valor.totales;
         });
      });
      $.post('db_php/estadisticas/totalVentas.php', {idvend},(response) => {
         const valores = JSON.parse(response);
         console.log(valores);
         valores.forEach(valor => {
            console.log(valor.totales);
            document.getElementById('txtMasVend').value = valor.procesadas;
         });
      });
    });
    
    $(document).on('click', '.btn-cancel',(e) =>{
       $('#crearCliente').hide();
       $('#btnc-Cliente').show();
       $('#crearCliente').trigger('reset');
    });
   

});