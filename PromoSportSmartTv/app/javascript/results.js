var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	$(document).ready(function(){
		$("#transition").fadeOut(500);
	});
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
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_EXIT:
			event.preventDefault();
			$("#area").val("exit");
			$("#return").parent().addClass("off");
			$("#Cexit").parent().addClass("off");
			$("#about").parent().addClass("off");
			$("#exit").fadeIn();
			break;
		case tvKey.KEY_INFO:
			$("#return").parent().removeClass("off");
			$("#Cexit").parent().addClass("off");
			$("#left").parent().addClass("off");
			$("#right").parent().addClass("off");
			$("#enter").parent().addClass("off");
			$("#about").parent().addClass("off");
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
			}
			break;
		case tvKey.KEY_LEFT:
			if($("#top").children(".menuSelected").index()>0)
			{
				$("#top").children(".menuSelected").removeClass("menuSelected").prev().addClass("menuSelected");
			}else{
				$("#top").children(".menuSelected").removeClass("menuSelected");
				$("#top").children(".menuItem").last().addClass("menuSelected");
			}
			break;
		case tvKey.KEY_RIGHT:
			if($("#top").children(".menuSelected").index()+1<$("#top").children(".menuItem").length)
			{
				$("#top").children(".menuSelected").removeClass("menuSelected").next().addClass("menuSelected");
			}else{
				$("#top").children(".menuSelected").removeClass("menuSelected");
				$("#top").children(".menuItem").first().addClass("menuSelected");
			}
			break;
		case tvKey.KEY_UP:
			if($("#left").children(".selected").index()>1)
			{
				$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected").prev().addClass("selected").children(".x01").addClass("hover");
			}else{
				$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected");
				$("#left").children(".item").last().addClass("selected").children(".x01").addClass("hover");
			}
			break;
		case tvKey.KEY_DOWN:
			if($("#left").children(".selected").index()<$("#left").children(".item").length)
			{
				$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected").next().addClass("selected").children(".x01").addClass("hover");
			}else{
				$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected");
				$("#left").children(".item").first().addClass("selected").children(".x01").addClass("hover");
			}
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
				else alert("exit");
			}else if($("#area").val()=="menu")
			{
				$("#transition").fadeIn(500,function(){
					if($("ul .selected").children("h1").html()=="RESULTS")
					{
						window.location.replace("results.html");
					}
				});
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};