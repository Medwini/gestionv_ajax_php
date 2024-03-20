<?php

    include('../db.php');

    if(isset($_POST['descripcion'])) {
        $fp_descripcion = $_POST['descripcion'];
        $fp_tasa = $_POST['tasa'];
        $query = "INSERT into forma_pago(descripcion, tasa) VALUES ('$fp_descripcion', '$fp_tasa')";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
        }
        echo "Forma de pago creada exitosamente";  
      
    }else{
      echo "Error al intentar procesar, existe algún dato erróneo.";
    }
      

?>