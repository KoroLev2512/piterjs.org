// @ts-nocheck
// Значения здесь — обычный CSS (шорткаты padding и border, var(--…) в background,
// zIndex строкой), а типы $mol_style_properties принимают только структурные
// формы, поэтому проверка типов для файла отключена.
namespace $.$$ {

	$mol_style_define( $piterjs_landing, {
		display: 'block',
		width: '100vw',
		minWidth: '100vw',
		maxWidth: '100vw',
		minHeight: '100vh',
		height: '100vh',
		overflowY: 'auto',
		overflowX: 'hidden',
		backgroundColor: '#000000',
		color: '#eeeeee',
		fontFamily: '\'Inter\', \'Space Grotesk\', ui-sans-serif, system-ui, -apple-system, sans-serif',
		position: 'relative',
		boxSizing: 'border-box',
		margin: '0',
		padding: '0',
		border: 'none',
		'--color-caution-yellow': '#fff313',
		'--color-midnight-steel': '#000000',
		'--color-industrial-white': '#eeeeee',
		'--color-carbon': '#333333',
		'--color-gunmetal': '#4b4b4b',
		'--color-aluminum': '#afafaf',
		'--font-mono': '\'JetBrains Mono\', monospace',
		'*': {
			boxSizing: 'border-box',
		},
		Main: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
		},
		Toast: {
			position: 'fixed',
			bottom: '32px',
			right: '32px',
			background: '#000000',
			color: 'var(--color-caution-yellow)',
			border: '1px solid var(--color-caution-yellow)',
			borderRadius: '6px',
			padding: '14px 20px',
			fontFamily: 'var(--font-mono)',
			fontSize: '13px',
			boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
			zIndex: '2000',
			animation: 'pjs_slidein 0.3s ease',
		},
		'@': {
			piterjs_landing_rsvp_open: {
				true: {
					overflowY: 'hidden',
				},
			},
		},
		'@media': {
			'(max-width: 600px)': {
				Toast: {
					left: '12px',
					right: '12px',
					bottom: '12px',
					textAlign: 'center',
				},
			},
		},
	} )

}
