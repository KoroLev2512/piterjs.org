namespace $.$$ {

	export class $piterjs_landing extends $.$piterjs_landing {

		@ $mol_mem
		meetup_current() {
			return this.meetup() || this.meetups()[0]
		}

		@ $mol_mem
		meetup_loading() {
			if( this.meetup() ) return false
			const list = this.meetups()
			return !list || list.length === 0 || !list[0]?.title()
		}

		@ $mol_mem
		meetup_title() {
			return this.meetup_current()?.title() || 'PITERJS'
		}

		@ $mol_mem
		meetup_num() {
			return this.meetup_title().match( /\d+/ )?.[0] ?? ''
		}

		@ $mol_mem
		logo_version_tag() {
			if( this.meetup_loading() ) return 'v...'
			return this.meetup_num() ? `v.${this.meetup_num()}.0` : ''
		}

		@ $mol_mem
		rsvp_btn_text() {
			return this.meetup_num() ? `[ Зарегистрироваться #${this.meetup_num()} ]` : '[ Зарегистрироваться ]'
		}

		@ $mol_mem
		now_time() {
			return $mol_state_time.now( 1000 )
		}

		// Ближайший митап в домене — meetups()[0]. Когда его дата прошла,
		// «следующего» ещё нет: показываем номер+1 со статусом SOON,
		// а карточка становится рассказом о прошедшем событии.
		@ $mol_mem
		meetup_passed() {
			const start = this.meetup_current()?.start()?.valueOf()
			if( !start ) return false
			return start < this.now_time()
		}

		// Номер следующего митапа, когда текущий уже прошёл
		@ $mol_mem
		next_num() {
			if( !this.meetup_num() ) return ''
			return String( Number( this.meetup_num() ) + ( this.meetup_passed() ? 1 : 0 ) )
		}

		// Регистрироваться на прошедший митап некуда: убираем кнопку из хедера
		@ $mol_mem
		rsvp_shown() {
			return !this.meetup_loading() && !this.meetup_passed()
		}

		@ $mol_mem
		free_slots() {
			const free = this.free_slots_num()
			// без известной вместимости нельзя утверждать, что мест нет
			if( free === null ) return 'РЕГИСТРАЦИЯ ОТКРЫТА'
			return free > 0 ? `${free} МЕСТ СВОБОДНО` : 'РЕГИСТРАЦИЯ ЗАКРЫТА'
		}

		// Та же формула, что на странице митапа ($piterjs_meetup_page.free_space):
		// capacity_max - joined_count. Считать по visitors_list() нельзя — это узел
		// 'visitors2' (кто пришёл), а не 'joined' (кто записался).
		@ $mol_mem
		free_slots_num() {
			const meetup = this.meetup_current()
			const capacity = meetup?.place()?.capacity_max() || 0
			if( !capacity ) return null
			return Math.max( 0, capacity - ( meetup?.joined_count() ?? 0 ) )
		}

		@ $mol_mem
		next_event_time() {
			const start = this.meetup_current()?.start()
			if( start ) return start.toString( 'D Month YYYY', 'ru' ).toUpperCase() + ' // ' + start.toString( 'hh:mm' )
			return 'ДАТА УТОЧНЯЕТСЯ'
		}

		@ $mol_mem
		next_event_place() {
			const place = this.meetup_current()?.place()?.title()
			if( place ) return place.toUpperCase() + ', САНКТ-ПЕТЕРБУРГ'
			return 'МЕСТО УТОЧНЯЕТСЯ'
		}

		// Навигация по секциям
		@ $mol_mem
		nav_sections(): Record< string, $mol_view > {
			return {
				hero: this.Hero(),
				manifesto: this.Manifesto(),
				schedule: this.Schedule(),
				archive: this.Archive(),
				community: this.Community(),
			}
		}

		nav_pick( id: string ) {
			this.nav_sections()[ id ]?.dom_node().scrollIntoView( { behavior: 'smooth', block: 'start' } )
		}

		@ $mol_mem
		nav_current( next?: string ) {
			return next ?? Object.keys( this.nav_titles() )[0]
		}

		// Текущей считается последняя секция, верх которой поднялся выше этой
		// линии от верха вьюпорта. Как в прототипе: 200px.
		nav_spy_offset() {
			return 200
		}

		nav_spy() {
			const ids = Object.keys( this.nav_sections() )
			let current = ids[0]
			for( const id of ids ) {
				const top = this.nav_sections()[ id ].dom_node().getBoundingClientRect().top
				if( top <= this.nav_spy_offset() ) current = id
			}
			// последняя секция может быть ниже линии даже в самом низу страницы
			const root = this.dom_node()
			if( root.scrollTop > 0 && root.scrollTop + root.clientHeight >= root.scrollHeight - 2 ) {
				current = ids[ ids.length - 1 ]
			}
			this.nav_current( current )
		}

		// Слушаем в фазе захвата на document: так ловится прокрутка и окна,
		// и любого вложенного контейнера — scroll не всплывает
		@ $mol_mem
		nav_spy_listener() {
			const config = { passive: true, capture: true }
			return new this.$.$mol_dom_listener(
				this.$.$mol_dom_context.document,
				'scroll',
				() => this.nav_spy(),
				config,
			)
		}

		@ $mol_mem
		auto() {
			this.nav_spy_listener()
			return super.auto()
		}

		@ $mol_mem
		burger_open( next?: boolean ) {
			return next ?? false
		}

		// Модалки
		@ $mol_mem
		rsvp_open( next?: boolean ) {
			return next ?? false
		}

		rsvp_click() {
			this.burger_open( false )
			this.rsvp_open( true )
		}

		rsvp_close() {
			this.rsvp_open( false )
		}

		@ $mol_mem
		cfp_open_state( next?: boolean ) {
			return next ?? false
		}

		cfp_open() {
			this.burger_open( false )
			this.cfp_open_state( true )
		}

		cfp_close() {
			this.cfp_open_state( false )
		}

		@ $mol_mem
		toast_message( next?: string ) {
			if( next ) {
				new $mol_after_timeout( 4000, () => {
					if( this.toast_message() === next ) this.toast_message( '' )
				} )
			}
			return next ?? ''
		}

		@ $mol_mem
		sub() {
			return [
				this.Header(),
				this.Main(),
				... this.rsvp_open() ? [ this.Rsvp() ] : [],
				... this.cfp_open_state() ? [ this.Cfp() ] : [],
				... this.toast_message() ? [ this.Toast() ] : [],
			]
		}

	}

}
