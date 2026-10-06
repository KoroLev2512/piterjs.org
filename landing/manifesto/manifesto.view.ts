namespace $.$$ {

	export class $piterjs_landing_manifesto extends $.$piterjs_landing_manifesto {

		@ $mol_mem
		stats() {
			return [ this.Stat( 'meetups' ), this.Stat( 'visitors' ), this.Stat( 'speeches' ), this.Stat( 'source' ) ]
		}

		// Все четыре — статичные. Считать митапы из meetups().length нельзя:
		// в домене лежат 49 записей, а проведено уже 100+, то есть счёт по
		// данным занижал бы реальность почти вдвое. Остальные цифры из
		// домена не достать без подтягивания speeches()/visitors_list()
		// сразу для всех митапов.
		stat_val( id: string ) {
			const vals: Record< string, string > = {
				meetups: '100+',
				visitors: '3,500+',
				speeches: '250+',
				source: '100%',
			}
			return vals[ id ] ?? '0'
		}

		stat_lbl( id: string ) {
			const lbls: Record< string, string > = {
				meetups: 'Проведенных Митапов',
				visitors: 'Участников Сообщества',
				speeches: 'Хардкорных Докладов',
				source: 'Open Source & Community',
			}
			return lbls[ id ] ?? ''
		}

	}

}
