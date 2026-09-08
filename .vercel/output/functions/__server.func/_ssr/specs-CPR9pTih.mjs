//#region node_modules/.nitro/vite/services/ssr/assets/specs-CPR9pTih.js
var common = [
	{
		key: "width",
		label: "Width",
		min: .5,
		max: 14,
		step: .1,
		tooltip: "Core tube thickness in pixels."
	},
	{
		key: "brightness",
		label: "Brightness",
		min: 0,
		max: 2,
		step: .01,
		tooltip: "Overall neon luminance."
	},
	{
		key: "coreBrightness",
		label: "Core brightness",
		min: 0,
		max: 2.5,
		step: .01,
		tooltip: "Hot white core intensity."
	},
	{
		key: "outerGlow",
		label: "Outer glow",
		min: 0,
		max: 1.5,
		step: .01,
		tooltip: "Atmospheric bloom around the tube."
	},
	{
		key: "innerGlow",
		label: "Inner glow",
		min: 0,
		max: 1.5,
		step: .01,
		tooltip: "Medium-radius colored halo."
	},
	{
		key: "blur",
		label: "Blur",
		min: 0,
		max: 24,
		step: .5,
		tooltip: "Softening radius. Keep low for OBS performance."
	},
	{
		key: "cornerRadius",
		label: "Corner radius",
		min: 0,
		max: 180,
		step: 1,
		tooltip: "Rounded-rect corner size."
	},
	{
		key: "opacity",
		label: "Opacity",
		min: 0,
		max: 1,
		step: .01,
		tooltip: "Master opacity of the overlay."
	},
	{
		key: "animationSpeed",
		label: "Animation speed",
		min: 0,
		max: 4,
		step: .01,
		tooltip: "Global motion multiplier."
	},
	{
		key: "inset",
		label: "Inset",
		min: 8,
		max: 160,
		step: 1,
		tooltip: "Distance of the border from the canvas edge."
	}
];
var BORDER_SPECS = [
	{
		type: "classic-neon-tube",
		name: "Classic Neon Tube",
		number: "01",
		description: "Rounded continuous tube with a bright core and soft outer glow.",
		params: common
	},
	{
		type: "double-line-neon",
		name: "Double-Line Neon",
		number: "02",
		description: "Two parallel glowing lines. Inner line reads brighter.",
		params: [
			...common,
			{
				key: "innerWidth",
				label: "Inner width",
				min: .5,
				max: 8,
				step: .1,
				tooltip: "Thickness of the inner line."
			},
			{
				key: "outerWidth",
				label: "Outer width",
				min: .5,
				max: 10,
				step: .1,
				tooltip: "Thickness of the outer line."
			},
			{
				key: "spacing",
				label: "Spacing",
				min: 2,
				max: 28,
				step: .5,
				tooltip: "Gap between the two tubes."
			},
			{
				key: "innerBrightness",
				label: "Inner brightness",
				min: 0,
				max: 2,
				step: .01,
				tooltip: "Luminance of the inner tube."
			},
			{
				key: "outerBrightness",
				label: "Outer brightness",
				min: 0,
				max: 2,
				step: .01,
				tooltip: "Luminance of the outer tube."
			}
		]
	},
	{
		type: "broken-neon",
		name: "Broken Neon",
		number: "03",
		description: "Intentional glowing gaps and segments, like a failing sign.",
		params: [
			...common,
			{
				key: "segmentCount",
				label: "Segments",
				min: 4,
				max: 48,
				step: 1,
				tooltip: "Number of illuminated segments."
			},
			{
				key: "gapSize",
				label: "Gap size",
				min: .02,
				max: .7,
				step: .01,
				tooltip: "Relative size of dark gaps."
			},
			{
				key: "randomness",
				label: "Randomness",
				min: 0,
				max: 1,
				step: .01,
				tooltip: "Jitter of gap placement."
			}
		]
	},
	{
		type: "corner-bracket-neon",
		name: "Corner-Bracket Neon",
		number: "04",
		description: "Only the corners are illuminated. Open center edges.",
		params: [
			...common,
			{
				key: "cornerLength",
				label: "Corner length",
				min: 12,
				max: 220,
				step: 1,
				tooltip: "Length of each bracket arm."
			},
			{
				key: "thickness",
				label: "Thickness",
				min: .5,
				max: 12,
				step: .1,
				tooltip: "Bracket stroke weight."
			}
		]
	},
	{
		type: "circuit-traced",
		name: "Circuit-Traced Border",
		number: "05",
		description: "Circuit-board traces, nodes, and branching paths.",
		params: [
			...common,
			{
				key: "traceDensity",
				label: "Trace density",
				min: .1,
				max: 1,
				step: .01,
				tooltip: "How packed the traces are."
			},
			{
				key: "nodeCount",
				label: "Nodes",
				min: 2,
				max: 40,
				step: 1,
				tooltip: "Glowing junction pads."
			},
			{
				key: "nodeSize",
				label: "Node size",
				min: 1,
				max: 10,
				step: .1,
				tooltip: "Pad radius."
			},
			{
				key: "branchProbability",
				label: "Branch chance",
				min: 0,
				max: 1,
				step: .01,
				tooltip: "Chance of a side trace."
			}
		]
	},
	{
		type: "electric-arc",
		name: "Electric Arc Border",
		number: "06",
		description: "Irregular electrical arcs traveling around the perimeter.",
		params: [
			...common,
			{
				key: "arcIntensity",
				label: "Arc intensity",
				min: 0,
				max: 1.5,
				step: .01,
				tooltip: "Displacement of the jagged arc."
			},
			{
				key: "branchCount",
				label: "Branches",
				min: 1,
				max: 16,
				step: 1,
				tooltip: "Number of simultaneous arcs."
			},
			{
				key: "randomness",
				label: "Randomness",
				min: 0,
				max: 1,
				step: .01,
				tooltip: "Noise in the arc path."
			},
			{
				key: "thickness",
				label: "Thickness",
				min: .4,
				max: 8,
				step: .1,
				tooltip: "Bolt thickness."
			},
			{
				key: "flicker",
				label: "Flicker",
				min: 0,
				max: 1,
				step: .01,
				tooltip: "How violently the arc strobes."
			}
		]
	},
	{
		type: "laser-edge",
		name: "Laser Edge",
		number: "07",
		description: "Ultra-thin razor-sharp neon line.",
		params: [
			...common,
			{
				key: "thickness",
				label: "Thickness",
				min: .3,
				max: 4,
				step: .05,
				tooltip: "Hairline weight."
			},
			{
				key: "sharpness",
				label: "Sharpness",
				min: 0,
				max: 1,
				step: .01,
				tooltip: "How tight the core is versus bloom."
			}
		]
	},
	{
		type: "neon-rope",
		name: "Neon Rope",
		number: "08",
		description: "Twisted fiber-optic tubular appearance.",
		params: [
			...common,
			{
				key: "strandCount",
				label: "Strands",
				min: 2,
				max: 8,
				step: 1,
				tooltip: "Number of twisted fibers."
			},
			{
				key: "twist",
				label: "Twist",
				min: .2,
				max: 8,
				step: .05,
				tooltip: "Helical turns around the path."
			},
			{
				key: "thickness",
				label: "Thickness",
				min: .5,
				max: 8,
				step: .1,
				tooltip: "Each strand's weight."
			}
		]
	},
	{
		type: "pulse-border",
		name: "Pulse Border",
		number: "09",
		description: "Brightness and thickness expand and contract.",
		params: [
			...common,
			{
				key: "minThickness",
				label: "Min thickness",
				min: .4,
				max: 8,
				step: .1,
				tooltip: "Thinnest point of the pulse."
			},
			{
				key: "maxThickness",
				label: "Max thickness",
				min: 1,
				max: 16,
				step: .1,
				tooltip: "Thickest point of the pulse."
			},
			{
				key: "pulseSpeed",
				label: "Pulse speed",
				min: .1,
				max: 4,
				step: .01,
				tooltip: "Oscillation rate."
			},
			{
				key: "intensity",
				label: "Intensity",
				min: 0,
				max: 1.5,
				step: .01,
				tooltip: "How hard the pulse hits."
			},
			{
				key: "easing",
				label: "Easing",
				min: 0,
				max: 1,
				step: .01,
				tooltip: "0 linear, 1 smooth sinusoidal."
			}
		]
	},
	{
		type: "glitch-border",
		name: "Glitch Border",
		number: "10",
		description: "RGB offsets, duplication, flicker and snap-back.",
		params: [
			...common,
			{
				key: "rgbSeparation",
				label: "RGB separation",
				min: 0,
				max: 18,
				step: .1,
				tooltip: "Chromatic channel offset."
			},
			{
				key: "offsetAmount",
				label: "Offset",
				min: 0,
				max: 24,
				step: .1,
				tooltip: "Positional snap displacement."
			},
			{
				key: "duplication",
				label: "Duplication",
				min: 0,
				max: 4,
				step: 1,
				tooltip: "Ghost copies of the frame."
			},
			{
				key: "glitchFrequency",
				label: "Frequency",
				min: 0,
				max: 1,
				step: .01,
				tooltip: "How often a glitch fires."
			},
			{
				key: "glitchDuration",
				label: "Duration",
				min: .02,
				max: .6,
				step: .01,
				tooltip: "How long a glitch holds."
			},
			{
				key: "flickerIntensity",
				label: "Flicker",
				min: 0,
				max: 1,
				step: .01,
				tooltip: "Opacity chatter during glitch."
			}
		]
	},
	{
		type: "liquid-neon",
		name: "Liquid Neon",
		number: "11",
		description: "Flowing luminous liquid with subtle edge morphing.",
		params: [
			...common,
			{
				key: "flowSpeed",
				label: "Flow speed",
				min: 0,
				max: 3,
				step: .01,
				tooltip: "How fast the liquid travels."
			},
			{
				key: "distortion",
				label: "Distortion",
				min: 0,
				max: 1.5,
				step: .01,
				tooltip: "Wave amplitude along the edge."
			},
			{
				key: "morphAmount",
				label: "Morph",
				min: 0,
				max: 24,
				step: .1,
				tooltip: "Pixel displacement of the silhouette."
			},
			{
				key: "viscosity",
				label: "Viscosity",
				min: 0,
				max: 1,
				step: .01,
				tooltip: "How heavy and slow the liquid feels."
			},
			{
				key: "turbulence",
				label: "Turbulence",
				min: 0,
				max: 1.5,
				step: .01,
				tooltip: "High-frequency surface noise."
			}
		]
	},
	{
		type: "plasma-border",
		name: "Plasma Border",
		number: "12",
		description: "Turbulent energetic plasma around the edge.",
		params: [
			...common,
			{
				key: "turbulence",
				label: "Turbulence",
				min: 0,
				max: 1.5,
				step: .01,
				tooltip: "Chaotic field energy."
			},
			{
				key: "plasmaSpeed",
				label: "Plasma speed",
				min: 0,
				max: 3,
				step: .01,
				tooltip: "Field evolution rate."
			},
			{
				key: "intensity",
				label: "Intensity",
				min: 0,
				max: 1.5,
				step: .01,
				tooltip: "Brightness of the plasma sheet."
			},
			{
				key: "particleDensity",
				label: "Density",
				min: 0,
				max: 1.5,
				step: .01,
				tooltip: "How filled-in the plasma is."
			},
			{
				key: "distortion",
				label: "Distortion",
				min: 0,
				max: 1.5,
				step: .01,
				tooltip: "Warp of the plasma ribbon."
			}
		]
	}
];
Object.fromEntries(BORDER_SPECS.map((s) => [s.type, s]));
var ANIMATION_SPECS = [
	{
		type: "neon-pulse",
		name: "Neon Pulse",
		number: "01",
		description: "Low → bright → ultra bright → low."
	},
	{
		type: "electric-flicker",
		name: "Electric Flicker",
		number: "02",
		description: "Random micro-flickers travel the tube."
	},
	{
		type: "energy-chase",
		name: "Energy Chase",
		number: "03",
		description: "A highlight continuously travels the perimeter."
	},
	{
		type: "dual-energy-chase",
		name: "Dual Energy Chase",
		number: "04",
		description: "Two highlights travel in opposite directions."
	},
	{
		type: "plasma-flow",
		name: "Plasma Flow",
		number: "05",
		description: "Color and brightness flow through the border."
	},
	{
		type: "neon-spark",
		name: "Neon Spark",
		number: "06",
		description: "Small electrical sparks jump from the border."
	},
	{
		type: "electric-arc-burst",
		name: "Electric Arc Burst",
		number: "07",
		description: "Lightning branches appear and vanish."
	},
	{
		type: "glitch-flicker",
		name: "Glitch Flicker",
		number: "08",
		description: "Brief RGB split, offset, duplication and snap-back."
	},
	{
		type: "scanline-sweep",
		name: "Scanline Sweep",
		number: "09",
		description: "A bright light sweeps across the frame."
	},
	{
		type: "rgb-chromatic-shift",
		name: "RGB Chromatic Shift",
		number: "10",
		description: "Colored fringes separate during motion."
	},
	{
		type: "breathing-glow",
		name: "Breathing Glow",
		number: "11",
		description: "Slow smooth glow expansion and contraction."
	},
	{
		type: "strobe-flash",
		name: "Strobe Flash",
		number: "12",
		description: "Very short intense flashes. Use sparingly."
	},
	{
		type: "particle-dissolve",
		name: "Particle Dissolve",
		number: "13",
		description: "Border breaks into particles and reforms."
	},
	{
		type: "energy-build",
		name: "Energy Build",
		number: "14",
		description: "Charges from nearly invisible to full brightness."
	},
	{
		type: "energy-collapse",
		name: "Energy Collapse",
		number: "15",
		description: "Full energy fades through flicker into darkness."
	},
	{
		type: "lightning-crawl",
		name: "Lightning Crawl",
		number: "16",
		description: "Chaotic electrical branches crawl the border."
	},
	{
		type: "holographic-shimmer",
		name: "Holographic Shimmer",
		number: "17",
		description: "Translucent rainbow highlight sweeps through."
	},
	{
		type: "magnetic-distortion",
		name: "Magnetic Distortion",
		number: "18",
		description: "Subtle electromagnetic bending of the edge."
	},
	{
		type: "heat-haze",
		name: "Heat Haze",
		number: "19",
		description: "Localized distortion around the glowing edge."
	},
	{
		type: "audio-reactive-neon",
		name: "Audio-Reactive Neon",
		number: "20",
		description: "Bass thickness, mids brightness, treble sparks."
	}
];
var PROPERTY_LABELS = {
	borderThickness: "Border thickness",
	glow: "Glow",
	particleSize: "Particle size",
	particleCount: "Particle count",
	brightness: "Brightness",
	scale: "Scale",
	sparkProbability: "Spark probability",
	gradientMovement: "Gradient movement",
	distortion: "Distortion",
	colorIntensity: "Color intensity",
	flash: "Flash"
};
var BAND_LABELS = {
	bass: "Bass",
	mids: "Mids",
	treble: "Treble",
	volume: "Volume",
	energy: "Energy",
	snare: "Snare",
	vocals: "Vocals",
	drop: "Drop"
};
//#endregion
export { PROPERTY_LABELS as i, BAND_LABELS as n, BORDER_SPECS as r, ANIMATION_SPECS as t };
