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
