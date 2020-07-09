module.exports = {
	purge: [],
	theme: {
		maxHeight: {
			'0': '0',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%'
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
			'6r': '6rem'
		},
		scale: {
			'0': '0',
			'10': '.10',
			'20': '.20',
			'25': '.25',
			'50': '.5',
			'75': '.75',
			'90': '.9',
			'95': '.95',
			'100': '1',
			'105': '1.05',
			'110': '1.1',
			'125': '1.25',
			'150': '1.5',
			'200': '2'
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
					brightest: '#9815a0'
				}
			}
		}
	},
	variants: {
		textColor: ['responsive', 'group-hover', 'hover', 'focus', 'disabled'],
		opacity: ['responsive', 'hover', 'focus', 'group-hover', 'disabled'],
		backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
		cursor: ['responsive,', 'hover', 'focus', 'disabled'],
		padding: ['responsive', 'hover', 'focus', 'disabled'],
		margin: ['responsive', 'hover', 'focus', 'disabled', 'first', 'last']
	},
	plugins: []
}
