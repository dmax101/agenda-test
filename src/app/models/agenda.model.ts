export interface AgendaItem {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  color?: string;
  groupId?: string;
  subgroupId?: string;
  subSubgroupId?: string;
}

export interface AgendaSubSubgroup {
  id: string;
  name: string;
  color?: string;
  subgroupId: string;
}

export interface AgendaSubgroup {
  id: string;
  name: string;
  color?: string;
  groupId: string;
  subSubgroups?: AgendaSubSubgroup[];
}

export interface AgendaGroup {
  id: string;
  name: string;
  color?: string;
  subgroups?: AgendaSubgroup[];
}

export interface AgendaConfig {
  startHour: number; // Hora de início da agenda (ex: 8 para 8:00)
  endHour: number; // Hora de término da agenda (ex: 18 para 18:00)
  timeInterval: 15 | 30 | 45 | 60; // Intervalo de tempo em minutos
  showGroups: boolean; // Indica se os grupos devem ser exibidos
  showSubgroups?: boolean; // Indica se os subgrupos devem ser exibidos
  showSubSubgroups?: boolean; // Indica se os sub-subgrupos devem ser exibidos
}