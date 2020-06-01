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
			'20': '20px',
		},
		extend: {
			colors: {
				purp: {
					lightest: '#f2f1f6',
					light: '#EAEAEE',
					medium: '#D2D0D9',
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
