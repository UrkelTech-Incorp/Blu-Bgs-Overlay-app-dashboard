import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-D_OElsu4.js
function uid(prefix = "id") {
	return `${prefix}-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
function defaultBorder(partial = {}) {
	return {
		type: "classic-neon-tube",
		width: 3.2,
		brightness: 1,
		coreBrightness: 1.15,
		outerGlow: .72,
		innerGlow: .85,
		blur: 8,
		cornerRadius: 28,
		opacity: 1,
		animationSpeed: 1,
		inset: 36,
		innerWidth: 2,
		outerWidth: 4,
		spacing: 10,
		innerBrightness: 1.2,
		outerBrightness: .7,
		segmentCount: 18,
		gapSize: .22,
		randomness: .35,
		cornerLength: 72,
		thickness: 3,
		traceDensity: .65,
		nodeCount: 14,
		nodeSize: 3.4,
		branchProbability: .45,
		arcIntensity: .7,
		branchCount: 6,
		flicker: .4,
		sharpness: .9,
		strandCount: 3,
		twist: 2.4,
		minThickness: 1.5,
		maxThickness: 7,
		pulseSpeed: 1,
		intensity: .8,
		easing: .5,
		rgbSeparation: 4,
		offsetAmount: 6,
		duplication: 2,
		glitchFrequency: .35,
		glitchDuration: .12,
		flickerIntensity: .55,
		flowSpeed: .8,
		distortion: .45,
		morphAmount: 8,
		viscosity: .55,
		turbulence: .5,
		plasmaSpeed: .7,
		particleDensity: .6,
		...partial
	};
}
function defaultGlow(partial = {}) {
	return {
		coreWidth: 2,
		coreBrightness: 1,
		innerRadius: 8,
		innerOpacity: .8,
		outerRadius: 40,
		outerOpacity: .35,
		...partial
	};
}
function defaultColors(partial = {}) {
	return {
		primary: "#00FFFF",
		secondary: "#FF00FF",
		accent: "#FFF4D6",
		gradientEnabled: true,
		gradientStops: [{
			offset: 0,
			color: "#00FFFF"
		}, {
			offset: 1,
			color: "#FF00FF"
		}],
		reverseGradient: false,
		animateGradient: true,
		gradientSpeed: .35,
		opacity: 1,
		saturation: 1,
		brightness: 1,
		colorReactive: true,
		...partial
	};
}
function defaultParticles(partial = {}) {
	return {
		enabled: true,
		preset: "sparks",
		count: 80,
		size: 1.8,
		speed: 40,
		lifetime: 1.4,
		gravity: 12,
		turbulence: .4,
		direction: -90,
		glow: .7,
		opacity: .9,
		color: "#00FFFF",
		audioResponse: .65,
		maxParticles: 250,
		...partial
	};
}
function makeAnimation(type, extra = {}) {
	return {
		type,
		enabled: true,
		speed: 1,
		intensity: .75,
		frequency: 1,
		direction: 1,
		blendMode: "lighter",
		...extra
	};
}
function defaultMappings() {
	return [
		{
			id: "map-bass-thick",
			enabled: true,
			band: "bass",
			property: "borderThickness",
			min: 0,
			max: 1,
			smoothing: .45,
			curve: "ease-out"
		},
		{
			id: "map-bass-glow",
			enabled: true,
			band: "bass",
			property: "glow",
			min: 0,
			max: 1,
			smoothing: .4,
			curve: "linear"
		},
		{
			id: "map-mid-grad",
			enabled: true,
			band: "mids",
			property: "gradientMovement",
			min: 0,
			max: 1,
			smoothing: .35,
			curve: "linear"
		},
		{
			id: "map-treble-spark",
			enabled: true,
			band: "treble",
			property: "sparkProbability",
			min: 0,
			max: 1,
			smoothing: .2,
			curve: "exponential"
		},
		{
			id: "map-snare-flash",
			enabled: true,
			band: "snare",
			property: "flash",
			min: 0,
			max: 1,
			smoothing: .08,
			curve: "ease-out"
		},
		{
			id: "map-energy-part",
			enabled: true,
			band: "energy",
			property: "particleCount",
			min: 0,
			max: 1,
			smoothing: .5,
			curve: "linear"
		}
	];
}
function defaultAudio(partial = {}) {
	return {
		enabled: true,
		source: "demo",
		mappings: defaultMappings(),
		colorReactive: true,
		...partial
	};
}
function createDefaultProject(partial = {}) {
	const now = Date.now();
	return {
		id: uid("prj"),
		name: "Untitled Overlay",
		version: "1.0",
		createdAt: now,
		updatedAt: now,
		canvas: {
			width: 1920,
			height: 1080,
			fps: 60
		},
		border: defaultBorder(),
		colors: defaultColors(),
		glow: defaultGlow(),
		animations: [
			makeAnimation("energy-chase", {
				speed: 1,
				intensity: .8
			}),
			makeAnimation("breathing-glow", {
				speed: .5,
				intensity: .7
			}),
			makeAnimation("audio-reactive-neon", { intensity: .85 })
		],
		particles: defaultParticles(),
		audio: defaultAudio(),
		outputMode: "full-neon",
		quality: "high",
		...partial
	};
}
var NEON_COLORS = [
	{
		name: "Electric Cyan",
		hex: "#00FFFF",
		rgb: [
			0,
			255,
			255
		],
		family: "cyan"
	},
	{
		name: "Neon Cyan",
		hex: "#00F5FF",
		rgb: [
			0,
			245,
			255
		],
		family: "cyan"
	},
	{
		name: "Laser Blue",
		hex: "#008CFF",
		rgb: [
			0,
			140,
			255
		],
		family: "cyan"
	},
	{
		name: "Electric Blue",
		hex: "#0066FF",
		rgb: [
			0,
			102,
			255
		],
		family: "cyan"
	},
	{
		name: "Plasma Blue",
		hex: "#00BFFF",
		rgb: [
			0,
			191,
			255
		],
		family: "cyan"
	},
	{
		name: "Deep Neon Blue",
		hex: "#0055FF",
		rgb: [
			0,
			85,
			255
		],
		family: "cyan"
	},
	{
		name: "Neon Purple",
		hex: "#B026FF",
		rgb: [
			176,
			38,
			255
		],
		family: "purple"
	},
	{
		name: "Electric Violet",
		hex: "#8F00FF",
		rgb: [
			143,
			0,
			255
		],
		family: "purple"
	},
	{
		name: "Ultra Violet",
		hex: "#6A00FF",
		rgb: [
			106,
			0,
			255
		],
		family: "purple"
	},
	{
		name: "Neon Magenta",
		hex: "#FF00FF",
		rgb: [
			255,
			0,
			255
		],
		family: "purple"
	},
	{
		name: "Plasma Purple",
		hex: "#C000FF",
		rgb: [
			192,
			0,
			255
		],
		family: "purple"
	},
	{
		name: "Hot Pink",
		hex: "#FF1493",
		rgb: [
			255,
			20,
			147
		],
		family: "pink"
	},
	{
		name: "Neon Pink",
		hex: "#FF2D95",
		rgb: [
			255,
			45,
			149
		],
		family: "pink"
	},
	{
		name: "Electric Pink",
		hex: "#FF00AA",
		rgb: [
			255,
			0,
			170
		],
		family: "pink"
	},
	{
		name: "Neon Red",
		hex: "#FF0033",
		rgb: [
			255,
			0,
			51
		],
		family: "pink"
	},
	{
		name: "Laser Red",
		hex: "#FF1744",
		rgb: [
			255,
			23,
			68
		],
		family: "pink"
	},
	{
		name: "Neon Green",
		hex: "#39FF14",
		rgb: [
			57,
			255,
			20
		],
		family: "green"
	},
	{
		name: "Electric Green",
		hex: "#00FF66",
		rgb: [
			0,
			255,
			102
		],
		family: "green"
	},
	{
		name: "Laser Green",
		hex: "#00FF00",
		rgb: [
			0,
			255,
			0
		],
		family: "green"
	},
	{
		name: "Plasma Green",
		hex: "#00FF9D",
		rgb: [
			0,
			255,
			157
		],
		family: "green"
	},
	{
		name: "Toxic Green",
		hex: "#7FFF00",
		rgb: [
			127,
			255,
			0
		],
		family: "green"
	},
	{
		name: "Neon Yellow",
		hex: "#FFFF00",
		rgb: [
			255,
			255,
			0
		],
		family: "yellow"
	},
	{
		name: "Electric Yellow",
		hex: "#EFFF00",
		rgb: [
			239,
			255,
			0
		],
		family: "yellow"
	},
	{
		name: "Neon Gold",
		hex: "#FFD600",
		rgb: [
			255,
			214,
			0
		],
		family: "yellow"
	},
	{
		name: "Neon Orange",
		hex: "#FF6600",
		rgb: [
			255,
			102,
			0
		],
		family: "yellow"
	},
	{
		name: "Plasma Orange",
		hex: "#FF4500",
		rgb: [
			255,
			69,
			0
		],
		family: "yellow"
	},
	{
		name: "Cream / Ivory",
		hex: "#FFF4D6",
		rgb: [
			255,
			244,
			214
		],
		family: "special"
	},
	{
		name: "Bronze Gold",
		hex: "#C58B3A",
		rgb: [
			197,
			139,
			58
		],
		family: "special"
	},
	{
		name: "Black Structure",
		hex: "#050505",
		rgb: [
			5,
			5,
			5
		],
		family: "special"
	},
	{
		name: "Accent Cyan",
		hex: "#00FFFF",
		rgb: [
			0,
			255,
			255
		],
		family: "special"
	},
	{
		name: "Accent Pink",
		hex: "#FF1493",
		rgb: [
			255,
			20,
			147
		],
		family: "special"
	},
	{
		name: "Accent Purple",
		hex: "#B026FF",
		rgb: [
			176,
			38,
			255
		],
		family: "special"
	}
];
var COLOR_FAMILIES = [
	{
		id: "cyan",
		label: "Cyan / Blue"
	},
	{
		id: "purple",
		label: "Purple / Violet"
	},
	{
		id: "pink",
		label: "Pink / Red"
	},
	{
		id: "green",
		label: "Green"
	},
	{
		id: "yellow",
		label: "Yellow / Orange"
	},
	{
		id: "special",
		label: "Special BLU-BGS"
	}
];
var COLOR_COMBOS = [
	{
		id: "cyberpunk",
		name: "Cyberpunk",
		colors: ["#00FFFF", "#FF00FF"]
	},
	{
		id: "synthwave",
		name: "Synthwave",
		colors: ["#8F00FF", "#FF1493"]
	},
	{
		id: "cyber-blue",
		name: "Cyber Blue",
		colors: ["#0066FF", "#00FFFF"]
	},
	{
		id: "toxic",
		name: "Toxic",
		colors: ["#39FF14", "#FFFF00"]
	},
	{
		id: "plasma",
		name: "Plasma",
		colors: ["#B026FF", "#008CFF"]
	},
	{
		id: "fire",
		name: "Fire",
		colors: [
			"#FF0033",
			"#FF6600",
			"#FFFF00"
		]
	},
	{
		id: "arctic",
		name: "Arctic",
		colors: [
			"#00FFFF",
			"#FFFFFF",
			"#0066FF"
		]
	},
	{
		id: "ultraviolet",
		name: "Ultraviolet",
		colors: [
			"#FF00FF",
			"#8F00FF",
			"#0066FF"
		]
	},
	{
		id: "street-luxury",
		name: "BLU-BGS Street Luxury",
		colors: [
			"#FFF4D6",
			"#C58B3A",
			"#050505",
			"#00FFFF"
		]
	}
];
function hexToRgb(hex) {
	const n = hex.replace("#", "").trim();
	const full = n.length === 3 ? n.split("").map((c) => c + c).join("") : n;
	const v = Number.parseInt(full.slice(0, 6), 16);
	if (Number.isNaN(v)) return [
		0,
		255,
		255
	];
	return [
		v >> 16 & 255,
		v >> 8 & 255,
		v & 255
	];
}
function rgbToHex(r, g, b) {
	const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
	return "#" + [
		clamp(r),
		clamp(g),
		clamp(b)
	].map((c) => c.toString(16).padStart(2, "0")).join("").toUpperCase();
}
function hexToRgba(hex, alpha = 1) {
	const [r, g, b] = hexToRgb(hex);
	return `rgba(${r},${g},${b},${alpha})`;
}
function mixHex(a, b, t) {
	const [ar, ag, ab] = hexToRgb(a);
	const [br, bg, bb] = hexToRgb(b);
	return rgbToHex(ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t);
}
function adjustHex(hex, sat, bri) {
	const [r, g, b] = hexToRgb(hex);
	const avg = (r + g + b) / 3;
	const sr = avg + (r - avg) * sat;
	const sg = avg + (g - avg) * sat;
	const sb = avg + (b - avg) * sat;
	return rgbToHex(sr * bri, sg * bri, sb * bri);
}
function hslToHex(h, s, l) {
	const a = s * Math.min(l, 1 - l);
	const f = (n) => {
		const k = (n + h / 30) % 12;
		return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
	};
	return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255);
}
function pack(id, name, category, description, project) {
	const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = project;
	return {
		id,
		name,
		category,
		description,
		project: rest
	};
}
var BUILTIN_PRESETS = [
	pack("blu-cyberpunk", "BLU-BGS Cyberpunk", "Cyberpunk", "Electric cyan / magenta tube with dual chase and glitch bite.", createDefaultProject({
		name: "BLU-BGS Cyberpunk",
		border: defaultBorder({
			type: "classic-neon-tube",
			width: 3.4,
			cornerRadius: 22
		}),
		colors: defaultColors({
			primary: "#00FFFF",
			secondary: "#FF00FF",
			gradientStops: [{
				offset: 0,
				color: "#00FFFF"
			}, {
				offset: 1,
				color: "#FF00FF"
			}]
		}),
		animations: [
			makeAnimation("energy-chase", {
				speed: 1.1,
				intensity: .85
			}),
			makeAnimation("breathing-glow", {
				speed: .55,
				intensity: .7
			}),
			makeAnimation("glitch-flicker", {
				intensity: .35,
				frequency: .6
			}),
			makeAnimation("audio-reactive-neon", { intensity: .9 })
		],
		particles: defaultParticles({
			preset: "sparks",
			color: "#00FFFF"
		})
	})),
	pack("blu-synthwave", "BLU-BGS Synthwave", "Synthwave", "Violet dusk, pink horizon, slow holographic shimmer.", createDefaultProject({
		name: "BLU-BGS Synthwave",
		border: defaultBorder({
			type: "double-line-neon",
			spacing: 12,
			cornerRadius: 8
		}),
		colors: defaultColors({
			primary: "#8F00FF",
			secondary: "#FF1493",
			gradientStops: [{
				offset: 0,
				color: "#8F00FF"
			}, {
				offset: 1,
				color: "#FF1493"
			}]
		}),
		animations: [
			makeAnimation("dual-energy-chase", {
				speed: .7,
				intensity: .8
			}),
			makeAnimation("holographic-shimmer", { intensity: .7 }),
			makeAnimation("breathing-glow", {
				speed: .4,
				intensity: .8
			})
		],
		particles: defaultParticles({
			preset: "holographic",
			color: "#FF1493",
			count: 60
		})
	})),
	pack("blu-plasma", "BLU-BGS Plasma", "Plasma", "Turbulent purple-blue field crawling the edge.", createDefaultProject({
		name: "BLU-BGS Plasma",
		border: defaultBorder({
			type: "plasma-border",
			turbulence: .7,
			plasmaSpeed: .9,
			intensity: 1
		}),
		colors: defaultColors({
			primary: "#B026FF",
			secondary: "#008CFF",
			gradientStops: [{
				offset: 0,
				color: "#B026FF"
			}, {
				offset: 1,
				color: "#008CFF"
			}]
		}),
		glow: defaultGlow({
			outerRadius: 52,
			outerOpacity: .42
		}),
		animations: [
			makeAnimation("plasma-flow", {
				speed: 1.1,
				intensity: .9
			}),
			makeAnimation("neon-spark", { intensity: .5 }),
			makeAnimation("audio-reactive-neon", { intensity: .8 })
		],
		particles: defaultParticles({
			preset: "plasma",
			color: "#B026FF",
			count: 110
		})
	})),
	pack("blu-electric", "BLU-BGS Electric", "Plasma", "Arc-driven border with crawl lightning and snare bursts.", createDefaultProject({
		name: "BLU-BGS Electric",
		border: defaultBorder({
			type: "electric-arc",
			arcIntensity: .85,
			branchCount: 8,
			flicker: .55
		}),
		colors: defaultColors({
			primary: "#00F5FF",
			secondary: "#FFFFFF",
			gradientEnabled: false
		}),
		animations: [
			makeAnimation("lightning-crawl", {
				intensity: .9,
				speed: 1.3
			}),
			makeAnimation("electric-flicker", { intensity: .6 }),
			makeAnimation("electric-arc-burst", { intensity: .75 }),
			makeAnimation("audio-reactive-neon", { intensity: 1 })
		],
		particles: defaultParticles({
			preset: "electric",
			color: "#00F5FF",
			count: 90
		})
	})),
	pack("blu-street", "BLU-BGS Street Luxury", "Street Luxury", "Ivory tube, bronze structure, cyan/pink jewelry lights.", createDefaultProject({
		name: "BLU-BGS Street Luxury",
		border: defaultBorder({
			type: "classic-neon-tube",
			width: 3.8,
			cornerRadius: 18,
			outerGlow: .55
		}),
		colors: defaultColors({
			primary: "#FFF4D6",
			secondary: "#C58B3A",
			accent: "#00FFFF",
			gradientStops: [
				{
					offset: 0,
					color: "#FFF4D6"
				},
				{
					offset: .55,
					color: "#C58B3A"
				},
				{
					offset: 1,
					color: "#00FFFF"
				}
			]
		}),
		animations: [
			makeAnimation("energy-chase", {
				speed: .55,
				intensity: .6
			}),
			makeAnimation("breathing-glow", {
				speed: .35,
				intensity: .55
			}),
			makeAnimation("holographic-shimmer", { intensity: .25 })
		],
		particles: defaultParticles({
			preset: "dust",
			color: "#C58B3A",
			count: 40,
			gravity: 4
		})
	})),
	pack("blu-arctic", "BLU-BGS Arctic", "Arctic", "Ice-thin laser edge, glacial breath, white core.", createDefaultProject({
		name: "BLU-BGS Arctic",
		border: defaultBorder({
			type: "laser-edge",
			thickness: 1.1,
			sharpness: .92,
			cornerRadius: 4
		}),
		colors: defaultColors({
			primary: "#00FFFF",
			secondary: "#FFFFFF",
			accent: "#0066FF",
			gradientStops: [{
				offset: 0,
				color: "#00FFFF"
			}, {
				offset: 1,
				color: "#FFFFFF"
			}]
		}),
		animations: [
			makeAnimation("breathing-glow", {
				speed: .3,
				intensity: .7
			}),
			makeAnimation("scanline-sweep", {
				speed: .45,
				intensity: .5
			}),
			makeAnimation("holographic-shimmer", { intensity: .4 })
		],
		particles: defaultParticles({
			preset: "dust",
			color: "#FFFFFF",
			count: 50,
			gravity: -6
		})
	})),
	pack("blu-toxic", "BLU-BGS Toxic", "Toxic", "Acid green broken tube with yellow plasma drip.", createDefaultProject({
		name: "BLU-BGS Toxic",
		border: defaultBorder({
			type: "broken-neon",
			segmentCount: 16,
			gapSize: .18,
			randomness: .4
		}),
		colors: defaultColors({
			primary: "#39FF14",
			secondary: "#FFFF00",
			gradientStops: [{
				offset: 0,
				color: "#39FF14"
			}, {
				offset: 1,
				color: "#FFFF00"
			}]
		}),
		animations: [
			makeAnimation("electric-flicker", { intensity: .55 }),
			makeAnimation("neon-pulse", {
				speed: .8,
				intensity: .7
			}),
			makeAnimation("neon-spark", { intensity: .6 }),
			makeAnimation("audio-reactive-neon", { intensity: .85 })
		],
		particles: defaultParticles({
			preset: "plasma",
			color: "#7FFF00",
			count: 80
		})
	})),
	pack("blu-fire", "BLU-BGS Fire", "Fire", "Liquid neon in red-orange-gold with ember particles.", createDefaultProject({
		name: "BLU-BGS Fire",
		border: defaultBorder({
			type: "liquid-neon",
			flowSpeed: 1.1,
			morphAmount: 10,
			viscosity: .4
		}),
		colors: defaultColors({
			primary: "#FF0033",
			secondary: "#FF6600",
			accent: "#FFFF00",
			gradientStops: [
				{
					offset: 0,
					color: "#FF0033"
				},
				{
					offset: .5,
					color: "#FF6600"
				},
				{
					offset: 1,
					color: "#FFFF00"
				}
			]
		}),
		animations: [
			makeAnimation("plasma-flow", {
				speed: 1.2,
				intensity: .8
			}),
			makeAnimation("heat-haze", { intensity: .7 }),
			makeAnimation("neon-pulse", {
				speed: .9,
				intensity: .65
			}),
			makeAnimation("audio-reactive-neon", { intensity: .9 })
		],
		particles: defaultParticles({
			preset: "embers",
			color: "#FF4500",
			count: 120,
			gravity: -18
		})
	})),
	pack("blu-uv", "BLU-BGS Ultraviolet", "Ultraviolet", "Magenta / violet / blue rope with chromatic shift.", createDefaultProject({
		name: "BLU-BGS Ultraviolet",
		border: defaultBorder({
			type: "neon-rope",
			strandCount: 4,
			twist: 3.2,
			thickness: 2.2
		}),
		colors: defaultColors({
			primary: "#FF00FF",
			secondary: "#8F00FF",
			accent: "#0066FF",
			gradientStops: [
				{
					offset: 0,
					color: "#FF00FF"
				},
				{
					offset: .5,
					color: "#8F00FF"
				},
				{
					offset: 1,
					color: "#0066FF"
				}
			]
		}),
		animations: [
			makeAnimation("rgb-chromatic-shift", { intensity: .55 }),
			makeAnimation("dual-energy-chase", {
				speed: .9,
				intensity: .7
			}),
			makeAnimation("holographic-shimmer", { intensity: .6 })
		],
		particles: defaultParticles({
			preset: "holographic",
			color: "#B026FF",
			count: 70
		})
	})),
	pack("blu-circuit", "BLU-BGS Circuit", "Cyber Blue", "Traced board paths, traveling node, electric particles.", createDefaultProject({
		name: "BLU-BGS Circuit",
		border: defaultBorder({
			type: "circuit-traced",
			traceDensity: .75,
			nodeCount: 18,
			branchProbability: .55
		}),
		colors: defaultColors({
			primary: "#0066FF",
			secondary: "#00FFFF",
			gradientStops: [{
				offset: 0,
				color: "#0066FF"
			}, {
				offset: 1,
				color: "#00FFFF"
			}]
		}),
		animations: [
			makeAnimation("energy-chase", {
				speed: .8,
				intensity: .7
			}),
			makeAnimation("neon-spark", { intensity: .45 }),
			makeAnimation("scanline-sweep", {
				speed: .3,
				intensity: .35
			})
		],
		particles: defaultParticles({
			preset: "electric",
			color: "#00BFFF",
			count: 55
		})
	}))
];
var PRESET_CATEGORIES = [
	"Cyberpunk",
	"Synthwave",
	"Cyber Blue",
	"Toxic",
	"Plasma",
	"Fire",
	"Arctic",
	"Ultraviolet",
	"Street Luxury"
];
function applyPreset(preset) {
	return createDefaultProject({
		...preset.project,
		name: preset.name,
		canvas: { ...preset.project.canvas }
	});
}
var BORDERS = [
	"classic-neon-tube",
	"double-line-neon",
	"broken-neon",
	"corner-bracket-neon",
	"circuit-traced",
	"electric-arc",
	"laser-edge",
	"neon-rope",
	"pulse-border",
	"glitch-border",
	"liquid-neon",
	"plasma-border"
];
var COMPAT = {
	"classic-neon-tube": {
		anims: [
			"energy-chase",
			"breathing-glow",
			"neon-pulse",
			"audio-reactive-neon"
		],
		particles: ["sparks", "dust"]
	},
	"double-line-neon": {
		anims: [
			"dual-energy-chase",
			"breathing-glow",
			"holographic-shimmer"
		],
		particles: ["dust", "holographic"]
	},
	"broken-neon": {
		anims: [
			"electric-flicker",
			"neon-spark",
			"neon-pulse",
			"audio-reactive-neon"
		],
		particles: ["sparks", "electric"]
	},
	"corner-bracket-neon": {
		anims: [
			"energy-chase",
			"scanline-sweep",
			"breathing-glow"
		],
		particles: ["dust", "rgb-pixels"]
	},
	"circuit-traced": {
		anims: [
			"energy-chase",
			"neon-spark",
			"scanline-sweep"
		],
		particles: ["electric", "rgb-pixels"]
	},
	"electric-arc": {
		anims: [
			"lightning-crawl",
			"electric-flicker",
			"electric-arc-burst",
			"audio-reactive-neon"
		],
		particles: ["electric", "sparks"]
	},
	"laser-edge": {
		anims: [
			"scanline-sweep",
			"breathing-glow",
			"holographic-shimmer"
		],
		particles: ["dust", "holographic"]
	},
	"neon-rope": {
		anims: [
			"plasma-flow",
			"dual-energy-chase",
			"rgb-chromatic-shift"
		],
		particles: ["holographic", "plasma"]
	},
	"pulse-border": {
		anims: [
			"neon-pulse",
			"breathing-glow",
			"audio-reactive-neon"
		],
		particles: ["sparks", "paint"]
	},
	"glitch-border": {
		anims: [
			"glitch-flicker",
			"rgb-chromatic-shift",
			"strobe-flash"
		],
		particles: ["rgb-pixels", "electric"]
	},
	"liquid-neon": {
		anims: [
			"plasma-flow",
			"heat-haze",
			"neon-pulse"
		],
		particles: ["paint", "plasma"]
	},
	"plasma-border": {
		anims: [
			"plasma-flow",
			"neon-spark",
			"holographic-shimmer",
			"audio-reactive-neon"
		],
		particles: ["plasma", "holographic"]
	}
};
function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function generateNeon(seedName) {
	if (Math.random() < .28) {
		const preset = pick(BUILTIN_PRESETS);
		const p = createDefaultProject({
			...preset.project,
			name: seedName ?? `${preset.name} Mix`,
			id: uid("prj")
		});
		p.border.cornerRadius = 8 + Math.round(Math.random() * 48);
		p.border.animationSpeed = .6 + Math.random() * 1.2;
		return p;
	}
	const border = pick(BORDERS);
	const combo = pick(COLOR_COMBOS);
	const compat = COMPAT[border];
	const animCount = 2 + Math.floor(Math.random() * 3);
	const used = /* @__PURE__ */ new Set();
	const anims = [];
	while (anims.length < animCount && used.size < compat.anims.length) {
		const a = pick(compat.anims);
		if (used.has(a)) continue;
		used.add(a);
		anims.push(makeAnimation(a, {
			speed: .5 + Math.random() * 1.3,
			intensity: .45 + Math.random() * .5
		}));
	}
	if (Math.random() > .35 && !used.has("audio-reactive-neon")) anims.push(makeAnimation("audio-reactive-neon", { intensity: .7 + Math.random() * .3 }));
	const primary = combo.colors[0];
	const secondary = combo.colors[1] ?? combo.colors[0];
	const accent = combo.colors[2] ?? primary;
	return createDefaultProject({
		name: seedName ?? `${combo.name} ${border.replace(/-/g, " ")}`,
		border: defaultBorder({
			type: border,
			width: 2 + Math.random() * 3.5,
			cornerRadius: 4 + Math.round(Math.random() * 70),
			outerGlow: .45 + Math.random() * .5,
			animationSpeed: .55 + Math.random() * 1.1
		}),
		colors: defaultColors({
			primary,
			secondary,
			accent,
			gradientStops: combo.colors.map((c, i) => ({
				offset: combo.colors.length === 1 ? 0 : i / (combo.colors.length - 1),
				color: c
			}))
		}),
		animations: anims,
		particles: defaultParticles({
			preset: pick(compat.particles),
			color: primary,
			count: 40 + Math.round(Math.random() * 90),
			enabled: Math.random() > .15
		})
	});
}
var STORAGE_PROJECTS = "blu-bgs-projects-v1";
var STORAGE_LIVE = "blu-bgs-live-v1";
var STORAGE_FAV = "blu-bgs-fav-v1";
var STORAGE_SETTINGS = "blu-bgs-settings-v1";
function cloneProject(project, name) {
	const copy = structuredClone(project);
	copy.id = `prj-${Math.random().toString(36).slice(2, 10)}`;
	copy.name = name ?? `${project.name} Copy`;
	copy.createdAt = Date.now();
	copy.updatedAt = Date.now();
	return copy;
}
function sanitizeProject(raw) {
	const base = createDefaultProject();
	if (!raw || typeof raw !== "object") return base;
	const p = raw;
	return {
		...base,
		...p,
		id: typeof p.id === "string" ? p.id : base.id,
		name: typeof p.name === "string" && p.name.trim() ? p.name : "Untitled Overlay",
		version: "1.0",
		createdAt: typeof p.createdAt === "number" ? p.createdAt : Date.now(),
		updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : Date.now(),
		canvas: {
			width: p.canvas?.width ?? 1920,
			height: p.canvas?.height ?? 1080,
			fps: p.canvas?.fps === 30 || p.canvas?.fps === 120 ? p.canvas.fps : 60
		},
		border: {
			...defaultBorder(),
			...p.border ?? {}
		},
		colors: {
			...defaultColors(),
			...p.colors ?? {}
		},
		glow: {
			...defaultGlow(),
			...p.glow ?? {}
		},
		animations: Array.isArray(p.animations) ? p.animations : base.animations,
		particles: {
			...defaultParticles(),
			...p.particles ?? {}
		},
		audio: {
			...defaultAudio(),
			...p.audio ?? {}
		},
		outputMode: p.outputMode ?? "full-neon",
		quality: p.quality ?? "high"
	};
}
function serializeProject(project) {
	return JSON.stringify({
		project: {
			name: project.name,
			version: project.version
		},
		canvas: project.canvas,
		border: project.border,
		colors: project.colors,
		glow: project.glow,
		animations: project.animations,
		particles: project.particles,
		audio: project.audio,
		outputMode: project.outputMode,
		quality: project.quality,
		id: project.id,
		createdAt: project.createdAt,
		updatedAt: project.updatedAt
	}, null, 2);
}
function deserializeProject(text) {
	const data = JSON.parse(text);
	const nested = data.project && typeof data.project === "object" ? data.project : {};
	return sanitizeProject({
		...data,
		name: nested.name ?? data.name,
		version: "1.0"
	});
}
function readJson(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function writeJson(key, value) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
function loadAllProjects() {
	return readJson(STORAGE_PROJECTS, []);
}
function saveAllProjects(records) {
	writeJson(STORAGE_PROJECTS, records);
}
function hash(n) {
	const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
}
function noise1(x) {
	const i = Math.floor(x);
	const f = x - i;
	const u = f * f * (3 - 2 * f);
	return hash(i) * (1 - u) + hash(i + 1) * u;
}
function noise2(x, y) {
	const ix = Math.floor(x);
	const iy = Math.floor(y);
	const fx = x - ix;
	const fy = y - iy;
	const ux = fx * fx * (3 - 2 * fx);
	const uy = fy * fy * (3 - 2 * fy);
	const a = hash(ix + iy * 57);
	const b = hash(ix + 1 + iy * 57);
	const c = hash(ix + (iy + 1) * 57);
	const d = hash(ix + 1 + (iy + 1) * 57);
	return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
}
function fbm(x, y, octaves = 3) {
	let v = 0;
	let a = .5;
	let f = 1;
	let n = 0;
	for (let i = 0; i < octaves; i++) {
		v += a * noise2(x * f, y * f);
		n += a;
		a *= .5;
		f *= 2;
	}
	return v / n;
}
function clamp(v, lo, hi) {
	return Math.max(lo, Math.min(hi, v));
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function sampleRoundedRect(rect, count) {
	const r = Math.max(0, Math.min(rect.r, Math.min(rect.w, rect.h) / 2));
	const { x, y, w, h } = rect;
	const total = 2 * (w + h - 4 * r) + 2 * Math.PI * r;
	const samples = [];
	const push = (px, py, nx, ny, t) => {
		const len = Math.hypot(nx, ny) || 1;
		nx /= len;
		ny /= len;
		samples.push({
			x: px,
			y: py,
			nx,
			ny,
			tx: -ny,
			ty: nx,
			t
		});
	};
	for (let i = 0; i < count; i++) {
		const t = i / count;
		const d = t * total;
		const top = w - 2 * r;
		const right = h - 2 * r;
		const bot = w - 2 * r;
		const left = h - 2 * r;
		const c = Math.PI / 2 * r;
		let remaining = d;
		if (remaining <= top) {
			push(x + r + remaining, y, 0, -1, t);
			continue;
		}
		remaining -= top;
		if (remaining <= c) {
			const a = -Math.PI / 2 + remaining / r;
			push(x + w - r + Math.cos(a) * r, y + r + Math.sin(a) * r, Math.cos(a), Math.sin(a), t);
			continue;
		}
		remaining -= c;
		if (remaining <= right) {
			push(x + w, y + r + remaining, 1, 0, t);
			continue;
		}
		remaining -= right;
		if (remaining <= c) {
			const a = 0 + remaining / r;
			push(x + w - r + Math.cos(a) * r, y + h - r + Math.sin(a) * r, Math.cos(a), Math.sin(a), t);
			continue;
		}
		remaining -= c;
		if (remaining <= bot) {
			push(x + w - r - remaining, y + h, 0, 1, t);
			continue;
		}
		remaining -= bot;
		if (remaining <= c) {
			const a = Math.PI / 2 + remaining / r;
			push(x + r + Math.cos(a) * r, y + h - r + Math.sin(a) * r, Math.cos(a), Math.sin(a), t);
			continue;
		}
		remaining -= c;
		if (remaining <= left) {
			push(x, y + h - r - remaining, -1, 0, t);
			continue;
		}
		remaining -= left;
		const a = Math.PI + remaining / r;
		push(x + r + Math.cos(a) * r, y + r + Math.sin(a) * r, Math.cos(a), Math.sin(a), t);
	}
	return samples;
}
function pointOnSamples(samples, t) {
	if (samples.length === 0) return {
		x: 0,
		y: 0,
		nx: 0,
		ny: -1,
		tx: 1,
		ty: 0,
		t: 0
	};
	const u = (t % 1 + 1) % 1;
	const f = u * samples.length;
	const i = Math.floor(f) % samples.length;
	const j = (i + 1) % samples.length;
	const k = f - Math.floor(f);
	const a = samples[i];
	const b = samples[j];
	return {
		x: a.x + (b.x - a.x) * k,
		y: a.y + (b.y - a.y) * k,
		nx: a.nx + (b.nx - a.nx) * k,
		ny: a.ny + (b.ny - a.ny) * k,
		tx: a.tx + (b.tx - a.tx) * k,
		ty: a.ty + (b.ty - a.ty) * k,
		t: u
	};
}
function insetRect(rect, amount) {
	return {
		x: rect.x + amount,
		y: rect.y + amount,
		w: Math.max(1, rect.w - amount * 2),
		h: Math.max(1, rect.h - amount * 2),
		r: Math.max(0, rect.r - amount)
	};
}
var ParticleEngine = class {
	pool = [];
	spawnAcc = 0;
	reset() {
		this.pool = [];
		this.spawnAcc = 0;
	}
	count() {
		return this.pool.length;
	}
	update(dt, samples, cfg, audio, maxParticles, extras) {
		if (!cfg.enabled || maxParticles <= 0 || samples.length === 0) {
			this.pool = [];
			return;
		}
		const audioBoost = 1 + audio.energy * cfg.audioResponse * 1.4;
		const want = Math.min(maxParticles, Math.round(cfg.count * audioBoost + extras.burst * 80 + extras.dissolve * 40));
		const spawnRate = Math.max(4, want * (.6 + extras.spark * 2));
		this.spawnAcc += spawnRate * dt;
		while (this.spawnAcc >= 1 && this.pool.length < maxParticles) {
			this.spawnAcc -= 1;
			this.spawn(samples, cfg, audio, extras);
		}
		const next = [];
		for (const p of this.pool) {
			p.life -= dt;
			if (p.life <= 0) continue;
			const t = 1 - p.life / p.max;
			const turb = cfg.turbulence * 80;
			p.vx += (noise2(p.x * .02, p.life * 3) - .5) * turb * dt;
			p.vy += (noise2(p.y * .02, p.life * 3 + 9) - .5) * turb * dt;
			p.vy += cfg.gravity * dt;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.size *= .999 - t * .01;
			next.push(p);
		}
		this.pool = next;
	}
	draw(ctx, cfg) {
		if (!this.pool.length) return;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		for (const p of this.pool) {
			const a = p.life / p.max * cfg.opacity;
			if (a < .02) continue;
			const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * (2.4 + cfg.glow * 3));
			g.addColorStop(0, `rgba(255,255,255,${a * .95})`);
			g.addColorStop(.25, `rgba(${p.r},${p.g},${p.b},${a * .8})`);
			g.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size * (2.2 + cfg.glow * 2.5), 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}
	spawn(samples, cfg, audio, extras) {
		const s = samples[Math.floor(hash(this.pool.length + audio.energy * 99) * samples.length) % samples.length];
		const dir = cfg.direction * Math.PI / 180;
		const speed = cfg.speed * (.6 + Math.random() * .8) * (1 + extras.spark);
		let vx = Math.cos(dir) * speed + s.nx * speed * .35;
		let vy = Math.sin(dir) * speed + s.ny * speed * .35;
		const [cr, cg, cb] = hexToRgb(cfg.color);
		let r = cr;
		let g = cg;
		let b = cb;
		let size = cfg.size * (.5 + Math.random());
		const life = cfg.lifetime * (.55 + Math.random() * .7);
		switch (cfg.preset) {
			case "sparks":
				vx = s.nx * (40 + Math.random() * 90) + (Math.random() - .5) * 30;
				vy = s.ny * (40 + Math.random() * 90) - 20 - Math.random() * 50;
				size *= .7;
				break;
			case "dust":
				vx *= .25;
				vy *= .15;
				size *= .5;
				r = Math.min(255, r + 40);
				g = Math.min(255, g + 40);
				b = Math.min(255, b + 40);
				break;
			case "plasma":
				vx += (Math.random() - .5) * 50;
				vy += (Math.random() - .5) * 50;
				r = Math.min(255, r + 80);
				b = Math.min(255, b + 40);
				break;
			case "embers":
				r = 255;
				g = 80 + Math.random() * 100;
				b = 20;
				vy -= 30 + Math.random() * 40;
				break;
			case "electric":
				vx = s.tx * (80 + Math.random() * 80) * (Math.random() < .5 ? -1 : 1);
				vy = s.ty * (80 + Math.random() * 80);
				r = 180;
				g = 220;
				b = 255;
				size *= .5;
				break;
			case "rgb-pixels": {
				const ch = Math.floor(Math.random() * 3);
				r = ch === 0 ? 255 : 20;
				g = ch === 1 ? 255 : 20;
				b = ch === 2 ? 255 : 20;
				size *= .45;
				vx *= .4;
				vy *= .4;
				break;
			}
			case "holographic": {
				const hue = Math.random();
				r = Math.floor(128 + 127 * Math.sin(hue * 6.28));
				g = Math.floor(128 + 127 * Math.sin(hue * 6.28 + 2.1));
				b = Math.floor(128 + 127 * Math.sin(hue * 6.28 + 4.2));
				break;
			}
			case "paint":
				size *= 1.8 + Math.random();
				vx *= .5;
				vy += 20;
		}
		if (extras.burst > .4) {
			vx *= 1.8;
			vy *= 1.8;
		}
		this.pool.push({
			x: s.x + s.nx * (Math.random() * 6),
			y: s.y + s.ny * (Math.random() * 6),
			vx,
			vy,
			life,
			max: life,
			size,
			hue: Math.random(),
			r,
			g,
			b
		});
	}
};
function qualitySettings(preset, outputMode, adaptiveScale = 1) {
	const base = { ...{
		low: {
			glowPasses: 2,
			maxParticles: 40,
			pathSamples: 90,
			extras: false,
			distortion: false,
			glowScale: .45
		},
		medium: {
			glowPasses: 3,
			maxParticles: 120,
			pathSamples: 140,
			extras: true,
			distortion: false,
			glowScale: .7
		},
		high: {
			glowPasses: 4,
			maxParticles: 280,
			pathSamples: 200,
			extras: true,
			distortion: true,
			glowScale: 1
		},
		ultra: {
			glowPasses: 5,
			maxParticles: 600,
			pathSamples: 280,
			extras: true,
			distortion: true,
			glowScale: 1.2
		},
		custom: {
			glowPasses: 4,
			maxParticles: 280,
			pathSamples: 200,
			extras: true,
			distortion: true,
			glowScale: 1
		}
	}[preset] };
	if (outputMode === "performance") {
		base.glowPasses = Math.min(base.glowPasses, 2);
		base.maxParticles = Math.min(base.maxParticles, 60);
		base.pathSamples = Math.min(base.pathSamples, 100);
		base.extras = false;
		base.distortion = false;
		base.glowScale *= .6;
	} else if (outputMode === "cinematic") {
		base.glowScale *= .85;
		base.maxParticles = Math.floor(base.maxParticles * .6);
	} else if (outputMode === "border-only") {
		base.maxParticles = 0;
		base.extras = false;
	}
	if (adaptiveScale < 1) {
		base.glowPasses = Math.max(2, Math.round(base.glowPasses * adaptiveScale));
		base.maxParticles = Math.floor(base.maxParticles * adaptiveScale);
		base.pathSamples = Math.max(64, Math.floor(base.pathSamples * adaptiveScale));
		if (adaptiveScale < .7) {
			base.extras = false;
			base.distortion = false;
		}
		base.glowScale *= .6 + .4 * adaptiveScale;
	}
	return base;
}
var IDENTITY_ANIM = {
	brightness: 1,
	glow: 1,
	thickness: 1,
	opacity: 1,
	chase: [],
	flicker: 1,
	hue: 0,
	scan: -1,
	rgb: 0,
	morph: 0,
	spark: 0,
	burst: 0,
	dissolve: 0,
	haze: 0,
	rainbow: 0,
	flash: 0,
	build: 1
};
function applyAudioMaps(project, audio) {
	const mapped = {
		thickness: 0,
		glow: 0,
		brightness: 0,
		scale: 0,
		spark: 0,
		gradient: 0,
		distortion: 0,
		color: 0,
		flash: 0,
		particles: 0
	};
	if (!project.audio.enabled) return mapped;
	for (const m of project.audio.mappings) {
		if (!m.enabled) continue;
		const raw = audio[m.band] ?? 0;
		const t = m.curve === "ease-in" ? raw * raw : m.curve === "ease-out" ? 1 - (1 - raw) * (1 - raw) : m.curve === "exponential" ? raw ** 1.8 : raw;
		const v = lerp(m.min, m.max, t);
		if (m.property === "borderThickness") mapped.thickness = Math.max(mapped.thickness, v);
		else if (m.property === "glow") mapped.glow = Math.max(mapped.glow, v);
		else if (m.property === "brightness") mapped.brightness = Math.max(mapped.brightness, v);
		else if (m.property === "scale") mapped.scale = Math.max(mapped.scale, v);
		else if (m.property === "sparkProbability") mapped.spark = Math.max(mapped.spark, v);
		else if (m.property === "gradientMovement") mapped.gradient = Math.max(mapped.gradient, v);
		else if (m.property === "distortion") mapped.distortion = Math.max(mapped.distortion, v);
		else if (m.property === "colorIntensity") mapped.color = Math.max(mapped.color, v);
		else if (m.property === "flash") mapped.flash = Math.max(mapped.flash, v);
		else if (m.property === "particleSize" || m.property === "particleCount") mapped.particles = Math.max(mapped.particles, v);
	}
	return mapped;
}
function applyAnimations(anims, time, audio, speedMul) {
	const s = {
		...IDENTITY_ANIM,
		chase: []
	};
	for (const a of anims) {
		if (!a.enabled) continue;
		const spd = a.speed * speedMul;
		const k = a.intensity;
		const t = time.elapsed * spd;
		switch (a.type) {
			case "neon-pulse": {
				const w = .5 + .5 * Math.sin(t * Math.PI * 2 * .35 * a.frequency);
				s.brightness *= lerp(.75, 1.45, w * k);
				break;
			}
			case "electric-flicker": {
				const spike = noise1(t * 18 * a.frequency + 3) > .86 ? .35 + hash(Math.floor(t * 40)) * .4 : 1;
				s.flicker *= lerp(1, spike, k);
				s.brightness *= lerp(1, spike, k * .5);
				break;
			}
			case "energy-chase":
				s.chase.push((t * .22 * a.direction % 1 + 1) % 1);
				break;
			case "dual-energy-chase":
				s.chase.push((t * .2 % 1 + 1) % 1);
				s.chase.push((-t * .2 * a.direction % 1 + 1) % 1);
				break;
			case "plasma-flow":
				s.hue += Math.sin(t * .7) * 28 * k;
				s.rainbow = Math.max(s.rainbow, .25 * k);
				break;
			case "neon-spark":
				s.spark = Math.max(s.spark, k * (.2 + audio.treble * .8));
				break;
			case "electric-arc-burst":
				s.burst = Math.max(s.burst, k * (.15 + audio.snare * .9 + (noise1(t * 4) > .82 ? .7 : 0)));
				break;
			case "glitch-flicker":
				s.rgb = Math.max(s.rgb, k * (noise1(t * 9) > .78 ? 1 : .15));
				s.flicker *= lerp(1, .55 + hash(Math.floor(t * 24)) * .45, k * (s.rgb > .4 ? 1 : .2));
				break;
			case "scanline-sweep":
				s.scan = (t * .18 * a.direction % 1 + 1) % 1;
				break;
			case "rgb-chromatic-shift":
				s.rgb = Math.max(s.rgb, .35 * k + .4 * k * Math.abs(Math.sin(t)));
				s.hue += Math.sin(t * .5) * 18 * k;
				break;
			case "breathing-glow":
				s.glow *= lerp(.72, 1.45, (.5 + .5 * Math.sin(t * 1.1)) * k);
				break;
			case "strobe-flash": {
				const beat = t * a.frequency % 1;
				s.flash = Math.max(s.flash, beat < .06 ? k : 0);
				break;
			}
			case "particle-dissolve":
				s.dissolve = Math.max(s.dissolve, (.5 + .5 * Math.sin(t * .8)) * k);
				s.opacity *= lerp(1, .35, s.dissolve);
				break;
			case "energy-build":
				s.build = .5 + .5 * Math.sin(t * .55 - Math.PI / 2);
				s.opacity *= lerp(.08, 1, s.build * k + (1 - k));
				s.brightness *= lerp(.4, 1.3, s.build);
				break;
			case "energy-collapse":
				s.build = .5 + .5 * Math.cos(t * .55);
				s.opacity *= lerp(.05, 1, s.build);
				s.flicker *= lerp(.4, 1, s.build);
				break;
			case "lightning-crawl":
				s.burst = Math.max(s.burst, .55 * k);
				s.spark = Math.max(s.spark, .4 * k);
				break;
			case "holographic-shimmer":
				s.rainbow = Math.max(s.rainbow, k);
				s.hue += t * 40 * k;
				break;
			case "magnetic-distortion":
				s.morph += Math.sin(t * 1.4) * 6 * k;
				break;
			case "heat-haze":
				s.haze = Math.max(s.haze, k);
				s.morph += Math.sin(t * 3.2) * 3 * k;
				break;
			case "audio-reactive-neon":
				s.thickness *= 1 + audio.bass * .7 * k;
				s.brightness *= 1 + audio.mids * .45 * k;
				s.spark = Math.max(s.spark, audio.treble * k);
				s.glow *= 1 + audio.energy * .35 * k;
		}
	}
	return s;
}
function reactiveColor(base, audio, enabled) {
	if (!enabled) return base;
	let c = base;
	c = mixHex(c, "#FF1493", audio.bass * .35);
	c = mixHex(c, "#FF4500", audio.snare * .55);
	c = mixHex(c, "#00FF9D", audio.mids * .25);
	if (audio.drop > .4) {
		const h = (audio.drop * 360 + audio.energy * 80) % 360;
		c = mixHex(c, hslToHex(h, 1, .55), audio.drop * .7);
	}
	return c;
}
var OverlayRenderer = class {
	canvas;
	ctx;
	particles = new ParticleEngine();
	stats = {
		fps: 60,
		frameMs: 16,
		renderMs: 0,
		audioMs: 0,
		particles: 0
	};
	fpsEma = 60;
	adaptive = 1;
	lowFpsMs = 0;
	constructor(canvas) {
		this.canvas = canvas;
		const ctx = canvas.getContext("2d", {
			alpha: true,
			desynchronized: true
		});
		if (!ctx) throw new Error("Canvas 2D unavailable");
		this.ctx = ctx;
	}
	resize(cssW, cssH, dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1)) {
		const w = Math.max(1, Math.round(cssW * dpr));
		const h = Math.max(1, Math.round(cssH * dpr));
		if (this.canvas.width !== w || this.canvas.height !== h) {
			this.canvas.width = w;
			this.canvas.height = h;
		}
		this.canvas.style.width = `${cssW}px`;
		this.canvas.style.height = `${cssH}px`;
		this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}
	render(project, time, audio, audioMs = 0) {
		const t0 = performance.now();
		const ctx = this.ctx;
		const w = this.canvas.clientWidth || project.canvas.width;
		const h = this.canvas.clientHeight || project.canvas.height;
		ctx.clearRect(0, 0, w, h);
		ctx.globalAlpha = 1;
		ctx.globalCompositeOperation = "source-over";
		const q = qualitySettings(project.quality, project.outputMode, this.adaptive);
		const mapped = applyAudioMaps(project, audio);
		const anim = applyAnimations(project.animations, time, audio, project.border.animationSpeed);
		const scale = 1 + mapped.scale * .08;
		const inset = project.border.inset;
		const rect = {
			x: inset,
			y: inset,
			w: w - inset * 2,
			h: h - inset * 2,
			r: project.border.cornerRadius
		};
		const cx = w / 2;
		const cy = h / 2;
		ctx.save();
		ctx.translate(cx, cy);
		ctx.scale(scale, scale);
		ctx.translate(-cx, -cy);
		const samples = this.buildSamples(rect, project, anim, mapped, time, q);
		const primary = this.resolveColor(project, audio, time, mapped, anim);
		this.drawBorder(project, samples, rect, primary, anim, mapped, time, q, audio);
		if (project.particles.enabled && project.outputMode !== "border-only" && project.outputMode !== "performance" || anim.dissolve > .05) {
			const pcfg = {
				...project.particles,
				color: project.particles.color === "#00FFFF" ? primary : project.particles.color,
				count: Math.round(project.particles.count * (1 + mapped.particles)),
				size: project.particles.size * (1 + mapped.particles * .6)
			};
			const cap = Math.min(q.maxParticles, project.particles.maxParticles);
			this.particles.update(time.dt, samples, pcfg, audio, cap, {
				spark: Math.max(anim.spark, mapped.spark),
				burst: anim.burst + mapped.flash + audio.drop * .8,
				dissolve: anim.dissolve
			});
			this.particles.draw(ctx, pcfg);
		} else this.particles.reset();
		if (q.extras && anim.scan >= 0) this.drawScanline(w, h, anim.scan, primary);
		if (anim.flash + mapped.flash > .02) {
			ctx.globalCompositeOperation = "lighter";
			ctx.fillStyle = hexToRgba("#FFFFFF", Math.min(.55, (anim.flash + mapped.flash) * .45));
			ctx.fillRect(0, 0, w, h);
		}
		if (audio.drop > .7 && project.colors.colorReactive && project.audio.enabled) {
			ctx.globalCompositeOperation = "lighter";
			const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * .6);
			g.addColorStop(0, hexToRgba(hslToHex(time.elapsed * 120 % 360, 1, .6), audio.drop * .22));
			g.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = g;
			ctx.fillRect(0, 0, w, h);
		}
		ctx.restore();
		const renderMs = performance.now() - t0;
		const frameMs = time.dt * 1e3;
		const fpsInst = time.dt > 0 ? 1 / time.dt : 60;
		this.fpsEma = this.fpsEma * .9 + fpsInst * .1;
		this.stats = {
			fps: this.fpsEma,
			frameMs,
			renderMs,
			audioMs,
			particles: this.particles.count()
		};
		if (this.fpsEma < 42) this.lowFpsMs += frameMs;
		else this.lowFpsMs = Math.max(0, this.lowFpsMs - frameMs * 2);
		if (this.lowFpsMs > 1500) this.adaptive = Math.max(.45, this.adaptive - .08);
		else if (this.fpsEma > 55) this.adaptive = Math.min(1, this.adaptive + .01);
	}
	resolveColor(project, audio, time, mapped, anim) {
		let c = adjustHex(project.colors.primary, project.colors.saturation, project.colors.brightness * (1 + mapped.brightness * .4));
		if (project.colors.gradientEnabled) {
			const stops = project.colors.reverseGradient ? [...project.colors.gradientStops].reverse() : project.colors.gradientStops;
			const u = ((project.colors.animateGradient ? (time.elapsed * project.colors.gradientSpeed + mapped.gradient) % 1 : mapped.gradient) + .5) % 1;
			if (stops.length >= 2) {
				c = mixHex(stops[0].color, stops[stops.length - 1].color, .5 + .5 * Math.sin(u * Math.PI * 2));
				c = adjustHex(c, project.colors.saturation, project.colors.brightness);
			}
		}
		c = reactiveColor(c, audio, project.audio.enabled && (project.colors.colorReactive || project.audio.colorReactive));
		if (anim.hue) {
			const [r, g, b] = hexToRgb(c);
			const avg = (r + g + b) / 3;
			const ang = anim.hue * Math.PI / 180;
			const nr = avg + (r - avg) * Math.cos(ang) - (b - avg) * Math.sin(ang);
			const nb = avg + (b - avg) * Math.cos(ang) + (r - avg) * Math.sin(ang);
			c = mixHex(c, `rgb(${nr},${g},${nb})`, .5);
		}
		return c;
	}
	buildSamples(rect, project, anim, mapped, time, q) {
		const samples = sampleRoundedRect(rect, q.pathSamples);
		const morph = anim.morph + mapped.distortion * 10 + (project.border.type === "liquid-neon" ? project.border.morphAmount : 0);
		const turb = project.border.type === "liquid-neon" || project.border.type === "plasma-border" ? project.border.turbulence : 0;
		if (!q.distortion || morph === 0 && turb === 0 && anim.haze === 0) return samples;
		const visc = project.border.viscosity || .5;
		const flow = time.elapsed * (project.border.flowSpeed || project.border.plasmaSpeed || .6);
		return samples.map((s) => {
			const mag = ((fbm(s.t * 6 + flow, time.elapsed * .3) - .5) * morph + anim.haze * Math.sin(s.t * 40 + time.elapsed * 8) * 2.5) * (.4 + visc * .6) * (1 + turb);
			return {
				...s,
				x: s.x + s.nx * mag,
				y: s.y + s.ny * mag
			};
		});
	}
	drawBorder(project, samples, rect, color, anim, mapped, time, q, audio) {
		const ctx = this.ctx;
		const b = project.border;
		const g = project.glow;
		const thick = (b.width + mapped.thickness * 5) * anim.thickness;
		const glowMul = (b.outerGlow + mapped.glow) * anim.glow * q.glowScale;
		const alpha = b.opacity * project.colors.opacity * anim.opacity * anim.flicker;
		ctx.save();
		ctx.globalAlpha = alpha;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		const type = b.type;
		if (type === "double-line-neon") {
			this.strokeSamples(samples, color, b.outerWidth, g, glowMul * b.outerBrightness, q, anim);
			const inner = sampleRoundedRect(insetRect(rect, b.spacing), q.pathSamples);
			this.strokeSamples(inner, mixHex(color, "#FFFFFF", .15), b.innerWidth, g, glowMul * b.innerBrightness, q, anim);
		} else if (type === "broken-neon") this.strokeBroken(samples, color, thick, g, glowMul, q, anim, b, time);
		else if (type === "corner-bracket-neon") this.strokeCorners(rect, color, b.thickness || thick, g, glowMul, q, anim, b);
		else if (type === "circuit-traced") this.strokeCircuit(samples, rect, color, thick, g, glowMul, q, anim, b, time);
		else if (type === "electric-arc") this.strokeArcs(samples, color, b, glowMul, q, anim, time);
		else if (type === "laser-edge") {
			const sharp = b.sharpness;
			this.strokeSamples(samples, color, b.thickness || 1.1, {
				...g,
				outerRadius: g.outerRadius * (1.2 - sharp * .6),
				innerRadius: g.innerRadius * (.5 + sharp * .5)
			}, glowMul * .8, q, anim);
		} else if (type === "neon-rope") this.strokeRope(samples, color, b, g, glowMul, q, anim, time);
		else if (type === "pulse-border") {
			const e = b.easing;
			const raw = .5 + .5 * Math.sin(time.elapsed * b.pulseSpeed * Math.PI * 2);
			const p = lerp(raw, raw * raw * (3 - 2 * raw), e);
			const tw = lerp(b.minThickness, b.maxThickness, p) * (1 + b.intensity * .2);
			this.strokeSamples(samples, color, tw, g, glowMul * (.7 + p * .6), q, anim);
		} else if (type === "glitch-border") this.strokeGlitch(samples, color, thick, g, glowMul, q, anim, b, time);
		else if (type === "liquid-neon") {
			this.strokeSamples(samples, color, thick + 1.5, g, glowMul, q, anim);
			this.strokeRibbon(samples, mixHex(color, project.colors.secondary, .4), thick * .5, time, b);
		} else if (type === "plasma-border") this.strokePlasma(samples, color, project.colors.secondary, b, glowMul, q, anim, time);
		else this.strokeSamples(samples, color, thick, g, glowMul, q, anim);
		this.drawChases(samples, anim, color, thick);
		if (q.extras && (anim.burst > .2 || type === "electric-arc")) this.drawLightning(samples, color, anim, time, b.branchCount || 5);
		if (q.extras && anim.spark > .05) this.drawSparks(samples, color, anim, time);
		if (anim.rainbow > .05) this.drawHolo(samples, anim, thick);
		if (anim.rgb > .2) this.drawRgbGhost(samples, thick, anim);
		ctx.restore();
	}
	strokeSamples(samples, color, width, glow, glowMul, q, anim) {
		const ctx = this.ctx;
		const path = this.pathFromSamples(samples);
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		const passes = q.glowPasses;
		for (let i = passes; i >= 1; i--) {
			const t = i / passes;
			const w = width + glow.outerRadius * glowMul * t * .55;
			ctx.strokeStyle = hexToRgba(color, glow.outerOpacity * (.08 + .18 * (1 - t)) * anim.brightness);
			ctx.lineWidth = w;
			ctx.stroke(path);
		}
		ctx.strokeStyle = hexToRgba(color, glow.innerOpacity * .85 * anim.brightness);
		ctx.lineWidth = width + glow.innerRadius * .35 * glowMul;
		ctx.stroke(path);
		ctx.strokeStyle = hexToRgba(mixHex(color, "#FFFFFF", .25), .95 * glow.coreBrightness * anim.brightness);
		ctx.lineWidth = Math.max(1, width);
		ctx.stroke(path);
		ctx.strokeStyle = hexToRgba("#FFFFFF", .72 * glow.coreBrightness * anim.brightness);
		ctx.lineWidth = Math.max(.6, width * .32);
		ctx.stroke(path);
		ctx.restore();
	}
	pathFromSamples(samples) {
		const p = new Path2D();
		if (!samples.length) return p;
		p.moveTo(samples[0].x, samples[0].y);
		for (let i = 1; i < samples.length; i++) p.lineTo(samples[i].x, samples[i].y);
		p.closePath();
		return p;
	}
	strokeBroken(samples, color, width, glow, glowMul, q, anim, b, time) {
		const segs = Math.max(2, Math.round(b.segmentCount));
		const gap = b.gapSize;
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		for (let i = 0; i < segs; i++) {
			const jitter = (hash(i * 17 + Math.floor(time.elapsed * .4)) - .5) * b.randomness * .15;
			const a = (i / segs + jitter + 1) % 1;
			const len = 1 / segs * (1 - gap);
			const slice = this.sliceSamples(samples, a, a + len);
			if (slice.length < 2) continue;
			ctx.globalAlpha = hash(i + Math.floor(time.elapsed * 8)) > .08 ? 1 : .25;
			this.strokeSamples(slice, color, width, glow, glowMul, q, anim);
		}
		ctx.restore();
	}
	sliceSamples(samples, t0, t1) {
		const a = (t0 % 1 + 1) % 1;
		const b = (t1 % 1 + 1) % 1;
		const out = [];
		const n = samples.length;
		if (b > a) {
			const i0 = Math.floor(a * n);
			const i1 = Math.max(i0 + 1, Math.floor(b * n));
			return samples.slice(i0, i1);
		}
		const i0 = Math.floor(a * n);
		const i1 = Math.floor(b * n);
		out.push(...samples.slice(i0), ...samples.slice(0, i1));
		return out;
	}
	strokeCorners(rect, color, width, glow, glowMul, q, anim, b) {
		const len = b.cornerLength;
		const r = rect.r;
		const corners = [
			{
				x: rect.x,
				y: rect.y,
				dx: 1,
				dy: 1
			},
			{
				x: rect.x + rect.w,
				y: rect.y,
				dx: -1,
				dy: 1
			},
			{
				x: rect.x + rect.w,
				y: rect.y + rect.h,
				dx: -1,
				dy: -1
			},
			{
				x: rect.x,
				y: rect.y + rect.h,
				dx: 1,
				dy: -1
			}
		];
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		for (const c of corners) {
			const p = new Path2D();
			p.moveTo(c.x + c.dx * len, c.y);
			p.lineTo(c.x + c.dx * r, c.y);
			p.arcTo(c.x, c.y, c.x, c.y + c.dy * r, r);
			p.lineTo(c.x, c.y + c.dy * len);
			const passes = q.glowPasses;
			for (let i = passes; i >= 1; i--) {
				const t = i / passes;
				ctx.strokeStyle = hexToRgba(color, glow.outerOpacity * (.1 + .16 * (1 - t)) * glowMul * anim.brightness);
				ctx.lineWidth = width + glow.outerRadius * glowMul * t * .45;
				ctx.stroke(p);
			}
			ctx.strokeStyle = hexToRgba(mixHex(color, "#FFFFFF", .3), .95);
			ctx.lineWidth = width;
			ctx.stroke(p);
			ctx.strokeStyle = hexToRgba("#FFFFFF", .7);
			ctx.lineWidth = Math.max(.6, width * .3);
			ctx.stroke(p);
		}
		ctx.restore();
	}
	strokeCircuit(samples, rect, color, width, glow, glowMul, q, anim, b, time) {
		this.strokeSamples(samples, color, Math.max(1, width * .7), glow, glowMul * .7, q, anim);
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		const nodes = Math.round(b.nodeCount);
		for (let i = 0; i < nodes; i++) {
			const s = pointOnSamples(samples, (i + .15) / nodes);
			const pulse = .5 + .5 * Math.sin(time.elapsed * 4 + i);
			ctx.fillStyle = hexToRgba("#FFFFFF", .55 + pulse * .4);
			ctx.beginPath();
			ctx.arc(s.x, s.y, b.nodeSize * (.7 + pulse * .4), 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = hexToRgba(color, .7);
			ctx.lineWidth = 2;
			ctx.stroke();
			if (hash(i + 2) < b.branchProbability) {
				const len = 18 + hash(i * 9) * 40 * b.traceDensity;
				ctx.beginPath();
				ctx.moveTo(s.x, s.y);
				ctx.lineTo(s.x + s.nx * len, s.y + s.ny * len);
				ctx.strokeStyle = hexToRgba(color, .55);
				ctx.lineWidth = 1.2;
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(s.x + s.nx * len, s.y + s.ny * len, 1.6, 0, Math.PI * 2);
				ctx.fillStyle = hexToRgba(color, .8);
				ctx.fill();
			}
		}
		const p = pointOnSamples(samples, time.elapsed * .15 % 1);
		ctx.fillStyle = hexToRgba("#FFFFFF", .9);
		ctx.beginPath();
		ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
	strokeArcs(samples, color, b, glowMul, q, anim, time) {
		this.strokeSamples(samples, color, Math.max(.8, b.thickness * .5), {
			coreWidth: 1,
			coreBrightness: .6,
			innerRadius: 4,
			innerOpacity: .4,
			outerRadius: 16,
			outerOpacity: .2
		}, glowMul * .4, q, anim);
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		const n = Math.max(1, Math.round(b.branchCount));
		for (let i = 0; i < n; i++) {
			if (hash(i + Math.floor(time.elapsed * (8 + b.flicker * 12))) < .25 * (1 - b.flicker)) continue;
			const t0 = hash(i * 3 + Math.floor(time.elapsed * 2));
			const span = .08 + hash(i * 7) * .12;
			const steps = 10;
			ctx.beginPath();
			for (let k = 0; k <= steps; k++) {
				const s = pointOnSamples(samples, t0 + span * (k / steps));
				const jag = (hash(i * 13 + k + Math.floor(time.elapsed * 20)) - .5) * 18 * b.arcIntensity * b.randomness;
				const x = s.x + s.nx * jag;
				const y = s.y + s.ny * jag;
				if (k === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.strokeStyle = hexToRgba("#FFFFFF", .85);
			ctx.lineWidth = b.thickness;
			ctx.stroke();
			ctx.strokeStyle = hexToRgba(color, .55);
			ctx.lineWidth = b.thickness * 3;
			ctx.stroke();
		}
		ctx.restore();
	}
	strokeRope(samples, color, b, glow, glowMul, q, anim, time) {
		const strands = Math.max(2, Math.round(b.strandCount));
		for (let i = 0; i < strands; i++) {
			const phase = i / strands * Math.PI * 2 + time.elapsed * b.animationSpeed;
			const twisted = samples.map((s) => {
				const amp = (b.thickness + 2) * 1.4;
				const off = Math.sin(s.t * Math.PI * 2 * b.twist + phase) * amp;
				return {
					...s,
					x: s.x + s.nx * off,
					y: s.y + s.ny * off
				};
			});
			const col = i % 2 === 0 ? color : mixHex(color, "#FFFFFF", .25);
			this.strokeSamples(twisted, col, Math.max(.8, b.thickness * .7), glow, glowMul * .55, q, anim);
		}
	}
	strokeGlitch(samples, color, width, glow, glowMul, q, anim, b, time) {
		const fire = hash(Math.floor(time.elapsed / Math.max(.05, b.glitchDuration))) < b.glitchFrequency || anim.rgb > .5;
		const ox = fire ? (hash(time.elapsed) - .5) * b.offsetAmount : 0;
		const oy = fire ? (hash(time.elapsed + 3) - .5) * b.offsetAmount : 0;
		const sep = fire ? b.rgbSeparation : b.rgbSeparation * .15;
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		const layers = [
			{
				c: "#FF0033",
				x: -sep + ox,
				y: oy
			},
			{
				c: "#00FF66",
				x: ox,
				y: -sep * .4 + oy
			},
			{
				c: "#00FFFF",
				x: sep + ox,
				y: oy
			}
		];
		for (const L of layers) {
			ctx.save();
			ctx.translate(L.x, L.y);
			ctx.globalAlpha = fire ? .85 : .4;
			this.strokeSamples(samples, mixHex(color, L.c, .6), width, glow, glowMul * .5, q, anim);
			ctx.restore();
		}
		const copies = fire ? Math.round(b.duplication) : 0;
		for (let i = 0; i < copies; i++) {
			ctx.save();
			ctx.translate((hash(i) - .5) * b.offsetAmount * 1.4, (hash(i + 4) - .5) * 8);
			ctx.globalAlpha = .25 * (1 - b.flickerIntensity * .5);
			this.strokeSamples(samples, color, width, glow, glowMul * .3, q, anim);
			ctx.restore();
		}
		ctx.restore();
	}
	strokeRibbon(samples, color, width, time, b) {
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		ctx.beginPath();
		samples.forEach((s, i) => {
			const w = width * (.6 + .4 * Math.sin(s.t * 20 + time.elapsed * b.flowSpeed * 4));
			const x = s.x + s.nx * w;
			const y = s.y + s.ny * w;
			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		});
		ctx.strokeStyle = hexToRgba(color, .45);
		ctx.lineWidth = width;
		ctx.stroke();
		ctx.restore();
	}
	strokePlasma(samples, primary, secondary, b, glowMul, q, anim, time) {
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		const ribbons = 3;
		for (let r = 0; r < ribbons; r++) {
			ctx.beginPath();
			samples.forEach((s, i) => {
				const n = (fbm(s.t * 8 + r, time.elapsed * b.plasmaSpeed + r) - .5) * 16 * b.distortion;
				const x = s.x + s.nx * n;
				const y = s.y + s.ny * n;
				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			});
			ctx.closePath();
			const col = r === 1 ? secondary : primary;
			ctx.strokeStyle = hexToRgba(col, .28 * b.intensity * glowMul);
			ctx.lineWidth = 10 + r * 4;
			ctx.stroke();
			ctx.strokeStyle = hexToRgba(mixHex(col, "#FFFFFF", .3), .7 * b.intensity);
			ctx.lineWidth = 2;
			ctx.stroke();
		}
		const dots = Math.round(40 * b.particleDensity);
		for (let i = 0; i < dots; i++) {
			const s = pointOnSamples(samples, hash(i + Math.floor(time.elapsed * 3)));
			const n = (fbm(s.x * .02, time.elapsed) - .4) * 12;
			ctx.fillStyle = hexToRgba(i % 2 ? primary : secondary, .55);
			ctx.beginPath();
			ctx.arc(s.x + s.nx * n, s.y + s.ny * n, 1.4 + hash(i) * 2, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}
	drawChases(samples, anim, color, thick) {
		if (!anim.chase.length) return;
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		for (const t of anim.chase) for (let k = -6; k <= 6; k++) {
			const p = pointOnSamples(samples, t + k * .006);
			const a = 1 - Math.abs(k) / 7;
			ctx.fillStyle = hexToRgba("#FFFFFF", .55 * a);
			ctx.beginPath();
			ctx.arc(p.x, p.y, (thick + 3) * a, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = hexToRgba(color, .45 * a);
			ctx.beginPath();
			ctx.arc(p.x, p.y, (thick + 10) * a, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}
	drawLightning(samples, color, anim, time, branches) {
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		const n = Math.max(1, branches);
		for (let i = 0; i < n; i++) {
			if (hash(i + Math.floor(time.elapsed * 10)) > anim.burst) continue;
			const t0 = hash(i * 5 + Math.floor(time.elapsed * 3));
			ctx.beginPath();
			for (let k = 0; k < 8; k++) {
				const s = pointOnSamples(samples, t0 + k * .012);
				const jag = (hash(i * 11 + k + time.elapsed) - .5) * 22;
				const x = s.x + s.nx * jag;
				const y = s.y + s.ny * jag;
				if (k === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.strokeStyle = hexToRgba("#FFFFFF", .85);
			ctx.lineWidth = 1.4;
			ctx.stroke();
			ctx.strokeStyle = hexToRgba(color, .45);
			ctx.lineWidth = 4;
			ctx.stroke();
		}
		ctx.restore();
	}
	drawSparks(samples, color, anim, time) {
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		const n = Math.round(8 + anim.spark * 18);
		for (let i = 0; i < n; i++) {
			const s = pointOnSamples(samples, hash(i * 3 + Math.floor(time.elapsed * 12)));
			const len = 6 + hash(i + 8) * 16 * anim.spark;
			ctx.beginPath();
			ctx.moveTo(s.x, s.y);
			ctx.lineTo(s.x + s.nx * len, s.y + s.ny * len);
			ctx.strokeStyle = hexToRgba("#FFFFFF", .8);
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.strokeStyle = hexToRgba(color, .7);
			ctx.lineWidth = 3;
			ctx.stroke();
		}
		ctx.restore();
	}
	drawHolo(samples, anim, thick) {
		const ctx = this.ctx;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		const t = anim.chase[0] ?? .3;
		for (let i = -12; i <= 12; i++) {
			const p = pointOnSamples(samples, t + i * .004);
			ctx.fillStyle = hexToRgba(hslToHex((i + 12) / 24 * 360 + anim.hue, 1, .6), .35 * anim.rainbow);
			ctx.beginPath();
			ctx.arc(p.x, p.y, thick + 6, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}
	drawRgbGhost(samples, thick, anim) {
		const ctx = this.ctx;
		const o = 3 + anim.rgb * 6;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		ctx.translate(-o, 0);
		ctx.strokeStyle = "rgba(255,0,80,0.35)";
		ctx.lineWidth = thick;
		ctx.stroke(this.pathFromSamples(samples));
		ctx.translate(o * 2, 0);
		ctx.strokeStyle = "rgba(0,220,255,0.35)";
		ctx.stroke(this.pathFromSamples(samples));
		ctx.restore();
	}
	drawScanline(w, h, t, color) {
		const ctx = this.ctx;
		const y = t * h;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		const g = ctx.createLinearGradient(0, y - 18, 0, y + 18);
		g.addColorStop(0, "rgba(0,0,0,0)");
		g.addColorStop(.5, hexToRgba(color, .35));
		g.addColorStop(1, "rgba(0,0,0,0)");
		ctx.fillStyle = g;
		ctx.fillRect(0, y - 18, w, 36);
		ctx.fillStyle = hexToRgba("#FFFFFF", .25);
		ctx.fillRect(0, y, w, 1.2);
		ctx.restore();
	}
};
function renderThumbnail(project, size = 320) {
	if (typeof document === "undefined") return "";
	const c = document.createElement("canvas");
	c.width = size;
	c.height = Math.round(size * 9 / 16);
	const r = new OverlayRenderer(c);
	r.resize(c.width, c.height, 1);
	r.render(project, {
		dt: 1 / 60,
		elapsed: .8
	}, {
		bass: .4,
		mids: .3,
		treble: .2,
		volume: .4,
		energy: .45,
		snare: 0,
		vocals: .2,
		drop: 0
	});
	try {
		return c.toDataURL("image/jpeg", .72);
	} catch {
		return "";
	}
}
var EMPTY_AUDIO = {
	bass: 0,
	mids: 0,
	treble: 0,
	volume: 0,
	energy: 0,
	snare: 0,
	vocals: 0,
	drop: 0
};
var CHANNEL = "blu-bgs-live";
var HISTORY_CAP = 60;
var emptyFav = {
	borders: [],
	animations: [],
	colors: [],
	combos: [],
	presets: []
};
var defaultSettings = {
	previewBg: "checker",
	showFps: true,
	gpuFriendly: false,
	obsFps: 60,
	obsWidth: 1920,
	obsHeight: 1080
};
function pushLive(project) {
	if (typeof window === "undefined") return;
	writeJson(STORAGE_LIVE, project);
	try {
		const ch = new BroadcastChannel(CHANNEL);
		ch.postMessage({
			type: "project",
			project
		});
		ch.close();
	} catch {}
	fetch("/api/live", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			id: "default",
			project
		})
	}).catch(() => void 0);
}
function snapshotMeta(project, prev) {
	return {
		project,
		meta: {
			id: project.id,
			name: project.name,
			updatedAt: project.updatedAt,
			resolution: `${project.canvas.width}x${project.canvas.height}`,
			thumbnail: prev?.meta.thumbnail || "",
			favorite: prev?.meta.favorite ?? false
		}
	};
}
var useStudio = create((set, get) => ({
	hydrated: false,
	view: "dashboard",
	project: createDefaultProject({ name: "Cyberpunk Frame" }),
	records: [],
	favorites: emptyFav,
	settings: defaultSettings,
	playing: true,
	fullscreen: false,
	zoom: .42,
	fit: true,
	audioBands: { ...EMPTY_AUDIO },
	perf: {
		fps: 60,
		frameMs: 16,
		renderMs: 0,
		audioMs: 0,
		particles: 0
	},
	search: "",
	history: [],
	future: [],
	lastSavedId: null,
	hydrate: () => {
		if (get().hydrated) return;
		const records = loadAllProjects();
		const fav = readJson(STORAGE_FAV, emptyFav);
		const settings = {
			...defaultSettings,
			...readJson(STORAGE_SETTINGS, {})
		};
		const live = readJson(STORAGE_LIVE, null);
		let project = live ? sanitizeProject(live) : get().project;
		let seeded = records;
		if (seeded.length === 0) {
			seeded = BUILTIN_PRESETS.slice(0, 4).map((p) => {
				return snapshotMeta(applyPreset(p));
			});
			saveAllProjects(seeded);
			project = seeded[0].project;
		}
		set({
			hydrated: true,
			records: seeded,
			favorites: fav,
			settings,
			project,
			lastSavedId: project.id
		});
	},
	setView: (view) => set({ view }),
	setProject: (project, history = true) => {
		const s = get();
		if (history) set({
			project,
			history: [...s.history, s.project].slice(-60),
			future: []
		});
		else set({ project });
		pushLive(project);
	},
	patchProject: (partial, history = false) => {
		const s = get();
		const project = {
			...s.project,
			...partial,
			updatedAt: Date.now()
		};
		if (history) set({
			project,
			history: [...s.history, s.project].slice(-60),
			future: []
		});
		else set({ project });
		pushLive(project);
	},
	patchBorder: (partial, history = false) => {
		const s = get();
		get().patchProject({ border: {
			...s.project.border,
			...partial
		} }, history);
	},
	patchColors: (partial, history = false) => {
		const s = get();
		get().patchProject({ colors: {
			...s.project.colors,
			...partial
		} }, history);
	},
	patchGlow: (partial, history = false) => {
		const s = get();
		get().patchProject({ glow: {
			...s.project.glow,
			...partial
		} }, history);
	},
	patchParticles: (partial, history = false) => {
		const s = get();
		get().patchProject({ particles: {
			...s.project.particles,
			...partial
		} }, history);
	},
	patchAudio: (partial, history = false) => {
		const s = get();
		get().patchProject({ audio: {
			...s.project.audio,
			...partial
		} }, history);
	},
	setBorderType: (type) => {
		get().patchBorder({ type }, true);
	},
	toggleAnimation: (type) => {
		const s = get();
		const existing = s.project.animations.find((a) => a.type === type);
		let animations;
		if (existing) animations = s.project.animations.map((a) => a.type === type ? {
			...a,
			enabled: !a.enabled
		} : a);
		else animations = [...s.project.animations, makeAnimation(type)];
		get().patchProject({ animations }, true);
	},
	patchAnimation: (type, partial) => {
		const s = get();
		const animations = s.project.animations.some((a) => a.type === type) ? s.project.animations.map((a) => a.type === type ? {
			...a,
			...partial
		} : a) : [...s.project.animations, {
			...makeAnimation(type),
			...partial
		}];
		get().patchProject({ animations });
	},
	newOverlay: () => {
		const project = createDefaultProject();
		get().setProject(project, true);
		set({ view: "designer" });
	},
	fromPreset: (presetId) => {
		const preset = BUILTIN_PRESETS.find((p) => p.id === presetId);
		if (!preset) return;
		const project = applyPreset(preset);
		get().setProject(project, true);
		set({ view: "designer" });
	},
	saveCurrent: () => {
		const s = get();
		const project = {
			...s.project,
			updatedAt: Date.now()
		};
		const thumb = renderThumbnail(project);
		const records = [...s.records];
		const idx = records.findIndex((r) => r.meta.id === project.id);
		const rec = snapshotMeta(project, idx >= 0 ? records[idx] : void 0);
		rec.meta.thumbnail = thumb || rec.meta.thumbnail;
		if (idx >= 0) records[idx] = rec;
		else records.unshift(rec);
		saveAllProjects(records);
		set({
			records,
			project,
			lastSavedId: project.id
		});
		pushLive(project);
	},
	loadProject: (id) => {
		const rec = get().records.find((r) => r.meta.id === id);
		if (!rec) return;
		get().setProject(sanitizeProject(rec.project), true);
		set({ view: "designer" });
	},
	duplicateProject: (id) => {
		const s = get();
		const src = id ? s.records.find((r) => r.meta.id === id)?.project : s.project;
		if (!src) return;
		const copy = cloneProject(src);
		const rec = snapshotMeta(copy);
		rec.meta.thumbnail = renderThumbnail(copy);
		const records = [rec, ...s.records];
		saveAllProjects(records);
		set({
			records,
			project: copy,
			view: "designer"
		});
	},
	deleteProject: (id) => {
		const records = get().records.filter((r) => r.meta.id !== id);
		saveAllProjects(records);
		set({ records });
		if (get().project.id === id) get().newOverlay();
	},
	renameProject: (id, name) => {
		const records = get().records.map((r) => r.meta.id === id ? {
			...r,
			meta: {
				...r.meta,
				name
			},
			project: {
				...r.project,
				name
			}
		} : r);
		saveAllProjects(records);
		const s = get();
		set({
			records,
			project: s.project.id === id ? {
				...s.project,
				name
			} : s.project
		});
	},
	importJson: (text) => {
		const project = deserializeProject(text);
		project.id = uid("prj");
		project.createdAt = Date.now();
		project.updatedAt = Date.now();
		get().setProject(project, true);
		set({ view: "designer" });
	},
	exportJson: () => serializeProject(get().project),
	generate: () => {
		const project = generateNeon();
		get().setProject(project, true);
	},
	undo: () => {
		const s = get();
		if (!s.history.length) return;
		const prev = s.history[s.history.length - 1];
		set({
			project: prev,
			history: s.history.slice(0, -1),
			future: [s.project, ...s.future].slice(0, HISTORY_CAP)
		});
		pushLive(prev);
	},
	redo: () => {
		const s = get();
		if (!s.future.length) return;
		const next = s.future[0];
		set({
			project: next,
			future: s.future.slice(1),
			history: [...s.history, s.project].slice(-60)
		});
		pushLive(next);
	},
	toggleFav: (kind, value) => {
		const fav = { ...get().favorites };
		const list = new Set(fav[kind]);
		if (list.has(value)) list.delete(value);
		else list.add(value);
		fav[kind] = [...list];
		writeJson(STORAGE_FAV, fav);
		set({ favorites: fav });
	},
	setPlaying: (playing) => set({ playing }),
	setZoom: (zoom) => set({
		zoom,
		fit: false
	}),
	setFit: (fit) => set({ fit }),
	setFullscreen: (fullscreen) => set({ fullscreen }),
	setSearch: (search) => set({ search }),
	setAudioBands: (audioBands) => set({ audioBands }),
	setPerf: (perf) => set({ perf }),
	setAudioSource: (source) => get().patchAudio({
		source,
		enabled: source !== "none"
	}, true),
	setOutputMode: (outputMode) => get().patchProject({ outputMode }, true),
	setQuality: (quality) => get().patchProject({ quality }, true),
	patchSettings: (partial) => {
		const settings = {
			...get().settings,
			...partial
		};
		writeJson(STORAGE_SETTINGS, settings);
		set({ settings });
	},
	publishLive: () => {
		const s = get();
		get().saveCurrent();
		pushLive(s.project);
	},
	resetProperty: (scope) => {
		const fresh = createDefaultProject();
		if (scope === "border") get().patchProject({ border: fresh.border }, true);
		if (scope === "glow") get().patchProject({ glow: fresh.glow }, true);
		if (scope === "particles") get().patchProject({ particles: fresh.particles }, true);
		if (scope === "colors") get().patchProject({ colors: fresh.colors }, true);
	}
}));
//#endregion
export { EMPTY_AUDIO as a, PRESET_CATEGORIES as c, createDefaultProject as d, lerp as f, useStudio as g, uid as h, COLOR_FAMILIES as i, STORAGE_LIVE as l, sanitizeProject as m, CHANNEL as n, NEON_COLORS as o, readJson as p, COLOR_COMBOS as r, OverlayRenderer as s, BUILTIN_PRESETS as t, clamp as u };
