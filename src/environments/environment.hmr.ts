export const environment = {
  production: false,
  apiUrl: "http://qdoc.ecmxpert.com:8008/api/uapi/q/ddc/",
  hmr: true,
  
  ssoAuthUrl: "https://sso-uat.thaihealth.or.th/authorize?redirect_uri=$redirect_uri&client_id=$client_id&state=&response_type=code",
  logoutUrl: "https://sso-uat.thaihealth.or.th/logout",
  redirect_uri: "http://localhost:4200/callback",
  client_id: "THDataCenter"
};
