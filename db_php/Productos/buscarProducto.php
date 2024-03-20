<?php

    include('../db.php');

    if(isset($_POST['descripcion'])) {
        $descripcion = $_POST['descripcion'];
        $query = "SELECT * FROM productos WHERE descripcion LIKE '%${descripcion}%'";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
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
    }else{
        echo 'Sin resultados';
    }
      

?>