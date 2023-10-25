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


const ques = [  "Do I believe in love at first sight?",
                "Do I still like Windows XP?",
                "Specification of my first pc?",
                "What games did I play on my first PC?",
                "My first memory of video games?",
                "Do I still game?",
                "My first Programming experience?",
                "Fun Fact:",
                "Fun Fact:",
                "Fun Fact:"]

const ans = [   "Oh Yes! I do. And it occurred to me when I turned on my pc for the first time and the Windows XP wallpaper \"bliss\" popped up with a windows startup sound.",
                "I like it? Maybe the wrong question, how much I like it is more relevant. I still get goosebumps when I see a system running Windows XP.",
                "It was an Intel Pentium E5700 clocked at 3.00 GHz, a gigabyte GA-G41MT-S2P motherboard with 512MB of ram. It wouldn't run any of the games apart from minesweeper, 3d pinball. So, I ended up installing 2GB of ram and an Nvidia GeForce 210.",
                "Technically, I played every single game I could at that time. A few of the titles that I played included Halo: Combat Evolved, Need for Speed: Most wanted, Grand Theft Auto: San Andreas, Grand Theft Auto: Vice City, Tekken 3, Prince of Persia: The Two Thrones, Prince of Persia: Warrior Within, MotoGP 3: URT, Transformers: The Game, Hitman 2: Silent Assassin, Assassin's Creed, Max Payne and a whole collection of SEGA classic multiplayer games with split-screen.",
                "I still remember having a Gameboy as a kid and playing Tetris on it for hours till the battery would eventually drain, and I  would have to recharge it. A retro gaming system on which I played loads of games like Contra, Mario, Gemini Man, and Road Rash.",
                "Haven't you heard the phrase \"Once a Gamer, always a Gamer\". Yes, I still game, but now it's just GTA V online and CS: GO. Recently completed titles include The Division 2, Halo: The Master Chief Collection, Watch Dogs 2, and few more AAA titles.",
                "It was in sixth grade when I wrote my first HTML code as part of my curriculum.",
                "People spend one-third of their life sleeping. I have spent one-third of my life in Video Games.",
                "I broke my windows XP system the very next day I had it. Just so that I could learn how to install windows all by myself.",
                "\"hr\" tag was the only styling option I knew after my first coding class."]


var node=0;




function quesAns(pointer){
    node += pointer;
    if(node >= 0 && node <= (ans.length - 1))
    {
        document.getElementById("nxt").style.display="inline-block";
        document.getElementById("prv").style.display="inline-block";
    }
    if(node <= 0)
    {
        node=0;
        document.getElementById("prv").style.display="none";
    }
    if(node >= (ans.length - 1))
    {
        node = ans.length - 1;
        document.getElementById("nxt").style.display="none";
    }
    document.getElementById("about-me-ques").innerHTML= ques[node];
    document.getElementById("about-me-ans").innerHTML= ans[node];  
}


function hamAnimate() {
  document.getElementById("ham-menu").classList.toggle("active");
  document.querySelector("nav").classList.toggle("nav-hid");
}

function bodystyle(){
  document.querySelector("body").classList.toggle("overflow");
}

function highlightnav(val){
  var navitems=document.getElementsByClassName("nav-item");
  for(var i=0;i<navitems.length;i++)
  {
    navitems[i].classList.remove("navactive");
  }
  val.classList.add("navactive");
}

function showProj(z){
    var proj= document.getElementsByClassName("hidden-proj");
    var projs=document.getElementsByClassName("secondary-project");
    var i;
    for( i=0; i<proj.length; i++)
    {
        proj[i].classList.toggle("unhide-proj");
    }
  if(z.innerHTML === "View More")
  {
    z.innerHTML = "View Less";
    proj[0].scrollIntoView({
        block: "center",
    });
  }
  else{
    z.innerHTML ="View More";
    projs[5].scrollIntoView({
      block: "center",
  });
  }
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
    quesAns(0);
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
      var counter=16;
  
      //for loop to iterate through xml and generate desired html
      for(var i=0;i<counter;i++)
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
        
        for(var j=0;j<imgs.childElementCount;j++)
        {
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


      var viewall=document.createElement("a");
    viewall.classList+="btn";
    viewall.href="gallery";
    viewall.innerHTML="view all"
    document.getElementById("gallery").appendChild(viewall);
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
