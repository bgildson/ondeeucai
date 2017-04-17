// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

var application = require('application');

// iOS Google Maps API Key Setup
declare var GMSServices: any;
if(application.ios) {
    GMSServices.provideAPIKey("AIzaSyB3tMOWn77wz4KAxpa89H7ZDNF5xgm3gRg");
}

import { setStatusBarColors } from "./shared/utils/statusBar.util";
setStatusBarColors();

platformNativeScriptDynamic().bootstrapModule(AppModule);
