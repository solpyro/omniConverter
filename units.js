//unit, isMass flag and conversion to ml (for vol) or g (for mass)
var units = {
	cl: {		isMass: false,	conversion:	10			},
	cup: {		isMass: false,	conversion: 250			},
	cup_uk: {	isMass: false,	conversion: 284.1		},
	cup_us: {	isMass: false,	conversion: 236.588125	},
	dl: {		isMass: false,	conversion: 100			},
	dsp: {		isMass: false,	conversion: 10			},
	g: {		isMass: true,	conversion: 1			},
	floz: {		isMass: false,	conversion:	28.41		},
	floz_us: {	isMass: false,	conversion:	29.5735		},
	kg: {		isMass: true,	conversion: 1000		},
	l:{			isMass: false,	conversion: 1000		},
	lb:{		isMass: true,	conversion: 453.592		},
	ml:{		isMass: false,	conversion: 1			},
	mm: {		isMass: false,	conversion: 1			},
	oz: {		isMass: true,	conversion: 28.3495		},
	pint: {		isMass: false,	conversion: 570			},
	pint_us: {	isMass: false,	conversion: 473.17625	},
	rkl: {		isMass: false,	conversion: 15			},
	tl: {		isMass: false,	conversion: 5			},
	tsp: {		isMass: false,	conversion: 5			},
	tsp_us: {	isMass: false,	conversion: 4.9289192708},
	tbsp: {		isMass: false,	conversion: 20			},
	tbsp_uk: {	isMass: false,	conversion: 15			},
	tbsp_us: {	isMass: false,	conversion: 14.786757812},
	
	//finnish measurements from http://www.dlc.fi/~marian1/gourmet/info_2.htm
};