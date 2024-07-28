import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; 
import { BoredService } from './services/bored.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatTableModule,
    MatButtonModule 
  ],
  providers: [BoredService],
  bootstrap: [AppComponent]
})
export class AppModule {}
