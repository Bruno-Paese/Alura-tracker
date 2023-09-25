import { TipoNotificacao } from "@/interfaces/INotificacao"
import { NOTIFY } from "@/store/mutations"
import { store } from '@/store'

export const notifyMixin = {
	methods: {
		notify(tipo: TipoNotificacao , titulo: string, texto: string): void {
			store.commit(NOTIFY, {
				titulo,
				texto,
				tipo
			})
		}
	}
}