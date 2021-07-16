import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { HttpClientModule } from '@angular/common/http';
import { VideosListComponent } from './videos-list/videos-list.component';
import { SafePipe } from './safe-pipe.pipe';
import { SortDirective } from './directive/sort.directive';
import { HighlightDirective } from './directive/highlight.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TesteComponent } from './teste/teste.component';
import { TransformareSirPipe } from './transformare-sir.pipe';
import {AppRoutingModule} from './app-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import {PortalModule} from '@angular/cdk/portal';
import { TitluComponent } from './titlu/titlu.component';
import { CompbutonComponent } from './compbuton/compbuton.component';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ThemePalette} from '@angular/material/core';





@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    VideosListComponent,
    SafePipe,
    SortDirective,
    HighlightDirective,
    TesteComponent,
    TransformareSirPipe,
    CategoriesComponent,
    TitluComponent,
    CompbutonComponent,
    ConfirmationBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule ,
    CdkTableModule,
    MatTableModule,
    PortalModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSlideToggleModule
    
  ],
  entryComponents: [
    ConfirmationBoxComponent
  ],
  providers: [CategoriesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

