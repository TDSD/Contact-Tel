<?php
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");    
        $con=mysqli_connect("localhost","root","","CONTACTEL");  
        $listContact = [];
        $requette = "select prenom,nom,email,telephone,adresse from contacts";
        if ($reponse = mysqli_query($con,$requette)) {
            $i=0;
            while ($row = mysqli_fetch_assoc($reponse)) {
                $listContact[$i]['prenom'] = $row['prenom'];
                $listContact[$i]['nom'] = $row['nom'];
                $listContact[$i]['email'] = $row['email'];
                $listContact[$i]['telephone'] = $row['telephone'];
                $listContact[$i]['adresse'] = $row['adresse'];
                $i++;
            }
            echo json_encode($listContact);
            
        } else {
            echo http_response_code(404);
        }
?>