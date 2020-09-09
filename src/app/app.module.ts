import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { CardComponent } from './card/card.component';
import { GlobalErrorHandler } from './errorhandler';

@NgModule({
  declarations: [
    AppComponent,
    CriteriaComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
