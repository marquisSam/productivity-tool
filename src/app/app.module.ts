import { DialogModalsService } from './services/dialog-modals.service';
import { ActionNodeService } from './services/action-node.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { TimelineNodeComponent } from './parts/timeline-node/timeline-node.component';
import { MiniTimerComponent } from './parts/mini-timer/mini-timer.component';
import { AcceptComponent } from './parts/dialogs/accept/accept.component';
import { TimelineComponent } from './view/timeline/timeline.component';
import { ControlComponent } from './parts/control/control.component';
import { FooterComponent } from './parts/footer/footer.component';
import { IntroComponent } from './view/intro/intro.component';
import { MenueComponent } from './parts/menue/menue.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';

import { CounterPipe } from './pipes/counter.pipe';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule} from '@angular/material/select';
import { ExplainerComponent } from './parts/explainer/explainer.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    TimelineComponent,
    FormComponent,
    MenueComponent,
    FooterComponent,
    AcceptComponent,
    CounterPipe,
    ControlComponent,
    TimelineNodeComponent,
    MiniTimerComponent,
    ExplainerComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  entryComponents: [AcceptComponent],
  providers: [ActionNodeService,HttpClient, DialogModalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
