namespace $ {

	// Одна и та же кнопка закрытия для всех модалок лендинга (Rsvp_modal, Cfp_modal).
	// marginRight отрицательный, чтобы крестик выходил за padding диалога: замерено 17px
	// от правого края вместо 33px. Ширина кнопки больше суммы padding'ов — $mol_button_minor
	// добавляет свои, поэтому значение подобрано по факту, а не расчётом.
	const close_btn = {
		background: 'transparent',
		border: 'none',
		boxShadow: 'none',
		color: '#aaaaaa',
		fontFamily: 'var(--font-mono)',
		fontSize: '12px',
		padding: '6px 12px',
		marginRight: '-16px',
		cursor: 'pointer',
		transition: 'color 0.2s ease',
		':hover': {
			color: 'var(--color-caution-yellow)',
			background: 'transparent',
			boxShadow: 'none',
		},
	}

	// Общий вид CFP-кнопки: одна в блоке «Программа», вторая в коробке
	// отсчёта, когда митап прошёл. Выравнивание у каждой своё.
	const cfp_btn = {
		textTransform: 'uppercase',
		background: 'rgba(255, 243, 19, 0.08)',
		color: 'var(--color-caution-yellow)',
		fontFamily: 'var(--font-mono)',
		fontWeight: '700',
		fontSize: '13px',
		padding: '8px 16px',
		borderRadius: '6px',
		border: '1px solid rgba(255, 243, 19, 0.35)',
		boxShadow: 'none',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		':hover': {
			backgroundColor: 'var(--color-caution-yellow)',
			color: '#000000',
			borderColor: 'var(--color-caution-yellow)',
		},
	}

	// Ссылка-кнопка в карточке события: «На карте» до отзывов и «Оставить
	// отзыв» в течение недели после митапа.
	//
	// Наследует cfp_btn целиком. Раньше это была отдельная, более мелкая
	// ступень (11px/400 против 13px/700) — она выросла из Map_link, мелкой
	// второстепенной ссылки под строками метаданных карточки. Сейчас обе
	// кнопки стоят рядом в hero как две главные, и разница в кегле читалась
	// как недоделка. Своего осталось только то, что нужно ссылке.
	const pill_link = {
		... cfp_btn,
		textDecoration: 'none',
		display: 'inline-flex',
		alignItems: 'center',
	}

	/** Общие куски стилей лендинга: кнопки, которые нужны сразу нескольким компонентам */
	export const $piterjs_landing_style = { close_btn, cfp_btn, pill_link }

}
