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
		textColor: ['responsive', 'hover', 'focus', 'group-hover'],
		opacity: ['responsive', 'hover', 'focus', 'group-hover'],
	},
	plugins: [],
}
