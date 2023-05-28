import { PhotoService } from './services/photo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private photoService: PhotoService) {
    this.photoService.readAllPhoto();
  }
}
