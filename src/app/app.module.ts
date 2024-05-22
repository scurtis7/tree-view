import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./common/material.module";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialTreeComponent } from './components/material-tree/material-tree.component';
import { BootstrapTreeComponent } from './components/bootstrap-tree/bootstrap-tree.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'material', component: MaterialTreeComponent },
  { path: 'bootstrap', component: BootstrapTreeComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MaterialTreeComponent,
    BootstrapTreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
