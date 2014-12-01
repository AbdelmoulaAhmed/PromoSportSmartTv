function fillIn(league,matchs)
{
	var header = "<tr><td>Home</td><td>Away</td><td>1</td><td>X</td><td>2</td></tr>";
	var contentHTML =header;
	$(matchs).each(function(){
		if($(this)[0].league==league.toLowerCase())
		{
			
			contentHTML +="<tr>";
				contentHTML +="<td>"+$(this)[0].home+"</td>";
				contentHTML +="<td>"+$(this)[0].away+"</td>";
				contentHTML +="<td>"+$(this)[0].prediction1+"%</td>";
				contentHTML +="<td>"+$(this)[0].predictionX+"%</td>";
				contentHTML +="<td>"+$(this)[0].prediction2+"%</td>";
			contentHTML +="</tr>";
		}
	});
	$("#informations").html(contentHTML);
}
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
var predictionXML="";
var match,matchs = [];

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	//$(document).ready(function(){
		$("#transition").fadeOut(500);
	$.ajax({
		type: "GET",
		url: "about.txt",
		dataType: "text",
		success: function(text) {
			$("#aboutContainer").html(text);
		},
		error: function(error) {
			alert("The about File could not be processed correctly : ");
			//console.log(error.responseText);
		}
	});
	$.ajax({
		type: "GET",
		url: "http://"+link+"/XML/prediction.xml",
		dataType: "xml",
		success: function(xml) {
			alert("prediction parsing done.");
			$(xml).find('league').each(function(){
				$(this).find('Match').each(function(){
					match = {};
					match.league 		= $(this).parent().attr('nation');
					match.home 			= $(this).find('HomeTeam').text();
					match.away 			= $(this).find('AwayTeam').text();
					match.prediction1 	= $(this).find('Prediction1').text();
					match.predictionX 	= $(this).find('PredictionX').text();
					match.prediction2 	= $(this).find('Prediction2').text();
					matchs.push(match);
				});
			});
			// console.log(matchs);
			fillIn("england",matchs);
		},
		error: function(error) {
			alert("The XML File could not be processed correctly : ");
			//console.log(error.responseText);
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
	alert("Key pressed: " + keyCode);

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
			$("#enter").parent().removeClass("off");
			$("#exit").fadeIn();
			break;
		case tvKey.KEY_INFO:
			/* *****Sonud Effect*** */
			sound("./sound/InfoTone.mp3");
	        /* ***** End Sonud Effect*** */
			$("#area").val("about");
			$("#Cleft").parent().addClass("off");
			$("#Cright").parent().addClass("off");
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
				$("#Cleft").parent().removeClass("off");
				$("#Cright").parent().removeClass("off");
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
				if($("#top").children(".menuSelected").index()>0)
				{
					$("#top").children(".menuSelected").removeClass("menuSelected").prev().addClass("menuSelected");
				}else{
					$("#top").children(".menuSelected").removeClass("menuSelected");
					$("#top").children(".menuItem").last().addClass("menuSelected");
				}
				fillIn($("#top").children(".menuSelected").text(),matchs);
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
				if($("#top").children(".menuSelected").index()+1<$("#top").children(".menuItem").length)
				{
					$("#top").children(".menuSelected").removeClass("menuSelected").next().addClass("menuSelected");	
				}else{
					$("#top").children(".menuSelected").removeClass("menuSelected");
					$("#top").children(".menuItem").first().addClass("menuSelected");
				}
				fillIn($("#top").children(".menuSelected").text(),matchs);
			}
			else if($("#area").val()=="exit")
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
			sound("./sound/ErrorTone.mp3");
	        /* ***** End Sonud Effect*** */
			if($("#left").children(".selected").index()>1)
			{
				$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected").prev().addClass("selected").children(".x01").addClass("hover");
				var dis = $(".selected").offset().top - $("#left").offset().top;
				if(dis<0)$(".item").animate({"top":"+="+(-dis)},300);
				if(dis>400)$(".item").animate({"top":"-="+(dis-400)},300);
			}else{
				var dis = $(".selected").offset().top - $("#left").offset().top;
				$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected");
				$("#left").children(".item").last().addClass("selected").children(".x01").addClass("hover");
				$(".item").animate({"top":"+="+(dis-650)},300);
			}
			break;
		case tvKey.KEY_DOWN:
			/* *****Sonud Effect*** */
			sound("./sound/ErrorTone.mp3");
	        /* ***** End Sonud Effect*** */
			//console.log($("#left").children(".selected").index(),$("#left").children(".item").length);
			if($("#left").children(".selected").index()<$("#left").children(".item").length-1)
			{
				$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected").next().addClass("selected").children(".x01").addClass("hover");
				var dis = $(".selected").offset().top - $("#left").offset().top;
				if(dis>300)$(".item").animate({"top":"-="+(dis-300)},300);
				if(dis<0)$(".item").animate({"top":"0"},300);
			}else{
				$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected");
				$("#left").children(".item").first().addClass("selected").children(".x01").addClass("hover");
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
					$("#return").parent().removeClass("off");
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