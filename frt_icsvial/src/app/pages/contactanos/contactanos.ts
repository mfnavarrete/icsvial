import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageHero } from '../../components/page-hero/page-hero';

const PAGE_TITLE = 'Contáctanos';
const HERO_BACKGROUND_IMAGE = '/inicio/hero.png';
const PAGE_SUBTITLE = 'Nuestro equipo está disponible para atender cotizaciones, soporte técnico y consultas comerciales.';
const CONTACT_CARD_TITLE = 'Con un click';
const CONTACT_CARD_TEXT = 'Soluciones integrales en señalización y seguridad vial, ejecutadas con precisión, cumplimiento y compromiso.';
const CONTACT_OFFICE_TITLE = 'Oficina';
const CONTACT_OFFICE_ADDRESS = 'Oficinas Conocoto, Pasaje Calderón S14-32 y Francisco Calderón';
const CONTACT_EMAIL_TITLE = 'Email';
const CONTACT_EMAIL = 'info@icsvial.com';
const CONTACT_PHONE_TITLE = 'Teléfono';
const CONTACT_PHONE = '(593) 98 792 0718';
const CONTACT_SOCIAL_TITLE = 'Síguenos en redes sociales';
const MAP_LOCATION_URL = 'https://www.google.com/maps?q=Pasaje+Calder%C3%B3n&output=embed';
const MAP_CTA_TEXT = 'Ver ubicación';
const MAP_CTA_LINK = 'https://maps.google.com/?q=Pasaje+Calder%C3%B3n';

@Component({
  selector: 'app-contactanos',
  imports: [PageHero],
  templateUrl: './contactanos.html',
  styleUrl: './contactanos.css'
})
export class Contactanos {
  protected readonly title = PAGE_TITLE;
  protected readonly heroBackgroundImage = HERO_BACKGROUND_IMAGE;
  protected readonly subtitle = PAGE_SUBTITLE;
  protected readonly contactCardTitle = CONTACT_CARD_TITLE;
  protected readonly contactCardText = CONTACT_CARD_TEXT;
  protected readonly officeTitle = CONTACT_OFFICE_TITLE;
  protected readonly officeAddress = CONTACT_OFFICE_ADDRESS;
  protected readonly emailTitle = CONTACT_EMAIL_TITLE;
  protected readonly email = CONTACT_EMAIL;
  protected readonly phoneTitle = CONTACT_PHONE_TITLE;
  protected readonly phone = CONTACT_PHONE;
  protected readonly socialTitle = CONTACT_SOCIAL_TITLE;
  protected readonly mapLocationUrl: SafeResourceUrl;
  protected readonly mapCtaText = MAP_CTA_TEXT;
  protected readonly mapCtaLink = MAP_CTA_LINK;

  constructor(private readonly sanitizer: DomSanitizer) {
    this.mapLocationUrl = this.sanitizer.bypassSecurityTrustResourceUrl(MAP_LOCATION_URL);
  }
}
