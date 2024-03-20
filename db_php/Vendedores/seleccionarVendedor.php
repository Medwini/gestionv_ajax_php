<?php

    include('../db.php');

    if(isset($_POST['idvendedor'])) {
        $idvendedor = $_POST['idvendedor'];
        $query = "SELECT idvendedor,nombre FROM vendedores WHERE idvendedor= ${idvendedor}";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
        }
        $json = array();
        while($filas = mysqli_fetch_array($result)) {
            $json[] = array(
                'idvendedor' => $filas['idvendedor'],
                'nombre' => $filas['nombre'],
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
      
    }
      

?>