import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-display',
  templateUrl: './svg-display.component.html',
  styleUrls: ['./svg-display.component.css']
})
export class SvgDisplayComponent implements OnInit {
  sanitizedSvgData!: SafeHtml;
  @Input() foreheadShape!: number;
  @Input() eyeSlant!: number;
  @Input() eyebrowSlant!: number;
  @Input() eyebrowTrim!: number;
  @Input() mouthSmile!: number;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Make an HTTP GET request to your Flask endpoint
    let payload = {
        "forehead_shape": this.foreheadShape,
        "eye_slant": this.eyeSlant,
        "eyebrow_slant": this.eyebrowSlant,
        "eyebrow_trim": this.eyebrowTrim,
        "mouth_smile": this.mouthSmile
    }
    this.http.post('https://statistica-api.arbresoft.pl/face', payload, {
      responseType: 'text'
    }).subscribe(
      (svgData: string) => {
        // Sanitize the received SVG data
        console.log(svgData)
        this.sanitizedSvgData = this.sanitizer.bypassSecurityTrustHtml(svgData);
      },
      (error) => {
        console.error('Error fetching SVG data', error);
      }
    );
  }
}
