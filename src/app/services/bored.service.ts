import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
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
@Injectable({
  providedIn: 'root'
})
export class BoredService {
  private apiUrl = 'https://bored-api.appbrewery.com/random';

  
  constructor(private http: HttpClient) {}

  getRandomActivity(times: number): Observable<any[]> {
    const requests: Observable<any>[] = [];
    for (let i = 0; i < times; i++) {
      requests.push(this.http.get<any>(this.apiUrl));
    }
    return forkJoin(requests);
  }

  exportToCSV(data: boredApiElements[], fileName: string): void {
    const csvData = data.map(activity => ({
      Activity: activity.activity,
      Type: activity.type,
      Participants: activity.participants,
      Price: activity.price,
      Accessibility: activity.accessibility,
      Link: activity.link,
      Key: activity.key
    }));

    const csvRows = [
      Object.keys(csvData[0]).join(','), 
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, `${fileName}.csv`);
  }

  exportToJSON(data: boredApiElements[], fileName: string): void {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' });
    FileSaver.saveAs(blob, `${fileName}.json`);
  }
}