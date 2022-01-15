import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Input() message: Message = {
    action: '',
    data: '',
    message: ''
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  
  async hideToast() {
    this.message = {
      action: '',
      data: '',
      message: ''
    }
  }

}
