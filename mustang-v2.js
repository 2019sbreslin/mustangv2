var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;
var currentContactIndex = 0; 

function viewCurrentContact() {
    currentContact = contactArray[currentContactIndex];
    console.log(currentContact);
    document.getElementById("nameID").value = currentContact.preferredName;   
    document.getElementById("emailID").value = currentContact.email;   
    document.getElementById("cityID").value = currentContact.city;   
    document.getElementById("stateID").value = currentContact.state;
    document.getElementById("zipID").value = currentContact.zip;  

    document.getElementById("statusID").innerHTML = "Status: Viewing contact " + (currentContactIndex+1) + " of " + contactArray.length;
}

function previous() {
    if (currentContactIndex > 0) {
        currentContactIndex--;
    }
    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();

}

function next() {
    if (currentContactIndex < (contactArray.length-1)) {
        currentContactIndex++;
    }
    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();

}

function addContact() {
    console.log("Adding contact");
    document.getElementById("...").innerHTML = "";
    var addContact = {
        name : document.getElementById("nameID").value,
        email : document.getElementById("emailID").value,
        city : document.getElementById("cityID").value,
        state : document.getElementById("stateID").value, 
        zip : document.getElementById("zipID").value,
    }
    first.push(addContact.name)
    contactArray.push(addContact);
    currentContactIndex = currentContactIndex + 1;
    viewCurrentContact();
    document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray,null,2);
}
function deleteContact() {
    if(contactArray.length>1) {
        console.log("Deleting contact...");
        contactArray.splice(currentContactIndex,1);
        if(currentContactIndex>=1) {
            currentContactIndex = currentContactIndex -1;
        }
        viewCurrentContact();
        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray,null,2);
    }else {
        document.getElementById("...").innerHTML = "ONE CONTACT REQUIRED"
        console.log("ONE CONTACT REQUIRED")
    }
}
function getLocation() {
    var zip = document.getElementById("zipID").value
    console.log("zip code:"+zip);
    var XMLHttpRequest = new XMLHttpRequest();

    XMLHttpRequest.onreadystatechange = function() {
        if (XMLHttpRequest.readyState == 4 && XMLHttpRequest.status == 200) {
            var answer = XMLHttpRequest.responseText;
            var location = answer.split(',');
            if ((document.getElementById("cityID").value == "") || (document.getElementById("cityID").value == ""))
                document.getElementById("cityID").value = location[0];
            if (document.getElementById("stateID").value == "")
                document.getElementById("stateID").value = location[1];
        }
    }
    XMLHttpRequest.open("GET", "getCityState.php?zip=" + zip);
    XMLHttpRequest.send(null);
}

async function index() {
    const response = await fetch("https://mustang2v1.azurewebsites.net/index.json");
    const contactIndex = await response.text();
    console.log("JSON:" + contactIndex);
    const response2 = await fetch("https://mustang2v1.azurewebsites.net/index.json");
    const contactIndexJSON = await response2.json();
    for (i=0; i<contactIndexJ.length; i++) {
        contactURLArray.push(contactIndexJ[i].ContactURL);
    }
    cont();
}
function initApplication() {
    console.log('Mustang v2 Starting!'); 
    index();
}
function loadIndex() {
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    indexRequest.onload = function() {
        console.log("Index JSON:" + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        contactURLArray.length = 0;
        for (i=0; i<contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
    }
    indexRequest.send();
}


function contactsA() {
    contactArray.length = 0;
    loadingContact = 0;
    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}
function contactLog() {
    console.log(contactArray);

}
async function nextContact(URL){
    console.log("URL: " + URL);
    const response = await fetch(URL);
    const contactRequest = await response.text();
    console.log(contactRequest);
    var contact;
    contact = JSON.parse(contactRequest.responseText);
    var i = (contact.name);
    first.push(i);
    autocomplete(document.getElementById("myInput"), first);

    contactArray.push(contact);
    document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray,null,2);
    document.getElementById("statusID").innerHTML = "Status: " + contact,firstName + "" + contact.lastName;

    loadingContact++;
    if (contactURLArray.length > loadContact) {
        nextContact(contactURLArray[loadingContact]);
    }
    else {
        document.getElementById("statusID").innerHTML = "Contacts are being loaded... " + contactURLArray.length;
        viewCurrentContact()
    }




