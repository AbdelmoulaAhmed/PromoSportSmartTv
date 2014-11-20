function setOutletData(){
	var id = $(".selected").children(".itemId").val();
	var zone = $(".selected").children(".itemZone").val();
	var status = $(".selected").children(".itemStatus").val();
	var number = $(".selected").children(".itemNumber").val();
	var address = $(".selected").children(".itemAddress").val();
	var city = $(".selected").children(".itemCity").val();
	$("#outletInfoTable").children("tr").first().children("td").first().next().next().html(id);
	$("#outletInfoTable").children("tr").first().next().children("td").first().next().next().html(zone);
	$("#outletInfoTable").children("tr").first().next().next().children("td").first().next().next().html(status);
	$("#outletInfoTable").children("tr").first().next().next().next().children("td").first().next().next().html(number);
	$("#outletInfoTable").children("tr").first().next().next().next().next().children("td").first().next().next().html(address);
	$("#outletInfoTable").children("tr").first().next().next().next().next().next().children("td").first().next().next().html(city);
}

function showList(x){
	$(".item").css("display","none");
	for(var i=(x-10);i<(x+10);i++)
	{
		$(".item").eq(i).css("display","block");
	}
}

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
		$("#transition").stop(true,false).fadeOut(500);
		$("#left").children(".item").first().addClass("selected");
		setOutletData();
		showList(0);
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
			$("#up").parent().addClass("off");
			$("#down").parent().addClass("off");
			$("#Cleft").parent().removeClass("off");
			$("#Cright").parent().removeClass("off");
			$("#return").parent().addClass("off");
			$("#Cexit").parent().addClass("off");
			$("#about").parent().addClass("off");
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
				// $("#Cleft").parent().removeClass("off");
				// $("#Cright").parent().removeClass("off");
				$("#up").parent().removeClass("off");
				$("#down").parent().removeClass("off");
				// $("#enter").parent().removeClass("off");
				$("#about").parent().removeClass("off");
				$("#aboutContainer").fadeOut();
			}
			break;
		case tvKey.KEY_LEFT:
			if($("#exitContainer").children(".buttonSelected").prev("button").length!=0)
			{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").prev().addClass("buttonSelected");
			}else{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").parent().children("button").last().addClass("buttonSelected");
			}
			break;
		case tvKey.KEY_RIGHT:
			if($("#exitContainer").children(".buttonSelected").next().length!=0)
			{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").next().addClass("buttonSelected");
			}else{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").parent().children("button").first().addClass("buttonSelected");
			}
			break;
		case tvKey.KEY_UP:
			if($("#left").children(".selected").index()>0)
			{
				$("#left").children(".selected").removeClass("selected").prev().addClass("selected");
				setOutletData();
				var dis = $(".selected").offset().top - $("#left").offset().top;
				if(dis<0)$(".item").animate({"top":"+="+(-dis)},300);
				if(dis>400)$(".item").animate({"top":"-="+(dis-400)},300);
			}
			else
			{
				$("#left").children(".selected").removeClass("selected");
				$("#left").children(".item").last().addClass("selected");
				setOutletData();
				var dis = $(".selected").offset().top - $("#left").offset().top;
				$(".item").animate({"top":"-="+(dis-1150)},300);
			}
			showList($("#left").children(".selected").index());
			break;
		case tvKey.KEY_DOWN:
			if($("#left").children(".selected").index()<$("#left").children(".item").length-1)
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
			showList($("#left").children(".selected").index());
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
					$("#Cleft").parent().addClass("off");
					$("#Cright").parent().addClass("off");
					$("#up").parent().removeClass("off");
					$("#down").parent().removeClass("off");
					$("#enter").parent().addClass("off");
					$("#return").parent().removeClass("off");
				}
				else widgetAPI.sendExitEvent();
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};