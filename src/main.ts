import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
// import { appConfig } from './app/app.config';

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes),
//              provideHttpClient() 

//   ]
// });


// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));


// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes),
//              provideHttpClient() 

//   ]
// });


