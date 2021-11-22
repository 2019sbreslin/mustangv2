var contactURLArray = [];
var contactArray = [];
var name = [];
var loadingContact = 0;
var currentContactIndex = 0; 

function initApplication() {
    console.log('Mustang V2 Starting!...'); 
}

function viewCurrentContact(){
    currentContact = contactArray[currentContactIndex];
    console.log("Current Contact: ");
    console.log(contactArray[currentContactIndex]);
    document.getElementById("nameID").value = currentContact.name;   
    document.getElementById("emailID").value = currentContact.email;   
    document.getElementById("cityID").value = currentContact.city;   
    document.getElementById("stateID").value = currentContact.state;
    document.getElementById("zipID").value = currentContact.zip;  
    document.getElementById("statusID").innerHTML = "Status: Viewing contact " + (currentContactIndex+1) + " of " + contactArray.length; //extra fields

}
function logContacts() {
    console.log(contactArray);
    document.getElementById("logID").innerHTML = "contacts logged to console";
}
//shows user the previous contact they were just on
function previous() {
    if (currentContactIndex > 0) {
        currentContactIndex--;
    }
    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();

}
//allows user to go through all contacts
function next() {
    if (currentContactIndex < (contactArray.length-1)) {
        currentContactIndex++;
    }
    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();
}
//puts in a new contact
function newInput() {
    console.log('new()');
    console.log("New contact");
    document.getElementById("nameID").value = "";   
    document.getElementById("emailID").value = "";   
    document.getElementById("cityID").value = "";   
    document.getElementById("stateID").value = "";
    document.getElementById("zipID").value = ""; 
    document.getElementById("statusID").value = "";

}

function add() {
    console.log('add()');
    document.getElementById("add").innerHTML = "";
    var addContact = {
        name : document.getElementById("nameID").value,
        email : document.getElementById("emailID").value,
        city : document.getElementById("cityID").value,
        state : document.getElementById("stateID").value, 
        zip : document.getElementById("zipID").value,
    }
    name.push(addContact.name)
    contactArray.push(addContact);
    currentContactIndex = currentContactIndex + 1;
    viewCurrentContact();
    document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray,null,2);
}
//removes contact from the arraylist
function remove() {
    if(contactArray.length>1) {
        console.log("Deleting contact...");
        contactArray.splice(currentContactIndex,1);
        if(currentContactIndex>=1) {
            currentContactIndex = currentContactIndex -1;
        }
        viewCurrentContact();
        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray,null,2);
    }else {
        document.getElementById("add").innerHTML = "ONE CONTACT REQUIRED"
        console.log("ONE CONTACT REQUIRED")
    }
}//used example code to easily fill in the state/city

function getPlace() {
    var zip = document.getElementById("zipID").value
    console.log("zip code:"+zip);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log("result:"+result);
            var place = result.split(',');
            if ((document.getElementById("cityID").value == "") || (document.getElementById("cityID").value == ""))
                document.getElementById("cityID").value = location[0];
            if (document.getElementById("stateID").value == "")
                document.getElementById("stateID").value = location[1];
        }
    }
    xhr.open("GET", "getCityState.php?zip=" + zip);
    xhr.send(null);
}
function autocomplete(inp, arr) {
    /*took the next 2 funcitond from W3 schools, the first one takes in two values*/
    var currentFocus;
    /*for user input*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists(); //where all current lists will be closed
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*div element created */
            b = document.createElement("div");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*W3 schools had very well written examples on how to do this part of assignment*/
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*My scrum team worked really well together for this part of the assignment and had great communication skills*/
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { 
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            /*"active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) { //defines what "active" means
      if (!x) return false;
      removeActive(x); //removes active
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists unless passed as an argument*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]); //vince taught me about parent and child
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
function seached(){
    var inputSearch = document.getElementById("myInput").value;
    for(var i = 0; i<contactArray.length;i++){
        if(contactArray[i].firstName == inputSearch){
            document.getElementById("nameID").value = contactArray[i].firstName
            document.getElementById("emailID").value = contactArray[i].email;   
            document.getElementById("cityID").value = contactArray[i].city;   
            document.getElementById("stateID").value = contactArray[i].state;
            document.getElementById("zipID").value = contactArray[i].zip;  
        }
    }
}
//similar to sprint 5, I used my previous web app to load in the files 

async function loadIndex() {
    //loading in the contact index
    const response = await fetch("https://mustangversion1.azurewebsites.net/index.json")
    const contactIndex = await response.text()


    console.log("Index:  " + contactIndex);

    document.getElementById("indexID").innerHTML = contactIndex

    const response2 = await fetch("https://mustang-index.azurewebsites.net/index.json")
    const contactIndexJ = await response2.json()
    
    for (i=0; i<contactIndexJ.length; i++) {
        contactURLArray.push(contactIndexJ[i].ContactURL);
    } console.log("contactURL: " + JSON.stringify(contactURLArray));
}
function loadContacts() {
    contactArray.length = 0;
    loadingContact = 0;
    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}  
async function loadNextContact(URL) {
    console.log("URL:" + URL);
    const response = await fetch(URL);
    const contactRequest = await response.text();

    var contact;
    contact = JSON.parse(contactRequest);
    var i = (contact.firstName);
    first.push(i);
    autocomplete(document.getElementById("myInput"), first);
    contactArray.push(contact);

    document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray,null,2);
    document.getElementById("statusID").innerHTML = "Status: Loading " + contact.firstName + " " + contact.lastName;

    loadingContact++;

    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
    else {
        document.getElementById("statusID").innerHTML = "Status: Contacts Loaded (" + contactURLArray.length + ")";
        viewCurrentContact()
    }
}
