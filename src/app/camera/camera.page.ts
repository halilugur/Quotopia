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

  /**
   * Lifecycle hook that is called when the page is about to enter and become the active page.
   * Starts the camera preview and initializes it with the specified options.
   */
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

  /**
   * Lifecycle hook that is called when the page is about to leave and no longer be the active page.
   * Stops the camera preview.
   */
  async ionViewDidLeave() {
    await CameraPreview.stop().then(() => {
      this.started = false;
    });
  }

  /**
   * Captures a photo using the camera preview and saves it using the photo service.
   */
  async capture() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 100,
    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    const base64PictureData = result.value;
    await this.photoService.save(base64PictureData, '');
  }

  /**
   * Flips the camera between front and rear-facing.
   * Prints a success message if the camera is flipped successfully,
   * or prints an error message if there was an error flipping the camera.
   */
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
