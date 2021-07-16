import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from './categories';
import { Categorie } from './model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataService {
  private SERVER_PATH = 'http://localhost:3000';

  constructor(private httpClient : HttpClient) { }

  findCategories() : Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${this.SERVER_PATH}/categories`);
  }
  addNewCategory(category: any){
    return this.httpClient.post(`${this.SERVER_PATH}/categories/`, category);
  }
  removeCategory(category: any){
    return this.httpClient.delete(`${this.SERVER_PATH}/categories/${category.id}`);
  }

  editCategory(category : Categories){
    return this.httpClient.patch(`${this.SERVER_PATH}/categories/${category.id}`, category);
  }
}
