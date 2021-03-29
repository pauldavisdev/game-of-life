import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GridOptionsComponent } from './components/grid-options/grid-options.component';
import { GridComponent } from './components/grid/grid.component';

@NgModule({
  declarations: [AppComponent, GridComponent, GridOptionsComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
