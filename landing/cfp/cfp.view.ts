namespace $.$$ {

	export class $piterjs_landing_cfp extends $.$piterjs_landing_cfp {

		cfp_backdrop_click( event?: Event ) {
			// Cfp_modal сам является затемняющим оверлеем, поэтому закрываем
			// только по клику мимо Cfp_modal_box
			if( event && event.target !== event.currentTarget ) return
			this.cfp_close()
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
				this.toast( `⚠️ ${ bid }` )
				return
			}
			this.cfp_close()
			this.$.$mol_dom_context.location.href = this.cfp_mailto()
			// поля не чистим: пока письмо не отправлено, заявка не подана,
			// а почтовый клиент можно закрыть
			this.toast( `✉️ Письмо готово — отправьте его из почтового клиента на ${ this.cfp_recipient() }` )
		}

	}

}
