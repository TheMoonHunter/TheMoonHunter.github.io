var counter = 0;
var today = new Date();
var weddingDay = new Date(today.getFullYear(), 7, 19);
if (today.getMonth()==7 && today.getDate()>19) {
  weddingDay.setFullYear(weddingDay.getFullYear() + 1); 
}  
var one_day= 1000 * 60 * 60 * 24;
if (document.getElementById("daysToGo")) {
  document.getElementById("daysToGo").innerHTML = Math.ceil((weddingDay.getTime()-today.getTime())/(one_day)) + " Days to go";
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

  var id = document.createAttribute("id");
  id.value = "radio_" + counter + "_" + num;
  radioButton.setAttributeNode(id);

  var onChange = document.createAttribute("onchange");
  onChange.value = "valueChanged(this)";
  radioButton.setAttributeNode(onChange);

  return radioButton;
}

function loadGuests() {
  var list = document.getElementById("extra");
  // create div container to rsvp
  var div = document.createElement("div");
  div.className = "guest";

  // setup rsvp form
  var text = document.createElement("h5");
  text.textContent = "Will you be attending?";
  var radioButton1 = createRadioButton(1);
  var radioButton2 = createRadioButton(2);
  var linebreak = document.createElement("br");

  // populate div
  div.appendChild(text);
  div.appendChild(radioButton1);
  div.appendChild(radioButton2);
  div.appendChild(linebreak);

  list.append(div);
  counter += 1;
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
  if (name) {
    response = JSON.parse(removeHeader(response));
    var guests = validateName(response, name);
    document.getElementById("fullname").value = isValid;
    if (guests) {
      // Programmatically add Guest Names and Radio buttons for RSVP.
    }
  }
}

function validateName(data, searchName) {
	var response = "";
	var rows = data.table.rows;
	for (i = 0; i < rows.length; i++) {
		var name = rows[i].c[0].v;
    var guests = rows[i].c[1].v;
    var rsvp = rows[i].c[2].v;
		if (name.includes(searchName) && rsvp.includes("?")) {
			return guests.split(",");
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
