// @ts-nocheck
// Значения здесь — обычный CSS (шорткаты padding и border, var(--…) в background,
// zIndex строкой), а типы $mol_style_properties принимают только структурные
// формы, поэтому проверка типов для файла отключена.
namespace $.$$ {

	$mol_style_define( $piterjs_landing_rsvp, {
		position: 'fixed',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		zIndex: '3000',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '24px',
		boxSizing: 'border-box',
		Rsvp_backdrop: {
			position: 'absolute',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			background: 'rgba(0, 0, 0, 0.82)',
			backdropFilter: 'blur(8px)',
			cursor: 'pointer',
			animation: 'pjs_backdrop_in 0.2s ease',
		},
		Rsvp_dialog: {
			position: 'relative',
			zIndex: '1',
			width: '100%',
			maxWidth: '520px',
			maxHeight: '100%',
			overflowY: 'auto',
			background: '#0d0d0d',
			border: '1px solid #2e2e2e',
			borderRadius: '12px',
			padding: '32px',
			display: 'flex',
			flexDirection: 'column',
			gap: '18px',
			boxSizing: 'border-box',
			boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)',
			animation: 'pjs_modal_in 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
		},
		Rsvp_head: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: '16px',
		},
		Rsvp_badge: {
			fontFamily: 'var(--font-mono)',
			fontSize: '11px',
			fontWeight: '700',
			color: 'var(--color-caution-yellow)',
			letterSpacing: '1px',
		},
		Rsvp_close_btn: $piterjs_landing_style.close_btn,
		Rsvp_title: {
			fontSize: 'clamp(22px, 3vw, 30px)',
			fontWeight: '300',
			letterSpacing: '-0.03em',
			textTransform: 'uppercase',
			color: '#ffffff',
			lineHeight: '1.15',
		},
		Rsvp_meta: {
			fontFamily: 'var(--font-mono)',
			fontSize: '12px',
			color: '#aaaaaa',
			letterSpacing: '0.5px',
		},
		Rsvp_note: {
			fontFamily: 'var(--font-mono)',
			fontSize: '11px',
			color: 'var(--color-caution-yellow)',
			letterSpacing: '1px',
			textTransform: 'uppercase',
		},
		Next_event_reg: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'stretch',
			gap: '10px',
			paddingTop: '4px',
			borderTop: '1px solid #202020',
		},
		Next_event_reg_label: {
			fontFamily: 'var(--font-mono)',
			fontSize: '11px',
			fontWeight: '700',
			color: 'var(--color-aluminum)',
			letterSpacing: '1px',
			textTransform: 'uppercase',
			paddingTop: '10px',
		},
		Next_event_reg_input: {
			background: '#1a1a1a',
			border: '1px solid #333333',
			borderRadius: '6px',
			color: '#ffffff',
			padding: '12px 14px',
			fontSize: '15px',
			width: '100%',
			boxSizing: 'border-box',
			transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
			// $mol_string ставит себе inset-рамки через box-shadow — гасим, у нас свой border
			boxShadow: 'none',
			':hover': {
				boxShadow: 'none',
			},
			':focus': {
				borderColor: 'var(--color-caution-yellow)',
				boxShadow: '0 0 8px rgba(255, 243, 19, 0.2)',
				outline: 'none',
			},
			'::placeholder': {
				color: '#5a5a5a',
			},
		},
		Next_event_reg_bid: {
			fontFamily: 'var(--font-mono)',
			fontSize: '11px',
			color: '#ff6b6b',
			':empty': {
				display: 'none',
			},
		},
		Next_event_reg_check: {
			textTransform: 'uppercase',
			alignSelf: 'flex-start',
			background: '#11141c',
			color: '#9aa2b4',
			border: '1px solid #242938',
			borderRadius: '6px',
			padding: '10px 18px',
			marginTop: '6px',
			fontFamily: 'var(--font-mono)',
			fontSize: '13px',
			cursor: 'pointer',
			transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
			':hover': {
				color: '#ffffff',
				borderColor: '#4a5368',
				background: '#181d28',
			},
			'@': {
				disabled: {
					true: {
						opacity: '0.45',
						cursor: 'not-allowed',
					},
				},
				mol_check_checked: {
					true: {
						background: 'var(--color-caution-yellow)',
						color: '#000000',
						borderColor: 'var(--color-caution-yellow)',
						fontWeight: '700',
						':hover': {
							background: 'var(--color-caution-yellow)',
							color: '#000000',
							borderColor: 'var(--color-caution-yellow)',
						},
					},
				},
			},
		},
		'@media': {
			'(max-width: 600px)': {
				padding: '12px',
				Rsvp_dialog: {
					padding: '24px 20px',
					gap: '14px',
				},
			},
		},
	} )

}
