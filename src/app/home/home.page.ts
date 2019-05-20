import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private router: Router

  constructor(router: Router,private storage: Storage){
    this.router = router
  }
  public gotocontact(){
    this.router.navigateByUrl('contact')
  }

}
