import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.css']
})
export class CvTemplateComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {
        const formData = new FormData();
        formData.append("multipartFile", file);
        formData.append("accountId", "61a51d8c848abb42640db575");

        const upload$ = this.httpClient.post(
          `${environment.host}/cv/file`, 
          formData,
{
      reportProgress: true,
      responseType: 'json'
    }
          );
        upload$.subscribe();
    }
}

}
