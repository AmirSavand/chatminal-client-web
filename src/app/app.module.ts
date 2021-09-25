import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from '@app/shared/services/api.service';
import { HttpInterceptorService } from '@app/shared/services/http-interceptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** Markdown configurations. */
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  const linkRenderer = renderer.link;

  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a target="_blank"');
  };

  return {
    renderer,
    breaks: true,
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    FontAwesomeModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    ApiService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
