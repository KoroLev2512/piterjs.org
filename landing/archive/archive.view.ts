namespace $.$$ {

	export class $piterjs_landing_archive extends $.$piterjs_landing_archive {

		// Archive Filtering & Pagination (6 per page)
		@ $mol_mem
		archive_limit( next?: number ) {
			return next ?? 6
		}

		archive_more_click() {
			this.archive_limit( this.archive_limit() + 6 )
		}

		@ $mol_mem
		category_filter( next?: string ) {
			return next ?? 'all'
		}

		filter_click( id: string ) {
			this.category_filter( id )
			this.archive_limit( 6 )
		}

		filter_active( id: string ) {
			return this.category_filter() === id
		}

		filter_title( id: string ) {
			return this.filter_titles()[ id as keyof typeof this.filter_titles ]
		}

		@ $mol_mem_key
		items_for_category( cat: string ) {
			const meetups = this.meetups()
			if( !meetups ) return []
			if( cat === 'all' ) return meetups
			if( cat === 'piterjs' ) return meetups.filter( m => !m.title().includes('UX') && !m.title().includes('Conf') )
			if( cat === 'piterux' ) return meetups.filter( m => m.title().includes('UX') )
			if( cat === 'conf' ) return meetups.filter( m => m.title().includes('Conf') )
			return []
		}

		@ $mol_mem
		filter_buttons() {
			return Object.keys( this.filter_titles() )
				.filter( cat => this.items_for_category( cat ).length > 0 )
				.map( cat => this.Filter_btn( cat ) )
		}

		@ $mol_mem
		all_filtered_items() {
			return this.items_for_category( this.category_filter() ).map( m => m.id() )
		}

		@ $mol_mem
		visible_archive_ids() {
			return this.all_filtered_items().slice( 0, this.archive_limit() )
		}

		@ $mol_mem
		archive_has_more() {
			return this.all_filtered_items().length > this.archive_limit()
		}

		@ $mol_mem
		archive_cards() {
			return this.visible_archive_ids().map( id => this.Archive_card( id ) )
		}

		@ $mol_mem
		archive_more_slot() {
			return this.archive_has_more() ? [ this.Archive_more_btn() ] : []
		}

		card_meetup( id: string ) {
			return this.meetups()?.find( item => item.id() === id )
		}

		card_id( id: string ) { return id }

		card_event_tag( id: string ) {
			return this.card_meetup( id )?.title() || 'PITERJS'
		}

		card_title( id: string ) {
			const m = this.card_meetup( id )
			if( m ) return m.speeches()?.[0]?.title() || m.description() || m.title() || 'Встреча сообщества'
			return ''
		}

		card_date( id: string ) {
			return this.card_meetup( id )?.start()?.toString( 'D Month YYYY', 'ru' ) ?? ''
		}

	}

}
