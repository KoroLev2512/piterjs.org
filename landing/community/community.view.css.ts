// @ts-nocheck
// Значения здесь — обычный CSS (шорткаты padding и border, var(--…) в background,
// zIndex строкой), а типы $mol_style_properties принимают только структурные
// формы, поэтому проверка типов для файла отключена.
namespace $.$$ {

	$mol_style_define( $piterjs_landing_community, {
		backgroundColor: '#161616',
		color: '#ffffff',
		borderTop: '1px solid #282828',
		padding: '90px 32px',
		display: 'flex',
		justifyContent: 'center',
		Community_content: {
			maxWidth: '1200px',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			gap: '32px',
		},
		Community_heading: {
			fontSize: 'clamp(28px, 4vw, 44px)',
			fontWeight: '300',
			letterSpacing: '-0.04em',
			textTransform: 'uppercase',
		},
		Community_cards: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gap: '24px',
		},
		Comm: {
			background: '#0d0d0d',
			border: '1px solid #2e2e2e',
			borderRadius: '9px',
			padding: '32px',
			display: 'flex',
			flexDirection: 'column',
			gap: '14px',
			height: '100%',
			boxSizing: 'border-box',
		},
		Comm_badge: {
			fontFamily: 'var(--font-mono)',
			fontSize: '11px',
			fontWeight: '700',
			color: 'var(--color-caution-yellow)',
			letterSpacing: '1px',
		},
		Comm_title: {
			fontSize: '22px',
			fontWeight: '600',
			color: '#ffffff',
		},
		Comm_text: {
			fontSize: '14px',
			color: '#aaaaaa',
			lineHeight: '1.5',
			marginBottom: '14px',
		},
		Comm_btn: {
			textTransform: 'uppercase',
			alignSelf: 'flex-start',
			fontFamily: 'var(--font-mono)',
			fontSize: '12px',
			color: 'var(--color-caution-yellow)',
			textDecoration: 'none',
			padding: '8px 14px',
			border: '1px solid var(--color-caution-yellow)',
			borderRadius: '6px',
			marginTop: 'auto',
			transition: 'background-color 0.2s ease, color 0.2s ease',
			display: 'inline-flex',
			alignItems: 'center',
			cursor: 'pointer',
			':hover': {
				backgroundColor: 'var(--color-caution-yellow)',
				color: '#000000',
			},
		},
		'@media': {
			'(max-width: 992px)': {
				Community_cards: {
					gridTemplateColumns: '1fr',
				},
			},
			'(max-width: 600px)': {
				padding: '48px 12px',
				Community_cards: {
					gap: '20px',
				},
			},
			'(max-width: 480px)': {
				padding: '40px 10px',
			},
		},
	} )

}
