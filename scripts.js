var response;
function loadData() {
  var url = "https://docs.google.com/spreadsheet/tq?key=1J8RJDTBbcRmXOZHzFHLaEFcUGjGaEFXSTabXV8HYqjY&single=true&gid=0&range=A2:A101&output=csv";
  xmlhttp = new XMLHttpRequest();
  // xmlhttp.onreadystatechange = function() {
  // 	var response = xmlhttp.responseText;
  // 	var parsedResponse = removeHeader(response);
  //   document.getElementById("fullname").innerText = parsedResponse;
  // };
  if ("withCredentials" in xmlhttp) {
	xmlhttp.open("GET", url, true);
  }
  if (typeof XDomainRequest != "undefined") {
    xmlhttp = new XDomainRequest();
    xmlhttp.open(method, url);
  }
  xmlhttp.send();
  response = xmlhttp.responseText;
}

function processResponse(name) {
  response = JSON.parse(removeHeader(response));
  console.log(name);
  var isValid = validateName(response, name);
  document.getElementById("fullname").value = isValid;
}

function testLoadData(name) {
	var response = `/*O_o*/
google.visualization.Query.setResponse({"version":"0.6","reqId":"0","status":"ok","sig":"922867783","table":{"cols":[{"id":"A","label":"","type":"string"},{"id":"B","label":"","type":"string"},{"id":"C","label":"","type":"string"}],"rows":[{"c":[{"v":"Name"},{"v":"Guest"},{"v":"Attending"}]},{"c":[{"v":"Joan Tietze"},{"v":"Roger Tietze, Greg Tietze"}},{"v":"?"}]},{"c":[{"v":"Roger Tietze"},null,{"v":null}]},{"c":[{"v":"Gregory Tietze"},null,{"v":null}]},{"c":[{"v":"Phil"},null,{"v":null}]},{"c":[{"v":"Phil\u0027s Wife"},null,{"v":null}]},{"c":[{"v":"Phil\u0027s Daughter"},null,{"v":null}]},{"c":[{"v":"Shawn Dalglish"},null,{"v":null}]},{"c":[{"v":"Melissa Mooney"},null,{"v":null}]},{"c":[{"v":"Amanda Jenkins"},null,{"v":null}]},{"c":[{"v":"Sam Chen"},null,{"v":null}]},{"c":[{"v":"Lexi Kennedy"},null,{"v":null}]},{"c":[{"v":"Conor Lenon"},null,{"v":null}]},{"c":[{"v":"Glenn Parry"},null,{"v":null}]},{"c":[{"v":"Katlyn Leight"},null,{"v":null}]},{"c":[{"v":"Trevor Owen"},null,{"v":null}]},{"c":[{"v":"Meagan Robinson"},null,{"v":null}]},{"c":[{"v":"Cody Robinson"},null,{"v":null}]},{"c":[{"v":"Katie Garner"},null,{"v":null}]},{"c":[{"v":"Adam Garner"},null,{"v":null}]},{"c":[{"v":"Brad Roberson"},null,{"v":null}]},{"c":[{"v":"Becca Davis"},null,{"v":null}]},{"c":[{"v":"Paul Welge"},null,{"v":null}]},{"c":[{"v":"Mary Tassin"},null,{"v":null}]},{"c":[{"v":"Cameron Tassin"},null,{"v":null}]},{"c":[{"v":"Kelsey Marin"},null,{"v":null}]},{"c":[{"v":"Decebal Marin"},null,{"v":null}]},{"c":[{"v":"Katy Kovar"},null,{"v":null}]},{"c":[{"v":"Ivan Rodriguez-Mesa"},null,{"v":null}]},{"c":[{"v":"Jo Rodriguez-Mesa"},null,{"v":null}]},{"c":[{"v":"Jack Alanis"},null,{"v":null}]},{"c":[{"v":"Kim Alanis"},null,{"v":null}]},{"c":[{"v":"John Min"},null,{"v":null}]},{"c":[{"v":"Yvonne Min"},null,{"v":null}]},{"c":[{"v":"Hayden Stoner"},null,{"v":null}]},{"c":[{"v":"Zach Stoner"},null,{"v":null}]},{"c":[{"v":"Julie Herrera"},null,{"v":null}]},{"c":[{"v":"Charlotte Lamping"},null,{"v":null}]},{"c":[{"v":"Kristi Kennedy"},null,{"v":null}]},{"c":[{"v":"Steven Lahiff"},null,{"v":null}]},{"c":[{"v":"Grey Kennedy"},null,{"v":null}]},{"c":[{"v":"Hunter Kennedy"},null,{"v":null}]},{"c":[{"v":"Hunter\u0027s Date"},null,{"v":null}]},{"c":[{"v":"Peggy Ambrosch"},null,{"v":null}]},{"c":[{"v":"Walter Ambrosch"},null,{"v":null}]},{"c":[{"v":"Christof Ambrosch"},null,{"v":null}]},{"c":[{"v":"Crystal Ambrosch"},null,{"v":null}]},{"c":[{"v":"Nik Ambrosch"},null,{"v":null}]},{"c":[{"v":"Michelle Ambrosch"},null,{"v":null}]},{"c":[{"v":"Jeanne Bottiglieri"},null,{"v":null}]},{"c":[{"v":"Frank Bottiglieri"},null,{"v":null}]},{"c":[{"v":"Frankie Bottiglieri"},null,{"v":null}]},{"c":[{"v":"Nick Bottliglieri"},null,{"v":null}]},{"c":[{"v":"John Kobi"},null,{"v":null}]},{"c":[{"v":"Kathie Kobi"},null,{"v":null}]},{"c":[{"v":"Zach Kobi"},null,{"v":null}]},{"c":[{"v":"Krista Kobi"},null,{"v":null}]},{"c":[{"v":"Bob"},null,{"v":null}]},{"c":[{"v":"Bob\u0027s Wife"},null,{"v":null}]},{"c":[{"v":"Marcela Villagarcia"},null,{"v":null}]},{"c":[{"v":"Rafael Iza"},null,{"v":null}]},{"c":[{"v":"Jhoan Iza"},null,{"v":null}]},{"c":[{"v":"Greg Rogers"},null,{"v":null}]},{"c":[{"v":"Greg Curwen"},null,{"v":null}]},{"c":[{"v":"Cara Curwen"},null,{"v":null}]},{"c":[{"v":"Emma Curwen"},null,{"v":null}]},{"c":[{"v":"Jay Nielsen"},null,{"v":null}]},{"c":[{"v":"Gail Curwen"},null,{"v":null}]},{"c":[{"v":"Travis Curwen"},null,{"v":null}]},{"c":[{"v":"Knowles Curwen"},null,{"v":null}]},{"c":[{"v":"Rebecca Curwen"},null,{"v":null}]},{"c":[{"v":"Marcia Marill"},null,{"v":null}]},{"c":[{"v":"Rolan Marill"},null,{"v":null}]},{"c":[{"v":"Marita Dragten"},null,{"v":null}]},{"c":[{"v":"Andy Lee"},null,{"v":null}]},{"c":[{"v":"Aja Rayburn"},null,{"v":null}]},{"c":[{"v":"David Thomas"},null,{"v":null}]},{"c":[{"v":"Isabelle Orrico"},null,{"v":null}]},{"c":[{"v":"Isaiah Miller"},null,{"v":null}]},{"c":[{"v":"Matt Runas"},null,{"v":null}]},{"c":[{"v":"Victoria Kay"},null,{"v":null}]},{"c":[{"v":"Amos Gwa"},null,{"v":null}]},{"c":[{"v":"Mikayla Hawkins"},null,{"v":null}]},{"c":[{"v":"Kaleb Hawkins"},null,{"v":null}]},{"c":[{"v":"Matt Bonderu"},null,{"v":null}]},{"c":[{"v":"Joshua Lin"},null,{"v":null}]},{"c":[{"v":"Parker Chambers"},null,{"v":null}]},{"c":[{"v":"Braden McGregor"},null,{"v":null}]},{"c":[{"v":"Hayden Smith"},null,{"v":null}]},{"c":[{"v":"Yvonne Wilder"},null,{"v":null}]},{"c":[{"v":"Chas Wilder"},null,{"v":null}]},{"c":[{"v":"Joel"},null,{"v":null}]},{"c":[{"v":"Shalisa"},null,{"v":null}]},{"c":[{"v":"Seiji Ryer"},null,{"v":null}]},{"c":[{"v":"Thorn Svendsen"},null,{"v":null}]},{"c":[{"v":"Chelsea Svendsen"},null,{"v":null}]},{"c":[{"v":"Jason Santilli"},null,{"v":null}]},{"c":[{"v":"Ryan Stwart"},null,{"v":null}]},{"c":[{"v":"Jordan Eisel"},null,{"v":null}]},{"c":[{"v":"Rafo Iza"},null,{"v":null}]}]}});`;
	response = JSON.parse(removeHeader(response));
  console.log(name);
	var isValid = validateName(response, name);
	document.getElementById("fullname").value = isValid;
}

function validateName(data, searchName) {
	var response = "";
	var rows = data.table.rows;
	for (i = 0; i < rows.length; i++) {
		var name = rows[i].c[0].v;
		if (name == searchName) {
			return true;
		}
	}
	return false;
}

function removeHeader(response) {
	response = response.replace("google.visualization.Query.setResponse(", "");
	response = response.replace("\/\*O_o*\/", "");
	response = response.replace(");", "");
	return response;
}
function myFunction() {
    var x = document.getElementById("main_nav");
    if (!x.style.display || x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}
function showInfo() {
    var info = document.getElementById("info");
    if (!info.style.display || info.style.display === "none") {
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}