
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AppEventsService } from 'src/providers/app-events/app-events.service';

if (localStorage.langId == undefined) {

  localStorage.langId = '1';//default language id
  localStorage.languageCode = "en"; //default language code
  localStorage.direction = "ltr"; //default language direction of app
  localStorage.currency = "SR";  //default currecny html code to show in app.
  // Please visit this link to get your html code  https://html-css-js.com/html/character-codes/currency/
  localStorage.currencyCode = "SAR";  //default currency code
  localStorage.currencyPos = "right";  //default currency position
  localStorage.decimals = 2;  //default currecny decimal
  localStorage.tabsNavigation = true;  //default currecny decimal
}

@Injectable()

export class ConfigService {

  public yourSiteUrl: string = 'https://www.maikoon.com';
  public consumerKey: string = "c80cf780159130613630308e9b";
  public consumerSecret: string = "c7bf0c6415913061361343e0e1";

  public showIntroPage = 0; //  0 to hide and 1 to show intro page
  public appInProduction = true;//  0 to hide and 1 to show intro page
  public defaultIcons = true; //  0 to hide and 1 to show intro page

  public appNavigationTabs = localStorage.tabsNavigation; //  true for tabs layout and false for sidemenu layout
  public appTheme = 'default';
  public darkMode = false;

  public bannerAnimationEffect = "default";// fade, coverFlow, flip, cube, default
  public bannerStyle = "default"; // default, squareBullets, numberBullets, bottomBulletsWhiteBackground, progressBar, verticalRightBullets, verticalLeftBullets
  public productCardStyle = "1"


  public productSlidesPerPage = 2.5;

  public url: string = this.yourSiteUrl + '/api/';
  public imgUrl: string = this.yourSiteUrl + "/";
  public langId: string = localStorage.langId;
  public currecnyCode: string = localStorage.currencyCode;
  public loader = 'dots';
  public newProductDuration = 10;
  public cartButton = 1;//1 = show and 0 = hide
  public currency = localStorage.currency;
  public currencyPos = localStorage.currencyPos;
  public paypalCurrencySymbol = localStorage.currency;
  public address;
  public fbId;
  public email;
  public latitude;
  public longitude;
  public phoneNo;
  public pushNotificationSenderId;
  public lazyLoadingGif;
  public notifText;
  public notifTitle;
  public notifDuration;
  public footerShowHide;
  public homePage = 1;
  public categoryPage = 1;
  public siteUrl = '';
  public appName = '';
  public packgeName = "";
  public introPage = 1;
  public myOrdersPage = 1;
  public newsPage = 1;
  public wishListPage = 1;
  public shippingAddressPage = 1;
  public aboutUsPage = 1;
  public contactUsPage = 1;
  public editProfilePage = 1;
  public settingPage = 1;
  public admob = 1;
  public admobBannerid = '';
  public admobIntid = '';
  public admobIos = 1;
  public admobBanneridIos = '';
  public admobIntidIos = '';
  public googleAnalaytics = "";
  public rateApp = 1;
  public shareApp = 1;
  public fbButton = 1;
  public googleButton = 1;
  public notificationType = "";
  public onesignalAppId = "";
  public onesignalSenderId = "";
  public appSettings: { [k: string]: any } = {};
  public currentRoute = "tabs/home";
  constructor(
    public storage: Storage,
    public platform: Platform,
    public md5: Md5,
    public localNotifications: LocalNotifications,
    public http: HttpClient,
    public appEventsService: AppEventsService,
    private httpNative: HTTP
  ) {
    this.consumerKey = Md5.hashStr(this.consumerKey).toString();
    this.consumerSecret = Md5.hashStr(this.consumerSecret).toString();

    if (localStorage.tabsNavigation == 'true' || localStorage.tabsNavigation == true)
      this.appNavigationTabs = true;
    else
      this.appNavigationTabs = false;

    if (this.appNavigationTabs == false)
      this.currentRoute = "";
    console.log(this.currentRoute);
  }
  getHttp(req) {
    let d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
      'Content-Type': 'application/json',
    };

    return new Promise(resolve => {
      if (this.platform.is('cordova')) {
        this.httpNative.get(this.url + req, {}, nativeHeaders)
          .then(data => {
            let d = JSON.parse(data.data);
            //this.storeHttpData(request, d);
            resolve(d);
            //console.log(data.status);
            //console.log(data.data); // data received by server
            //console.log(data.headers);
          })
          .catch(error => {
            // console.log("Error : " + req);
            // console.log(error);
            // console.log(error.error); // error message as string
            // console.log(error.headers);
          });
      }
      else {
        this.http.get(this.url + req, httpOptions).subscribe((data: any) => {
          resolve(data);
        }, (err) => {
          console.log("Error : " + req);
          console.log(err);
        });
      }
    });
  }

  postHttp(req, data) {
    let d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'Content-Type': 'application/json',
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
    };

    return new Promise(resolve => {
      if (this.platform.is('cordova')) {
        this.httpNative.setDataSerializer("json");
        this.httpNative.post(this.url + req, data, nativeHeaders)
          .then(data => {
            console.log(data.data);
            let d = JSON.parse(data.data);
            //this.storeHttpData(request, d);
            resolve(d);
            console.log(data.status);
            console.log(data.data); // data received by server
            console.log(data.headers);
          })
          .catch(error => {
            console.log("Error : " + req);
            console.log(error);
            console.log(error.error); // error message as string
            console.log(error.headers);
          });
      }
      else {
        this.http.post(this.url + req, data, httpOptions).subscribe((data: any) => {
          resolve(data);
        }, (err) => {
          console.log("Error : " + req);
          console.log(err);
        });
      }
    });
  }
  public siteSetting() {
    return new Promise(resolve => {
      this.storage.get('appSettings').then((val) => {
        if (val == null) {
          this.getSettingsFromServer().then((data: any) => {
            if (data.success == "1") {
              this.appSettings = data.data;
              this.storage.set("appSettings", this.appSettings);
              this.defaultSettings();
              this.appEventsService.publish('settingsLoaded', "");
            }
            resolve();
          });
        }
        else {
          this.appSettings = val;
          this.defaultSettings();
          this.appEventsService.publish('settingsLoaded', "");
          resolve();
        }
      });
    });
  }
  defaultSettings() {
    this.fbId = this.appSettings.facebook_app_id;
    this.address = this.appSettings.address + ', ' + this.appSettings.city + ', ' + this.appSettings.state + ' ' + this.appSettings.zip + ', ' + this.appSettings.country;
    this.email = this.appSettings.contact_us_email;
    this.latitude = this.appSettings.latitude;
    this.longitude = this.appSettings.longitude;
    this.phoneNo = this.appSettings.phone_no;
    this.pushNotificationSenderId = this.appSettings.fcm_android_sender_id;
    this.lazyLoadingGif = this.appSettings.lazzy_loading_effect;
    this.newProductDuration = this.appSettings.new_product_duration;
    this.notifText = this.appSettings.notification_text;
    this.notifTitle = this.appSettings.notification_title;
    this.notifDuration = this.appSettings.notification_duration;
    this.currency = this.appSettings.currency_symbol;
    this.cartButton = this.appSettings.cart_button;
    this.footerShowHide = this.appSettings.footer_button;
    this.setLocalNotification();
    this.appName = this.appSettings.app_name;
    this.homePage = this.appSettings.home_style;
    this.categoryPage = this.appSettings.category_style;

    if (this.appSettings.card_style)
      this.productCardStyle = this.appSettings.card_style;
    if (this.appSettings.banner_style)
      this.setBannerStyle(this.appSettings.banner_style);

    this.siteUrl = this.appSettings.site_url;
    this.introPage = this.appSettings.intro_page;
    this.myOrdersPage = this.appSettings.my_orders_page;
    this.newsPage = this.appSettings.news_page;
    this.wishListPage = this.appSettings.wish_list_page;
    this.shippingAddressPage = this.appSettings.shipping_address_page;
    this.aboutUsPage = this.appSettings.about_us_page;
    this.contactUsPage = this.appSettings.contact_us_page;
    this.editProfilePage = this.appSettings.edit_profile_page;
    this.packgeName = this.appSettings.package_name;
    this.settingPage = this.appSettings.setting_page;
    this.admob = this.appSettings.admob;
    this.admobBannerid = this.appSettings.ad_unit_id_banner;
    this.admobIntid = this.appSettings.ad_unit_id_interstitial;
    this.googleAnalaytics = this.appSettings.google_analytic_id;
    this.rateApp = this.appSettings.rate_app;
    this.shareApp = this.appSettings.share_app;
    this.fbButton = this.appSettings.facebook_login;
    this.googleButton = this.appSettings.google_login;
    this.notificationType = this.appSettings.default_notification;
    this.onesignalAppId = this.appSettings.onesignal_app_id;
    this.onesignalSenderId = this.appSettings.onesignal_sender_id;
    this.admobIos = this.appSettings.ios_admob;
    this.admobBanneridIos = this.appSettings.ios_ad_unit_id_banner;
    this.admobIntidIos = this.appSettings.ios_ad_unit_id_interstitial;
    this.defaultIcons = (this.appSettings.app_icon_image == "icon") ? true : false;
    if (this.appNavigationTabs)
      if (this.homePage != 1) this.currentRoute = "tabs/home" + this.homePage;
  }
  getCurrentHomePage() {
    if (this.homePage == 1)
      return "home";
    else
      return "home" + this.homePage;
  }

  getCurrentCategoriesPage() {
    if (this.categoryPage == 1)
      return "categories";
    else
      return "categories" + this.categoryPage;
  }
  checkingNewSettingsFromServer() {
    this.getSettingsFromServer().then((data: any) => {
      if (data.success == "1") {
        var settings = data.data;
        this.reloadingWithNewSettings(settings);
      }
    });
  }
  reloadingWithNewSettings(data) {
    if (JSON.stringify(this.appSettings) !== JSON.stringify(data)) {
      //if (data.wp_multi_currency == "0") this.restoreDefaultCurrency();
      this.storage.set("appSettings", data).then(function () {
      });
    }
  }
  //Subscribe for local notification when application is start for the first time
  setLocalNotification() {
    this.platform.ready().then(() => {
      this.storage.get('localNotification').then((val) => {
        if (val == undefined) {
          this.storage.set('localNotification', 'localNotification');
          this.localNotifications.schedule({
            id: 1,
            title: this.notifTitle,
            text: this.notifText,
            every: this.notifDuration,
          });
        }
      });
    });
  }

  getSettingsFromServer() {
    return this.getHttp('sitesetting');
  }

  setBannerStyle(s) {

    switch (parseInt(s)) {

      case 4:
        this.bannerStyle = "squareBullets"
        break;
      case 5:
        this.bannerStyle = "numberBullets"
        break;
      case 3:
        this.bannerStyle = "bottomBulletsWhiteBackground"
        break;
      case 2:
        this.bannerStyle = "progressBar"
        break;
      case 6:
        this.bannerStyle = "verticalRightBullets"
        break;
      case 1:
        this.bannerStyle = "default"
        break;

      default:
        this.bannerStyle = "default"
        break;
    }
  }
  
  setCardStyle(value) {
    if (!this.appInProduction) {
      this.productCardStyle = value;
    }
    console.log(value);
  }
}