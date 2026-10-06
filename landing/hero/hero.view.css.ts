// @ts-nocheck
// Значения здесь — обычный CSS (шорткаты padding и border, var(--…) в background,
// zIndex строкой), а типы $mol_style_properties принимают только структурные
// формы, поэтому проверка типов для файла отключена.
namespace $.$$ {

	// Общая основа скелетонов: бегущий блик (keyframes в landing.view.css)
	const skel_base = {
		background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.05) 75%)',
		backgroundSize: '200% 100%',
		animation: 'pjs_skeleton_shimmer 1.8s infinite ease-in-out',
		borderRadius: '4px',
	}

	$mol_style_define( $piterjs_landing_hero, {
		position: 'relative',
		minHeight: '100vh',
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '130px 36px 96px 36px',
		backgroundColor: '#000000',
		backgroundImage: 'url(\'piterjs/landing/assets/hero_poster.webp\')',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		overflow: 'hidden',
		boxSizing: 'border-box',
		Hero_video: {
			position: 'absolute',
			inset: '0',
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			objectPosition: 'center',
			zIndex: '0',
			pointerEvents: 'none',
			border: '0',
		},
		Hero_scrim: {
			position: 'absolute',
			inset: '0',
			zIndex: '1',
			pointerEvents: 'none',
			backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255, 243, 19, 0.05) 0%, transparent 40%), 	                  linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.95))',
		},
		Hero_content: {
			maxWidth: '1200px',
			width: '100%',
			position: 'relative',
			zIndex: '2',
			display: 'flex',
			flexDirection: 'column',
			gap: '24px',
			// растягиваем на всю высоту героя, иначе Hero_intro не к чему
			// растягивать и карточки не уезжают вниз
			flex: '1 1 auto',
		},
		// Заголовочная группа забирает всё свободное место и центрует себя
		// внутри него: текст стоит по центру, а Hero_footer_grid прижат к низу.
		Hero_intro: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			gap: '24px',
			flex: '1 1 auto',
			minHeight: '0',
		},
		Hero_status_row: {
			display: 'flex',
			alignItems: 'center',
			gap: '16px',
			flexWrap: 'wrap',
		},
		Status_badge: {
			display: 'inline-flex',
			alignItems: 'center',
			gap: '8px',
			background: '#111111',
			border: '1px solid #333333',
			padding: '6px 14px',
			borderRadius: '6px',
			fontFamily: 'var(--font-mono)',
			fontSize: '11px',
			fontWeight: '600',
			letterSpacing: '0.5px',
			color: 'var(--color-caution-yellow)',
		},
		Hero_title: {
			fontSize: '64px',
			lineHeight: '1.05',
			letterSpacing: '-2.56px',
			fontWeight: '300',
			color: '#eeeeee',
			maxWidth: '1200px',
			marginBottom: '8px',
			textTransform: 'uppercase',
			display: 'flex',
			flexDirection: 'column',
			gap: '4px',
		},
		Hero_title_line1: {
			display: 'block',
			color: '#eeeeee',
			fontWeight: '300',
		},
		Hero_title_line2: {
			display: 'flex',
			alignItems: 'baseline',
			gap: '16px',
		},
		Hero_title_accent: {
			color: '#fff313',
			fontWeight: '300',
			display: 'inline',
		},
		Hero_title_rest: {
			color: '#eeeeee',
			fontWeight: '300',
			display: 'inline',
		},
		Hero_subtitle: {
			fontSize: 'clamp(16px, 1.8vw, 20px)',
			color: '#cccccc',
			maxWidth: '1000px',
			lineHeight: '1.5',
			fontWeight: '300',
		},
		Hero_footer_grid: {
			display: 'grid',
			gridTemplateColumns: '1fr 480px',
			gap: '32px',
			alignItems: 'flex-end',
			marginTop: 'auto',
			width: '100%',
		},
		Countdown_box: {
			backgroundColor: 'rgba(45, 45, 45, 0.75)',
			border: '1px solid #4b4b4b',
			borderRadius: '12px',
			padding: '24px 32px',
			// высота как в состоянии с отсчётом: 24+24 padding + подпись 14 +
			// gap 16 + колонка Unit (38px цифра + 6 отступ + 10 подпись) ≈ 158px.
			// Замерено на живой странице; на мобильном сбрасывается в auto,
			// там цифры 26px и коробка ниже.
			minHeight: '158px',
			boxSizing: 'border-box',
			justifyContent: 'center',
			// точка отсчёта для cqw у Cfp_promo
			containerType: 'inline-size',
			backdropFilter: 'blur(10px)',
			display: 'flex',
			flexDirection: 'column',
			gap: '16px',
			boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
		},
		// Тот же шрифт, что у цифр отсчёта (Unit_val), но кегль подбирается под
		// ширину коробки, чтобы строка не переносилась. Считаем в cqw, а не в vw:
		// на 992px грид схлопывается в одну колонку и коробка резко расширяется,
		// так что привязка к ширине окна дала бы разрыв.
		//
		// Замерено через Range: 32 знака с трекингом -0.5px занимают 18.6em - 16px.
		// При 5cqw запас до края коробки не меньше 60px на всех брейкпоинтах от
		// 390 до 1440, включая 993px, где колонка самая узкая (345px внутри).
		Cfp_promo: {
			fontFamily: '\'JetBrains Mono\', monospace',
			fontSize: 'clamp(9px, calc((100cqi - 64px) / 20), 32px)',
			fontWeight: '400',
			color: '#fff313',
			lineHeight: '1.15',
			letterSpacing: '-0.5px',
			whiteSpace: 'nowrap',
			textTransform: 'uppercase',
		},
		Cfp_promo_btn: {
			... $piterjs_landing_style.cfp_btn,
			alignSelf: 'flex-start',
		},
		Countdown_label: {
			fontFamily: '\'JetBrains Mono\', monospace',
			fontSize: '11px',
			color: '#afafaf',
			textTransform: 'uppercase',
			letterSpacing: '0.5px',
			display: 'block',
		},
		Timer_units: {
			display: 'flex',
			gap: '36px',
			alignItems: 'flex-start',
		},
		Unit: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			background: 'transparent',
			border: 'none',
			padding: '0',
		},
		Unit_val: {
			fontFamily: '\'JetBrains Mono\', monospace',
			fontSize: '38px',
			fontWeight: '400',
			color: '#fff313',
			lineHeight: '1',
			marginBottom: '6px',
		},
		Unit_tag: {
			fontFamily: '\'Inter\', sans-serif',
			fontSize: '10px',
			color: '#afafaf',
			textTransform: 'uppercase',
			letterSpacing: '0.5px',
		},
		Countdown_skeleton: {
			display: 'flex',
			flexDirection: 'column',
			gap: '12px',
			width: '100%',
			boxSizing: 'border-box',
		},
		Countdown_skel_line1: {
			... skel_base,
			height: '14px',
			width: '55%',
		},
		Countdown_skel_line2: {
			... skel_base,
			height: '32px',
			width: '80%',
		},
		Countdown_skel_btn: {
			... skel_base,
			height: '32px',
			width: '140px',
			borderRadius: '6px',
			marginTop: '4px',
		},
		Discovery_card: {
			backgroundColor: '#2b2b2b',
			border: '1px solid #4b4b4b',
			borderRadius: '12px',
			padding: '26px 28px',
			display: 'flex',
			flexDirection: 'column',
			gap: '14px',
			position: 'relative',
			overflow: 'hidden',
			boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
		},
		Discovery_skeleton: {
			display: 'flex',
			flexDirection: 'column',
			gap: '14px',
			width: '100%',
			boxSizing: 'border-box',
		},
		Disc_skel_badge: {
			... skel_base,
			height: '14px',
			width: '90px',
		},
		Disc_skel_title1: {
			... skel_base,
			height: '20px',
			width: '90%',
		},
		Disc_skel_title2: {
			... skel_base,
			height: '20px',
			width: '65%',
		},
		Disc_skel_meta1: {
			... skel_base,
			height: '14px',
			width: '50%',
		},
		Disc_skel_meta2: {
			... skel_base,
			height: '14px',
			width: '40%',
		},
		Disc_badge: {
			fontFamily: '\'JetBrains Mono\', monospace',
			fontSize: '11px',
			color: '#fff313',
			textTransform: 'uppercase',
			letterSpacing: '0.5px',
			fontWeight: '600',
		},
		Disc_title: {
			fontSize: '19px',
			fontWeight: '500',
			color: '#ffffff',
			lineHeight: '1.4',
		},
		Disc_meta_time: {
			display: 'flex',
			alignItems: 'center',
			gap: '10px',
			fontSize: '13px',
			color: '#afafaf',
		},
		Disc_meta_place: {
			display: 'flex',
			alignItems: 'center',
			gap: '10px',
			fontSize: '13px',
			color: '#afafaf',
		},
		Disc_meta_map: {
			display: 'flex',
			alignItems: 'center',
			gap: '10px',
			fontSize: '13px',
			color: '#afafaf',
		},
		Map_link: $piterjs_landing_style.pill_link,
		Review_link: $piterjs_landing_style.pill_link,
		'@media': {
			'(max-width: 992px)': {
				Hero_title: {
					fontSize: '44px',
					letterSpacing: '-1.5px',
				},
				Hero_footer_grid: {
					gridTemplateColumns: '1fr',
					gap: '24px',
				},
				Discovery_card: {
					order: '1',
				},
				Countdown_box: {
					order: '2',
				},
			},
			'(max-width: 600px)': {
				padding: '90px 12px 72px 12px',
				height: 'auto',
				minHeight: '100vh',
				Countdown_box: {
					padding: '20px 16px',
					minHeight: 'auto',
				},
				Hero_title: {
					fontSize: '30px',
					letterSpacing: '-1px',
				},
				Hero_title_line2: {
					flexWrap: 'wrap',
					gap: '8px',
				},
				Timer_units: {
					display: 'flex',
					flexDirection: 'row',
					gap: '14px',
					flexWrap: 'nowrap',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
				},
				Unit_val: {
					fontSize: '26px',
				},
			},
			'(max-width: 480px)': {
				Hero_title: {
					fontSize: '26px',
				},
				padding: '80px 10px 64px 10px',
			},
		},
	} )

}
