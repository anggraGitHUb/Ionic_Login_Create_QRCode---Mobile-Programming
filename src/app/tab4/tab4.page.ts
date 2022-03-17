import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage }  from '@ionic/storage';


@Injectable()
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  responeData: any;
	npm: string = "";

  disabledButton;
  constructor(
    private route:Router,
    private toastCtrl: ToastController,
  	private loadingCtrl: LoadingController,
  	private alertCtrl: AlertController,
  	private Http: HttpClient,
	private storage: Storage,
  	private navCtrl: NavController,
    ) { }

  ngOnInit() {
  }


  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
    }

    

  async trylogin(){
  	
  	if(this.npm==""){
  		this.presentToast('NPM Harus Diisi');
  	}else{
  		this.disabledButton = true;
  		const loader = await this.loadingCtrl.create({
  			message:'Mohon Ditunggu....',
  		});
  		loader.present();

  		return new Promise(resolve => {
        let body = {

  				
  				aksi: 'proses_login',
  				npm: this.npm,
  				// password: this.password
          
  				
  			}
			//   http://52.76.1.233/api/Auth/
			//   http://192.168.1.9/tutorial/api/proses_api.php
  			this.Http.post('http://dewarek.unbin.ac.id/api.php/', body).subscribe(async(res:any)=>{
				this.responeData = res;
				let msg = res.result
				let msg2 = res.data2
  				if(msg){

					// this.responeData = res;
  					loader.dismiss();
  					this.disabledButton = false;
  					this.presentToast('Login Berhasil');
					this.storage.set('lock_akses1', res.result);
					localStorage.setItem('data1', JSON.stringify(this.responeData));
  					this.navCtrl.navigateRoot(['/tabs/tab2']);
  				} 
				  else{
					loader.dismiss();
					const toast = await this.toastCtrl.create({
						message: 'NPM Tidak Dikenal.',
						duration: 2000
					  });
					  toast.present();
					
				  }
				 
  			},(err)=>{
				loader.dismiss();
			
				this.presentAlert('Timeout');
			})
  		});
  	}
}


async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss : false,
      buttons: [
        {
          text: 'Close',
         
         
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try Again',
          handler: () => {
            
            this.trylogin();
          }
        }
      ]
    });

    await alert.present();
  }

}

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token",
    "Content-Type": "application/json; charset=UTF-8"
  })
};
