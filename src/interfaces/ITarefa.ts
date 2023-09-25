import IProjeto from "./IProjeto";

export default interface ITarefa {
	duration: number,
	description: string,
	projeto: IProjeto
}