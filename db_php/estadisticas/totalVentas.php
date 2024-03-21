<?php

    include('../db.php');
    $idvend = $_POST['idvend'];
    $query = "SELECT COUNT(idventa_cab) procesadas FROM ventas_cab where estado=3 AND idvendedor='$idvend';";
    $result = mysqli_query($connection, $query);
  
    if (!$result) {
      die('Ocurrió un error al procesar.'. mysqli_connect_error());
    }
    $json = array();
    while($filas = mysqli_fetch_array($result)) {
        $json[] = array(
            'procesadas' => $filas['procesadas']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

?>