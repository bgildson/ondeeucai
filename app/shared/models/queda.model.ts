import { User } from './user.model';
import { Comentario } from './comentario.model';

export class Queda {
  latitude: number;
  longitude: number;
  endereco: string;
  legenda: string;
  timestamp: number;
  risos: User[];
  comentarios: Comentario[]
}
