// @ts-nocheck
// Значения здесь — обычный CSS (шорткаты padding и border, var(--…) в background,
// zIndex строкой), а типы $mol_style_properties принимают только структурные
// формы, поэтому проверка типов для файла отключена.
namespace $.$$ {

	$mol_style_define( $piterjs_landing_archive, {
		backgroundColor: '#0b0d13',
		backgroundImage: 'radial-gradient(circle, rgba(255, 243, 19, 0.12) 1px, transparent 1px)',
		backgroundSize: '24px 24px',
		color: '#ffffff',
		borderTop: '1px solid #1f2430',
		padding: '90px 32px',
		display: 'flex',
		justifyContent: 'center',
		position: 'relative',
		Archive_content: {
			maxWidth: '1200px',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			gap: '32px',
		},
		Archive_heading: {
			fontSize: 'clamp(28px, 4vw, 44px)',
			fontWeight: '300',
			letterSpacing: '-0.04em',
			textTransform: 'uppercase',
		},
		Archive_filters: {
			display: 'flex',
			gap: '8px',
			flexWrap: 'wrap',
			$mol_button_minor: {
				background: '#11141c',
				color: '#9aa2b4',
				border: '1px solid #242938',
				padding: '8px 20px',
				borderRadius: '6px',
				fontFamily: 'var(--font-mono)',
				fontSize: '13px',
				fontWeight: '500',
				cursor: 'pointer',
				transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
				':hover': {
					color: '#ffffff',
					borderColor: '#4a5368',
					background: '#181d28',
				},
				'@': {
					piterjs_landing_filter_active: {
						true: {
							background: 'var(--color-caution-yellow)',
							color: '#000000',
							borderColor: 'var(--color-caution-yellow)',
							fontWeight: '700',
							transform: 'translateY(-1px)',
							':hover': {
								background: 'var(--color-caution-yellow)',
								color: '#000000',
								borderColor: 'var(--color-caution-yellow)',
							},
						},
					},
				},
			},
		},
		Archive_grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
			gap: '20px',
		},
		Archive_card: {
			background: 'rgba(14, 17, 24, 0.92)',
			backdropFilter: 'blur(8px)',
			border: '1px solid #202636',
			borderRadius: '9px',
			padding: '24px',
			display: 'flex',
			flexDirection: 'column',
			gap: '12px',
			transition: 'border-color 0.2s ease',
			':hover': {
				borderColor: 'var(--color-caution-yellow)',
			},
		},
		Card_event_tag: {
			fontFamily: 'var(--font-mono)',
			fontSize: '11px',
			fontWeight: '700',
			color: 'var(--color-caution-yellow)',
		},
		Card_title: {
			fontSize: '16px',
			fontWeight: '500',
			color: '#ffffff',
			lineHeight: '1.4',
		},
		Card_meta: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			fontFamily: 'var(--font-mono)',
			fontSize: '12px',
			color: '#838a9c',
			marginTop: 'auto',
			paddingTop: '12px',
			borderTop: '1px solid #1c2130',
		},
		Archive_more_box: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: '16px',
			width: '100%',
		},
		Archive_more_btn: {
			textTransform: 'uppercase',
			background: '#11141c',
			border: '1px solid #242938',
			color: 'var(--color-caution-yellow)',
			fontFamily: 'var(--font-mono)',
			fontSize: '13px',
			fontWeight: '700',
			padding: '12px 36px',
			borderRadius: '6px',
			letterSpacing: '0.5px',
			cursor: 'pointer',
			transition: 'all 0.2s ease',
			boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
			':hover': {
				background: 'var(--color-caution-yellow)',
				color: '#000000',
				borderColor: 'var(--color-caution-yellow)',
				// без свечения: тень остаётся базовой, чтобы не было вспышки на transition
				boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
				transform: 'translateY(-1px)',
			},
		},
		'@media': {
			'(max-width: 992px)': {
				Archive_grid: {
					gridTemplateColumns: '1fr 1fr',
				},
			},
			'(max-width: 600px)': {
				padding: '48px 12px',
				Archive_card: {
					padding: '20px 16px',
				},
				Archive_grid: {
					gridTemplateColumns: '1fr',
					gap: '16px',
				},
				Archive_filters: {
					flexWrap: 'wrap',
					gap: '8px',
				},
			},
			'(max-width: 480px)': {
				padding: '40px 10px',
			},
		},
	} )

}
