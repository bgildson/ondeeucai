import { User } from './user.model';
import { Comentario } from './comentario.model';

export class Queda {
  latitude: number;
  longitude: number;
  data: number;
  endereco: string;
  legenda: string;
  risos: User[];
  comentarios: Comentario[]
}
