import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { VideosListComponent } from './videos-list/videos-list.component';
import { SafePipe } from './safe-pipe.pipe';
import { SortDirective } from './directive/sort.directive';
import { HighlightDirective } from './directive/highlight.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path : 'videos' , component : VideosListComponent}
]; 

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    VideosListComponent,
    SafePipe,
    SortDirective,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
