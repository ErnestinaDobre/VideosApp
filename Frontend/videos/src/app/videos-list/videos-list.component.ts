import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Video } from '../video';
import { VideoDataService } from '../video-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriesDataService } from '../categories-data.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { Categorie } from '../model/categorie';
import { MatTabBody } from '@angular/material';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})

export class VideosListComponent implements OnInit {


  
  animal = ['cat', 'mouse'];
  initialVideos: Video[] = [];
  videos: Video[] = [];
  displayedVideos : Video[] = [];
  clicked = false;
  clickedPrevDisabled: boolean = true;
  constructor(private videoDataService: VideoDataService, private sanitizer: DomSanitizer, private categoryDataService: CategoriesDataService, private changeDetectorRef : ChangeDetectorRef, public dialog: MatDialog) { }
  public dataList: Video[];
  optiuneSelect: number;
  videosWithPagination: Array<Video> = [];
  currentPage: number = 1;
  pagesLoadedMap: Map<number, Array<Video>> = new Map<number, Array<Video>>();
  videoBeforeEdit: Video = null;
  categoriesForSelect: Categorie[] = [];
  public filterTypes = [
    { value: 3, display: '3' },
    { value: 5, display: '5' },
    { value: 10, display: '10' },
    { value: 0, display: 'All Items' }

  ];
  checked: boolean;
  fontSize: number;
  categoriesTest : any = [
    {
        "id": 1,
        "title": "Sci-fi",
        "completed": false
    },
    {
        "id": 2,
        "title": "Horror",
        "completed": false
    },
    {
        "title": "Romance",
        "id": 3,
        "completed": false
    },
    {
        "title": "Animation",
        "id": 4,
        "completed": false
    },
    {
        "title": "Comedy",
        "id": 5,
        "completed": false
    },
    {
        "title": "Reality show",
        "id": 6,
        "completed": false
    }
];
  selectedCategory : any = null;
  
  onChangeCategorie(ev){
    // ev.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationBoxComponent);
    dialogRef.componentInstance['mesaj'] = 'Are you sure you wanna change genre?';
    console.log('EVENIMENT: ', ev);
    if(this.selectedCategory == null){
      this.displayedVideos = this.videos;
      return;
    }
    console.log('sel category: ', this.selectedCategory);
    this.displayedVideos = this.videos.filter(x => x.idCategory == this.selectedCategory['id']);
    console.log('dupa change categorie, in videos au ramas: ', this.videos);
   
  }

  ngOnInit() {


    this.videoDataService.findAll()
      .subscribe(
        rez => {
          this.videos = rez;
          this.displayedVideos = this.videos;
          console.log('categoria primului video: ', this.videos[0].idCategory);
          this.initialVideos = rez;
          this.videos.forEach(video => video['toDisplay'] = false);

          this.filterTypes[3].value = rez.length;
          


          this.categoryDataService.findCategories()
          .subscribe(
            rezCateg => {
              //
              this.categoriesForSelect = rezCateg;
              // this.categoriesForSelect.forEach(x => x.completed = false);
              this.categoriesForSelect = this.categoriesForSelect.map(x => { x.completed = true; return x; } );
              console.log('categories: ', rezCateg)

              for(let v of this.videos){
                for(let c of this.categoriesForSelect){
                  if(v.idCategory == c.id){
                    v['categorieAsociata']  = c;
                  }
                }
              }
              console.log('videos: ', this.videos)
            }
          )
    
        }
      )


    this.videoDataService.findPage(this.currentPage, this.optiuneSelect)
      .subscribe(
        rez => {
          this.videosWithPagination = rez;
          console.log('page loaded: ', this.videosWithPagination);
          this.pagesLoadedMap.set(this.currentPage, this.videosWithPagination);
          // this.pagesLoaded[this.currentPage] = this.videosWithPagination;
          console.log('pages loaded: ', this.pagesLoadedMap.get(this.currentPage));
        },
        err => {
          console.log('could not load page data: ', err);
        }
      )



    // this.categoryDataService.findCategories()
    //   .subscribe(
    //     rez => {

    //       this.categoriesForSelect = rez;
    //       // this.categoriesForSelect.forEach(x => x.completed = false);
    //       this.categoriesForSelect = this.categoriesForSelect.map(x => { x.completed = true; return x; } );
    //       console.log('categories: ', rez)
    //     }
    //   )


  }

  shouldDisplayVideo(video : Video) : boolean{
    for(let cat of this.categoriesForSelect){
      if(video.idCategory == cat.id){
        return cat.completed;
      }
    }
    return false;
  }

  filtrareVideoCat(){
    // this.displayedVideos = this.videos.filter(x => x.idCategory == this.selectedCategory['id']);
    console.log('something changed: ', this.categoriesForSelect)
    this.displayedVideos = [];    
    for(let video of this.videos){ // just this one
      // this.categoriesForSelect.forEach(x => {
      //   if(x.id == video.idCategory && x.completed){
            
      //     this.displayedVideos.push(video);
                
      //           }
      // })

      if(this.categoriesForSelect.filter(x=>x.completed).map(x => x.id).indexOf(video.idCategory) != -1){
        this.displayedVideos.push(video);
      }


      // for(let cat of this.categoriesForSelect){ // avoid somehow
      //   // TODO: can we bypass one of these for-s?
      //   if(video.idCategory == cat.id){
      //     if(cat.completed){
      //       this.displayedVideos.push(video);
      //     }
      //   }
      // }
      // this.categoriesForSelect.filter(function(e){

      //   if(e.id && e.completed){
            
      //           return e;
            
      //       }
      //       if(video.idCategory == e.id){
              
      //             return  this.displayedVideos.push(video);
                
      //           } 
      //   });
     
     
    }

  }





  showVideo(video: Video) {

    video['toDisplay'] = !video['toDisplay'];
  }

  embeddedVideoURLSanitizer(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  likeDislike(likeStatus: string, video: Video) {
    console.log(likeStatus);
    console.log(video);
    video.status = likeStatus;
    this.videoDataService.updateLike(video)
      .subscribe(rez => {
        console.log('rez update: ', rez);
      })

  }





  search(event: any) {
    this.videos = [...this.initialVideos];
    let searchedTerm = event.target.value;
    console.log(searchedTerm);
    this.videos = this.videos.filter(v => v.title.toLowerCase().indexOf(searchedTerm.toLowerCase()) != -1);
  }

  // we should only take data from the cache if the data has been previously loaded
  nextBtn() {
    if (this.videosWithPagination.length < 1) {
      this.clicked = true;
    }
    this.currentPage++;
    if (this.currentPage > 1) {
      this.clickedPrevDisabled = false;
    }

    console.log('navigating to next ', this.currentPage)
    if (this.pagesLoadedMap.has(this.currentPage)) {

      // pages have been previously loaded (by a next button we clicked ahead of time) in the cache (i.e. pagesLoaded)
      this.videosWithPagination = this.pagesLoadedMap.get(this.currentPage);
      console.log('NEXT: PAGES LOADED FROM CACHE');

      return;
    }
    this.videoDataService.findPage(this.currentPage, this.optiuneSelect)
      .subscribe(rez => {

        this.videosWithPagination = rez;

        this.pagesLoadedMap.set(this.currentPage, this.videosWithPagination);

        // this.pagesLoaded[this.currentPage] = this.videosWithPagination;
        console.log('NEXT: NO CACHE, loading data: ', this.pagesLoadedMap.get(this.currentPage));
      })
  }

  prevBtn() {

    if (this.videosWithPagination.length < 1) {
      this.clicked = false;
    }

    if (this.currentPage > 1) {
      this.currentPage--;
    }

    if (this.currentPage == 1) {
      this.clickedPrevDisabled = true;
    }

    // reading data from the cache:

    console.log('PREV LOADING DATA FROM CACHE: ', this.pagesLoadedMap.get(this.currentPage));
    // this.videosWithPagination = this.pagesLoaded[this.currentPage];

    this.videosWithPagination = this.pagesLoadedMap.get(this.currentPage);

    console.log("navigating to previous ", this.currentPage);

  }


  filterChanged(selectedOption: number) {
    this.currentPage = 1;
    this.pagesLoadedMap.clear(); // 1 - 10  1 - 5 2 - 5
    this.videoDataService.findPage(this.currentPage, selectedOption)
      .subscribe(rez => {

        this.videosWithPagination = rez;
        this.pagesLoadedMap.set(this.currentPage, this.videosWithPagination); // ramane in cache ultima optiune selectata

        // this.pagesLoaded[this.currentPage] = this.videosWithPagination;
        console.log('NEXT: NO CACHE, loading data: ', this.pagesLoadedMap.get(this.currentPage));
      })
  }

  delVid(video: Video) {
    console.log(video);
    this.videoDataService.deleteEntry(video)
      .subscribe(rez => {
        //this.ngOnInit();//Este in regula sa chem functia ngOnInit aici? Sau las this.videoDataService.findPage?
        this.videoDataService.findPage(this.currentPage, this.optiuneSelect)
          .subscribe(
            rez => {
              this.videosWithPagination = rez;
              this.pagesLoadedMap.set(this.currentPage, this.videosWithPagination);
            }
          )
      })

  }

  edit(video: Video) {
    console.log(video);
    delete video['isEditing'];
    this.videoDataService.editEntry(video)
      .subscribe(rez => {
        //this.ngOnInit();//Este in regula sa chem functia ngOnInit aici? Sau las this.videoDataService.findPage?
        // video['isEditing'] = false;
        this.videoDataService.findPage(this.currentPage, this.optiuneSelect)
          .subscribe(
            rez => {
              this.videosWithPagination = rez;
              this.pagesLoadedMap.set(this.currentPage, this.videosWithPagination);
            }
          )
      })

  }
  cancel(video: Video) {
    console.log('Heloooooooooooooo', video);
    delete video['isEditing'];
    delete this.videoBeforeEdit['isEditing'];
    console.log('forma initiala: ', this.videoBeforeEdit);
    // console.log('test: ', this.videosWithPagination.indexOf(video));
    // this.videosWithPagination[this.videosWithPagination.indexOf(video)] = this.videoBeforeEdit;
    video.title = this.videoBeforeEdit.title;
    video.synopsis = this.videoBeforeEdit.synopsis;

    // this.videoDataService.findPage(this.currentPage, this.optiuneSelect)
    // .subscribe(
    //   rez => {
    //     this.videosWithPagination = rez;
    //     this.pagesLoadedMap.get(this.currentPage) //ar trebui sa retina modificarea??????????????????????
    //   }
    // )


  }
  enableEdit(video: Video) {
    console.log('test: ', this.videosWithPagination.indexOf(video));

    video['isEditing'] = true;
    this.videoBeforeEdit = { ...video }; // save state
    console.log('enabling edit for: ', video);

  }



  addNew(name: string) {
    let vid = {
      title: name
    }



    this.videoDataService.addNewVideo(vid)
      .subscribe(
        rez => {

          this.videoDataService.findAll()
          .subscribe(allVideos=> {
            this.displayedVideos = allVideos;
          }, 
            err=>{console.log(err)}
            );

          this.videoDataService.findPage(this.currentPage, this.optiuneSelect)
            .subscribe(
              rez => {
                this.videosWithPagination = rez;
                this.pagesLoadedMap.set(this.currentPage, this.videosWithPagination);
                
              }
            )
        }
      )
  }


  clickBtnApelatCandEvent($event){
    console.log('event is: ', $event);
  }

  openDialog(video: Video): void {
    const dialogRef = this.dialog.open(ConfirmationBoxComponent);
    dialogRef.componentInstance['mesaj'] = 'MESAJ DE LA OD';
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result == 'true'){
        this.videoDataService.deleteEntry(video)
        .subscribe(
          rez => {
  
            this.videoDataService.findAll()
            .subscribe(allVideos=> {
              this.displayedVideos = allVideos;
            }, 
              err=>{console.log(err)}
              );
  
            this.videoDataService.findPage(this.currentPage, this.optiuneSelect)
              .subscribe(
                rez => {
                  this.videosWithPagination = rez;
                  this.pagesLoadedMap.set(this.currentPage, this.videosWithPagination);
                  
                }
              )
          }
        )
      }
    });
    
  }
  changing(){
    let el = document.getElementById('hola')
    if(this.checked){
      this.checked = false
      el.classList.replace('pink', 'black')
     
    } else {
      this.checked = true
      el.classList.replace('black', 'pink')
    }
  
  }
  
  // TODO: autocomplete pentru filter -- DONE
  // TODO: filtru pentru categorie cu radio (just one) -- DONE
  // TODO: can we bypass one of these for-s? line 155 -- DONE (if it's ok with map)
}