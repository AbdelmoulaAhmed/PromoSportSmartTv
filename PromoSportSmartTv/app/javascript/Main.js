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
		case tvKey.KEY_INFO:
			$("#aboutContainer").fadeIn();
			break;
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			if($("ul").children(".selected").prev().length!=0)
			{
				$("#sectionInfo").animate({"top":"-17%"},300);
				$("ul").children(".selected").removeClass("selected").prev().addClass("selected");
				$("ul").animate({"right":"-=30%"},300,function(){
					$("#sectionInfo").children("span").html($(".selected").children("input").val());
					$("#sectionInfo").animate({"top":"0%"},300);
				});
			}else{
				alert("not entred");
			}
			break;
		case tvKey.KEY_RIGHT:
			if($("ul").children(".selected").next().length!=0)
			{
				$("#sectionInfo").animate({"top":"-17%"},300);
				$("ul").children(".selected").removeClass("selected").next().addClass("selected");
				$("ul").animate({"right":"+=30%"},600,function(){
					$("#sectionInfo").children("span").html($(".selected").children("input").val());
					$("#sectionInfo").animate({"top":"0%"},300);
				});
			}else{
				alert("not entred");
			}
			break;
		case tvKey.KEY_UP:
			alert("UP");
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			$("#aboutContainer").fadeOut();
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
