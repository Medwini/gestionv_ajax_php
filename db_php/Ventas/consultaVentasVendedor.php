<?php

    include('../db.php');

    if(isset($_POST['idvend'])) {
        $idvendedor = $_POST['idvend'];
        $query = "SELECT * FROM ventas_cab WHERE idvendedor= ${idvendedor} AND estado=1";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
        }
        $json = array();
        while($filas = mysqli_fetch_array($result)) {
            $json[] = array(
                'idventa_cab' => $filas['idventa_cab'],
                'idcliente' => $filas['idcliente'],
                'monto_total' => $filas['monto_total'],
                'idvendedor' => $filas['idvendedor'],
                'fecha_venta' => $filas['fecha_venta'],
                'estado' => $filas['estado']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
      
    }
      

?>