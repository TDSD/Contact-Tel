<?php
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");    
        $con=mysqli_connect("localhost","root","","CONTACTEL"); 
        $datas = file_get_contents("php://input"); 
        
            $request = json_decode($datas);
            $telephone = mysqli_real_escape_string($con, $request->telephone);
            $requette = "delete from contacts where telephone = '$telephone'";
            $reponse = mysqli_query($con,$requette);
?>