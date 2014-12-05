function sound(Sound) {
	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', Sound);
	audioElement.setAttribute('autoplay', 'autoplay');
    audioElement.addEventListener("load", function() {
        audioElement.play();
    }, true);
}
var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var link = "www.promo-sport.byethost7.com";

var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	//$(document).ready(function(){
		$("#transition").delay(1000).fadeOut(500);
		$.ajax({
			type: "GET",
			url: "about.txt",
			dataType: "text",
			success: function(text) {
				$("#aboutContainer").html(text);
			},
			error: function(error) {
				alert("The about File could not be processed correctly : ");
				console.log(error.responseText);
			}
		});
	//});
};

Main.onUnload = function()
{
	//$("#transition").fadeOut(500);
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
			$("#Cleft").parent().removeClass("off");
			$("#Cright").parent().removeClass("off");
			$("#up").parent().addClass("off");
			$("#down").parent().addClass("off");
			$("#enter").parent().removeClass("off");
			$("#exit").fadeIn();
			break;
		case tvKey.KEY_INFO:
			/* *****Sonud Effect*** */
			sound("./sound/InfoTone.mp3");
	        /* ***** End Sonud Effect*** */
			$("#area").val("about");
			$("#up").parent().addClass("off");
			$("#down").parent().addClass("off");
			$("#about").parent().addClass("off");
			$("#Cexit").parent().addClass("off");
			$("#aboutContainer").fadeIn();
			break;
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			event.preventDefault();
			if($("#area").val()=="menu")
			{
				$("#transition").fadeIn(500,function(){
					window.location.replace("index.html");
				});
			}else if($("#area").val()=="about")
			{
				$("#area").val("menu");
				$("#Cexit").parent().removeClass("off");
				$("#up").parent().removeClass("off");
				$("#down").parent().removeClass("off");
				$("#about").parent().removeClass("off");
				$("#aboutContainer").fadeOut();
			}

			break;
		case tvKey.KEY_LEFT:
			/* *****Sonud Effect*** */
			sound("./sound/PopTone.mp3");
	        /* ***** End Sonud Effect*** */
			if($("#area").val()=="exit")
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
			if($("#area").val()=="exit")
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
			/* *****Sonud Effect*** */
			sound("./sound/PopTone.mp3");
	        /* ***** End Sonud Effect*** */
			var childPos = $("#innerRight").offset();
			var parentPos = $("#innerRight").parent().offset();
			var childOffset = {
				top: childPos.top - parentPos.top,
				left: childPos.left - parentPos.left
			};
			if(childOffset.top<0)
			$("#innerRight").animate({"top":"+=300px"},10);
			else $("#innerRight").animate({"top":"0px"},10);
			break;
		case tvKey.KEY_DOWN:
			/* *****Sonud Effect*** */
			sound("./sound/PopTone.mp3");
	        /* ***** End Sonud Effect*** */
			var childPos = $("#innerRight").offset();
			var parentPos = $("#innerRight").parent().offset();
			var childOffset = {
				top: childPos.top - parentPos.top,
				left: childPos.left - parentPos.left
			};
			console.log(childOffset.top);
			if(childOffset.top>-1534)
			$("#innerRight").animate({"top":"-=300px"},10);
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			if($("#area").val()=="exit")
			{
				if($(".buttonSelected").html()=="Cancel")
				{
					$("#exit").fadeOut();
					$("#area").val("menu");
					$("#Cexit").parent().removeClass("off");
					$("#about").parent().removeClass("off");
					$("#return").parent().removeClass("off");
					$("#Cleft").parent().addClass("off");
					$("#Cright").parent().addClass("off");
					$("#up").parent().removeClass("off");
					$("#down").parent().removeClass("off");
					$("#enter").parent().addClass("off");
				}
				else widgetAPI.sendExitEvent();
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