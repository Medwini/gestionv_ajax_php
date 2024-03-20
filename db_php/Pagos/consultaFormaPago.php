<?php

    include('../db.php');

    $query = "SELECT * from forma_pago";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Ocurrió un error al procesar.'. mysqli_error($connection));
    }

    $json = array();
    while($filas = mysqli_fetch_array($result)) {
        $json[] = array(
            'idforma_pago' => $filas['idforma_pago'],
            'descripcion' => $filas['descripcion'],
            'tasa' => $filas['tasa']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>