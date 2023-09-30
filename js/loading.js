//for loading animation
document.onreadystatechange = function() 
{ 
	if (document.readyState !== "complete") 
	{ 
        document.querySelector("#loader").style.visibility = "visible"; 
		document.querySelector("body").style.visibility = "hidden";
	} 
	else 
	{ 
		document.querySelector("#loader").style.display = "none"; 
		document.querySelector("body").style.visibility = "visible"; 
	}
}; 