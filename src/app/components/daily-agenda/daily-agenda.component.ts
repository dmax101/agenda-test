import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { AgendaItem, AgendaGroup, AgendaConfig, AgendaSubgroup, AgendaSubSubgroup } from '../../models/agenda.model';

@Component({
  selector: 'app-daily-agenda',
  templateUrl: './daily-agenda.component.html',
  styleUrls: ['./daily-agenda.component.scss']
})
export class DailyAgendaComponent implements OnInit, AfterViewInit {
  @Input() items: AgendaItem[] = [];
  @Input() groups: AgendaGroup[] = [];
  @Input() config: AgendaConfig = {
    startHour: 8,
    endHour: 18,
    timeInterval: 30,
    showGroups: true,
    showSubgroups: true,
    showSubSubgroups: true
  };

  @ViewChild('agendaGrid') agendaGrid!: ElementRef;
  
  selectedItem: AgendaItem | null = null;
  screenWidth: number = window.innerWidth;
  screenHeight: number = window.innerHeight;

  timeSlots: string[] = [];
  groupedItems: { [key: string]: AgendaItem[] } = {};
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.adjustResponsiveLayout();
  }
  
  ngOnInit(): void {
    this.generateTimeSlots();
    this.organizeItemsByGroup();
    this.adjustResponsiveLayout();
  }
  
  private adjustResponsiveLayout(): void {
    // Ajusta o layout com base no tamanho da tela
    const container = document.querySelector('.daily-agenda-container') as HTMLElement;
    if (container) {
      // Ajusta a altura com base na altura da tela
      container.style.height = `${this.screenHeight * 0.8}px`;
    }
  }

  ngAfterViewInit(): void {
    // Garantir que o scroll horizontal esteja sincronizado
    if (this.agendaGrid) {
      this.syncScrollWithHeader();
    }
  }

  // Função para sincronizar o scroll horizontal da grade com o cabeçalho
  onGridScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const timeSlots = document.querySelector('.time-slots') as HTMLElement;
    
    if (timeSlots) {
      timeSlots.scrollLeft = target.scrollLeft;
    }
  }

  // Função para sincronizar o scroll inicial
  private syncScrollWithHeader(): void {
    const timeSlots = document.querySelector('.time-slots') as HTMLElement;
    const agendaGridElement = this.agendaGrid.nativeElement;
    
    if (timeSlots && agendaGridElement) {
      agendaGridElement.addEventListener('scroll', () => {
        timeSlots.scrollLeft = agendaGridElement.scrollLeft;
      });
    }
  }

  private generateTimeSlots(): void {
    this.timeSlots = [];
    for (let hour = this.config.startHour; hour <= this.config.endHour; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      
      if (this.config.timeInterval === 60) {
        this.timeSlots.push(`${formattedHour}:00`);
      } else {
        this.timeSlots.push(`${formattedHour}:00`);
        
        for (let minute = this.config.timeInterval; minute < 60; minute += this.config.timeInterval) {
          this.timeSlots.push(`${formattedHour}:${minute.toString().padStart(2, '0')}`);
        }
      }
    }
  }

  private organizeItemsByGroup(): void {
    this.groupedItems = {};
    
    // Inicializa grupos, subgrupos e sub-subgrupos vazios
    if (this.config.showGroups && this.groups.length > 0) {
      this.groups.forEach(group => {
        // Inicializa o grupo principal
        this.groupedItems[group.id] = [];
        
        // Inicializa subgrupos se existirem
        if (this.config.showSubgroups && group.subgroups && group.subgroups.length > 0) {
          group.subgroups.forEach(subgroup => {
            const subgroupKey = `${group.id}_${subgroup.id}`;
            this.groupedItems[subgroupKey] = [];
            
            // Inicializa sub-subgrupos se existirem
            if (this.config.showSubSubgroups && subgroup.subSubgroups && subgroup.subSubgroups.length > 0) {
              subgroup.subSubgroups.forEach(subSubgroup => {
                const subSubgroupKey = `${group.id}_${subgroup.id}_${subSubgroup.id}`;
                this.groupedItems[subSubgroupKey] = [];
              });
            }
          });
        }
      });
    } else {
      // Se não houver grupos, usa um grupo padrão
      this.groupedItems['default'] = [];
    }
    
    // Organiza os itens por grupo, subgrupo e sub-subgrupo
    this.items.forEach(item => {
      let key = 'default';
      
      if (item.groupId) {
        key = item.groupId;
        
        if (item.subgroupId) {
          key = `${item.groupId}_${item.subgroupId}`;
          
          if (item.subSubgroupId) {
            key = `${item.groupId}_${item.subgroupId}_${item.subSubgroupId}`;
          }
        }
      }
      
      if (!this.groupedItems[key]) {
        this.groupedItems[key] = [];
      }
      
      this.groupedItems[key].push(item);
    });
  }

  getItemPosition(item: AgendaItem): { top: string, left: string, width: string, height: string } {
    // Calcula a posição do item na grade com base no horário de início e fim
    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);
    
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const endHour = endTime.getHours();
    const endMinute = endTime.getMinutes();
    
    // Calcula a posição vertical (top) com base no horário de início
    const startTimeInMinutes = (startHour - this.config.startHour) * 60 + startMinute;
    const totalMinutesInDay = (this.config.endHour - this.config.startHour) * 60;
    
    // Calcula a posição horizontal (left) com base no número de slots de tempo
    const slotWidth = 80; // Largura de cada slot de tempo em pixels
    const leftPosition = (startTimeInMinutes / this.config.timeInterval) * slotWidth;
    
    // Calcula a altura com base na duração do compromisso
    const durationInMinutes = ((endHour - startHour) * 60) + (endMinute - startMinute);
    
    // Garantir uma altura mínima para evitar corte de texto
    const minHeightInMinutes = 30; // Altura mínima de 30 minutos
    const effectiveDuration = Math.max(durationInMinutes, minHeightInMinutes);
    
    // Calcula a largura com base na duração
    const widthInSlots = durationInMinutes / this.config.timeInterval;
    const widthInPixels = widthInSlots * slotWidth;
    
    return {
      top: '5px', // Posição fixa no topo da linha
      left: `${leftPosition}px`,
      width: `${widthInPixels - 10}px`, // Subtrai 10px para margens
      height: 'calc(100% - 10px)' // Altura fixa com margem
    };
  }

  getGroupById(groupId: string): AgendaGroup | undefined {
    return this.groups.find(group => group.id === groupId);
  }
  
  selectItem(item: AgendaItem): void {
    this.selectedItem = item;
  }
}
