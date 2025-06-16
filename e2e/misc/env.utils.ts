import testData from './testData.json' assert {type: "json"};


export class EnvConfig {
  
  static getSiteURL(): string {
    const siteURL = process.env.PORTAL_URL || testData.Env.site
    console.log('Получен URL:', siteURL);
    return siteURL;
  }

  static getUser() {
    const userLogin = process.env.PORTAL_USER
    const userPass = process.env.PORTAL_PASS
    
    if (!userLogin || !userPass) {
      console.log('Не заданы данные пользователя PORTAL_USER и PORTAL_PASS!');
      return { "login": "", "password": "" }
    } else {
      console.log('Получены credentials для ', userLogin);
      return { "login": userLogin, "password": userPass }
    }
  }
}
