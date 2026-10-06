namespace $.$$ {

	export class $piterjs_landing_hero extends $.$piterjs_landing_hero {

		@ $mol_mem
		hero_badge() {
			if( this.loading() ) return 'PITERJS // ЗАГРУЗКА...'
			if( this.passed() ) {
				return this.next_num() ? `PITERJS #${ this.next_num() } // SOON` : 'PITERJS // SOON'
			}
			return `${ this.meetup_title().toUpperCase() } // ${ this.free_slots() }`
		}

		@ $mol_mem
		event_badge() {
			return this.passed() ? 'LAST EVENT' : 'NEXT EVENT'
		}

		// Дата ближайшего митапа, если она известна и ещё впереди
		@ $mol_mem
		target_timestamp() {
			const start = this.meetup()?.start()?.valueOf()
			return start && start > this.now_time() ? start : 0
		}

		@ $mol_mem
		countdown_diff() {
			const diff = Math.max( 0, this.target_timestamp() - this.now_time() )
			const days = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) )
			const hours = Math.floor( ( diff % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) )
			const minutes = Math.floor( ( diff % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) )
			const seconds = Math.floor( ( diff % ( 1000 * 60 ) ) / 1000 )
			return { days, hours, minutes, seconds }
		}

		@ $mol_mem
		timer_units() {
			return [ this.Unit( 'days' ), this.Unit( 'hours' ), this.Unit( 'mins' ), this.Unit( 'secs' ) ]
		}

		unit_str( id: string ) {
			const diff = this.countdown_diff()
			const vals: Record< string, number > = {
				days: diff.days,
				hours: diff.hours,
				mins: diff.minutes,
				secs: diff.seconds,
			}
			return String( vals[ id ] ?? 0 ).padStart( 2, '0' )
		}

		unit_title( id: string ) {
			const titles: Record< string, string > = {
				days: 'Дней',
				hours: 'Часов',
				mins: 'Минут',
				secs: 'Секунд',
			}
			return titles[ id ] ?? ''
		}

		// Митап прошёл — отсчитывать не до чего: вместо подписи и цифр в коробке
		// стоит зов на CFP. Лишние виды выкидываем из списка детей, а не прячем
		// стилями, иначе пустые div съедали бы gap коробки.
		@ $mol_mem
		cfp_promo_text() {
			return this.next_num() ? `СТАНЬ ДОКЛАДЧИКОМ НА PITERJS #${ this.next_num() }` : 'СТАНЬ ДОКЛАДЧИКОМ НА PITERJS'
		}

		@ $mol_mem
		countdown_content() {
			if( this.loading() ) return [ this.Countdown_skeleton() ]
			// нет даты в будущем — считать не до чего, зовём на CFP
			if( !this.target_timestamp() ) return [ this.Cfp_promo(), this.Cfp_promo_btn() ]
			return [
				this.Countdown_label(),
				this.Timer_units(),
			]
		}

		@ $mol_mem
		discovery_content() {
			if( this.loading() ) return [ this.Discovery_skeleton() ]
			return [
				this.Disc_badge(),
				this.Disc_title(),
				this.Disc_meta_time(),
				this.Disc_meta_place(),
				... this.disc_meta_map_content().length ? [ this.Disc_meta_map() ] : [],
			]
		}

		// Отзыв принимается только 7 суток после начала — см. $piterjs_meetup.review_allowed.
		// Привязываем кнопку именно к этому окну, а не к passed(): тот верен
		// бессрочно, и через неделю ссылка вела бы на страницу без формы отзыва.
		@ $mol_mem
		review_open() {
			return this.meetup()?.review_allowed() ?? false
		}

		@ $mol_mem
		meetup_current_id() {
			return this.meetup()?.id() ?? ''
		}

		@ $mol_mem
		place_address() {
			return this.meetup()?.place()?.address() || ''
		}

		@ $mol_mem
		disc_meta_map_content() {
			if( this.review_open() ) return [ this.Review_link() ]
			return this.place_address() ? [ this.Map_link() ] : []
		}

		next_event_title() {
			return this.meetup_title()
		}

		@ $mol_mem
		next_event_map_uri() {
			return $piterjs_landing_map_uri( this.place_address() )
		}

	}

}
