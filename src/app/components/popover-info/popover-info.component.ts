import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { PopoverItem } from 'src/app/interfaces/interface';


@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
})
export class PopoverInfoComponent implements OnInit {

  @Input() items:PopoverItem[] = [];
  constructor(private popoverCtrl: PopoverController) {
   }

  ngOnInit() {
  }

  onDismiss(id:number) {
    this.popoverCtrl.dismiss({
      id
    });
  }
}
