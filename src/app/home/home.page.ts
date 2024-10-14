import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonDatetime, IonInput, IonButton } from '@ionic/angular/standalone';
import * as moment from 'moment';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
 selector: 'app-home',
 standalone: true,
 templateUrl: 'home.page.html',
 styleUrls: ['home.page.scss'],
 imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonDatetime, IonInput, IonButton, FormsModule]
})
export class HomePage {
 startDate: string ="";
 days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
 timeEntries: {[index: string]:any} = {};
 weekLocked = false;
 constructor(private storageService: StorageService) {}
 async ionViewWillEnter() {
   const currentWeek = moment().startOf('isoWeek').format('YYYY-MM-DD');
   const weekData = await this.storageService.get(currentWeek);
   if (weekData) {
     this.startDate = currentWeek;
     this.timeEntries = weekData.entries;
     this.weekLocked = weekData.locked;
   }
 }
 async submitWeek() {
   const weekKey = moment(this.startDate).startOf('isoWeek').format('YYYY-MM-DD');
   await this.storageService.set(weekKey, {
     entries: this.timeEntries,
     locked: true
   });
   this.weekLocked = true;
 }
 async clearEntries() {
   await this.storageService.clear();
   this.timeEntries = {};
   this.weekLocked = false;
 }
}
