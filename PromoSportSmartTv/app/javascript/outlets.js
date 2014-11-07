function setOutletData(){
	var id = $(".selected").children(".itemId").val();
	var zone = $(".selected").children(".itemZone").val();
	var status = $(".selected").children(".itemStatus").val();
	var number = $(".selected").children(".itemNumber").val();
	var address = $(".selected").children(".itemAddress").val();
	var city = $(".selected").children(".itemCity").val();
	$("#outletInfoTable tr:nth-child(1) td:nth-child(3)").html(id);
	$("#outletInfoTable tr:nth-child(2) td:nth-child(3)").text(zone);
	$("#outletInfoTable tr:nth-child(3) td:nth-child(3)").html(status);
	$("#outletInfoTable tr:nth-child(4) td:nth-child(3)").html(number);
	$("#outletInfoTable tr:nth-child(5) td:nth-child(3)").html(address);
	$("#outletInfoTable tr:nth-child(6) td:nth-child(3)").html(city);
}
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
		$("#transition").stop(true,false).fadeOut(500);
		$("#left").children(".item").first().addClass("selected");
		setOutletData();
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
			$("#return").parent().addClass("off");
			$("#Cexit").parent().removeClass("off");
			$("#left").parent().removeClass("off");
			$("#right").parent().removeClass("off");
			$("#enter").parent().removeClass("off");
			$("#about").parent().removeClass("off");
			$("#aboutContainer").fadeOut();
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
				$("#left").children(".selected").removeClass("selected").prev().addClass("selected");
				setOutletData();
				var dis = $(".selected").offset().top - $("#left").offset().top;
				if(dis<0)$(".item").animate({"top":"+="+(-dis)},300);
				if(dis>400)$(".item").animate({"top":"-="+(dis-400)},300);
			}else{
				$("#left").children(".selected").removeClass("selected");
				$("#left").children(".item").last().addClass("selected");
				setOutletData();
				var dis = $(".selected").offset().top - $("#left").offset().top;
				$(".item").animate({"top":"+="+(dis-650)},300);
			}
			break;
		case tvKey.KEY_DOWN:
			if($("#left").children(".selected").index()<$("#left").children(".item").length)
			{
				$("#left").children(".selected").removeClass("selected").next().addClass("selected");
				setOutletData();
				var dis = $(".selected").offset().top - $("#left").offset().top;
				if(dis>400)$(".item").animate({"top":"-="+(dis-400)},300);
				if(dis<0)$(".item").animate({"top":"0"},300);
			}else{
				$("#left").children(".selected").removeClass("selected");
				$("#left").children(".item").first().addClass("selected");
				setOutletData();
				$(".item").animate({"top":"0"},300);
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