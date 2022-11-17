<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");    
    $con=mysqli_connect("localhost","root","","CONTACTEL");  
    $datas = file_get_contents("php://input");
    if(isset($datas) && !empty($datas)){
        //extraction des données
        $request = json_decode($datas);
        $nom = mysqli_real_escape_string($con, $request->nom);
        $prenom = mysqli_real_escape_string($con, $request->prenom);
        $telephone = mysqli_real_escape_string($con, $request->telephone);
        $email = mysqli_real_escape_string($con, $request->email);
        $adresse = mysqli_real_escape_string($con, $request->adresse);
       
        //enregistrement des données
        $requette = "insert into contacts (nom,prenom,telephone,adresse,email) values ('$nom','$prenom','$telephone','$adresse','$email')";
        if(mysqli_query($con,$requette)){

            http_response_code(201);
            $SaveContact = [
                'nom'=>$nom,
                'prenom'=>$prenom,
                'telephone'=>$telephone,
                'adresse'=>$adresse,
                'email'=>$email
            ];
            echo json_encode($SaveContact);
        }else{
            http_response_code(422);
        }
    }
?>