//function to call an event when DOM is fully loaded and parsed.
document.addEventListener('DOMContentLoaded', function() {
  loadTimerXML();
},false);

// function to load xml document
function loadTimerXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "xml/maintaindate.xml", true);
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      useXML(this);  
    }
  };
  xmlhttp.send();
}

//function to perform action from the xml
function useXML(xml) {
  var txt, parser, xmlDoc;
  txt = xml.responseText;
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(txt,"text/xml");

  var node, _timestamp;

 
  _timestamp = "";
  node = xmlDoc.getElementsByTagName("timendate");
  _timestamp = node[0].childNodes[0].nodeValue;

  var uptime = new Date(_timestamp).getTime();
  setInterval(() => {
    myTimer(uptime);
  }, 1000);
}

//function to perform countdown
function myTimer(countDownDate) {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  if (distance > 0) 
  {   
    location.replace("maintain.html");
  }
  else{
    location.replace("home.html");
  }
}


