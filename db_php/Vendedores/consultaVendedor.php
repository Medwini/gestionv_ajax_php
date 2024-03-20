<?php

    include('../db.php');

    $query = "SELECT * from vendedores";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Ocurrió un error al procesar.'. mysqli_error($connection));
    }

    $json = array();
    while($filas = mysqli_fetch_array($result)) {
        $json[] = array(
            'idvendedor' => $filas['idvendedor'],
            'cedula' => $filas['cedula'],
            'nombre' => $filas['nombre'],
            'telefono' => $filas['telefono'],
            'direccion' => $filas['direccion']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>