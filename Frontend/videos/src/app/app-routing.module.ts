import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { TesteComponent } from './teste/teste.component';
import { VideosListComponent } from './videos-list/videos-list.component';


const routes: Routes = [
  { path: 'videos', component: VideosListComponent },
  { path: 'teste', component: TesteComponent },
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
