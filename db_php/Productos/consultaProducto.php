<?php

    include('../db.php');

    $query = "SELECT * from productos";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Ocurrió un error al procesar.'. mysqli_error($connection));
    }

    $json = array();
    while($filas = mysqli_fetch_array($result)) {
        $json[] = array(
            'idproducto' => $filas['idproducto'],
            'codbarra' => $filas['codbarra'],
            'descripcion' => $filas['descripcion'],
            'costo_base' => $filas['costo_base'],
            'rentabilidad' => $filas['rentabilidad'],
            'precio_base' => $filas['precio_base'],
            'cantidad' => $filas['cantidad'],
            'descuento' => $filas['descuento']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>