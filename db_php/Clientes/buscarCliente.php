<?php

    include('../db.php');

    if(isset($_POST['busquedaCed'])) {
        $busquedaCed = $_POST['busquedaCed'];
        $query1 = "SELECT * FROM clientes WHERE cedula LIKE '%${busquedaCed}%'";
        $result1 = mysqli_query($connection, $query1);
      
        if (!$result1) {
            die('Ocurrió un error al buscar por cedula.'. mysqli_connect_error());
        }else{
            $json1 = array();
            while($filas1 = mysqli_fetch_array($result1)) {
                $json1[] = array(
                    'idcliente' => $filas1['idcliente'],
                    'cedula' => $filas1['cedula'],
                    'nombre' => $filas1['nombre'],
                );
            }
            $jsonstring1 = json_encode($json1);
            echo $jsonstring1;
        }
    }

?>