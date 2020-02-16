var iu, ing, ou;
var iv, ov;
var vc, vf, vg;
var ni, l, u, ri, rv, ru, ro, rl, r;
var gasMark = [0,140,150,165,177,190,200,220,230,245,260];
var lang = "en", langOpen = false;
var ingLocked = false;

function main() {
	//initilise all fields
	initLanguage();
	initTabs();
	initWV();
	initRatio();
	initTemp();
	
	//display WV card
	document.getElementById("tabWV").click();
	//document.getElementById("tabRatio").click();
}
function convertIngrediantValue(ingrediant,value,inUnit,outUnit) {
	//get conversion units
	var inU = units[inUnit];
	var outU = units[outUnit];
	
	//calculate conversion
	if(inU.isMass?!outU.isMass:outU.isMass) {
		//mass-volume conversion
		value *= inU.conversion;
		if(inU.isMass) {
			//mass->vol
			value /= ingredients[ingrediant];
		} else {
			//vol->mass
			value *= ingredients[ingrediant];
		}
		return Math.round((value/outU.conversion)*1000)/1000;
	} else {
		//straight conversion
		return Math.round(((value*inU.conversion)/outU.conversion)*1000)/1000;
	}
}
function addOptions(ele,obj,init) {
	//first clear all options
	while(ele.lastChild)
		ele.removeChild(ele.lastChild);
	//add new options
	for(var a in obj) {
		var o = document.createElement("option");
		o.text = getLS(a,lang);
		o.value = a;
		if(a==init)
			o.selected="selected";
		ele.add(o);
	}
}


function initLanguage() {
	//get flag elemets
	var langs = document.getElementsByClassName("language");
	//add listeners
	for(var i=0;i<langs.length;i++) {
		langs[i].addEventListener('click',changeLanguage);
	}
	//hide flags apart from current language
	hideFlags();
}
function changeLanguage(e) {
	if(langOpen) {
		//set language from e.target.id
		lang = e.target.id;
		
		//update title text
		setLSText(document.getElementById("title"),lang);
		
		//update tabs text
		initTabs();
		
		//update Weight/Volume card text
		setLSText(document.getElementById("wvIn"),lang);
		setLSText(document.getElementById("wvIng"),lang);
		setLSText(document.getElementById("wvOut"),lang);
		initWV();
		
		//update Ratio card text
		setLSText(document.getElementById("rIng"),lang);
		setLSText(document.getElementById("newIng"),lang);
		setLSText(document.getElementById("lock"),lang);
		setLSText(document.getElementById("unlock"),lang);
		initRatio();
		
		//update Temp card text
		setLSText(document.getElementById("tCel"),lang);
		setLSText(document.getElementById("tFar"),lang);
		setLSText(document.getElementById("tGas"),lang);
		
		//hide flags
		hideFlags();
		langOpen = false;
	} else {
		//open language menu
		var langs = document.getElementsByClassName("language");
		for(var i=0;i<langs.length;i++)
			langs[i].style.display = "block";
		langOpen = true;
	}
}
function hideFlags() {
	var langs = document.getElementsByClassName("language");
	for(var i=0;i<langs.length;i++) {
		if(langs[i].id!=lang)
			langs[i].style.display = "none";
	}
}

function initTabs() {
	//get tabs
	var tabs = document.getElementsByClassName("tab");
	
	for(var i=0;i<tabs.length;i++) {
		//set language string
		setLSText(tabs[i],lang);
		//remove and add event listener
		tabs[i].removeEventListener('click',selectTab);
		tabs[i].addEventListener('click', selectTab);
	}
}
function selectTab(e) {
	//deselect all tabs & hide all cards
	var tabs = document.getElementsByClassName("tab");
	var cards = document.getElementsByClassName("card");
	for(var i=0;i<tabs.length;i++) {
		//deactivate
		tabs[i].classList.remove("active");
		
		//hide card
		cards[i].style.display = "none";
	}
	
	//select tab
	e.target.classList.add("active");
	//show card
	document.getElementById(tabToCard(e.target.id)).style.display = "block";
}
function tabToCard(tab) {
	return "card"+tab.substring(3);
}


function initWV() {
	//get select fields
	iu = document.getElementById('inputUnit');
	ing = document.getElementById('ingredient');
	ou = document.getElementById('outputUnit');
	
	//get value fields
	iv = document.getElementById('inputValue');
	ov = document.getElementById('outputValue');
	
	//populate select fields
	addOptions(ing,ingredients,"water");
	addOptions(iu,units,"ml");
	addOptions(ou,units,"g");
	
	//remove change listeners
	iv.removeEventListener('change', calculateWV);
	iu.removeEventListener('change', calculateWV);
	ing.removeEventListener('change', calculateWV);
	ou.removeEventListener('change', calculateWV);
	//add change listeners
	iv.addEventListener('change', calculateWV);
	iu.addEventListener('change', calculateWV);
	ing.addEventListener('change', calculateWV);
	ou.addEventListener('change', calculateWV);
	
	//run calculation
	calculateWV();
}
function calculateWV() {
	ov.value = convertIngrediantValue(
		ing.value,
		iv.value,
		iu.value,
		ou.value
	);
}

function initRatio() {
	//get fields
	ni = document.getElementById("newIng");
	l = document.getElementById("lock");
	u = document.getElementById("unlock");
	ri = document.getElementById("ri0");
	rv = document.getElementById("rv0");
	ru = document.getElementById("ru0");
	rl = document.getElementById("ratioList");
	r = 1;
	
	//populate inital dropdown lists
	addOptions(ri,ingredients,"water");
	addOptions(ru,units,"ml");
	
	//make sure ingredients are unlocked
	unlockIngredients();
	
	//initilise the ratio object
	ro = [0];
	
	//destroy extra ingredients
	while(rl.lastChild!=ru) {
		rl.removeChild(rl.lastChild);
	}
	
	//remove/add ingredient listeners
	ri.removeEventListener('change', changeRatioIngredient);
	rv.removeEventListener('change', changeRatioValue);
	ru.removeEventListener('change', changeRatioUnit);
	ri.addEventListener('change', changeRatioIngredient);
	rv.addEventListener('change', changeRatioValue);
	ru.addEventListener('change', changeRatioUnit);
	
	//remove/add button listeners
	ru.removeEventListener('click', addIngredient);
	l.removeEventListener('click', lockIngredients);
	u.removeEventListener('click', unlockIngredients);
	ni.addEventListener('click', addIngredient);
	l.addEventListener('click', lockIngredients);
	u.addEventListener('click', unlockIngredients);
}
function addIngredient() {
	//create ingredient drop down, value field and unit dropdown
	var newRI = ri.cloneNode(true);
	var newRV = rv.cloneNode();
	var newRU = ru.cloneNode(true);
	newRI.id = "ri"+ro.length;
	newRV.id = "rv"+ro.length;
	newRU.id = "ru"+ro.length;
	rl.appendChild(newRI);
	rl.appendChild(newRV);
	rl.appendChild(newRU);
	ro.push(0);
	
	//wire up events
	newRI.addEventListener('change', changeRatioIngredient);
	newRV.addEventListener('change', changeRatioValue);
	newRU.addEventListener('change', changeRatioUnit);
}
function lockIngredients() {
	ingLocked = true;
	
	//hide editing buttons
	ni.style.display = "none";
	l.style.display = "none";
	
	//show reset/unlock
	u.style.display = "inline";
}
function unlockIngredients() {
	ingLocked = false;
	
	//show editing buttons
	ni.style.display = "inline";
	l.style.display = "inline";
	
	//hide reset/unlock
	u.style.display = "none";
}
function changeRatioIngredient(e) {
	//ingrediant can't change when locked
	if(ingLocked) return;
	
	//update ingrediant value in array
	var ingId = getIngredientId(e.target.id);
	ro[ingId] = convertIngrediantValue(
		e.target.value,
		document.getElementById("rv"+ingId).value,
		document.getElementById("ru"+ingId).value,
		"g"
	);
}
function changeRatioValue(e) {
	var ingId = getIngredientId(e.target.id);
	//get new value in grams
	var newVal = convertIngrediantValue(
		document.getElementById("ri"+ingId).value,
		e.target.value,
		document.getElementById("ru"+ingId).value,
		"g"
	);
	if(ingLocked) {
		//calculate new ratio from array
		var ratio = newVal/ro[ingId];
		//update array from ratio
		for(a in ro)
			ro[a] *= ratio;
		//update all values based on array
		for(a in ro) {
			document.getElementById("rv"+a).value = convertIngrediantValue(
				document.getElementById("ri"+a).value,
				ro[a],
				"g",
				document.getElementById("ru"+a).value
			);
		}
		//keep track of recipe ratio
		r *= ratio;
		
	} else {
		//update value in array
		ro[ingId] = newVal;
	}
}
function changeRatioUnit(e) {
	var ingId = getIngredientId(e.target.id);
	
	if(ingLocked) {
		//update display value for this ingredient from array
		document.getElementById("rv"+ingId).value = convertIngrediantValue(
			document.getElementById("ri"+ingId).value,
			ro[ingId],
			"g",
			e.target.value
		);
	} else {
		//update value in array
		ro[ingId] = convertIngrediantValue(
			document.getElementById("ri"+ingId).value,
			document.getElementById("rv"+ingId).value,
			e.target.value,
			"g"
		);
	}
}
function getIngredientId(eleId) {
	return eleId.substr(2);
}


function initTemp() {
	//get value fields
	vc = document.getElementById('inputC');
	vf = document.getElementById('inputF');
	vg = document.getElementById('inputG');
	
	//add onchange listeners
	vc.addEventListener('change', calculateTemperature);
	vf.addEventListener('change', calculateTemperature);
	vg.addEventListener('change', calculateTemperature);
	
	calculateTemperature({target:{id:"inputC"}});
}
function calculateTemperature(e) {
	switch(getTemperatureId(e.target.id)) {
		case "C":
			vf.value = fFromC(vc.value);
			vg.value = gmFromC(vc.value);
			break;
		case "F":
			vc.value = cFromF(vf.value);
			vg.value = gmFromC(vc.value);
			break;
		case "G":
			if(vg.value*1>10) vg.value = 10;
			if(vg.value*1<1) vg.value = 1;
			vc.value = gasMark[vg.value*1];
			vf.value = fFromC(vc.value);
			break;
		default:
			console.log("Unknown input element:");
			console.log(e);
	}
}
function fFromC(c) {
	return Math.round((c/0.55)+32);
}
function cFromF(f) {
	return Math.round((f-32)*0.55);
}
function gmFromC(c) {
	//quick return for limits
	if(c<135) return 0;
	if(c>267.5) return 11;
	
	//find position in range
	var n = 0;
	var diff = 1*c;
	for (var i = 1; i < gasMark.length; i++) {
		var newdiff = Math.abs (c - gasMark[i]);
		if (newdiff < diff) {
			diff = newdiff;
			n = i;
		} else { //abs difference is growing, so we're moving away from our closest value
			break;
		}
	}
	return n;
}
function getTemperatureId(eleId) {
	return eleId.substr(5);
}

//add onload listener
if (window.addEventListener) {
	window.addEventListener('load', main);
} else {
	window.attachEvent('onload', main);
}