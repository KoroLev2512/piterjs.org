namespace $.$$ {

	export class $piterjs_landing_community extends $.$piterjs_landing_community {

		@ $mol_mem
		comms() {
			return [ this.Comm( 'tg' ), this.Comm( 'vk' ) ]
		}

		comm_badge( id: string ) {
			return id === 'tg' ? 'TELEGRAM COMMUNITY' : 'VK COMMUNITY'
		}

		comm_title( id: string ) {
			return id === 'tg' ? '@piterjs // Чат и Анонсы' : 'vk.com/piterjs // Записи и Медиа'
		}

		comm_text( id: string ) {
			return id === 'tg'
				? 'Более 2000 инженеров в крупнейшем js-сообществе Санкт-Петербурга. Обсуждения, вакансии и оперативные новости.'
				: 'Видеозаписи докладов, фотоотчёты со встреч и анонсы новых митапов.'
		}

		comm_uri( id: string ) {
			return id === 'tg' ? 'https://t.me/piterjs' : 'https://vk.com/piterjs'
		}

		comm_btn_text( id: string ) {
			return id === 'tg' ? '[ Вступить в Telegram-канал ]' : '[ Открыть группу VK ]'
		}

	}

}
