import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  started: boolean = false;

  constructor(public photoService: PhotoService) {}

  async ionViewWillEnter() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      toBack: true,
      disableExifHeaderStripping: true,
      position: 'rear',
      parent: 'cameraPreview',
    };
    await CameraPreview.start(cameraPreviewOptions).then(() => {
      this.started = true;
    });
  }

  async ionViewDidLeave() {
    await CameraPreview.stop().then(() => {
      this.started = false;
    });
  }

  async capture() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 100,
    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    const base64PictureData = result.value;
    await this.photoService.save(base64PictureData, "a photo");
  }

  flipCamera() {
    CameraPreview.flip().then(
      () => {
        console.log('Camera flipped');
      },
      (error) => {
        console.log('Error flipping camera:', error);
      }
    );
  }
}
