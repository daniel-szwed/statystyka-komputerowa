import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface DropdownItem {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'bga2dxf';
  file!: File;
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
    thirdCtrl: ['', Validators.required],
  });
  isLinear = true;

  items: DropdownItem[] = [
    {value: '300', viewValue: '300'},
    {value: '600', viewValue: '600'},
    {value: '1200', viewValue: '1200'},
  ];

  dpiSelected!: DropdownItem;

  disabled: boolean = false;
  spin: boolean = false;

  constructor(
    private _formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router) {}

  onDpiSelected(value: string) {
    this.dpiSelected = {value, viewValue: value};
  }

  fileInputChange(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0] as File;
    this.secondFormGroup.patchValue({ thirdCtrl:  file.name })
    this.file = file;
  }

  start() {
    this.spin = true;
    this.uploadFile(this.file).subscribe(data => {
        localStorage.setItem('data', JSON.stringify(data))
        this.spin = false;
        this.router.navigate(['/result']);
    }, error => {
      this.spin = false;
    });
  }

  uploadFile(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);
    // formData.append('dpi', this.dpiSelected.value);
    // formData.append('silicon_name', this.firstFormGroup.get('firstCtrl')?.value ?? 'unknown');

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    // return this.http.post("https://statistica-api.arbresoft.pl/input", formData, { headers: headers, responseType: 'blob' });
    return this.http.post("https://statistica-api.arbresoft.pl/input", formData, { headers: headers, responseType: 'json' });

  }
}
