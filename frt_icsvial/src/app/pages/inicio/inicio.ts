import { AfterViewInit, Component, DestroyRef, ElementRef, HostListener, inject, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { API_BASE_URL } from '../../constants/api.constants';
import { ClienteList } from '../../components/cliente-list/cliente-list';
import { Cliente } from '../../models/cliente.model';
import { ClienteApi } from '../../services/cliente-api';
import { Servicio } from '../../models/servicio.model';
import { ServicioApi } from '../../services/servicio-api';

const HERO_TITLE = 'Señalización de alto estándar para una movilidad más segura';
const HERO_PRIMARY_CTA = 'CONOCE NUESTROS SERVICIOS';
const HERO_SECONDARY_CTA = 'SOLICITA UNA COTIZACIÓN';
const HERO_SECONDARY_CTA_LINK =
  'https://wa.me/593987920718?text=Necesito%20una%20cotizaci%C3%B3n';
const ABOUT_TITLE = 'Especialistas en señalización y seguridad vial';
const ABOUT_TEXT = 'Somos una empresa enfocada en señalización horizontal, vertical y seguridad vial, comprometida con la calidad, los plazos y el desarrollo responsable de cada proyecto.';
const ABOUT_CTA = 'CONÓCENOS';
const SERVICES_TITLE = 'Nuestros servicios';
const SERVICES_CTA = 'VER TODOS LOS SERVICIOS';
const CLIENTS_TITLE = 'Nuestros clientes';
const HERO_BACKGROUND_IMAGE = '/inicio/hero.png';
const HERO_FALLBACK_BACKGROUND =
  `linear-gradient(rgba(9, 18, 30, 0.4), rgba(9, 18, 30, 0.4)), url('${HERO_BACKGROUND_IMAGE}')`;
const DEFAULT_SPOTLIGHT_IMAGE = '/inicio/spotlightImage.png';
const EMPTY_MESSAGE = 'Aún no hay clientes publicados.';
const LOAD_CLIENTES_ERROR_MESSAGE = 'No se pudieron cargar los clientes. Intenta nuevamente en unos minutos.';
const LOAD_SERVICIOS_ERROR_MESSAGE = 'No se pudieron cargar los servicios. Intenta nuevamente en unos minutos.';
const METRICS_ANIMATION_DURATION_MS = 2000;
const FOUNDATION_YEAR_TARGET = 2015;
const PROFESSIONALS_TARGET = 30;
const PROJECTS_TARGET = 100;

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, ClienteList],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements AfterViewInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly servicesScrollDistance = 360;
  private metricsObserver: IntersectionObserver | null = null;
  private metricsAnimationStarted = false;

  @ViewChild('servicesScroller')
  private servicesScroller?: ElementRef<HTMLDivElement>;

  @ViewChild('metricsSection')
  private metricsSection?: ElementRef<HTMLElement>;

  protected readonly heroTitle = HERO_TITLE;
  protected readonly heroPrimaryCta = HERO_PRIMARY_CTA;
  protected readonly heroSecondaryCta = HERO_SECONDARY_CTA;
  protected readonly heroSecondaryCtaLink = HERO_SECONDARY_CTA_LINK;
  protected readonly aboutTitle = ABOUT_TITLE;
  protected readonly aboutText = ABOUT_TEXT;
  protected readonly aboutCta = ABOUT_CTA;
  protected readonly servicesTitle = SERVICES_TITLE;
  protected readonly servicesCta = SERVICES_CTA;
  protected readonly clientsTitle = CLIENTS_TITLE;
  protected readonly emptyMessage = EMPTY_MESSAGE;

  protected heroBackgroundImage = HERO_FALLBACK_BACKGROUND;
  protected spotlightImageUrl = DEFAULT_SPOTLIGHT_IMAGE;
  protected serviciosDestacados: Servicio[] = [];
  protected clientes: Cliente[] = [];
  protected isServiciosLoading = true;
  protected isClientesLoading = true;
  protected servicesOverflowing = false;
  protected serviciosErrorMessage = '';
  protected clientesErrorMessage = '';
  protected foundationYearDisplay = '0';
  protected professionalsDisplay = '+0';
  protected projectsDisplay = '+0';

  constructor(
    private readonly clienteApi: ClienteApi,
    private readonly servicioApi: ServicioApi
  ) {
    this.loadServicios();
    this.loadClientes();
  }

  ngAfterViewInit(): void {
    this.setupMetricsObserver();
    setTimeout(() => {
      this.updateServicesOverflowState();
    }, 100);
    setTimeout(() => {
      this.updateServicesOverflowState();
    }, 300);
    setTimeout(() => {
      this.updateServicesOverflowState();
    }, 600);
  }

  ngOnDestroy(): void {
    this.metricsObserver?.disconnect();
    this.metricsObserver = null;
  }

  @HostListener('window:resize')
  protected onWindowResize(): void {
    this.updateServicesOverflowState();
  }

  /**
   * Construye una URL absoluta de imagen a partir de la ruta relativa guardada en la API.
   */
  protected getImageUrl(imagePath: string): string {
    return imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}${imagePath}`;
  }

  /**
   * Retorna el alt accesible de las imágenes de servicios.
   */
  protected getServiceImageAlt(serviceName: string): string {
    return serviceName;
  }

  /**
   * Desplaza el carrusel de servicios hacia izquierda o derecha.
   */
  protected scrollServices(direction: -1 | 1): void {
    const element = this.servicesScroller?.nativeElement;
    if (!element) {
      return;
    }

    element.scrollBy({
      left: direction * this.servicesScrollDistance,
      behavior: 'smooth'
    });
  }

  /**
   * Actualiza si el carrusel requiere controles de desplazamiento.
   */
  private updateServicesOverflowState(): void {
    const element = this.servicesScroller?.nativeElement;
    this.servicesOverflowing = !!element && element.scrollWidth > element.clientWidth + 4;
  }

  /**
   * Inicia animación de conteo para los indicadores del home.
   */
  private startMetricsAnimation(): void {
    if (this.metricsAnimationStarted) {
      return;
    }
    this.metricsAnimationStarted = true;

    this.animateMetric(FOUNDATION_YEAR_TARGET, (value) => {
      this.foundationYearDisplay = String(value);
    });
    this.animateMetric(PROFESSIONALS_TARGET, (value) => {
      this.professionalsDisplay = `+${value}`;
    });
    this.animateMetric(PROJECTS_TARGET, (value) => {
      this.projectsDisplay = `+${value}`;
    });
  }

  /**
   * Anima un valor numérico desde 0 hasta su objetivo en 0.5s.
   */
  private animateMetric(targetValue: number, onUpdate: (value: number) => void): void {
    if (typeof window === 'undefined') {
      onUpdate(targetValue);
      return;
    }

    const startTime = window.performance.now();

    const step = (currentTime: number): void => {
      const progress = Math.min((currentTime - startTime) / METRICS_ANIMATION_DURATION_MS, 1);
      onUpdate(Math.round(targetValue * progress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  /**
   * Activa el conteo cuando la sección de métricas entra al viewport.
   */
  private setupMetricsObserver(): void {
    const section = this.metricsSection?.nativeElement;
    if (!section || typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined') {
      return;
    }

    this.metricsObserver = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          this.startMetricsAnimation();
          this.metricsObserver?.disconnect();
          this.metricsObserver = null;
        }
      },
      {
        threshold: 0.15
      }
    );

    this.metricsObserver.observe(section);
  }

  /**
   * Carga servicios para hero, bloque institucional y vista previa de servicios.
   */
  private loadServicios(): void {
    this.servicioApi
      .listServicios()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items: Servicio[]) => {
          this.serviciosDestacados = items;
          this.isServiciosLoading = false;
          setTimeout(() => {
            this.updateServicesOverflowState();
          }, 100);
          setTimeout(() => {
            this.updateServicesOverflowState();
          }, 300);
          setTimeout(() => {
            this.updateServicesOverflowState();
          }, 600);
        },
        error: () => {
          this.serviciosErrorMessage = LOAD_SERVICIOS_ERROR_MESSAGE;
          this.isServiciosLoading = false;
        }
      });
  }

  /**
   * Carga el listado de clientes para mostrarlo en el home.
   */
  private loadClientes(): void {
    this.clienteApi
      .listClientes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items: Cliente[]) => {
          this.clientes = items;
          this.isClientesLoading = false;
        },
        error: () => {
          this.clientesErrorMessage = LOAD_CLIENTES_ERROR_MESSAGE;
          this.isClientesLoading = false;
        }
      });
  }
}
