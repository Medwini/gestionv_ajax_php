<?php

    include('../db.php');

    $query = "SELECT b.descripcion, SUM(a.cantidad) as cantidad,  c.idvendedor 
    FROM ventas_det a
    INNER JOIN productos b
    ON a.idproducto = b.idproducto
    INNER JOIN ventas_cab c
    ON c.idventa_cab = a.idventa_cab
    GROUP BY a.idproducto, c.idvendedor
    ORDER BY SUM(a.cantidad) DESC LIMIT 3;";
    $result = mysqli_query($connection, $query);
  
    if (!$result) {
      die('Ocurrió un error al procesar.'. mysqli_connect_error());
    }
    $json = array();
    while($filas = mysqli_fetch_array($result)) {
        $json[] = array(
            'descripcion' => $filas['descripcion'],
            'cantidad' => $filas['cantidad'],
            'idvendedor' => $filas['idvendedor']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

?>