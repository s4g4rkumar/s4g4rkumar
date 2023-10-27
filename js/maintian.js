document.onreadystatechange = function() 
{ 
  
	if (document.readyState !== "complete") 
	{ 
    document.querySelector("#loader").style.visibility = "visible"; 
    document.querySelector("body").classList.add("overflow");
		document.querySelector("body").style.visibility = "hidden";
	} 
	else 
	{ 
		document.querySelector("#loader").style.display = "none"; 
    document.querySelector("body").classList.remove("overflow");
		document.querySelector("body").style.visibility = "visible"; 
	}
}; 

document.addEventListener('DOMContentLoaded', function() {
  loaddatefromXML();
}, false);

function loaddatefromXML(){

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) 
{

  //parse the xml is more understandable form
  var txt, parser, xmlDoc,holdxmldate;
  txt = xhttp.responseText;
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(txt,"text/xml");
  holdxmldate = xmlDoc.getElementsByTagName("timendate")[0].childNodes[0].nodeValue;
  console.log(holdxmldate);
  checkredirect(holdxmldate);

}
};
xhttp.open("GET", "xml/maintaindate.xml", true);
xhttp.send();

}


//This section will check if maintainance period is over or not ; if over then will redirect to home page
//#region

function checkredirect(newdate){

  let countDownDate = new Date(newdate).getTime();
  var countdownfunction = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById("time-d").innerHTML = days;
  document.getElementById("time-h").innerHTML = hours;
  document.getElementById("time-m").innerHTML = minutes;
  document.getElementById("time-s").innerHTML = seconds;
  
  if (distance < 0) {
  clearInterval(countdownfunction);
	document.getElementById("time-d").innerHTML = "00";
	document.getElementById("time-h").innerHTML = "00";
 	document.getElementById("time-m").innerHTML = "00";
  document.getElementById("time-s").innerHTML = "00";
	location.replace("home");
  }
  }, 1000);
}

//#endregion

