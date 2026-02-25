import { Component, DestroyRef, inject } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogList } from '../../components/blog-list/blog-list';
import { PageHero } from '../../components/page-hero/page-hero';
import { BlogPost } from '../../models/blog.model';
import { BlogApi } from '../../services/blog-api';

const PAGE_TITLE = 'Blog';
const PAGE_SUBTITLE = 'Publicaciones técnicas y novedades obtenidas directamente desde la API de blogs.';
const HERO_BACKGROUND_IMAGE = '/blog/blog1.png';
const EMPTY_MESSAGE = 'No hay publicaciones disponibles en este momento.';
const LOAD_ERROR_MESSAGE = 'No se pudieron cargar las publicaciones del blog.';

@Component({
  selector: 'app-blog',
  imports: [PageHero, BlogList],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly title = PAGE_TITLE;
  protected readonly subtitle = PAGE_SUBTITLE;
  protected readonly heroBackgroundImage = HERO_BACKGROUND_IMAGE;
  protected readonly emptyMessage = EMPTY_MESSAGE;
  protected posts: BlogPost[] = [];
  protected isLoading = true;
  protected errorMessage = '';

  constructor(private readonly blogApi: BlogApi) {
    this.loadBlogs();
  }

  /**
   * Obtiene las entradas de blog desde la API.
   */
  private loadBlogs(): void {
    this.blogApi
      .listBlogs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items: BlogPost[]) => {
          this.posts = items;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = LOAD_ERROR_MESSAGE;
          this.isLoading = false;
        }
      });
  }

}
