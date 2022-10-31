<?php
    $CN=mysqli_connect("localhost","root","Tenemosun3312");
    $DB=mysqli_select_db($CN,"asistencia_practicantes");

    $NoEmpleado=$_POST['idPracticante'];
    $Nombre = $_POST['nombre'];
    $Nombre_mentor = $_POST['nombre_mentor'];
    $Correo = $_POST['correo'];
    $Contrasena = $_POST['contrasena'];

    $IQ = "insert into practicantes(idPracticantes,nombre,nombre_mentor,correo,contrasena) values ($NoEmpleado,'$Nombre','$Nombre_mentor','$Correo','$Contrasena')";

    $R=mysqli_query($CN,$IQ);

    if($R)
    {
        $Message="El query ha funcionado";
    }else{
        $Message="El query fallo, checar conexion";
    }
    $Response[]=array("message"=>$Message);
    echo json_encode($Response);
?>