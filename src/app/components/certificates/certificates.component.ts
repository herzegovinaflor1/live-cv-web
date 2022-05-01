import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { CertificateService } from 'src/app/service/certificate/certificate.service';
import { Certificate, ModificationRequest } from 'src/app/types/types';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  @Input()
  certificates: Certificate[] = [];

  copyCertificates: Certificate[] = [];

  add: Certificate[] = [];
  update: Certificate[] = [];
  delete: Certificate[] = [];

  constructor(
    private certificateService: CertificateService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  // add certificate

  addTitle(title: string, index: number) {
    this.add[index].title = title;
  }

  addIssuedBy(issuedBy: string, index: number) {
    this.add[index].issuedBy = issuedBy;
  }

  deleteNewEducations(index: number) {
    this.add.splice(index, 1);
  }

  // update certificate

  updateTitle(newTitle: string, index: number) {
    const certificate: Certificate = this.certificates[index];
    if (this.valuesAreDifferent(certificate.title, newTitle)) {
      this.makeUserCertificateCopy();
      certificate.title = newTitle;

      const certificateToUpdate = this.getCertificatesFromUpdatedList(index);
      if (certificateToUpdate) {
        certificateToUpdate.title = newTitle;
      } else {
        this.update.push(certificate);
      }
    }
  }

  updateIssuedBy(newIssuedBy: string, index: number) {
    const certificate: Certificate = this.certificates[index];
    if (this.valuesAreDifferent(certificate.issuedBy, newIssuedBy)) {
      this.makeUserCertificateCopy();
      certificate.issuedBy = newIssuedBy;

      const certificateToUpdate = this.getCertificatesFromUpdatedList(index);
      if (certificateToUpdate) {
        certificateToUpdate.issuedBy = newIssuedBy;
      } else {
        this.update.push(certificate);
      }
    }
  }

  deleteExistingExperience(index: number) {
    this.add.splice(index, 1);
  }

  // end update certificate

  getExistingExperience(index: number) {
    const existingExperience = this.certificates[index];
    const id = existingExperience.id;
    const isAlreadyAdded = this.update.filter((r: Certificate) => r.id === id);
    if (isAlreadyAdded.length) {
      return isAlreadyAdded[0];
    } else {
      return existingExperience
    }
  }

  decline() {
    if (this.copyCertificates.length) {
      this.certificates = this.copyCertifcates(this.copyCertificates);
    }
    this.add = [];
    this.update = [];
    this.delete = [];
    this.copyCertificates = [];
  }

  saveNewCertificates() {
    const certificateUpdateRequest: ModificationRequest<Certificate> = {
      add: this.add,
      delete: this.delete,
      update: this.update
    }
    this.certificateService.updateCertificates(certificateUpdateRequest)
      .subscribe((certificates: Certificate[]) => {
        this.certificates = certificates;

        this.add = [];
        this.update = [];
        this.delete = [];
      })
  }

  isSave() {
    return this.add.length || this.update.length || this.delete.length;
  }

  addNewCertificate() {
    const newCertificate: Certificate = {
      title: "",
      issuedBy: "",
      id: '',
      from: '',
      to: ''
    };
    this.add.push(newCertificate);
  }

  removeExistingExperience(index: number) {
    this.makeUserCertificateCopy();
    const experienceToRemove = this.certificates[index];
    this.delete.push(experienceToRemove);
    this.certificates.splice(index, 1);
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }

  private getCertificatesFromUpdatedList(index: number): Certificate | null {
    const existingCertificate: Certificate = this.certificates[index];
    const isAlreadyAdded = this.update
      .filter((certificate: Certificate) => certificate.id === existingCertificate.id);
    if (isAlreadyAdded.length) {
      return isAlreadyAdded[0];
    }
    return null;
  }

  private valuesAreDifferent(currentValue: string, newLevel: string) {
    return currentValue !== newLevel;
  }

  private copyCertifcates(certificate: Certificate[]): Certificate[] {
    return certificate.map(c => { return { ...c } });
  }

  private makeUserCertificateCopy() {
    if (!this.copyCertificates.length) {
      this.copyCertificates = this.copyCertifcates(this.certificates);
    }
  }

}
