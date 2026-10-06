namespace $.$$ {

	export class $piterjs_landing_schedule extends $.$piterjs_landing_schedule {

		@ $mol_mem
		schedule_heading() {
			return 'ПРОГРАММА ' + this.meetup_title().toUpperCase()
		}

		@ $mol_mem
		schedule_intro() {
			return this.meetup()?.description() || ''
		}

		@ $mol_mem
		schedule_content() {
			return [
				this.Schedule_heading(),
				... this.schedule_intro() ? [ this.Schedule_intro() ] : [],
				this.Talks_grid(),
				this.Cfp_cta_card(),
				this.Venue_card(),
			]
		}

		@ $mol_mem
		speeches_list() {
			return this.meetup()?.speeches() ?? []
		}

		@ $mol_mem
		talks() {
			return this.speeches_list().map( s => this.Talk( s.id() ) )
		}

		speech_item( id: string ) {
			return this.speeches_list().find( s => s.id() === id )
		}

		talk_tag( id: string ) {
			return 'Tech Talk'
		}

		talk_time( id: string ) {
			return this.speech_item( id )?.start()?.toString( 'hh:mm' ) ?? ''
		}

		@ $mol_mem_key
		talk_top_content( id: string ) {
			return [
				this.Talk_tag( id ),
				... this.talk_time( id ) ? [ this.Talk_time( id ) ] : [],
			]
		}

		talk_title( id: string ) {
			return this.speech_item( id )?.title() || 'Тема уточняется'
		}

		talk_abstract( id: string ) {
			return this.speech_item( id )?.description() || 'Тезисы и подробности доклада формируются'
		}

		// Описание клипается в 6 строк, кнопка показывается только если текст
		// реально не влез. Порогом по числу символов это не решить: ширина
		// карточки меняется с раскладкой, на 530px в строку входит ~63 знака,
		// на мобильном вдвое меньше. Поэтому меряем DOM после отрисовки.
		@ $mol_mem_key
		talk_expanded( id: string, next?: boolean ) {
			return next ?? false
		}

		// line-clamp не анимируется, поэтому плавность даёт max-height: от 6 строк
		// (9em при line-height 1.5) до замеренной высоты текста. Пока высота едет,
		// clamp снят, иначе при раскрытии текст обрезался бы многоточием, а при
		// сворачивании схлопнулся бы до 6 строк в первом же кадре.
		@ $mol_mem_key
		talk_animating( id: string, next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem_key
		talk_full_height( id: string, next?: number ) {
			return next ?? 0
		}

		talk_clamped( id: string ) {
			return !this.talk_expanded( id ) && !this.talk_animating( id )
		}

		talk_max_height( id: string ) {
			return this.talk_expanded( id ) ? `${ this.talk_full_height( id ) }px` : '9em'
		}

		talk_toggle( id: string ) {
			// scrollHeight отдаёт полную высоту текста и под clamp'ом
			this.talk_full_height( id, this.Talk_abstract( id ).dom_node().scrollHeight )
			this.talk_animating( id, true )
			this.talk_expanded( id, !this.talk_expanded( id ) )
		}

		talk_transition_end( id: string, event?: TransitionEvent ) {
			if( event?.propertyName !== 'max-height' ) return
			this.talk_animating( id, false )
		}

		talk_toggle_title( id: string ) {
			return this.talk_expanded( id ) ? '[ Скрыть ]' : '[ Показать больше ]'
		}

		@ $mol_mem_key
		talk_overflow( id: string, next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem_key
		talk_content( id: string ) {
			return [
				this.Talk_top( id ),
				this.Talk_title( id ),
				this.Talk_abstract( id ),
				... this.talk_overflow( id ) ? [ this.Talk_more( id ) ] : [],
				this.Talk_speaker( id ),
			]
		}

		@ $mol_mem
		auto() {
			// size() делает пересчёт реактивным на ресайз: при другой ширине
			// карточки текст переносится иначе и переполнение может исчезнуть
			this.$.$mol_window.size()
			// id забираем здесь, внутри фибры: speeches_list() тянет данные из
			// домена и бросает промис, если они ещё не приехали, а колбэк
			// $mol_after_frame выполняется вне фибры и поймать его некому
			const ids = this.speeches_list().map( speech => speech.id() )
			new this.$.$mol_after_frame( () => this.talks_measure( ids ) )
			return super.auto()
		}

		talks_measure( ids: readonly string[] ) {
			for( const id of ids ) {
				try {
					const node = this.Talk_abstract( id ).dom_node()
					// раскрытый текст на новой ширине переносится иначе — подгоняем высоту
					if( this.talk_expanded( id ) ) {
						this.talk_full_height( id, node.scrollHeight )
						continue
					}
					this.talk_overflow( id, node.scrollHeight > node.clientHeight + 1 )
				} catch {}
			}
		}

		speaker_name( id: string ) {
			return this.speech_item( id )?.speaker()?.title() || 'Спикер PiterJS'
		}

		// Должность не выдумываем: нет данных — строки нет
		speaker_role( id: string ) {
			const s = this.speech_item( id )
			return s?.speaker()?.description() || s?.speaker()?.contact() || ''
		}

		@ $mol_mem_key
		speaker_info_content( id: string ) {
			return [
				this.Speaker_name( id ),
				... this.speaker_role( id ) ? [ this.Speaker_role( id ) ] : [],
			]
		}

		speaker_photo( id: string ) {
			return this.speech_item( id )?.speaker()?.photo_uri() || ''
		}

		// Чужой адрес и маршрут показывать нельзя: что нет в данных — того нет в карточке
		@ $mol_mem
		venue_title() {
			return this.meetup()?.place()?.title() || 'Площадка уточняется'
		}

		@ $mol_mem
		place_address() {
			return this.meetup()?.place()?.address() || ''
		}

		@ $mol_mem
		venue_meta1() {
			return this.place_address() ? '📍 ' + this.place_address() : ''
		}

		@ $mol_mem
		venue_meta2() {
			const route = this.meetup()?.place()?.route()
			return route ? '🚇 ' + route : ''
		}

		@ $mol_mem
		venue_meta3() {
			const notes = this.meetup()?.place()?.notes()
			return notes ? '🚶 ' + notes : ''
		}

		@ $mol_mem
		venue_map_uri() {
			return $piterjs_landing_map_uri( this.place_address() )
		}

		@ $mol_mem
		venue_content() {
			return [
				this.Venue_badge(),
				this.Venue_title(),
				... this.venue_meta1() ? [ this.Venue_meta1() ] : [],
				... this.venue_meta2() ? [ this.Venue_meta2() ] : [],
				... this.venue_meta3() ? [ this.Venue_meta3() ] : [],
				... this.place_address() ? [ this.Venue_map_btn() ] : [],
			]
		}

	}

}
