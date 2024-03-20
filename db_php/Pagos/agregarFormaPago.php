<?php

    include('../db.php');

    if(isset($_POST['idforma_pago'])) {
        $idforma_pago = $_POST['idforma_pago'];
        $query = "SELECT * FROM forma_pago WHERE idforma_pago= ${idforma_pago}";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
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
      
    }
      

?>