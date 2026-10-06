// @ts-nocheck
// Значения здесь — обычный CSS (шорткаты padding и border, var(--…) в background,
// zIndex строкой), а типы $mol_style_properties принимают только структурные
// формы, поэтому проверка типов для файла отключена.
namespace $.$$ {

	$mol_style_define( $piterjs_landing_manifesto, {
		backgroundColor: 'var(--color-caution-yellow)',
		color: '#000000',
		padding: '90px 32px',
		display: 'flex',
		justifyContent: 'center',
		Manifesto_content: {
			maxWidth: '1200px',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			gap: '60px',
		},
		Manifesto_quote: {
			fontSize: 'clamp(24px, 3.8vw, 44px)',
			fontWeight: '400',
			lineHeight: '1.25',
			letterSpacing: '-0.03em',
			color: '#000000',
			maxWidth: '1050px',
		},
		Stats_grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			gap: '24px',
			borderTop: '2px solid rgba(0, 0, 0, 0.15)',
			paddingTop: '40px',
		},
		Stat: {
			display: 'flex',
			flexDirection: 'column',
			gap: '6px',
		},
		Stat_val: {
			fontFamily: 'var(--font-mono)',
			fontSize: 'clamp(32px, 4vw, 48px)',
			fontWeight: '700',
			color: '#000000',
			letterSpacing: '-1px',
			marginBottom: '6px',
		},
		Stat_lbl: {
			fontSize: '14px',
			fontWeight: '500',
			color: '#333333',
			lineHeight: '1.3',
		},
		'@media': {
			'(max-width: 992px)': {
				Manifesto_quote: {
					fontSize: '32px',
					lineHeight: '1.25',
				},
				Stats_grid: {
					gridTemplateColumns: '1fr 1fr',
					gap: '24px',
				},
			},
			'(max-width: 600px)': {
				padding: '48px 12px',
				Manifesto_quote: {
					fontSize: '22px',
					lineHeight: '1.3',
				},
				Stats_grid: {
					gridTemplateColumns: '1fr',
					gap: '20px',
				},
			},
			'(max-width: 480px)': {
				Manifesto_quote: {
					fontSize: '20px',
				},
				padding: '40px 10px',
			},
		},
	} )

}
