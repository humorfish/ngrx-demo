import { RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {ToolbarComponent} from './toolbar';
import {LayoutComponent} from './layout';
import {NavItemComponent} from './nav-item';
import {BookPreviewComponent} from './book-preview';
import {BookSearchComponent} from './book-search';
import {BookDetailComponent} from './book-detail';
import {BookAuthorsComponent} from './book-authors';
import {PipesModule} from '../pipes';
import {BookPreviewListComponent} from './book-preview-list';
import {SidenavComponent} from './sidenav';
import {MaterialModule} from '../material.module';

const COMPONENTS = [
    BookAuthorsComponent,
    BookDetailComponent,
    BookPreviewComponent,
    BookPreviewListComponent,
    BookSearchComponent,
    LayoutComponent,
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
