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
   

});