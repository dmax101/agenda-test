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
    showSubSubgroups: false // Desabilitando o terceiro nível
  };

  // Grupos de exemplo com apenas 2 níveis
  agendaGroups: AgendaGroup[] = [
    { 
      id: 'grupo1', 
      name: 'Desenvolvimento', 
      color: '#4285f4',
      subgroups: [
        { 
          id: 'subgrupo1a', 
          name: 'Frontend', 
          color: '#5c9aff', 
          groupId: 'grupo1'
        },
        { 
          id: 'subgrupo1b', 
          name: 'Backend', 
          color: '#5c9aff', 
          groupId: 'grupo1'
        },
        {
          id: 'subgrupo1c',
          name: 'DevOps',
          color: '#5c9aff',
          groupId: 'grupo1'
        }
      ]
    },
    { 
      id: 'grupo2', 
      name: 'Marketing', 
      color: '#34a853',
      subgroups: [
        { 
          id: 'subgrupo2a', 
          name: 'Digital', 
          color: '#4eca6a', 
          groupId: 'grupo2'
        },
        {
          id: 'subgrupo2b',
          name: 'Conteúdo',
          color: '#4eca6a',
          groupId: 'grupo2'
        },
        {
          id: 'subgrupo2c',
          name: 'Eventos',
          color: '#4eca6a',
          groupId: 'grupo2'
        }
      ]
    },
    { 
      id: 'grupo3', 
      name: 'Recursos Humanos', 
      color: '#fbbc05',
      subgroups: [
        { 
          id: 'subgrupo3a', 
          name: 'Recrutamento', 
          color: '#ffd04c', 
          groupId: 'grupo3'
        },
        { 
          id: 'subgrupo3b', 
          name: 'Treinamento', 
          color: '#ffd04c', 
          groupId: 'grupo3' 
        },
        { 
          id: 'subgrupo3c', 
          name: 'Benefícios', 
          color: '#ffd04c', 
          groupId: 'grupo3' 
        }
      ]
    },
    {
      id: 'grupo4',
      name: 'Vendas',
      color: '#ea4335',
      subgroups: [
        {
          id: 'subgrupo4a',
          name: 'Prospecção',
          color: '#ff6b6b',
          groupId: 'grupo4'
        },
        {
          id: 'subgrupo4b',
          name: 'Negociação',
          color: '#ff6b6b',
          groupId: 'grupo4'
        }
      ]
    }
  ];

  // Agendamentos de exemplo com apenas 2 níveis
  agendaItems: AgendaItem[] = [
    {
      id: '1',
      title: 'Reunião de Equipe',
      description: 'Discussão sobre o novo projeto',
      startTime: new Date(new Date().setHours(9, 0, 0, 0)),
      endTime: new Date(new Date().setHours(10, 30, 0, 0)),
      groupId: 'grupo1',
      subgroupId: 'subgrupo1a'
    },
    {
      id: '2',
      title: 'Entrevista Técnica',
      description: 'Entrevista com candidato para vaga de desenvolvedor',
      startTime: new Date(new Date().setHours(11, 0, 0, 0)),
      endTime: new Date(new Date().setHours(12, 0, 0, 0)),
      groupId: 'grupo3',
      subgroupId: 'subgrupo3a'
    },
    {
      id: '3',
      title: 'Deploy Produção',
      description: 'Implementação da nova versão',
      startTime: new Date(new Date().setHours(12, 0, 0, 0)),
      endTime: new Date(new Date().setHours(13, 0, 0, 0)),
      groupId: 'grupo1',
      subgroupId: 'subgrupo1c'
    },
    {
      id: '4',
      title: 'Apresentação Campanha',
      description: 'Apresentação da nova campanha de marketing',
      startTime: new Date(new Date().setHours(14, 0, 0, 0)),
      endTime: new Date(new Date().setHours(15, 30, 0, 0)),
      groupId: 'grupo2',
      subgroupId: 'subgrupo2a'
    },
    {
      id: '5',
      title: 'Revisão API',
      description: 'Revisão da nova API de pagamentos',
      startTime: new Date(new Date().setHours(16, 0, 0, 0)),
      endTime: new Date(new Date().setHours(17, 0, 0, 0)),
      groupId: 'grupo1',
      subgroupId: 'subgrupo1b'
    },
    {
      id: '6',
      title: 'Treinamento React',
      description: 'Treinamento da nova equipe em React',
      startTime: new Date(new Date().setHours(9, 30, 0, 0)),
      endTime: new Date(new Date().setHours(11, 0, 0, 0)),
      groupId: 'grupo3',
      subgroupId: 'subgrupo3b'
    },
    {
      id: '7',
      title: 'Criação de Conteúdo',
      description: 'Brainstorm para novos posts do blog',
      startTime: new Date(new Date().setHours(13, 0, 0, 0)),
      endTime: new Date(new Date().setHours(14, 30, 0, 0)),
      groupId: 'grupo2',
      subgroupId: 'subgrupo2b'
    },
    {
      id: '8',
      title: 'Negociação Cliente',
      description: 'Reunião com cliente potencial',
      startTime: new Date(new Date().setHours(15, 0, 0, 0)),
      endTime: new Date(new Date().setHours(16, 0, 0, 0)),
      groupId: 'grupo4',
      subgroupId: 'subgrupo4b'
    },
    {
      id: '9',
      title: 'Planejamento Sprint',
      description: 'Planejamento do próximo sprint',
      startTime: new Date(new Date().setHours(10, 0, 0, 0)),
      endTime: new Date(new Date().setHours(11, 30, 0, 0)),
      groupId: 'grupo1',
      subgroupId: 'subgrupo1a'
    },
    {
      id: '10',
      title: 'Evento Networking',
      description: 'Organização do evento de networking',
      startTime: new Date(new Date().setHours(17, 0, 0, 0)),
      endTime: new Date(new Date().setHours(18, 0, 0, 0)),
      groupId: 'grupo2',
      subgroupId: 'subgrupo2c'
    },
    {
      id: '11',
      title: 'Prospecção Lead',
      description: 'Ligações para novos leads',
      startTime: new Date(new Date().setHours(8, 30, 0, 0)),
      endTime: new Date(new Date().setHours(10, 0, 0, 0)),
      groupId: 'grupo4',
      subgroupId: 'subgrupo4a'
    },
    {
      id: '12',
      title: 'Revisão Benefícios',
      description: 'Análise dos benefícios oferecidos',
      startTime: new Date(new Date().setHours(14, 0, 0, 0)),
      endTime: new Date(new Date().setHours(15, 0, 0, 0)),
      groupId: 'grupo3',
      subgroupId: 'subgrupo3c'
    }
  ];
}
