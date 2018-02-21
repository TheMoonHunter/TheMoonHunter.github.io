var counter = 1;
var processed = false;

var today = new Date();
var weddingDay = new Date(today.getFullYear(), 7, 19);
if (today.getMonth()==7 && today.getDate()>19) {
  weddingDay.setFullYear(weddingDay.getFullYear() + 1); 
}  
var one_day= 1000 * 60 * 60 * 24;
if (document.getElementById("daysToGo")) {
  document.getElementById("daysToGo").innerHTML = Math.ceil((weddingDay.getTime()-today.getTime())/(one_day)) + " Days to go";
}

function loadInvite() {
  document.getElementById("loadInvite").style.display = "none";
  document.getElementById("loader").style.display = "flex";
  document.getElementById("fullname").disabled = true;
  myVar = setTimeout(loadGuestList, 700, document.getElementById("fullname").value);
}

function removeExtraElements() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("submit").style.display = "flex";
  document.getElementById("animate-bottom").style.display = "block";
}

function goBack() {
  document.getElementById("animate-bottom").style.display = "none";
  document.getElementById("fullname").disabled = false;
  document.getElementById("loader").style.display = "none";
  document.getElementById("loadInvite").style.display = "flex";
  document.getElementById("submit").style.display = "none";
}

function scaleImage(image) {
  var modal = document.getElementById('myModal');
  var modalImg = document.getElementById("image");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = image.src;
  captionText.innerHTML = image.alt;

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
      modal.style.display = "none";
  }
}

function createRadioButton(num) {
  var radioButton = document.createElement('input');
  radioButton.type = "radio";
  radioButton.checked = false;
  if (num == 1) {
    radioButton.value = "Yes";
  }
  if (num == 2) {
    radioButton.value = "No";
  }

  // Add the class attribute
  var radio_class = document.createAttribute("class");
  radio_class.value = "radio";
  radioButton.setAttributeNode(radio_class);

  // Add the id attribute
  var id = document.createAttribute("id");
  id.value = "radio_" + counter + "_" + num;
  radioButton.setAttributeNode(id);

  // Add the onchange attribute
  var onChange = document.createAttribute("onchange");
  onChange.value = "valueChanged(this)";
  radioButton.setAttributeNode(onChange);

  return radioButton;
}

function loadAcceptRegret() {
  var div = document.getElementById("animate-bottom");
  var text = document.createElement("label");
  text.textContent = "Accept             Regret";

  var text_class = document.createAttribute("class");
  text_class.value = "right-side";
  text.setAttributeNode(text_class);
  div.appendChild(text);
  div = addBreakLines(div);
}

function loadGuest(guest) {
  var div = document.getElementById("animate-bottom");
  var text = document.createElement("label");
  text.textContent = "Will " + guest + " be able to attend?";
  var radioButton1 = createRadioButton(1);
  var radioButton2 = createRadioButton(2);

  // populate div
  div.appendChild(text);
  div.appendChild(radioButton1);
  div.appendChild(radioButton2);
  div = addBreakLines(div);

  counter += 1;
}

function addBreakLines(div) {
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));
  return div;
}

function valueChanged(radio) {
  var id = radio.id;
  if (id[id.length -1] == "1") {
    var id2 = id.slice(0, -1) + "2";
  }
  else {
    var id2 = id.slice(0, -1) + "1";
  }
  if(document.getElementById(id).checked == true) {
    document.getElementById(id2).checked = false;
  }
}

function loadGuestList(name) {
  var url = "https://docs.google.com/spreadsheet/tq?key=1J8RJDTBbcRmXOZHzFHLaEFcUGjGaEFXSTabXV8HYqjY&single=true&gid=0&range=A2:C113&output=csv";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  	processResponse(name, xmlhttp.responseText);
  };
  if ("withCredentials" in xmlhttp) {
	xmlhttp.open("GET", url, true);
  }
  if (typeof XDomainRequest != "undefined") {
    xmlhttp = new XDomainRequest();
    xmlhttp.open(method, url);
  }
  xmlhttp.send();
}

function processResponse(name, response) {
  if (processed) {
    processed = false;
    return;
  }
  var myNode = document.getElementById("animate-bottom");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  if (name) {
    response = JSON.parse(removeHeader(response));
    var guests = validateName(response, name); //['John Smith', 'Jane Doe'];
    console.log(typeof guests);
    if (Array.isArray(guests)) {
      guests.unshift('you');
      loadAcceptRegret();
      for (x in guests) {
        loadGuest(guests[x]);
        removeExtraElements();
      }
    }
    if (guests == null) {
      alert("Guests are null!");
      goBack();
    }
    else {
      alert(guests);
      goBack();
    }
  }
  processed = true;
}

function validateName(data, searchName) {
	var response = "";
	var rows = data.table.rows;
	for (i = 0; i < rows.length; i++) {
		var name = rows[i].c[0].v;
    var guests = rows[i].c[1].v;
    var rsvp = rows[i].c[2].v;
		if (name.includes(searchName) && rsvp.includes("?")) {
      console.log(typeof guests);
			return guests.split(",");
		}
    if (name.includes(searchName) && (rsvp.includes("Y") || rsvp.includes("N"))) {
      return "You have already RSVP'd. If you need to change your RSVP, please contact us directly.";
    }
	}
	return null;
}

function removeHeader(response) {
	response = response.replace("google.visualization.Query.setResponse(", "");
	response = response.replace("\/\*O_o*\/", "");
	response = response.replace(");", "");
	return response;
}

function toggleDisplay(id) {
    var x = document.getElementById(id);
    if (!x.style.display || x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}
