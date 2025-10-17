import { Component } from '@angular/core';
import { AgendaItem, AgendaGroup, AgendaConfig } from './models/agenda.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Agenda de Serviços';
  
  // Configuração da agenda
  agendaConfig: AgendaConfig = {
    startHour: 8,
    endHour: 20,
    timeInterval: 60,
    showGroups: true,
    showSubgroups: true,
    showSubSubgroups: true
  };

  // Grupos de exemplo com subgrupos
  agendaGroups: AgendaGroup[] = [
    { 
      id: 'grupo1', 
      name: 'Grupo 1', 
      color: '#4285f4',
      subgroups: [
        { 
          id: 'subgrupo1a', 
          name: 'Subgrupo 1A', 
          color: '#5c9aff', 
          groupId: 'grupo1',
          subSubgroups: [
            { id: 'sub1a1', name: 'Sub 1A1', color: '#7eb1ff', subgroupId: 'subgrupo1a' },
            { id: 'sub1a2', name: 'Sub 1A2', color: '#7eb1ff', subgroupId: 'subgrupo1a' }
          ]
        },
        { 
          id: 'subgrupo1b', 
          name: 'Subgrupo 1B', 
          color: '#5c9aff', 
          groupId: 'grupo1',
          subSubgroups: [
            { id: 'sub1b1', name: 'Sub 1B1', color: '#7eb1ff', subgroupId: 'subgrupo1b' }
          ]
        }
      ]
    },
    { 
      id: 'grupo2', 
      name: 'Grupo 2', 
      color: '#34a853',
      subgroups: [
        { 
          id: 'subgrupo2a', 
          name: 'Subgrupo 2A', 
          color: '#4eca6a', 
          groupId: 'grupo2',
          subSubgroups: [
            { id: 'sub2a1', name: 'Sub 2A1', color: '#68e282', subgroupId: 'subgrupo2a' },
            { id: 'sub2a2', name: 'Sub 2A2', color: '#68e282', subgroupId: 'subgrupo2a' },
            { id: 'sub2a3', name: 'Sub 2A3', color: '#68e282', subgroupId: 'subgrupo2a' }
          ]
        }
      ]
    },
    { 
      id: 'grupo3', 
      name: 'Grupo 3', 
      color: '#fbbc05',
      subgroups: [
        { 
          id: 'subgrupo3a', 
          name: 'Subgrupo 3A', 
          color: '#ffd04c', 
          groupId: 'grupo3',
          subSubgroups: [
            { id: 'sub3a1', name: 'Sub 3A1', color: '#ffe07f', subgroupId: 'subgrupo3a' }
          ]
        },
        { 
          id: 'subgrupo3b', 
          name: 'Subgrupo 3B', 
          color: '#ffd04c', 
          groupId: 'grupo3' 
        },
        { 
          id: 'subgrupo3c', 
          name: 'Subgrupo 3C', 
          color: '#ffd04c', 
          groupId: 'grupo3' 
        }
      ]
    }
  ];

  // Compromissos de exemplo com subgrupos
  agendaItems: AgendaItem[] = [
    {
      id: '1',
      title: 'Reunião de Equipe',
      description: 'Discussão sobre o novo projeto',
      startTime: new Date(new Date().setHours(9, 0, 0, 0)),
      endTime: new Date(new Date().setHours(10, 30, 0, 0)),
      groupId: 'grupo1',
      subgroupId: 'subgrupo1a',
      subSubgroupId: 'sub1a1'
    },
    {
      id: '2',
      title: 'Entrevista',
      description: 'Entrevista com candidato para vaga de desenvolvedor',
      startTime: new Date(new Date().setHours(11, 0, 0, 0)),
      endTime: new Date(new Date().setHours(12, 0, 0, 0)),
      groupId: 'grupo2',
      subgroupId: 'subgrupo2a',
      subSubgroupId: 'sub2a1'
    },
    {
      id: '3',
      title: 'Almoço',
      startTime: new Date(new Date().setHours(12, 0, 0, 0)),
      endTime: new Date(new Date().setHours(13, 0, 0, 0)),
      groupId: 'grupo1',
      subgroupId: 'subgrupo1b',
      subSubgroupId: 'sub1b1'
    },
    {
      id: '4',
      title: 'Apresentação',
      description: 'Apresentação do novo produto',
      startTime: new Date(new Date().setHours(14, 0, 0, 0)),
      endTime: new Date(new Date().setHours(15, 30, 0, 0)),
      groupId: 'grupo3',
      subgroupId: 'subgrupo3a',
      subSubgroupId: 'sub3a1'
    },
    {
      id: '5',
      title: 'Manutenção',
      description: 'Manutenção programada do sistema',
      startTime: new Date(new Date().setHours(16, 0, 0, 0)),
      endTime: new Date(new Date().setHours(17, 0, 0, 0)),
      groupId: 'grupo2',
      subgroupId: 'subgrupo2a',
      subSubgroupId: 'sub2a2'
    },
    {
      id: '6',
      title: 'Treinamento',
      description: 'Treinamento da nova equipe',
      startTime: new Date(new Date().setHours(9, 30, 0, 0)),
      endTime: new Date(new Date().setHours(11, 0, 0, 0)),
      groupId: 'grupo1',
      subgroupId: 'subgrupo1a',
      subSubgroupId: 'sub1a2'
    },
    {
      id: '7',
      title: 'Revisão de Código',
      description: 'Revisão do código do novo módulo',
      startTime: new Date(new Date().setHours(13, 0, 0, 0)),
      endTime: new Date(new Date().setHours(14, 30, 0, 0)),
      groupId: 'grupo3',
      subgroupId: 'subgrupo3b'
    },
    {
      id: '8',
      title: 'Planejamento',
      description: 'Planejamento do próximo sprint',
      startTime: new Date(new Date().setHours(15, 0, 0, 0)),
      endTime: new Date(new Date().setHours(16, 0, 0, 0)),
      groupId: 'grupo3',
      subgroupId: 'subgrupo3c'
    }
  ];
}
