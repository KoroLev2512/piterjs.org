namespace $.$$ {

	export class $piterjs_landing_rsvp extends $.$piterjs_landing_rsvp {

		// Блок записи живёт, пока запись открыта: после старта митапа на странице
		// митапа его тоже нет ($piterjs_meetup.join_allowed)
		@ $mol_mem
		rsvp_content() {
			return [
				this.Rsvp_head(),
				this.Rsvp_title(),
				this.Rsvp_meta(),
				... this.meetup()?.join_allowed() ? [ this.Next_event_reg() ] : [],
				this.Rsvp_note(),
			]
		}

		@ $mol_mem
		rsvp_modal_title() {
			return `РЕГИСТРАЦИЯ НА ${ this.meetup_title().toUpperCase() }`
		}

		@ $mol_mem
		rsvp_modal_meta() {
			return `${ this.next_event_time() } // ${ this.next_event_place() }`
		}

		@ $mol_mem
		rsvp_modal_note() {
			return this.visitor_joined()
				? 'ВЫ В СПИСКЕ УЧАСТНИКОВ'
				: this.free_slots()
		}

		// Правила записи те же, что на странице митапа ($piterjs_meetup_page):
		// имя из двух слов, свободное место, запись пока митап не начался

		@ $mol_mem
		visitor_name( next?: string ) {
			return this.$.$mol_state_local.value( 'name_real', next ) ?? ''
		}

		visitor_name_clean() {
			return this.visitor_name().trim().replace( /\s+/g, ' ' )
		}

		visitor_name_bid() {
			const name = this.visitor_name_clean()
			if( !name ) return 'Обязательно'
			if( !/\S{2,}\s\S{2,}/.test( name ) ) return 'От двух слов'
			return ''
		}

		// Не $mol_mem: читается из visitor_joined, который сам мемоизирован
		visitor_registered() {
			const meetup = this.meetup()
			const peer = meetup?.land.peer_id()
			return Boolean( peer && meetup?.joined_name( peer ) )
		}

		visitor_editable() {
			return !this.visitor_registered()
		}

		visitor_join_enabled() {
			if( this.visitor_registered() ) return true
			if( this.visitor_name_bid() ) return false
			const meetup = this.meetup()
			if( !meetup?.join_allowed() ) return false
			return ( meetup.place()?.capacity_max() ?? 0 ) > meetup.joined_count()
		}

		@ $mol_mem
		visitor_joined( next?: boolean ) {
			const meetup = this.meetup()
			const peer = meetup?.land.peer_id()
			if( !meetup || !peer ) return false

			// без проверки пустое имя записало бы «пустую» регистрацию,
			// которая считается снятием записи
			if( next === true && this.visitor_join_enabled() ) meetup.joined_name( peer, this.visitor_name_clean() )
			if( next === false ) meetup.joined_name( peer, '' )
			return this.visitor_registered()
		}

	}

}
