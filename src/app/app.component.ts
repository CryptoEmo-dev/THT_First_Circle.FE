import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BoredService } from './services/bored.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export interface boredApiElements {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link?: string;
  key: string;
  accessibility: number;
}

export interface TableColumn<T> {
  label: string;
  property: string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button';
  visible?: boolean;
  cssClasses?: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [MatTableModule],
})
export class AppComponent implements OnInit, OnDestroy {
  @Input()
  activities: boredApiElements[] = [];
  columns: TableColumn<boredApiElements>[] = [
    { label: 'Activity', property: 'activity', type: 'text' },
    { label: 'Type', property: 'type', type: 'text' },
    { label: 'Participants', property: 'participants', type: 'text' },
    { label: 'Price', property: 'price', type: 'text' },
    { label: 'Accessibility', property: 'accessibility', type: 'text' },
    { label: 'Link', property: 'link', type: 'text' },
    { label: 'Key', property: 'key', type: 'text' }
  ];

  displayedColumns: string[] = this.columns.map(col => col.property);
  dataSource: MatTableDataSource<boredApiElements> = new MatTableDataSource();

  private _onDestroy$ = new Subject<void>();

  @ViewChild('TABLE', { static: true })table!: ElementRef;

  constructor(private _boredService: BoredService) {}

  ngOnInit(): void {
    this._getRandomActivity();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  private _getRandomActivity(): void {
    this._boredService.getRandomActivity(2)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((data: boredApiElements[]) => {
        this.activities = data;
        this.dataSource.data = this.activities;
      });
  }

  exportToCSV(): void {
    console.log('export to csv clicked!')
    this._boredService.exportToCSV(this.activities, 'activities');
  }

  exportToJSON(): void{
    console.log('export to json clicked!')
    this._boredService.exportToJSON(this.activities,'activies');
  }
}
