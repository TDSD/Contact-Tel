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
