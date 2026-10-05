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

		// Header & Dynamic Meetup Details
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

		// Registration modal
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
		rsvp_slot() {
			return this.rsvp_open() ? [ this.Rsvp_modal() ] : []
		}

		// Блок записи живёт, пока запись открыта: после старта митапа на странице
		// митапа его тоже нет ($piterjs_meetup.join_allowed)
		@ $mol_mem
		rsvp_content() {
			return [
				this.Rsvp_head(),
				this.Rsvp_title(),
				this.Rsvp_meta(),
				... this.meetup_current()?.join_allowed() ? [ this.Next_event_reg() ] : [],
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

		// CFP modal (восстановлено из 1d6495d)
		@ $mol_mem
		modal_open( next?: boolean ) {
			return next ?? false
		}

		cfp_open() {
			this.burger_open( false )
			this.modal_open( true )
		}

		cfp_close() {
			this.modal_open( false )
		}

		cfp_backdrop_click( event?: Event ) {
			// Cfp_modal сам является затемняющим оверлеем, поэтому закрываем
			// только по клику мимо Cfp_modal_box
			if( event && event.target !== event.currentTarget ) return
			this.cfp_close()
		}

		@ $mol_mem
		cfp_slot() {
			return this.modal_open() ? [ this.Cfp_modal() ] : []
		}

		// Своего бэкенда у сайта нет, поэтому заявка уходит письмом на адрес
		// оргкомитета (тот же, что в разделе «Сейчас»), а не в пустоту
		cfp_recipient() {
			return 'team@piterjs.org'
		}

		// Первая найденная ошибка или пустая строка, если форма заполнена
		cfp_bid() {
			if( !this.cfp_email().trim() ) return 'Укажите email'
			if( !/^\S+@\S+\.\S+$/.test( this.cfp_email().trim() ) ) return 'Email указан неверно'
			if( !this.cfp_contact().trim() ) return 'Укажите контакт в Telegram'
			if( !this.cfp_name().trim() ) return 'Укажите имя и фамилию'
			if( !this.cfp_title().trim() ) return 'Укажите тему доклада'
			if( !this.cfp_desc().trim() ) return 'Опишите тезисы доклада'
			return ''
		}

		cfp_mailto() {
			const body = [
				[ 'Имя', this.cfp_name() ],
				[ 'Компания и должность', this.cfp_company() ],
				[ 'Email', this.cfp_email() ],
				[ 'Telegram', this.cfp_contact() ],
				[ 'Тема', this.cfp_title() ],
			].map( ( [ key, val ] ) => `${ key }: ${ val.trim() }` )
			body.push( '', this.cfp_desc().trim() )
			const query = new URLSearchParams( {
				subject: `Заявка на доклад: ${ this.cfp_title().trim() }`,
				body: body.join( '\r\n' ),
			} )
			// URLSearchParams кодирует пробел плюсом, а в mailto это буквальный плюс
			return `mailto:${ this.cfp_recipient() }?` + query.toString().replace( /\+/g, '%20' )
		}

		cfp_submit() {
			const bid = this.cfp_bid()
			if( bid ) {
				this.toast_message( `⚠️ ${ bid }` )
				return
			}
			this.modal_open( false )
			this.$.$mol_dom_context.location.href = this.cfp_mailto()
			// поля не чистим: пока письмо не отправлено, заявка не подана,
			// а почтовый клиент можно закрыть
			this.toast_message( `✉️ Письмо готово — отправьте его из почтового клиента на ${ this.cfp_recipient() }` )
		}

		// Toast
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
		toast_slot() {
			return this.toast_message() ? [ this.Toast() ] : []
		}

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

		nav_click( id: string, event?: Event ) {
			event?.preventDefault()
			this.nav_mobile_close()
			this.nav_sections()[ id ]?.dom_node().scrollIntoView( { behavior: 'smooth', block: 'start' } )
		}

		@ $mol_mem
		nav_sections(): Record< string, $mol_view > {
			return {
				hero: this.Section_hero(),
				manifesto: this.Section_manifesto(),
				schedule: this.Section_schedule(),
				archive: this.Section_archive(),
				community: this.Section_community(),
			}
		}

		nav_title( id: string ) {
			return this.nav_titles()[ id as keyof typeof this.nav_titles ]
		}

		nav_active( id: string ) {
			return this.nav_current() === id
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
		burger_open( next?: boolean ) {
			return next ?? false
		}

		burger_toggle() {
			this.burger_open( !this.burger_open() )
		}

		nav_mobile_close() {
			this.burger_open( false )
		}

		// Hero & Countdown
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

		@ $mol_mem
		hero_badge() {
			if( this.meetup_loading() ) {
				return 'PITERJS // ЗАГРУЗКА...'
			}
			if( this.meetup_passed() ) {
				return this.next_num() ? `PITERJS #${ this.next_num() } // SOON` : 'PITERJS // SOON'
			}
			return `${this.meetup_title().toUpperCase()} // ${this.free_slots()}`
		}

		@ $mol_mem
		event_badge() {
			return this.meetup_passed() ? 'LAST EVENT' : 'NEXT EVENT'
		}

		// Регистрироваться на прошедший митап некуда: убираем кнопку из хедера,
		// а не прячем стилями — иначе она осталась бы в потоке фокуса и в DOM
		@ $mol_mem
		nav_actions() {
			if( this.meetup_loading() ) {
				return [
					this.Back_link(),
					this.Burger_btn(),
				]
			}
			return [
				this.Back_link(),
				... this.meetup_passed() ? [] : [ this.Rsvp_btn() ],
				this.Burger_btn(),
			]
		}

		@ $mol_mem
		now_time() {
			return $mol_state_time.now( 1000 )
		}

		// Дата ближайшего митапа, если она известна и ещё впереди
		@ $mol_mem
		target_timestamp() {
			const start = this.meetup_current()?.start()?.valueOf()
			return start && start > this.now_time() ? start : 0
		}

		@ $mol_mem
		countdown_diff() {
			const now = this.now_time()
			const diff = Math.max( 0, this.target_timestamp() - now )
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

		// Митап прошёл — отсчитывать не до чего: вместо подписи и цифр в коробке
		// стоит зов на CFP. Лишние виды выкидываем из списка детей, а не прячем
		// стилями, иначе пустые div съедали бы gap коробки.
		@ $mol_mem
		cfp_promo_text() {
			return this.next_num() ? `СТАНЬ ДОКЛАДЧИКОМ НА PITERJS #${ this.next_num() }` : 'СТАНЬ ДОКЛАДЧИКОМ НА PITERJS'
		}

		@ $mol_mem
		countdown_content() {
			if( this.meetup_loading() ) return [ this.Countdown_skeleton() ]
			// нет даты в будущем — считать не до чего, зовём на CFP
			if( !this.target_timestamp() ) return [ this.Cfp_promo(), this.Cfp_promo_btn() ]
			return [
				this.Countdown_label(),
				this.Timer_units(),
			]
		}

		@ $mol_mem
		discovery_content() {
			if( this.meetup_loading() ) return [ this.Discovery_skeleton() ]
			return [
				this.Disc_badge(),
				this.Disc_title(),
				this.Disc_meta_time(),
				this.Disc_meta_place(),
				... this.disc_meta_map_content().length ? [ this.Disc_meta_map() ] : [],
			]
		}

		// Отзыв принимается только 7 суток после начала — см. $piterjs_meetup.review_allowed.
		// Привязываем кнопку именно к этому окну, а не к meetup_passed(): тот верен
		// бессрочно, и через неделю ссылка вела бы на страницу без формы отзыва.
		@ $mol_mem
		review_open() {
			return this.meetup_current()?.review_allowed() ?? false
		}

		@ $mol_mem
		meetup_current_id() {
			return this.meetup_current()?.id() ?? ''
		}

		@ $mol_mem
		disc_meta_map_content() {
			if( this.review_open() ) return [ this.Review_link() ]
			return this.place_address() ? [ this.Map_link() ] : []
		}

		unit_str( id: string ) {
			const diff = this.countdown_diff()
			let val = 0
			if( id === 'days' ) val = diff.days
			if( id === 'hours' ) val = diff.hours
			if( id === 'mins' ) val = diff.minutes
			if( id === 'secs' ) val = diff.seconds
			return String( val ).padStart( 2, '0' )
		}

		unit_title( id: string ) {
			if( id === 'days' ) return 'Дней'
			if( id === 'hours' ) return 'Часов'
			if( id === 'mins' ) return 'Минут'
			return 'Секунд'
		}

		// Registration
		@ $mol_mem
		visitor_name( next?: string ) {
			return this.$.$mol_state_local.value( 'name_real', next ) ?? ''
		}

		// Правила записи те же, что на странице митапа ($piterjs_meetup_page):
		// имя из двух слов, свободное место, запись пока митап не начался

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
			const meetup = this.meetup_current()
			const peer = meetup?.land.peer_id()
			return Boolean( peer && meetup?.joined_name( peer ) )
		}

		visitor_editable() {
			return !this.visitor_registered()
		}

		visitor_join_enabled() {
			if( this.visitor_registered() ) return true
			if( this.visitor_name_bid() ) return false
			const meetup = this.meetup_current()
			if( !meetup?.join_allowed() ) return false
			return ( meetup.place()?.capacity_max() ?? 0 ) > meetup.joined_count()
		}

		@ $mol_mem
		visitor_joined( next?: boolean ) {
			const meetup = this.meetup_current()
			const peer = meetup?.land.peer_id()
			if( !meetup || !peer ) return false

			// без проверки пустое имя записало бы «пустую» регистрацию,
			// которая считается снятием записи
			if( next === true && this.visitor_join_enabled() ) meetup.joined_name( peer, this.visitor_name_clean() )
			if( next === false ) meetup.joined_name( peer, '' )
			return this.visitor_registered()
		}

		// Next Event Card
		@ $mol_mem
		next_event_title() {
			return this.meetup_title()
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

		@ $mol_mem
		place_address() {
			return this.meetup_current()?.place()?.address() || ''
		}

		@ $mol_mem
		next_event_map_uri() {
			return this.map_uri( this.place_address() )
		}

		map_uri( address: string ) {
			return 'https://yandex.ru/maps/?text=' + encodeURIComponent( address )
		}

		// Manifesto Stats
		@ $mol_mem
		stats() {
			return [ this.Stat( 'meetups' ), this.Stat( 'visitors' ), this.Stat( 'speeches' ), this.Stat( 'source' ) ]
		}

		stat_val( id: string ) {
			// Все четыре — статичные. Считать митапы из meetups().length нельзя:
			// в домене лежат 49 записей, а проведено уже 100+, то есть счёт по
			// данным занижал бы реальность почти вдвое. Остальные цифры из
			// домена не достать без подтягивания speeches()/visitors_list()
			// сразу для всех митапов.
			if( id === 'meetups' ) return '100+'
			if( id === 'visitors' ) return '3,500+'
			if( id === 'speeches' ) return '250+'
			if( id === 'source' ) return '100%'
			return '0'
		}

		stat_lbl( id: string ) {
			if( id === 'meetups' ) return 'Проведенных Митапов'
			if( id === 'visitors' ) return 'Участников Сообщества'
			if( id === 'speeches' ) return 'Хардкорных Докладов'
			if( id === 'source' ) return 'Open Source & Community'
			return ''
		}

		// Schedule & Speeches
		@ $mol_mem
		schedule_heading() {
			return 'ПРОГРАММА ' + this.meetup_title().toUpperCase()
		}

		@ $mol_mem
		schedule_intro() {
			return this.meetup_current()?.description() || ''
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
			return this.meetup_current()?.speeches() ?? []
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
			// до speeches_list(): тот может бросить промис, пока данные едут
			this.nav_spy_listener()
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
				// в раскрытом виде клипа нет, мерить нечего — оставляем прошлый вердикт,
				// иначе кнопка «Скрыть» исчезла бы сразу после раскрытия
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
			const uri = this.speech_item( id )?.speaker()?.photo_uri()
			return uri || ''
		}

		// Venue
		// Чужой адрес и маршрут показывать нельзя: что нет в данных — того нет в карточке
		@ $mol_mem
		venue_title() {
			return this.meetup_current()?.place()?.title() || 'Площадка уточняется'
		}

		@ $mol_mem
		venue_meta1() {
			return this.place_address() ? '📍 ' + this.place_address() : ''
		}

		@ $mol_mem
		venue_meta2() {
			const route = this.meetup_current()?.place()?.route()
			return route ? '🚇 ' + route : ''
		}

		@ $mol_mem
		venue_meta3() {
			const notes = this.meetup_current()?.place()?.notes()
			return notes ? '🚶 ' + notes : ''
		}

		@ $mol_mem
		venue_map_uri() {
			return this.map_uri( this.place_address() )
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
			const buttons: any[] = []
			for( const cat of Object.keys( this.filter_titles() ) ) {
				if( this.items_for_category( cat ).length > 0 ) buttons.push( this.Filter_btn( cat ) )
			}
			return buttons
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
		
		card_id( id: string ) { return id }

		card_event_tag( id: string ) {
			return this.meetups()?.find( item => item.id() === id )?.title() || 'PITERJS'
		}

		card_title( id: string ) {
			const m = this.meetups()?.find( item => item.id() === id )
			if( m ) return m.speeches()?.[0]?.title() || m.description() || m.title() || 'Встреча сообщества'
			return ''
		}

		card_date( id: string ) {
			const start = this.meetups()?.find( item => item.id() === id )?.start()
			if( start ) return start.toString( 'D Month YYYY', 'ru' )
			return ''
		}

		// Community Cards
		comms() { return [ this.Comm( 'tg' ), this.Comm( 'vk' ) ] }

		comm_badge( id: string ) { return id === 'tg' ? 'TELEGRAM COMMUNITY' : 'VK COMMUNITY' }
		comm_title( id: string ) { return id === 'tg' ? '@piterjs // Чат и Анонсы' : 'vk.com/piterjs // Записи и Медиа' }
		comm_text( id: string ) {
			return id === 'tg' ? 'Более 2000 инженеров в крупнейшем js-сообществе Санкт-Петербурга. Обсуждения, вакансии и оперативные новости.'
				: 'Видеозаписи докладов, фотоотчёты со встреч и анонсы новых митапов.'
		}
		comm_uri( id: string ) { return id === 'tg' ? 'https://t.me/piterjs' : 'https://vk.com/piterjs' }
		comm_btn_text( id: string ) { return id === 'tg' ? '[ Вступить в Telegram-канал ]' : '[ Открыть группу VK ]' }

		socs() { return [ this.Soc( 'gh' ), this.Soc( 'tg' ), this.Soc( 'yt' ), this.Soc( 'vk' ) ] }
		soc_uri( id: string ) {
			if( id === 'gh' ) return 'https://github.com/piterjs'
			if( id === 'tg' ) return 'https://t.me/piterjs'
			if( id === 'yt' ) return 'https://www.youtube.com/@piterjs'
			if( id === 'vk' ) return 'https://vk.com/piterjs'
			return ''
		}
		soc_hint( id: string ) {
			if( id === 'gh' ) return 'GitHub'
			if( id === 'tg' ) return 'Telegram'
			if( id === 'yt' ) return 'YouTube'
			if( id === 'vk' ) return 'VK Video'
			return ''
		}
		soc_icon( id: string ) {
			if( id === 'gh' ) return 'piterjs/landing/assets/github.webp'
			if( id === 'tg' ) return 'piterjs/landing/assets/telegram.webp'
			if( id === 'yt' ) return 'piterjs/landing/assets/youtube.webp'
			if( id === 'vk' ) return 'piterjs/landing/assets/vk.webp'
			return ''
		}

		@ $mol_mem
		sub() {
			return [
				this.Header(),
				this.Nav_mobile(),
				this.Main(),
				... this.rsvp_slot(),
				... this.cfp_slot(),
				... this.toast_slot(),
			]
		}

	}

}
