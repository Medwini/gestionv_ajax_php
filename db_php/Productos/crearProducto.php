<?php

    include('../db.php');

    if(isset($_POST['descripcion'])) {
        $codbarra = $_POST['codbarra'];
        $descripcion = $_POST['descripcion'];
        $costo_base = $_POST['costo_base'];
        $rentabilidad = $_POST['rentabilidad'];
        $precio_base = $_POST['precio_base'];
        $cantidad = $_POST['cantidad'];
        $descuento = $_POST['descuento'];
        $query = "INSERT into productos(codbarra, descripcion, costo_base,rentabilidad,precio_base,cantidad,descuento) VALUES ('$codbarra', '$descripcion', '$costo_base','$rentabilidad','$precio_base','$cantidad','$descuento')";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
        }
        echo "Producto creado exitosamente";  
      
    }else{
        echo "Error al intentar procesar, existe algún dato erróneo.";
    }
      

?>