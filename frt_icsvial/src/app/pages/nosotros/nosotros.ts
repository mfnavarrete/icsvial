import { Component } from '@angular/core';
import { PageHero } from '../../components/page-hero/page-hero';

const PAGE_TITLE = 'Nosotros';
const HERO_BACKGROUND_IMAGE = '/nosotros/ceo.png';
const WHO_ARE_WE_TITLE = '¿Quiénes somos?';
const WHO_ARE_WE_TEXT =
  'Somos una empresa especializada en señalización vertical, horizontal y seguridad vial, enfocada en ofrecer soluciones técnicas que equilibran calidad, alcance, tiempo y costos. Trabajamos con un fuerte compromiso hacia nuestros clientes, nuestro equipo humano y el entorno, impulsando cada proyecto con altos estándares de seguridad, cumplimiento y responsabilidad ambiental, para contribuir al desarrollo de infraestructuras más seguras y sostenibles.';
const CEO_NAME = 'Guillermo Navarrete';
const CEO_ROLE = 'Gerente General – ICSVial S.A.';
const CEO_TEXT_FIRST =
  'Guillermo Navarrete cuenta con más de 25 años de experiencia en el sector de señalización y seguridad vial, participando en la planificación y ejecución de proyectos de infraestructura con altos estándares técnicos y operativos. A lo largo de su trayectoria ha consolidado una visión estratégica orientada a la calidad, el cumplimiento de plazos y la optimización de recursos.';
const CEO_TEXT_SECOND =
  'Como CEO de ICSVial S.A., lidera la compañía con un enfoque en seguridad, eficiencia y responsabilidad ambiental, fortaleciendo el desarrollo del equipo humano y promoviendo una gestión sostenible que contribuye a la construcción de infraestructuras más seguras y confiables.';
const VISION_TITLE = 'Nuestra Visión';
const VISION_TEXT =
  'Ser reconocidos como la mejor empresa de señalización y seguridad vial e industrial en los mercados donde participamos, destacando por nuestro factor humano, políticas de calidad, seguridad y medio ambiente, y el cumplimiento puntual de cada compromiso.';
const MISSION_TITLE = 'Nuestra Misión';
const MISSION_TEXT =
  'Somos una empresa especializada en señalización vertical, horizontal y seguridad vial, que equilibra calidad, alcance, tiempo y costos, adaptando nuestras soluciones a las necesidades de cada cliente. Trabajamos con un fuerte compromiso hacia nuestro equipo humano, el medio ambiente y la generación de valor sostenible.';
const VALUES_TITLE = 'Nuestros valores';
const VALUES = [
  {
    title: 'Calidad',
    description: 'Entregamos cada proyecto con altos estándares técnicos y operativos.',
    iconClass: 'bi bi-award'
  },
  {
    title: 'Seguridad',
    description:
      'Priorizamos la protección de las personas y el cumplimiento de la normativa en cada intervención.',
    iconClass: 'bi bi-shield-check'
  },
  {
    title: 'Responsabilidad',
    description:
      'Actuamos con ética, compromiso y respeto hacia nuestros clientes, colaboradores y entorno.',
    iconClass: 'bi bi-hand-thumbs-up'
  },
  {
    title: 'Puntualidad',
    description: 'Cumplimos los plazos establecidos, asegurando eficiencia en cada etapa del proyecto.',
    iconClass: 'bi bi-clock-history'
  }
];

@Component({
  selector: 'app-nosotros',
  imports: [PageHero],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros {
  protected readonly title = PAGE_TITLE;
  protected readonly heroBackgroundImage = HERO_BACKGROUND_IMAGE;
  protected readonly whoAreWeTitle = WHO_ARE_WE_TITLE;
  protected readonly whoAreWeText = WHO_ARE_WE_TEXT;
  protected readonly ceoName = CEO_NAME;
  protected readonly ceoRole = CEO_ROLE;
  protected readonly ceoTextFirst = CEO_TEXT_FIRST;
  protected readonly ceoTextSecond = CEO_TEXT_SECOND;
  protected readonly visionTitle = VISION_TITLE;
  protected readonly visionText = VISION_TEXT;
  protected readonly missionTitle = MISSION_TITLE;
  protected readonly missionText = MISSION_TEXT;
  protected readonly valuesTitle = VALUES_TITLE;
  protected readonly values = VALUES;
}
