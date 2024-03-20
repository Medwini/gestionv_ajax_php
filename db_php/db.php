<?php

    $connection = mysqli_connect(
        "localhost",
        "root",
        "",
        "gestion_ventas"
    );

    if (!$connection) {
        die("Conexión fallida: ". mysqli_connect_error());
    }

?>