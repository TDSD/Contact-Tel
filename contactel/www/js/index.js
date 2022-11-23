window.onload = function(){
    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
        let contacts = JSON.parse(xhr.responseText);
        let nom = "";
        let prenom = "";
        let telephone ="";
        let adresse ="";
        let email = "";
        

        for (let contact of contacts){        
            contactList.innerHTML += `
            <li>
                <a href="#detail" onclick="showContact()">
                    <img src="./img/avatar-n.png" alt="avatar-contact">
                    <h2>${contact.prenom} ${contact.nom} </h2>
                    <p>${contact.telephone}</p>
                </a>
            </li>
        `;
        $(contactList).listview('refresh');
        }
    }

    xhr.open("GET", "http://localhost:80/getContact.php");
    xhr.send();
}


function checkPage() {
    var _hash = location.hash;

    if (_hash != '' && _hash != "#listPage") {
        var _url = location.href.replace(_hash, "");
        window.location.href = _url;
    }
}

function addContact(){
    let xhr = new XMLHttpRequest();
    var nom = $('#nom').val();
    var prenom = $('#prenom').val();
    var telephone = $('#telephone').val();
    var email= $('#email').val();
    var adresse = $('#adresse').val();

    const json = {
        'nom': nom,
        'prenom': prenom,
        'telephone': telephone,
        'email': email,
        'adresse': adresse
    }
    xhr.open("POST", "http://localhost:80/saveContact.php");
    xhr.send(JSON.stringify(json));
    checkPage();  
}

function showContact(telephone){
    const identifiant = {
        'telephone': telephone
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(telephone);
        let contact="test";
        contact = JSON.parse(xhr.responseText);
         console.log(contact); 
                taskList.innerHTML = '';  
                taskList.innerHTML += `
                <li><img src="./img/avatar-n.png" style="width: 70px; height: 70px;" alt="avatar-contact"></li>
                <li><span style="font-weight: bold;">Prénom :</span> ${contact.prenom}</li>
                <li><span style="font-weight: bold;">Nom :</span> ${contact.nom}</li>
                <li><span style="font-weight: bold;">Téléphone:</span> ${contact.telephone}</li>
                <li><span style="font-weight: bold;">Email :</span> ${contact.email}</li>
                <li><span style="font-weight: bold;">Adresse :</span> ${contact.adresse}</li> </br>
                <a href="#updatePage"><input type="button" value="Modifier" onclick="updateBtnContact(${telephone})"></a>
                <input type="button" value="Supprimer" onclick="deleteContact(${telephone})" style="margin-left: 20px;"> 
            `;
            $(taskList).listview('refresh');
            
    }
    xhr.open("POST", "http://localhost:80/showContact.php");
    xhr.send(JSON.stringify(identifiant));
}

function deleteContact(telephone){
    const identifiant = {
        'telephone': telephone
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(telephone);
        contact = JSON.parse(xhr.responseText);    
    }
    xhr.open("POST", "http://localhost:80/deleteContact.php");
    xhr.send(JSON.stringify(identifiant));
    checkPage(); 
}

function updateBtnContact(telephone){
    const identifiant = {
        'telephone': telephone
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(telephone);
        contact = JSON.parse(xhr.responseText);
        formUpdate.innerHTML = '';  
        formUpdate.innerHTML += `
            <input type="text" id="prenom" placeholder="Prénom" value=" ${contact.prenom}"></br></br>
            <input type="text" id="nom" placeholder="Nom" value="${contact.nom}"></br></br>
            <input type="tel" id="telephone" placeholder="Téléphone" value="${contact.telephone}"></br></br>
            <input type="email" id="email" placeholder="Email" value="${contact.email}"></br></br>
            <input type="text" id="adresse" placeholder="Adresse" value="${contact.adresse}"></br></br>
            <input type="button" value="Modifier" data-icon="action" data-iconpos="right" onclick="updateContact()">
            `;    
    }
    xhr.open("POST", "http://localhost:80/showContact.php");
    xhr.send(JSON.stringify(identifiant));
}

function updateContact(telephone){
    const identifiant = {
        'telephone': telephone
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(telephone);
        contact = JSON.parse(xhr.responseText);
        formUpdate.innerHTML = '';  
        formUpdate.innerHTML += `
            <input type="text" id="prenom" placeholder="Prénom" value=" ${contact.prenom}">
            <input type="text" id="nom" placeholder="Nom" value="${contact.nom}">
            <input type="tel" id="telephone" placeholder="Téléphone" value="${contact.telephone}">
            <input type="email" id="email" placeholder="Email" value="${contact.email}">
            <input type="text" id="adresse" placeholder="Adresse" value="${contact.adresse}">
            <input type="button" value="Modifier" data-icon="action" data-iconpos="right" onclick="updateContact()">
            `;    
    }
    xhr.open("POST", "http://localhost:80/showContact.php");
    xhr.send(JSON.stringify(identifiant));
}
