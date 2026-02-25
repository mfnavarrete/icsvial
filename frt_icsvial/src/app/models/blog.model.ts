/**
 * Representa una entrada de blog obtenida desde la API.
 */
export interface BlogPost {
  id: number;
  imagen: string;
  titulo: string;
  autor: string;
  descripcion: string;
  contenido: string;
}
