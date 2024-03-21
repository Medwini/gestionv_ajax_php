<?php

    include('../db.php');

    if(isset($_POST['idProdDet'])) {
        $idProdDet = $_POST['idProdDet'];
        $CantProdDet = $_POST['CantProdDet'];
        $idventa_det = $_POST['idventa_det'];
        $query = "CALL actualizar_cantVenta('$idProdDet', '$CantProdDet', '$idventa_det', @mensaje);
        SELECT @mensaje AS mensaje;";
        $result = mysqli_multi_query($connection, $query);
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_error($connection));
        }

        mysqli_next_result($connection); // Move to the next result set
        $result = mysqli_store_result($connection);
        $row = mysqli_fetch_assoc($result);

        $json = array('mensaje' => $row['mensaje']);
        $jsonstring = json_encode($json);
        echo $jsonstring;
      
    }
?>