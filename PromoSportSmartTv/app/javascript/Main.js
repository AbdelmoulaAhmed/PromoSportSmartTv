function sound(Sound) {
	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', Sound);
	audioElement.setAttribute('autoplay', 'autoplay');
    audioElement.addEventListener("load", function() {
        audioElement.play();
    }, true);
}
function GoRight(){
	if($("ul").children(".selected").next().length!=0)
	{
		$("#sectionInfo").animate({"top":"-17%"},300);
		$("ul").children(".selected").removeClass("selected").next().addClass("selected");
		$("ul").animate({"right":"+=30%"},600,function(){
			$("#sectionInfo").children("span").html($(".selected").children("input").val());
			$("#sectionInfo").animate({"top":"0%"},300);
		});
		
	}
	else
	{
		$("#sectionInfo").animate({"top":"-17%"},300);
		$("ul").children(".selected").removeClass("selected").parent().children("li").first().addClass("selected");
		$("ul").animate({"right":"0%"},600,function(){
			$("#sectionInfo").children("span").html($(".selected").children("input").val());
			$("#sectionInfo").animate({"top":"0%"},300);
		});
	}
}
function GoLeft(){
	if($("ul").children(".selected").prev().length!=0)
	{
		$("#sectionInfo").animate({"top":"-17%"},300);
		$("ul").children(".selected").removeClass("selected").prev().addClass("selected");
		$("ul").animate({"right":"-=30%"},300,function(){
			$("#sectionInfo").children("span").html($(".selected").children("input").val());
			$("#sectionInfo").animate({"top":"0%"},300);
		});

	}
	else
	{
		$("#sectionInfo").animate({"top":"-17%"},300);
		$("ul").children(".selected").removeClass("selected").parent().children("li").last().addClass("selected");
		$("ul").animate({"right":"55%"},600,function(){
			$("#sectionInfo").children("span").html($(".selected").children("input").val());
			$("#sectionInfo").animate({"top":"0%"},300);
		});
	}
}
var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var link="www.promo-sport.byethost7.com";
var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
		$("#transition").delay(2000).fadeOut(1000);
		$.ajax({
			type: "GET",
			url: "about.txt",
			dataType: "text",
			success: function(text) {
				$("#aboutContainer").html(text);
			},
			error: function(error) {
				alert("About section could not be processed correctly : ");
				console.log(error.responseText);
			}
		});
		//$("ul").children(".selected").removeClass("selected");
		if(parseFloat(localStorage.getItem("app"))>-1)
		{
			var index=parseInt(sessionStorage.getItem("app"));
			for(var i=0;i<index;i++)
			{
				GoRight();
			}
		}
};

Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	//alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_EXIT:

			/* *****Sonud Effect*** */
			sound("./sound/ExitTone.mp3");
	        /* ***** End Sonud Effect*** */
			event.preventDefault();
			$("#area").val("exit");
			$("#return").parent().addClass("off");
			$("#Cexit").parent().addClass("off");
			$("#about").parent().addClass("off");
			$("#exit").fadeIn();
			break;
		case tvKey.KEY_INFO:

			var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', './sound/InfoTone.mp3');
			audioElement.setAttribute('autoplay', 'autoplay');
		    audioElement.addEventListener("load", function() {
		        audioElement.play();
		    }, true);
			if($("#area").val()=="menu")
			{				
		        audioElement.play();
		        $("#area").val("about");
				$("#return").parent().removeClass("off");
				$("#Cexit").parent().addClass("off");
				$("#left").parent().addClass("off");
				$("#right").parent().addClass("off");
				$("#enter").parent().addClass("off");
				$("#about").parent().addClass("off");
				$("#aboutContainer").fadeIn();
			}
			break;
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			if($("#area").val()=="about")
			{
				event.preventDefault();
				$("#area").val("menu");
				sound("./sound/PopTone.mp3");
				$("#return").parent().addClass("off");
				$("#Cexit").parent().removeClass("off");
				$("#left").parent().removeClass("off");
				$("#right").parent().removeClass("off");
				$("#enter").parent().removeClass("off");
				$("#about").parent().removeClass("off");
				$("#aboutContainer").fadeOut();
			}
			break;
		case tvKey.KEY_LEFT:
			/* *****Sonud Effect*** */
			sound("./sound/PopTone.mp3");
	        /* ***** End Sonud Effect*** */
	        
			if($("#area").val()=="menu")
			{
				GoLeft();
			}else if($("#area").val()=="exit")
			{
				if($("#exitContainer").children(".buttonSelected").prev("button").length!=0)
				{
					$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").prev().addClass("buttonSelected");
				}else{
					$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").parent().children("button").last().addClass("buttonSelected");
				}
			}
			break;
		case tvKey.KEY_RIGHT:
			/* *****Sonud Effect*** */
			sound("./sound/PopTone.mp3");
	        /* ***** End Sonud Effect*** */
	        
			if($("#area").val()=="menu")
			{
				GoRight();
			}else if($("#area").val()=="exit")
			{
				if($("#exitContainer").children(".buttonSelected").next().length!=0)
				{
					$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").next().addClass("buttonSelected");
				}else{
					$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").parent().children("button").first().addClass("buttonSelected");
				}
			}
			break;
		case tvKey.KEY_UP:
			//alert("UP");
			/* *****Sonud Effect*** */
			sound("./sound/ErrorTone.mp3");
	        /* ***** End Sonud Effect*** */
			break;
		case tvKey.KEY_DOWN:
			//alert("DOWN");
			/* *****Sonud Effect*** */
			sound("./sound/ErrorTone.mp3");
	        /* ***** End Sonud Effect*** */
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
	        
			if($("#area").val()=="exit")
			{
				if($(".buttonSelected").html()=="Cancel")
				{				
					$("#area").val("menu");
					$("#exit").fadeOut();
					$("#Cexit").parent().removeClass("off");
					$("#about").parent().removeClass("off");
				}
				else widgetAPI.sendExitEvent();
			}else if($("#area").val()=="menu")
			{
				sessionStorage.setItem("app", $(".selected").index());
				$("#transition").fadeIn(500,function(){
					window.location.replace($("ul .selected").children("h1").html().toLowerCase()+".html");
				});
			}
	        
			break;
		default:
			alert("Unhandled key");
		/* *****Sonud Effect*** */
		sound("./sound/ErrorTone.mp3");
        /* ***** End Sonud Effect*** */
			break;
	}
};
