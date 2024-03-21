<?php

    include('../db.php');

    if(isset($_POST['idvend'])) {
        $idvend = $_POST['idvend'];
        $query = "SELECT a.idcliente,a.idvendedor, d.cantidad cantActual,a.monto_total, c.nombre, d.descripcion, b.* FROM ventas_cab a
                    INNER JOIN ventas_det b 
                    ON a.idventa_cab = b.idventa_cab
                    INNER JOIN clientes c
                    ON a.idcliente = c.idcliente
                    INNER JOIN productos d
                    ON b.idproducto = d.idproducto
                    WHERE a.idvendedor=${idvend} AND estado=1";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
        }
        $json = array();
        while($filas = mysqli_fetch_array($result)) {
            $json[] = array(
                'idventa_cab' => $filas['idventa_cab'],
                'idventa_det' => $filas['idventa_det'],
                'idcliente' => $filas['idcliente'],
                'monto_total' => $filas['monto_total'],
                'idvendedor' => $filas['idvendedor'],
                'nombre' => $filas['nombre'],
                'descripcion' => $filas['descripcion'],
                'precio_base' => $filas['precio_base'],
                'impuesto' => $filas['impuesto'],
                'idproducto' => $filas['idproducto'],
                'fecha_ventadet' => $filas['fecha_ventadet'],
                'cantActual' => $filas['cantActual'],
                'cantidad' => $filas['cantidad']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
      
    }
      

?>