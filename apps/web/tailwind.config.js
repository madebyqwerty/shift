/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				base: {
					50: '#f6f6f6',
					100: '#e7e7e7',
					200: '#d1d1d1',
					300: '#b0b0b0',
					400: '#888888',
					500: '#737373',
					600: '#5d5d5d',
					700: '#4f4f4f',
					800: '#454545',
					900: '#3d3d3d',
					950: '#262626'
				},
				primary: {
					50: '#effcfc',
					100: '#d6f4f7',
					200: '#b2e9ef',
					300: '#7cd8e4',
					400: '#3fbdd1',
					500: '#24a1b6',
					600: '#21849c',
					700: '#21697d',
					800: '#235767',
					900: '#214958',
					950: '#112f3b'
				},
				accent: {
					50: '#f5f6fa',
					100: '#eaecf4',
					200: '#d1d7e6',
					300: '#a9b5d0',
					400: '#7a8db6',
					500: '#5a709d',
					600: '#42537b',
					700: '#3a486a',
					800: '#333e59',
					900: '#2e364c',
					950: '#1e2333'
				}
			},
			fontSize: {
				'2xs': '0.5rem',
				xs: '0.75rem',
				sm: '0.875rem',
				base: '1rem',
				lg: '1.25rem',
				xl: '1.5625rem',
				'2xl': '1.953125rem',
				'3xl': '2.4375rem',
				'4xl': '3rem'
			},
			fontFamily: {
				nunito: 'Nunito',
				'nunito-sans': 'Nunito Sans'
			},
			boxShadow: {
				'shadow-sm': '0px 1px 2px 0px rgba(255,0,0,0.05)',
				shadow: '0px 1px 2px -1px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.1)',
				'shadow-md': '0px 2px 4px -2px rgba(0,0,0,0.1), 0px 4px 6px -1px rgba(0,0,0,0.1)',
				'shadow-lg': '0px 4px 6px -4px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)',
				'shadow-xl': '0px 8px 10px -6px rgba(0,0,0,0.1), 0px 20px 25px -5px rgba(0,0,0,0.1)',
				'shadow-2xl': '0px 25px 50px -12px rgba(0,0,0,0.25)',
				'shadow-inner': 'inset 0px 2px 4px 0px rgba(0,0,0,0.05)'
			},
			borderRadius: {
				none: '0',
				xs: '0.04166672006249428rem',
				sm: '0.25rem',
				default: '0.3125rem',
				lg: '0.5rem',
				xl: '0.75rem',
				'2xl': '1rem',
				'3xl': '1.75rem',
				'4xl': '2rem',
				full: '9999px'
			}
		}
	},
	plugins: []
};
