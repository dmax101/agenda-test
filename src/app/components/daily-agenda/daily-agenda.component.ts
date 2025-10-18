import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AgendaItem, AgendaGroup, AgendaConfig } from '../../models/agenda.model';

interface RowInfo {
  id: string;
  name: string;
  color?: string;
  level: number;
  groupId?: string;
  subgroupId?: string;
}

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
    timeInterval: 60,
    showGroups: true,
    showSubgroups: true,
    showSubSubgroups: false
  };

  @ViewChild('agendaWrapper') agendaWrapper!: ElementRef;
  @ViewChild('timeSlots') timeSlots!: ElementRef;
  
  selectedItem: AgendaItem | null = null;
  timeSlotsArray: string[] = [];
  orderedRows: RowInfo[] = [];
  expandedItemId: string | null = null;
  
  ngOnInit(): void {
    this.generateTimeSlots();
    this.generateOrderedRows();
  }

  ngAfterViewInit(): void {
    // Sincronização inicial do scroll
    this.onMainScroll();
  }

  onMainScroll(): void {
    if (!this.agendaWrapper) {
      return;
    }

    const scrollLeft = this.agendaWrapper.nativeElement.scrollLeft;

    // Sincroniza o cabeçalho de tempo
    if (this.timeSlots) {
      this.timeSlots.nativeElement.scrollLeft = scrollLeft;
    }
  }

  private generateTimeSlots(): void {
    this.timeSlotsArray = [];
    for (let hour = this.config.startHour; hour < this.config.endHour; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      this.timeSlotsArray.push(`${formattedHour}:00`);
      
      if (this.config.timeInterval < 60) {
        for (let minute = this.config.timeInterval; minute < 60; minute += this.config.timeInterval) {
          this.timeSlotsArray.push(`${formattedHour}:${minute.toString().padStart(2, '0')}`);
        }
      }
    }
  }

  private generateOrderedRows(): void {
    this.orderedRows = [];
    if (!this.config.showGroups || this.groups.length === 0) {
      this.orderedRows.push({ id: 'default', name: 'Agendamentos', level: 0 });
      return;
    }

    this.groups.forEach(group => {
      this.orderedRows.push({
        id: group.id,
        name: group.name,
        color: group.color,
        level: 0,
        groupId: group.id
      });

      if (this.config.showSubgroups && group.subgroups) {
        group.subgroups.forEach(subgroup => {
          this.orderedRows.push({
            id: `${group.id}_${subgroup.id}`,
            name: subgroup.name,
            color: subgroup.color || group.color,
            level: 1,
            groupId: group.id,
            subgroupId: subgroup.id
          });
        });
      }
    });
  }

  getItemsForRow(rowInfo: RowInfo): AgendaItem[] {
    return this.items.filter(item => {
      if (rowInfo.id === 'default') return !item.groupId;

      if (rowInfo.level === 0) {
        return item.groupId === rowInfo.groupId && !item.subgroupId;
      }
      if (rowInfo.level === 1) {
        return item.groupId === rowInfo.groupId && item.subgroupId === rowInfo.subgroupId;
      }
      return false;
    });
  }

  getItemPosition(item: AgendaItem): { left: string, width: string } {
    const totalMinutes = (this.config.endHour - this.config.startHour) * 60;
    const slotDuration = 60 / (60 / this.config.timeInterval);
    const totalSlots = totalMinutes / slotDuration;

    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);

    const startMinutes = (startTime.getHours() - this.config.startHour) * 60 + startTime.getMinutes();
    const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

    const leftPercent = (startMinutes / totalMinutes) * 100;
    const widthPercent = (durationMinutes / totalMinutes) * 100;

    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  }

  onItemClick(item: AgendaItem, event: MouseEvent): void {
    event.stopPropagation();

    if (event.detail > 1) {
      return;
    }

    this.expandedItemId = this.expandedItemId === item.id ? null : item.id;
  }

  onItemDoubleClick(item: AgendaItem, event: MouseEvent): void {
    event.stopPropagation();
    this.expandedItemId = item.id;
    this.selectedItem = item;
  }

  deselectItem(): void {
    this.selectedItem = null;
    this.expandedItemId = null;
  }

  getItemDuration(item: AgendaItem): string {
    const durationMs = new Date(item.endTime).getTime() - new Date(item.startTime).getTime();
    const minutes = Math.floor(durationMs / 60000);
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}min` : `${m}min`;
  }

  getGroupName(groupId: string | undefined): string {
    if (!groupId) return 'N/A';
    return this.groups.find(g => g.id === groupId)?.name || 'N/A';
  }

  getSubgroupName(groupId: string | undefined, subgroupId: string | undefined): string {
    if (!groupId || !subgroupId) return 'N/A';
    const group = this.groups.find(g => g.id === groupId);
    return group?.subgroups?.find(s => s.id === subgroupId)?.name || 'N/A';
  }

  getRowInfo(item: AgendaItem): RowInfo | undefined {
    return this.orderedRows.find(r => {
      if (item.subgroupId) {
        return r.groupId === item.groupId && r.subgroupId === item.subgroupId;
      }
      if (item.groupId) {
        return r.groupId === item.groupId && r.level === 0;
      }
      return r.id === 'default';
    });
  }

  isItemExpanded(item: AgendaItem): boolean {
    return this.expandedItemId === item.id;
  }

  rowHasExpanded(rowInfo: RowInfo): boolean {
    if (!this.expandedItemId) {
      return false;
    }

    return this.getItemsForRow(rowInfo).some(item => item.id === this.expandedItemId);
  }
}
