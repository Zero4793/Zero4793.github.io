// jQuery onLoad: this will run once the DOM has been loaded
// This is a jQuery shortcut for document.onload()
$(function () {
	$("#UIMode").click(toggleMode);
});


function toggleMode() {
	if ($(this).text() == "Light Mode") {
		//change text
		$(this).text("Dark Mode");
		//change colours
		document.documentElement.style.setProperty('--bg0', '#aaa');
		document.documentElement.style.setProperty('--bg1', '#ccc');
		document.documentElement.style.setProperty('--fg0', '#222');
		document.documentElement.style.setProperty('--fg1', '#333');
		document.documentElement.style.setProperty('--hl1', '#a2a');
		document.documentElement.style.setProperty('--hl2', '#808');
		document.documentElement.style.setProperty('--ERR', '#f00');
		document.documentElement.style.setProperty('--WIN', '#2e2');
		document.documentElement.style.setProperty('--GOLD', '#fe6');
		//score background change to bg1
		$("#score").css("background",'var(--bg0)')
	}
	else {
		//change text
		$(this).text("Light Mode");
		//change colours
		document.documentElement.style.setProperty('--bg0', '#222');
		document.documentElement.style.setProperty('--bg1', '#333');
		document.documentElement.style.setProperty('--fg0', '#aaa');
		document.documentElement.style.setProperty('--fg1', '#ccc');
		document.documentElement.style.setProperty('--hl1', '#c8c');
		document.documentElement.style.setProperty('--hl2', '#a6a');
		document.documentElement.style.setProperty('--ERR', '#f44');
		document.documentElement.style.setProperty('--WIN', '#4d4');
		document.documentElement.style.setProperty('--GOLD', '#fa0');
		//score background change to bg0
		$("#score").css("background",'var(--bg1)')
	}
}