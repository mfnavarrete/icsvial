import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { API_BASE_URL } from '../../constants/api.constants';
import { BlogPost } from '../../models/blog.model';

const EMPTY_BLOGS_MESSAGE = 'No hay publicaciones disponibles en este momento.';
const AUTHOR_PREFIX = 'Autor';

/**
 * Lista reutilizable para renderizar tarjetas de blog.
 */
@Component({
  selector: 'app-blog-list',
  imports: [RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css'
})
export class BlogList {
  @Input({ required: true }) posts: BlogPost[] = [];
  @Input() emptyMessage = EMPTY_BLOGS_MESSAGE;

  /**
   * Construye una URL absoluta de imagen a partir de la ruta relativa guardada en la API.
   */
  protected getImageUrl(imagePath: string): string {
    return imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}${imagePath}`;
  }

  /**
   * Retorna el texto alternativo accesible para la portada de la publicación.
   */
  protected getImageAlt(postTitle: string): string {
    return `${postTitle} - portada del blog`;
  }

  /**
   * Formatea el nombre del autor para la tarjeta de blog.
   */
  protected getAuthorLabel(authorName: string): string {
    return `${AUTHOR_PREFIX}: ${authorName}`;
  }
}
