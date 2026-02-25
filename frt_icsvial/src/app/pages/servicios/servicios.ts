import { Component, DestroyRef, inject } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageHero } from '../../components/page-hero/page-hero';
import { ServicioList } from '../../components/servicio-list/servicio-list';
import { Servicio } from '../../models/servicio.model';
import { ServicioApi } from '../../services/servicio-api';

const PAGE_TITLE = 'Servicios';
const PAGE_SUBTITLE = 'Explora nuestro catálogo completo de soluciones para infraestructura y movilidad vial.';
const HERO_BACKGROUND_IMAGE = '/servicios/senalizacion-vertical.png';
const EMPTY_MESSAGE = 'No hay servicios para mostrar en este momento.';
const LOAD_ERROR_MESSAGE = 'No se pudo cargar la información de servicios.';

@Component({
  selector: 'app-servicios',
  imports: [PageHero, ServicioList],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class Servicios {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly title = PAGE_TITLE;
  protected readonly subtitle = PAGE_SUBTITLE;
  protected readonly heroBackgroundImage = HERO_BACKGROUND_IMAGE;
  protected readonly emptyMessage = EMPTY_MESSAGE;
  protected servicios: Servicio[] = [];
  protected isLoading = true;
  protected errorMessage = '';

  constructor(private readonly servicioApi: ServicioApi) {
    this.loadServicios();
  }

  /**
   * Obtiene servicios desde el backend para renderizar el catálogo.
   */
  private loadServicios(): void {
    this.servicioApi
      .listServicios()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (services: Servicio[]) => {
          this.servicios = services;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = LOAD_ERROR_MESSAGE;
          this.isLoading = false;
        }
      });
  }
}
