namespace $ {

	/** Ссылка на адрес в Яндекс.Картах */
	export function $piterjs_landing_map_uri( address: string ) {
		return 'https://yandex.ru/maps/?text=' + encodeURIComponent( address )
	}

}
