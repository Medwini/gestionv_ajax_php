<?php

    include('../db.php');

    if(isset($_POST['idvend'])) {
        $idvend = $_POST['idvend'];
        $query = "CALL crear_ventacab('$idvend',@mensaje);";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
        }
        echo "Venta de vendedor creado exitosamente";
    }else{
        echo "Error al procesar, no se obtuvo el número del vendedor solicitado.";
    }
?>