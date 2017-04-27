export class User {
  username: string;
  nome: string;
  sobrenome: string;
  foto: string;
  get nome_completo() {
    let nome = this.nome;
    let sobrenome = this.sobrenome;
    return `${this.nome} ${this.sobrenome || ''}`.trim();
  }
}
