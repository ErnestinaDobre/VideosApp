import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from "../categories";
import { CategoriesDataService } from '../categories-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  constructor(private categoriesDataService: CategoriesDataService) { }
  categoriesShown:  Array<Categories> = [];
  initialCategory : Categories = null;
  wtvr = [1,2,3,4];

  ngOnInit() {
    this.categoriesDataService.findCategories()
      .subscribe(
        rez => {
          this.categoriesShown = rez;
          console.log('categories: ', rez)
        }
      )
  }

 
  // addNewCat(name: string){
  //   let category = {
  //     title: name
  //   }

  //   this.categoriesDataService.addNewCategory(category)
  //   .subscribe(
  //     rez => {
  //       this.categoriesShown = rez;
  //     }
  //   )
  // }
  addNewCat(name: string){
    let categ = {
      title: name
    }

    this.categoriesDataService.addNewCategory(categ)
    .subscribe(
      rez => {
        this.categoriesDataService.findCategories()//fara partea asta adauga in json dar da eroare. De ce?
        .subscribe(
          rez => {
            this.categoriesShown = rez;
            console.log('categories: ', rez)
          }
        )
      }
    )
  }

  removeCat(category: Categories){
    this.categoriesDataService.removeCategory(category)
    .subscribe(
      rez => {
        this.categoriesDataService.findCategories()//fara partea asta adauga in json dar da eroare. De ce?
        .subscribe(
          rez => {
            this.categoriesShown = rez;
            console.log('categories: ', rez)
          }
        )
      }
    )
  }

  editCat(category: Categories){
    delete category['editing'];
    
    this.categoriesDataService.editCategory(category)
    .subscribe(
      rez => {
        this.categoriesDataService.findCategories()//fara partea asta adauga in json dar da eroare. De ce?
        .subscribe(
          rez => {
            this.categoriesShown = rez;
  
            console.log('categories: ', rez)
          }
        )
      }
    )
  }
  enableEditing(category: Categories){
    category['editing'] = true;
    this.initialCategory = {...category}
    console.log(this.initialCategory)
  }

  cancel(category: Categories){
    delete category['editing'];
    category.title = this.initialCategory.title;
  }
    }
  