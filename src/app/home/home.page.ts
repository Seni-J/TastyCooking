import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router} from '@angular/router';
import {DataProvider} from '../provider/DataProvider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private router: Router
  public data: DataProvider

  constructor(router: Router,private storage: Storage){
    this.router = router
    this.data = new DataProvider()
  }
  public gotocontact(){
    this.router.navigateByUrl('contact')
  }

}
