<?php

    include('../db.php');

    if(isset($_POST['cedula'])) {
        $cedula = $_POST['cedula'];
        $nombre = $_POST['nombre'];
        $telefono = $_POST['telefono'];
        $direccion = $_POST['direccion'];
        $query = "INSERT into clientes(cedula, nombre, telefono, direccion) VALUES ('$cedula', '$nombre','$telefono','$direccion')";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Ocurrió un error al procesar.'. mysqli_connect_error());
        }
        echo "Cliente creado exitosamente";  
      
    }else{
      echo "Error al intentar procesar, existe algún dato erróneo.";
    }
      

?>