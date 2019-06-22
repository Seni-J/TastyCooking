import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../../theme/theme.service';
import {ToastController} from '@ionic/angular';
import {DataProvider} from "../provider/DataProvider";
import {AlertController} from "@ionic/angular";

const themes = {
  light: {
    primary: '#3880ff',
    secondary: '#0cd1e8',
    tertiary: '#7044ff',
    light: '#f4f5f8',
    medium: '#989aa2',
    dark: '#222428'
  },
  night: {
    primary: '#5989f9',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867'
  }
};


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  data : DataProvider
  APIurl : string

  constructor(private theme: ThemeService, data: DataProvider, public alertCtrl: AlertController) {
    this.data = data
  }

  ngOnInit() {
  }

  async modifiedAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Modification API',
      message: 'Vous avez modifié avec succès l´API. Le nouveau url sera "' + this.APIurl + '".',
      buttons: ['OK']
    });

    await alert.present();
  }
  async resetAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Remise de l API',
      message: 'API de base remis.',
      buttons: ['OK']
    });

    await alert.present();
  }

  changeTheme(name) {
    this.theme.setTheme(themes[name]);
  }
  setAPI(){
    this.data.url = this.APIurl
    this.APIurl = ""
    this.modifiedAlert()
  }

  resetAPI(){
    this.data.url = "http://127.0.0.1:8000/api/sjm/recipes"
    this.resetAlert()
  }

}
