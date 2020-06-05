module.exports = {
	purge: [],
	theme: {
		maxHeight: {
			'0': '0',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%',
		},
		inset: {
			'0': 0,
			auto: 'auto',
			'neg-10': '-10px',
			'10': '10px',
			'15': '15px',
			'20': '20px',
			'25': '25px',
			'35': '35px',
		},
		extend: {
			colors: {
				purp: {
					lightest: '#f2f1f6',
					light: '#EAEAEE',
					medium: '#CAC7D1',
					normal: '#414255',
					dark: '#3A3B4E',
					bright: '#75107B',
					brightest: '#9815a0',
				},
			},
		},
	},
	variants: {
		textColor: ['responsive', 'hover', 'focus', 'group-hover', 'disabled'],
		opacity: ['responsive', 'hover', 'focus', 'group-hover'],
		backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
	},
	plugins: [],
}
