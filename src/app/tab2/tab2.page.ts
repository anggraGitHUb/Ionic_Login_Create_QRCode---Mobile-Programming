import { Component, Input, OnInit } from '@angular/core';

//Add
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import * as QRCode from 'ngx-qrcode2';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public npm: string;
  qrData = null;
	createdCode = null;
  datastorage: any;
  nama: any;
  foto: any;
  kd_kelas: any;
  nama_singkat: any;
  nama_jenjang: any;
  @Input('value') value: string;
  encodedData: any;
  scannedBarCode: {};
  barcodeScannerOptions: BarcodeScannerOptions;

constructor(private scanner: BarcodeScanner, private storage: Storage) {

    
    this.encodedData = "12345678";
    
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

  }

  options= {
    errorCorrectionLevel:'Q',
    margin:0,
    scale:20,
    color: {
      dark:'#651296'
    }
  };

ngOnInit() {
    
    
    this.storage.get('lock_akses1').then((res)=>{
  		console.log(res);
  		this.datastorage = res;
  		// this.npm = this.datastorage.npm;
      this.nama = this.datastorage.nama;
      for(let datas of this.datastorage){
        this.npm = datas.npm
        this.nama = datas.nama
        this.foto = datas.foto
        this.kd_kelas = datas.kd_kelas
        this.nama_singkat=datas.nama_singkat
        this.nama_jenjang=datas.nama_jenjang
      }
      // this.lol = this.datastorage.id_toko;
console.log(this.nama)
      this.createdCode = JSON.stringify(this.nama);
  	});

   
  
    
  }
  


  scanBRcode() {
    this.scanner.scan().then(res => {
        this.scannedBarCode = res;
      }).catch(err => {
        alert(err);
      });
  }

  generateBarCode() {
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodedData).then(
        res => {
          alert(res);
          this.encodedData = res;
        }, error => {
          alert(error);
        }
      );
  }

}


