import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  datastorage: any;
  nama: any;
  foto: any;
  kd_kelas: any;
  nama_singkat: any;
  nama_jenjang: any;
  responeData: any=[];
  constructor(
    private storage: Storage,
    private toastCtrl: ToastController,
  	private loadingCtrl: LoadingController,
  	private alertCtrl: AlertController,
  	private Http: HttpClient,
    ) { }

  ngOnInit() {
    
    
    this.storage.get('lock_akses1').then((res)=>{
  		console.log(res);
  		this.datastorage = res;
  		// this.npm = this.datastorage.npm;
      this.nama = this.datastorage.nama;
      for(let datas of this.datastorage){
        // this.npm = datas.npm
        this.nama = datas.nama
        this.foto = datas.foto
        this.kd_kelas = datas.kd_progstudi
        this.nama_singkat=datas.tahun_masuk
        this.nama_jenjang=datas.nama_jenjang
      }
      // this.lol = this.datastorage.id_toko;
// console.log(this.npm)
//       this.createdCode = JSON.stringify(this.npm);
  	});

    this.loadWisuda();

   
  
    
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
    }

  async loadWisuda(){
  	
  
  	
  		const loader = await this.loadingCtrl.create({
  			message:'Mohon Ditunggu....',
  		});
  		loader.present();

  		return new Promise(resolve => {
        let body = {

  				
  				aksi: 'load_wisudawan',
  				kd_progstudi : this.kd_kelas,
          tahun_masuk: this.nama_singkat
          // / password: this.password
          
  				
  			}
			//   http://52.76.1.233/api/Auth/
			//   http://192.168.1.9/tutorial/api/proses_api.php
  			this.Http.post('http://dewarek.unbin.ac.id/api.php/', body).subscribe(async(res:any)=>{
				// this.responeData = res.result;
       for(let datas of res.result){
          this.responeData.push(datas);
        }
        //  resolve(true);
  			console.log(res.result)
				loader.dismiss(); 
  			},(err)=>{
				loader.dismiss();
			
				this.presentAlert('Timeout');
			})
  		});
  	
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
            
            this.loadWisuda();
          }
        }
      ]
    });

    await alert.present();
  }


}
