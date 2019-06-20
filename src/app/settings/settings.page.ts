import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../../theme/theme.service';
import {ToastController} from '@ionic/angular';

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

  constructor(private theme: ThemeService) { }

  ngOnInit() {
  }

  changeTheme(name) {
    this.theme.setTheme(themes[name]);
  }

}
