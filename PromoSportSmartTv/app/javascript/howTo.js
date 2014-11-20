var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var link = "192.168.56.1";
var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	//$(document).ready(function(){
		$("#transition").fadeOut(500);
		$.ajax({
			type: "GET",
			url: "http://"+link+"/promosportHTML/about.txt",
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
			$("#Cleft").parent().removeClass("off");
			$("#Cright").parent().removeClass("off");
			$("#up").parent().addClass("off");
			$("#down").parent().addClass("off");
			$("#enter").parent().removeClass("off");
			$("#exit").fadeIn();
			break;
		case tvKey.KEY_INFO:
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
			break;
	}
};