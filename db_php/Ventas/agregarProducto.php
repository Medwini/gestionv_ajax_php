<?php

    include('../db.php');

    if(isset($_POST['idproducto'])) {
        $idproducto = $_POST['idproducto'];
        $idvend = $_POST['idvend'];
        $query = "CALL agregar_productoDet('$idproducto', '$idvend', 0,@mensaje);
        SELECT @mensaje AS mensaje;";
        $result = mysqli_multi_query($connection, $query);
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_error($connection));
        }

        mysqli_next_result($connection); 
        $result = mysqli_store_result($connection);
        $row = mysqli_fetch_assoc($result);

        $json = array('mensaje' => $row['mensaje']);
        $jsonstring = json_encode($json);
        echo $jsonstring;
      
    }
?>