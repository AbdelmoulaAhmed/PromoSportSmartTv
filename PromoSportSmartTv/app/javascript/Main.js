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
	//$(document).ready(function(){
		$("#transition").fadeOut(1000);
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
	//});
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
			event.preventDefault();
			$("#area").val("exit");
			$("#return").parent().addClass("off");
			$("#Cexit").parent().addClass("off");
			$("#about").parent().addClass("off");
			$("#exit").fadeIn();
			break;
		case tvKey.KEY_INFO:
			if($("#area").val()=="menu")
			{
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
			event.preventDefault();
			$("#return").parent().addClass("off");
			$("#Cexit").parent().removeClass("off");
			$("#left").parent().removeClass("off");
			$("#right").parent().removeClass("off");
			$("#enter").parent().removeClass("off");
			$("#about").parent().removeClass("off");
			$("#aboutContainer").fadeOut();
			break;
		case tvKey.KEY_LEFT:
			if($("#area").val()=="menu")
			{
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
					$("ul").animate({"right":"90%"},600,function(){
						$("#sectionInfo").children("span").html($(".selected").children("input").val());
						$("#sectionInfo").animate({"top":"0%"},300);
					});
				}
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
			if($("#area").val()=="menu")
			{
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
			break;
		case tvKey.KEY_DOWN:
			//alert("DOWN");
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
				$("#transition").fadeIn(500,function(){
					if($("ul .selected").children("h1").html()=="RESULTS")
					{
						window.location.replace("results.html");
					}else if($("ul .selected").children("h1").html()=="OUTLETS")
					{
						window.location.replace("outlets.html");
					}
				});
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
