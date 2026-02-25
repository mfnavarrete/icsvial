import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { API_BASE_URL } from '../../constants/api.constants';
import { BlogPost } from '../../models/blog.model';
import { BlogApi } from '../../services/blog-api';
import { marked } from 'marked';

const INVALID_ID_ERROR = 'El identificador del blog es inválido.';
const LOAD_ERROR_MESSAGE = 'No fue posible cargar el contenido del blog solicitado.';
const AUTHOR_PREFIX = 'Autor';

@Component({
  selector: 'app-blog-detalle',
  imports: [RouterLink],
  templateUrl: './blog-detalle.html',
  styleUrl: './blog-detalle.css'
})
export class BlogDetalle {
  private readonly destroyRef = inject(DestroyRef);

  protected post: BlogPost | null = null;
  protected contentHtml = '';
  protected isLoading = true;
  protected errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogApi: BlogApi
  ) {
    this.loadBlog();
  }

  /**
   * Carga un blog por ID desde la URL y transforma su contenido Markdown a HTML.
   */
  private loadBlog(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id <= 0) {
      this.errorMessage = INVALID_ID_ERROR;
      this.isLoading = false;
      return;
    }

    this.blogApi
      .getBlogById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (item: BlogPost) => {
          this.post = item;
          this.contentHtml = this.renderMarkdown(item.contenido);
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = LOAD_ERROR_MESSAGE;
          this.isLoading = false;
        }
      });
  }

  /**
   * Convierte Markdown a HTML para renderizar el contenido completo del blog.
   */
  private renderMarkdown(markdownContent: string): string {
    return marked.parse(markdownContent, { gfm: true }) as string;
  }

  /**
   * Construye una URL absoluta de imagen a partir de la ruta relativa guardada en la API.
   */
  protected getImageUrl(imagePath: string): string {
    return imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}${imagePath}`;
  }

  /**
   * Formatea el nombre del autor para la cabecera del blog.
   */
  protected getAuthorLabel(authorName: string): string {
    return `${AUTHOR_PREFIX}: ${authorName}`;
  }
}
