import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WritersComponent } from './components/writers/writers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'writers', component: WritersComponent },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, WritersComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, CommonModule, HttpClientModule, MatDividerModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
