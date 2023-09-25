import { TipoNotificacao } from "@/interfaces/INotificacao"
import { NOTIFY } from "@/store/mutations"
import { store } from '@/store'

type Notifier = {
	notify: (tipo: TipoNotificacao, titulo: string, texto: string) => void
}

export default () : Notifier => {
	const notify = (tipo: TipoNotificacao , titulo: string, texto: string): void => {
		store.commit(NOTIFY, {
			titulo,
			texto,
			tipo
		});
	};
	return {
		notify
	}
}