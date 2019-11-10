// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://qdoc.ecmxpert.com:8008/api/uapi/q/ddc/",
  hmr: false,
  
  ssoAuthUrl: "https://sso-uat.thaihealth.or.th/authorize?redirect_uri=$redirect_uri&client_id=$client_id&state=&response_type=code",
  logoutUrl: "https://sso-uat.thaihealth.or.th/logout",
  redirect_uri: "http://localhost:4200/callback",
  client_id: "THDataCenter"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
