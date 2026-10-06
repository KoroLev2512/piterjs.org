namespace $.$$ {

	export class $piterjs_landing_footer extends $.$piterjs_landing_footer {

		@ $mol_mem
		socs() {
			return [ this.Soc( 'gh' ), this.Soc( 'tg' ), this.Soc( 'yt' ), this.Soc( 'vk' ) ]
		}

		soc_uri( id: string ) {
			const uris: Record< string, string > = {
				gh: 'https://github.com/piterjs',
				tg: 'https://t.me/piterjs',
				yt: 'https://www.youtube.com/@piterjs',
				vk: 'https://vk.com/piterjs',
			}
			return uris[ id ] ?? ''
		}

		soc_hint( id: string ) {
			const hints: Record< string, string > = {
				gh: 'GitHub',
				tg: 'Telegram',
				yt: 'YouTube',
				vk: 'VK Video',
			}
			return hints[ id ] ?? ''
		}

		soc_icon( id: string ) {
			const icons: Record< string, string > = {
				gh: 'github',
				tg: 'telegram',
				yt: 'youtube',
				vk: 'vk',
			}
			return icons[ id ] ? `piterjs/landing/assets/${ icons[ id ] }.webp` : ''
		}

	}

}
