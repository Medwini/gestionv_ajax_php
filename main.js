$(function() {
   console.log('Qué maravilla'); 
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

   $('#btn-buscarProducto').on('click', function () {
     $('#cont-busqProductosM').show();
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
 


   

});