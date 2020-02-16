var ls = {
	//app strings
	celcius: {			en: "Celcius", 			ee: "Celcius",			},
	farenheit: {		en: "Farenheit", 		ee: "Farenheit",		},
	gas_mark: {			en: "Gas Mark",			ee: "", },
	ingredient: {		en: "Ingredient",		ee: "Koostisosa",		},
	ingredients: {		en: "Ingredients",		ee: "Koostisosad",		},
	ingredient_add: {	en: "+ Ingredient",		ee: "+ Koostisosa",		},
	input: {			en: "Input",			ee: "Sisend",			},
	output: {			en: "Output",			ee: "Väljund",			},
	ratio: {			en: "Find Ratio",		ee: "Leia Suhe",		},
	ratio_lock: {		en: "Lock Ratio",		ee: "Luku Suhe",		},
	ratio_unlock: {		en: "Unlock Ratio",		ee: "Avage Suhe",		},
	temp: {				en: "Temp",				ee: "Temp",				},
	title: {			en: "Omni Converter",	ee: "Omni Konverter",	},
	weight_vol: {		en: "Weight & Volume",	ee: "Kaal & Maht",		},
	
	//units
	cl: {		en: "cl",			ee: "cl",			},
	cup: {		en: "cup",			ee: "klaas",		},
	cup_uk: {	en: "cup (UK)",		ee: "klaas (UK)",	},
	cup_us: {	en: "cup (US)",		ee: "klaas (US)",	},
	dl: {		en: "dl",			ee: "dl",			},
	dsp: {		en: "dsp.",			ee: "",	},
	floz: {		en: "fl.oz.",		ee: "",	},
	floz_us: {	en: "fl.oz.",		ee: "",	},
	g: {		en: "g",			ee: "g",			},
	kg: {		en: "kg",			ee: "kg",			},
	l: {		en: "l",			ee: "l",			},
	lb: {		en: "lb",			ee: "",	},
	ml: {		en: "ml",			ee: "ml",			},
	mm: {		en: "mm [ml]",		ee: "mm",			},
	oz: {		en: "oz",			ee: "",	},
	pint: {		en: "pint",			ee: "",	},
	pint_us: {	en: "pint (US)",	ee: "",	},
	rkl: {		en: "rkl [tbsp]",	ee: "rkl",			},
	tl: {		en: "tl [tsp]",		ee: "tl",			},
	tsp: {		en: "tsp.",			ee: "tsp. [tl]",	},
	tsp_us: {	en: "tsp. (US)",	ee: "tsp. (US)",	},
	tbsp: {		en: "tbsp.",		ee: "tbsp [rkl]",	},
	tbsp_uk: {	en: "tbsp. (UK)",	ee: "tbsp. (UK)",	},
	tbsp_us: {	en: "tbsp. (US)",	ee: "tbsp. (US)",	},
	
	//ingredients
	apple: {		en: "Apple, Diced",		ee: "Õun",					},
	butter: {		en: "Butter",			ee: "Või",					},
	cocoa: {		en: "Cocoa Powder",		ee: "Kakaopulber",			},
	cdmn_grnd: {	en: "Cardomon, Ground",	ee: "Kardemonipulber",		},
	cnmn_grnd: {	en: "Cinnamon, Ground",	ee: "Kaneelipulber",		},
	cloves_grnd: {	en: "Cloves, Ground",	ee: "Nelkpulber",			},
	cornstarch: {	en: "Cornstarch",		ee: "Maisjahu",				},
	cream: {		en: "Cream",			ee: "Koor",					},
	egg: {			en: "Egg",				ee: "Muna",					},
	flour: {		en: "Flour, Plain",		ee: "Jahu",					},
	flour_brn: {	en: "Flour, Wholemeal",	ee: "Täisterjahu",			},
	flour_rye: {	en: "Flour, Rye",		ee: "Rukkijahu",			},
	honey: {		en: "Honey",			ee: "Mesi",					},
	milk: {			en: "Milk",				ee: "Piim",					},
	mustard: {		en: "Mustard",			ee: "Sinep",				},
	mustard_pwdr: {	en: "Mustard powder",	ee: "Sinepipulber",			},
	mustard_seed: {	en: "Mustard seeds",	ee: "Sinepiseemned",		},
	peanut_butter: {en: "Peanut butter",	ee: "Pähklivõi",			},
	porridge: {		en: "Porridge",			ee: "Puder",				},
	rice_brn: {		en: "Rice, Brown",		ee: "Riis, Pruun",			},
	rice_wht: {		en: "Rice, White",		ee: "Riis, Valge",			},
	salt: {			en: "Salt",				ee: "Sool",					},
	sugar_brwn: {	en: "Sugar, Brown",		ee: "Suhkur, Pruun",		},
	sugar_cast: {	en: "Sugar, Caster",	ee: "Roosuhkur",			},
	sugar_gran: {	en: "Sugar, Granulated",ee: "Suhkur, Granuleeritud",},
	sugar_ice: {	en: "Sugar, Icing",		ee: "Tuhksuhkur",			},
	tahini: {		en: "Tahini",			ee: "", },
	vinegar: {		en: "Vinegar",			ee: "Äädikas",				},
	water: {		en: "Water",			ee: "Vesi",					},
	yeast_dried: {	en: "Yeast, Dried",		ee: "Pärm, Kuivatatud",		},
};

function getLS(key, language, defaultLanguage) {
	if(defaultLanguage==undefined)
		defaultLanguage = "en";
	
	if(ls[key]==undefined) {
		console.log("No language string for key: "+key);
		return "["+key+"]";
	}
	
	if(ls[key][language]!=undefined&&ls[key][language]!="")
		return ls[key][language];
	else 
		console.log("No "+language+" language string for key: "+key);
	
	if(ls[key][defaultLanguage]!=undefined)
		return language+"_"+ls[key][defaultLanguage];
	
	
	console.log("No "+defaultLanguage+" language string for key: "+key);
	return "["+key+"]";
}
function setLSText(ele, language, defaultLanguage) {
	ele.innerHTML = getLS(ele.getAttribute("ls"), language, defaultLanguage);
}