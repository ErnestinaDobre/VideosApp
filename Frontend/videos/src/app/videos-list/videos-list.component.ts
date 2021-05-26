import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoDataService } from '../video-data.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})

export class VideosListComponent implements OnInit {

  initialVideos : Video[] = [];
  videos: Video[] = [];
  clicked = false;
  clickedPrevDisabled : boolean = true;
  constructor(private videoDataService: VideoDataService, private sanitizer: DomSanitizer) { }
  public dataList: Video[];
  searchHighlightKeyword : string = '';
  optiuneSelect : number;
  videosWithPagination : Array<Video> = [];
  currentPage : number = 1;
  pagesLoadedMap: Map<number, Array<Video>> = new Map<number, Array<Video>>();
  videoBeforeEdit : Video = null;

  public filterTypes = [
    { value: 3, display: '3' },
    { value: 5, display: '5' },
    { value: 10, display: '10' },
    { value: 0, display: 'All Items' }

 ];


 ngOnInit() {


    this.videoDataService.findAll()
      .subscribe(
        rez => {
          this.videos = rez;
          this.initialVideos  = rez;
          this.videos.forEach(video => video['toDisplay']= false);

          this.filterTypes[3].value = rez.length; // What's my other option, this seems wrong, but it works
          console.log('videos: ', this.videos)
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

     
        
        
  }

  
  

  
  showVideo(video : Video){
    
    video['toDisplay'] = !video['toDisplay']; 
  }

  embeddedVideoURLSanitizer(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  likeDislike(likeStatus : string, video : Video){
    console.log(likeStatus);
    console.log(video);
    video.status = likeStatus;
    this.videoDataService.updateLike(video)
      .subscribe(rez =>  {
        console.log('rez update: ', rez);
      })

  }





  search(event : any){
    this.videos = [...this.initialVideos];
    let searchedTerm =  event.target.value;
    console.log(searchedTerm);
    this.videos = this.videos.filter(v => v.title.toLowerCase().indexOf(searchedTerm.toLowerCase()) != -1);
  }

  // we should only take data from the cache if the data has been previously loaded
  nextBtn(){
    if(this.videosWithPagination.length < 1){
      this.clicked = true;
     }
    this.currentPage++;
    if(this.currentPage > 1){
      this.clickedPrevDisabled = false;
    }
    
    console.log('navigating to next ', this.currentPage)
    if(this.pagesLoadedMap.has(this.currentPage)){
     
      // pages have been previously loaded (by a next button we clicked ahead of time) in the cache (i.e. pagesLoaded)
      this.videosWithPagination = this.pagesLoadedMap.get(this.currentPage);
      console.log('NEXT: PAGES LOADED FROM CACHE');
      
      return;
    }
    this.videoDataService.findPage(this.currentPage, this.optiuneSelect) 
    .subscribe(rez =>  {
      
      this.videosWithPagination = rez;
     
      this.pagesLoadedMap.set(this.currentPage, this.videosWithPagination);
      
      // this.pagesLoaded[this.currentPage] = this.videosWithPagination;
      console.log('NEXT: NO CACHE, loading data: ', this.pagesLoadedMap.get(this.currentPage));
    })
  }

  prevBtn(){
 
    if(this.videosWithPagination.length < 1){
      this.clicked = false;
     }
    
    if(this.currentPage > 1){
      this.currentPage--;
    }

    if(this.currentPage == 1){
      this.clickedPrevDisabled = true;
    }
    
    // reading data from the cache:
    
    console.log('PREV LOADING DATA FROM CACHE: ', this.pagesLoadedMap.get(this.currentPage));
    // this.videosWithPagination = this.pagesLoaded[this.currentPage];
    
    this.videosWithPagination = this.pagesLoadedMap.get(this.currentPage);
    
    console.log("navigating to previous ", this.currentPage);

  }
 

  filterChanged(selectedOption: number){
    this.currentPage = 1;
    this.pagesLoadedMap.clear(); // 1 - 10  1 - 5 2 - 5
    this.videoDataService.findPage(this.currentPage, selectedOption) 
    .subscribe(rez =>  {

      this.videosWithPagination = rez;
      this.pagesLoadedMap.set(this.currentPage, this.videosWithPagination); // ramane in cache ultima optiune selectata
      
      // this.pagesLoaded[this.currentPage] = this.videosWithPagination;
      console.log('NEXT: NO CACHE, loading data: ', this.pagesLoadedMap.get(this.currentPage));
    })
  }

  delVid(video : Video){
    console.log(video);
    this.videoDataService.deleteEntry(video)
    .subscribe(rez =>  {
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

  edit(video : Video){
    console.log(video);
    delete video['isEditing'];
    this.videoDataService.editEntry(video)
    .subscribe(rez =>  {
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
  cancel(video : Video){
    console.log('Heloooooooooooooo',video);
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
  enableEdit(video : Video){
    console.log('test: ', this.videosWithPagination.indexOf(video));

    video['isEditing'] = true;
    this.videoBeforeEdit = {...video}; // save state
    console.log('enabling edit for: ', video);
  }

  addNew(name: string){
    let vid = {
      title: name
    }

    this.videoDataService.addNewVideo(vid)
    .subscribe(
      rez => {
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
}