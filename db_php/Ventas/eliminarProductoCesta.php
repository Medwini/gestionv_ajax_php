<?php

    include('../db.php');

    if(isset($_POST['idprod'])) {
        $idprod = $_POST['idprod'];
        $idventa_det = $_POST['idventa_det'];
        $query = "DELETE FROM ventas_det WHERE idproducto='$idprod' AND idventa_det = '$idventa_det'";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
        }
        echo "Producto eliminado de la cesta.";
    }else{
        echo "Error al procesar, no se obtuvo el número del producto solicitado.";
    }
?>