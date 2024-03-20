<?php

    include('../db.php');

    $query = "SELECT * from clientes";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Ocurrió un error al procesar.'. mysqli_error($connection));
    }

    $json = array();
    while($filas = mysqli_fetch_array($result)) {
        $json[] = array(
            'idcliente' => $filas['idcliente'],
            'cedula' => $filas['cedula'],
            'nombre' => $filas['nombre'],
            'telefono' => $filas['telefono'],
            'direccion' => $filas['direccion']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>