<?php

    include('../db.php');
    $idvend = $_POST['idvend'];
    $query = "SELECT COUNT(idventa_cab) totales FROM ventas_cab WHERE idvendedor='$idvend';";
    $result = mysqli_query($connection, $query);
  
    if (!$result) {
      die('Ocurrió un error al procesar.'. mysqli_connect_error());
    }
    $json = array();
    while($filas = mysqli_fetch_array($result)) {
        $json[] = array(
            'totales' => $filas['totales']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

?>