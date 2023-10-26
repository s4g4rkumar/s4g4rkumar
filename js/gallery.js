'use strict';






function highlightnav(val){
  var navitems=document.getElementsByClassName("nav-item");
  for(var i=0;i<navitems.length;i++)
  {
    navitems[i].classList.remove("navactive");
  }
  val.classList.add("navactive");
}

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



function galSelect(z,x){
  for(var i=0;i<btn.length;i++)
  {
    btn[i].classList.remove("gal-active");
  }
  z.classList.add("gal-active");
  for(var i=0;i<all.length;i++)
  {
    all[i].style.display ="none";
  }
  if( x === "all")
  {
    for(var i=0;i<all.length;i++)
      all[i].style.display="block"; 
  }
  if(x === "anim" )
  {
    for(var i=0;i<anim.length;i++)
      anim[i].style.display="block";
  }
  if( x === "mod")
  {
    for(var i=0;i<mod.length;i++)
      mod[i].style.display="block";
  }
  if(x === "level" )
  {
    for(var i=0;i<level.length;i++)
      level[i].style.display="block";
  }
  if(x === "ill" )
  {
    for(var i=0;i<ill.length;i++)
      ill[i].style.display="block";
  }

}


var btn=document.getElementsByClassName("select");
var all=document.getElementsByClassName("gal-item");
var anim=document.getElementsByClassName("anim");
var mod=document.getElementsByClassName("mod");
var level=document.getElementsByClassName("level");
var ill=document.getElementsByClassName("ill");

document.addEventListener('DOMContentLoaded', function() {
    loadPagefromXML();
    galSelect(btn[0],'all');
    
}, false);



function loadPagefromXML(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) 
    {
  
      //parse the xml is more understandable form
      var txt, parser, xmlDoc;
      txt = xhttp.responseText;
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(txt,"text/xml");
  
      //declaring the gallery container
      var gal_container=document.createElement("ul");
      gal_container.classList+="gallery-container";
      document.getElementById("gallery").appendChild(gal_container);
  
      //counter to keep count of max projects
      var counter=xmlDoc.getElementsByTagName("image-container");
  
      //for loop to iterate through xml and generate desired html
      for(var i=0;i<counter.length;i++)
      {
      
        //individual img container
        var list_item=document.createElement("li");
        list_item.classList+="gal-item";
        gal_container.appendChild(list_item);
        var class_name=xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue;
        list_item.classList+=" " + class_name;
        
        var a=document.createElement("a");
        a.classList+="img-link";
        a.setAttribute("target","_blank");
        a.setAttribute("href",xmlDoc.getElementsByTagName("link")[i].childNodes[0].nodeValue);
        list_item.appendChild(a);
        var ico=document.createElement("i");
        ico.classList+="i-link";
        a.appendChild(ico);
        
        var imgs=xmlDoc.getElementsByTagName("images")[i];
        
        for(var j=0;j<imgs.childElementCount;j++){
          var image=document.createElement("img");
          var dir="../"+imgs.getElementsByTagName("image")[j].childNodes[0].nodeValue;
          image.src=dir;
          list_item.appendChild(image);
          if( j==0)
          {
            image.classList+="gal-img";
            image.addEventListener("click",function(){ showModal(this);});
          }
          else{
           image.classList+="img-hidden";
          }
        }
      }
    }
  };
  xhttp.open("GET", "xml/gallery.xml", true);
  xhttp.send();
  
  }
  


function showModal(x)
{
  var modal=document.getElementById("myModal"); 
  var modalImg = document.getElementById("modal-img");
  modal.style.display = "flex";
  var count=0;
  while (x != null){
    var img=document.createElement("img");
    img.classList+="modal-image";
    modalImg.appendChild(img);
    img.src = x.src; 
    if(count > 0){
      img.style.display="none";
    }
    x = x.nextSibling;
    count++;
  }
  document.querySelector("body").style.overflow="hidden";

  var length=document.getElementsByClassName("modal-image").length;
  if(length > 1 ){
    document.getElementById("next").style.visibility="visible";
  }
  else{
    document.getElementById("next").style.visibility="hidden";
  }

  document.getElementById("previous").style.visibility="hidden";

} 

  
function closeModal()
{
  count=0;
  var modalimg=document.getElementById("modal-img");
  while (modalimg.firstChild) {
  modalimg.removeChild(modalimg.firstChild);
}
var modal=document.getElementById("myModal");
modal.style.display = "none";
document.querySelector("body").style.overflow="auto";

}

var count=0;

function changeImg(pointer){
    var countimg = document.getElementsByClassName("modal-image");

    if(pointer == 1 && count < countimg.length)
    {
      if(countimg[count].nextSibling != null){
        countimg[count].style.display="none";
        countimg[count].nextSibling.style.display="block";
        count++;
      }
    }
    if(pointer == -1 && count > 0)
    {
      if(countimg[count].previousSibling != null)
      {
        countimg[count].style.display="none";
        countimg[count].previousSibling.style.display="block";
        count--;
      }
    }


    if(count > 0 ){
      document.getElementById("previous").style.visibility="visible";
    }  
    else{
      document.getElementById("previous").style.visibility="hidden";
    }
    
    if(count < countimg.length - 1 ){
      document.getElementById("next").style.visibility="visible";
    }
    else{
      document.getElementById("next").style.visibility="hidden";
    }

}

