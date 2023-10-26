'use strict';

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

function hamAnimate() {
  document.getElementById("ham-menu").classList.toggle("active");
  document.querySelector("nav").classList.toggle("nav-hid");
}
function bodystyle(){
  document.querySelector("body").classList.toggle("overflow");
}
function bckTop(){
  document.querySelector("main").scrollIntoView({  
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadPagefromXML();
}, false);


function loadPagefromXML(){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    //parse the xml is more understandable form
    var txt, parser, xmlDoc;
    txt = xhttp.responseText;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(txt,"text/xml");

    //declaring the main section containing all primary projects 
    var div_main=document.createElement("div");
    div_main.classList+="primary-projects";
    document.getElementById("portfolio").appendChild(div_main);

    //counter to keep count of max projects
    var count=xmlDoc.getElementsByTagName("project");

    //for loop to iterate through xml and generate desired html
    for(var i=0;i<count.length;i++){
    
      //projects div container
      var div_proj=document.createElement("div");
      div_proj.classList+="project";
      div_main.appendChild(div_proj);
    
      //projects info container with background image of project
      var div_proj_info=document.createElement("div");
      var dir="../" + xmlDoc.getElementsByTagName("img")[i].childNodes[0].nodeValue;
      if(window.innerWidth < 768 ){
        div_proj_info.setAttribute("style",
        "background-image: url("+ dir +"); background-position: center; background-repeat: no-repeat;background-size: cover;");
      }
      else{
        div_proj_info.setAttribute("style",
        "background-image: none;");
      }  

      if( i % 2 == 0 )
      {
        div_proj_info.classList+="proj-info txt-right move-right";
        div_proj.appendChild(div_proj_info);
      }
      else{
        div_proj_info.classList+="proj-info txt-left move-left";
        div_proj.appendChild(div_proj_info);
      }

      //projects title section
      var h3=document.createElement("h3");
      h3.innerHTML=xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue;
      h3.classList+="proj-name";
      div_proj_info.appendChild(h3);
    
      //projects description section
      var p=document.createElement("p");
      p.classList+="proj-desc";
      p.innerHTML=xmlDoc.getElementsByTagName("desc")[i].childNodes[0].nodeValue;
      div_proj_info.appendChild(p);
    
      //projects technologies involved ul list container
      var ul=document.createElement("ul");
      if( i % 2 == 0 )
      {
        ul.classList+="proj-tech flex-end";
        div_proj_info.appendChild(ul);
      }
      else{
        ul.classList+="proj-tech flex-start";
        div_proj_info.appendChild(ul);
      }

      //individual list element of technologies involved
      var proj_tech=xmlDoc.getElementsByTagName("proj-tech")[i];
      for(var j=0;j<proj_tech.childElementCount;j++)
      {
        var li=document.createElement("li");
        li.classList+="tech";
        li.innerHTML=proj_tech.getElementsByTagName("tech")[j].childNodes[0].nodeValue;
        ul.appendChild(li);
      }

      //container for hyperlinks of projects
      var div_proj_links=document.createElement("div");
      if( i % 2 == 0 )
      {
        div_proj_links.classList+="proj-links flex-end";
        div_proj_info.appendChild(div_proj_links);
      }
      else{
        div_proj_links.classList+="proj-links flex-start";
        div_proj_info.appendChild(div_proj_links);
      }
      
      //links for the respective projects
      var proj_links=xmlDoc.getElementsByTagName("links")[i];
      for(var z=0;z<proj_links.childElementCount;z++)
      {
        var a=document.createElement("a");
        a.classList+="link";
        a.href=proj_links.getElementsByTagName("link")[z].childNodes[0].nodeValue;
        a.target="_blank"; 
        div_proj_links.appendChild(a);
      
        //create icon based on the links
        var ico=document.createElement("i");
        if(z==0)
        {
          ico.classList+="ico i-github";
          a.appendChild(ico);
        }
        else{
          ico.classList+="ico i-link-45deg";
          a.appendChild(ico);
        }
      }
      
      //container for image of project
      var div_proj_img=document.createElement("div");
      if( i % 2 == 0 )
        {
          div_proj_img.classList+="proj-img img-left";
          div_proj.appendChild(div_proj_img);
        }
        else{
          div_proj_img.classList+="proj-img img-right";
          div_proj.appendChild(div_proj_img);
        }

      //individual image for each project
      var img=document.createElement("img");
      img.src=xmlDoc.getElementsByTagName("img")[i].childNodes[0].nodeValue;
      div_proj_img.appendChild(img);
    }
  }
};
xhttp.open("GET", "xml/portfolio.xml", true);
xhttp.send();

}


window.addEventListener('resize', adjustprojectimg);

function adjustprojectimg(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       //parse the xml is more understandable form
        var txt, parser, xmlDoc;
        txt = xmlhttp.responseText;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt,"text/xml");

        //counter to keep count of max projects
        var count=xmlDoc.getElementsByTagName("project");

        for(var i=0;i<count.length;i++)
        {
          var dir="../" + xmlDoc.getElementsByTagName("img")[i].childNodes[0].nodeValue;
          if(window.innerWidth < 768 )
          {
          document.getElementsByClassName("proj-info")[i].setAttribute("style",
          "background-image: url("+ dir +"); background-position: center; background-repeat: no-repeat;background-size: cover;");
          }
          else
          {
            document.getElementsByClassName("proj-info")[i].setAttribute("style",
          "background-image: none;");
          }  
        }
    }
  };

xmlhttp.open("GET", "xml/portfolio.xml", true);
xmlhttp.send();

}


function highlightnav(val){
  var navitems=document.getElementsByClassName("nav-item");
  for(var i=0;i<navitems.length;i++)
  {
    navitems[i].classList.remove("navactive");
  }
  val.classList.add("navactive");
}
