import { User } from './user.model';

export class Comentario {
  user: User;
  conteudo: string;
  timestamp: number;
}
