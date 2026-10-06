namespace $.$$ {

	export class $piterjs_landing_header extends $.$piterjs_landing_header {

		@ $mol_mem
		nav_links() {
			return Object.keys( this.nav_titles() ).map( id => this.Nav_link( id ) )
		}

		// отдельные инстансы: один и тот же $mol_view не может жить в двух родителях
		@ $mol_mem
		nav_mobile_links() {
			return Object.keys( this.nav_titles() ).map( id => this.Nav_m_link( id ) )
		}

		// Хеш приложения — это его состояние ($mol_state_arg): ссылка вида `#hero`
		// стёрла бы `landing` и выкинула бы пользователя из лендинга. Поэтому href
		// ведёт на сам лендинг, а переход к секции делает nav_click.
		nav_uri( id: string ) {
			return this.$.$mol_state_arg.link( { landing: '' } )
		}

		nav_title( id: string ) {
			return this.nav_titles()[ id as keyof typeof this.nav_titles ]
		}

		nav_active( id: string ) {
			return this.nav_current() === id
		}

		nav_click( id: string, event?: Event ) {
			event?.preventDefault()
			this.burger_open( false )
			this.nav_pick( id )
		}

		burger_toggle() {
			this.burger_open( !this.burger_open() )
		}

		rsvp_press( event?: Event ) {
			this.burger_open( false )
			this.rsvp_click( event )
		}

		// Регистрироваться на прошедший митап некуда: убираем кнопку из хедера,
		// а не прячем стилями — иначе она осталась бы в потоке фокуса и в DOM
		@ $mol_mem
		nav_actions() {
			return [
				this.Back_link(),
				... this.rsvp_shown() ? [ this.Rsvp_btn() ] : [],
				this.Burger_btn(),
			]
		}

	}

}
