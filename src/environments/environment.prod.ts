export const environment = {
  production: true,
  apiUrl: "https://tc.thaihealth.or.th:4122/uapi/ddc/",
  hmr: false,
  
  ssoAuthUrl: "https://sso-uat.thaihealth.or.th/authorize?redirect_uri=$redirect_uri&client_id=$client_id&state=&response_type=code",
  logoutUrl: "https://sso-uat.thaihealth.or.th/logout",
  redirect_uri: "https://tc.thaihealth.or.th/#/callback",
  client_id: "THDataCenter"
};
