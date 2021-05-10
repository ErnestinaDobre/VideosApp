import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class VideoDataService {

  private SERVER_PATH = 'http://localhost:3000';
  // private ITEMS_PER_PAGE : number = 3;

  constructor(private httpClient : HttpClient) { }

  findAll() : Observable<Video[]>{
    return this.httpClient.get<Video[]>(`${this.SERVER_PATH}/videos`);
  }

  findPage(pageNumber : number, itemPerPage : number) : Observable<Video[]>{
    return this.httpClient.get<Video[]>(`${this.SERVER_PATH}/videos?_page=${pageNumber}&_limit=${itemPerPage}`)
  }
  // findPage(pageNumber : number) : Observable<Video[]>{
  //   return this.httpClient.get<Video[]>(`${this.SERVER_PATH}/videos?_page=${pageNumber}&_limit=${this.ITEMS_PER_PAGE}`)
  // }

  updateLike(video : Video){
    return this.httpClient.put(`${this.SERVER_PATH}/videos/${video.id}`, video);
  }

  deleteEntry(video : Video){
    return this.httpClient.delete(`${this.SERVER_PATH}/videos/${video.id}`);
  }

  editEntry(video : Video){
    return this.httpClient.patch(`${this.SERVER_PATH}/videos/${video.id}`, video);
  }
}
