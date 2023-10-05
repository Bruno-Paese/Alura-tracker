const projeto = {
	id: 1,
	descricao: '134sdgagfsf'
}

const proxy = new Proxy(projeto,  {
	get(objetoOriginal, chave) {
		console.log(`Alguem pediu a ${chave}`)
		return objetoOriginal[chave]
	},

	set(objetoOriginal, chave, valor) {
		console.log(`alterou a chave ${chave} para o valor ${valor}`)
		objetoOriginal[chave] = valor
	}
})

proxy.descricao = 'reatividade'

console.log(proxy.descricao)