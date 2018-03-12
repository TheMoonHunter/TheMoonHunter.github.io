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

function createRadioButton(num, name) {
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
  var id = document.createAttribute("name");
  if (name == "you") {
    name = document.getElementById("fullname").value;
  }
  id.value = name.replace(' ', '_').toLowerCase();
  radioButton.setAttributeNode(id);

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
  var radioButton1 = createRadioButton(1, guest);
  var radioButton2 = createRadioButton(2, guest);

  // populate div
  div.appendChild(text);
  div.appendChild(radioButton1);
  div.appendChild(radioButton2);
  div = addBreakLines(div);
}

function createInputText(name) {
  var inputText = document.createElement('input');
  inputText.type = "text";

  // Add the class attribute
  var input_class = document.createAttribute("class");
  input_class.value = "input";
  inputText.setAttributeNode(input_class);

  // Add the id attribute
  var id = document.createAttribute("name");
  id.value = name;
  inputText.setAttributeNode(id);

  if (name == "name") {
    var name = document.createAttribute("style");
    name.value = "display: none;"
    inputText.setAttributeNode(name);

    var value = document.createAttribute("value");
    value.value = document.getElementById("fullname").value;
    inputText.setAttributeNode(value);
  }

  return inputText;
}

function createInputLabel(name) {
  var label = document.createElement("label");
  label.textContent = name.charAt(0).toUpperCase() + name.slice(1) + ":";

  var label_id = document.createAttribute("id");
  label_id.value = "first-and-last";
  label.setAttributeNode(label_id);

  var label_for = document.createAttribute("name");
  label_for.value = name;
  label.setAttributeNode(label_for);

  return label;
}

function loadSongRequest() {
  var div = document.getElementById("animate-bottom");

  var name_input = createInputText("name");
  var song_label = createInputLabel("song");
  var artist_label = createInputLabel("artist");
  var song_input = createInputText("song");
  var artist_input = createInputText("artist");

  div.appendChild(song_label);
  div.appendChild(song_input);
  div = addBreakLines(div);
  div.appendChild(artist_label);
  div.appendChild(artist_input);
  div.appendChild(name_input);
  div = addBreakLines(div);
}

function addBreakLines(div) {
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));
  return div;
}

function loadGuestList(name) {
  var url = "https://docs.google.com/spreadsheet/tq?key=1J8RJDTBbcRmXOZHzFHLaEFcUGjGaEFXSTabXV8HYqjY&single=true&gid=0&range=A2:C130&output=csv";
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
    try {
      response = JSON.parse(removeHeader(response));
    }
    catch(err) {
      return;
    }
    var guests = validateName(response, name); //['John Smith', 'Jane Doe'];
    if (document.getElementById("rsvp-form")) {
      populateRSVPForm(guests);
    }
    if (document.getElementById("song-requests-form")) {
      populateSongRequestForm(guests);
    }
  }
  processed = true;
}

function populateRSVPForm(guests) {
  if (Array.isArray(guests)) {
    guests.unshift('you');
    loadAcceptRegret();
    for (x in guests) {
      if (guests[x] != "No Guest") {
        loadGuest(guests[x]);
      }
    }
    removeExtraElements();
  }
  else if (guests == null) {
    alert("Your name did not come up in our guest list.");
    goBack();
  }
  else {
    alert(guests);
    goBack();
  }
}

function populateSongRequestForm(response) {
  if (response) {
    loadSongRequest();
    removeExtraElements();
  }
  else {
    alert("You're not allowed to request a song because your name did not come up in our guest list. Sorry! :(")
    goBack();
  }
}

function validateName(data, searchName) {
	var rows = data.table.rows;
	for (i = 0; i < rows.length; i++) {
		var name = rows[i].c[0].v;
    var guests = rows[i].c[1].v;
    var rsvp = rows[i].c[2].v;
		if (name == (searchName) && rsvp.includes("?")) {
			return guests.split(",");
		}
    if (name == searchName && (rsvp.includes("Y") || rsvp.includes("N"))) {
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
