import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { EducationService } from 'src/app/service/education/education.service';
import { Education, ModificationRequest } from 'src/app/types/types';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input()
  educations: Education[] = [];

  educationsCopy: Education[] = [];

  newEducations: Education[] = [];
  educationsToUpdate: Education[] = [];
  educationsToDelete: Education[] = [];

  constructor(
    private educationService: EducationService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  // add education

  addUniversity(position: string, index: number) {
    this.newEducations[index].university = position;
  }

  addDegree(degree: string, index: number) {
    this.newEducations[index].degree = degree;
  }

  addSpecialization(specialization: string, index: number) {
    this.newEducations[index].specialization = specialization;
  }

  deleteNewEducations(index: number) {
    this.newEducations.splice(index, 1);
  }

  addStartDate(newStartDate: Event, index: number) {
    const target = newStartDate.target as HTMLDivElement;
    this.proceddEditableField(target);
    const from = target.innerHTML;
    if (from) {
      this.newEducations[index].from = from;
    }
  }

  addEndDate(newDateEvent: Event, index: number) {
    const target = newDateEvent.target as HTMLDivElement;
    this.proceddEditableField(target);
    const to = target.innerHTML;
    if (to) {
      this.newEducations[index].to = to;
    }
  }

  // update education

  updateUniversity(newUniversity: string, index: number) {
    const education: Education = this.educations[index];
    if (this.valuesAreDifferent(education.university, newUniversity)) {
      this.makeUserEducationsCopy();
      education.university = newUniversity;

      const educationToUpdate = this.getEducationFromUpdatedList(index);
      if (educationToUpdate) {
        educationToUpdate.university = newUniversity;
      } else {
        this.educationsToUpdate.push(education);
      }
    }
  }

  updateDegree(newDegree: string, index: number) {
    const education: Education = this.educations[index];
    if (this.valuesAreDifferent(education.degree, newDegree)) {
      this.makeUserEducationsCopy();
      education.degree = newDegree;

      const educationToUpdate = this.getEducationFromUpdatedList(index);
      if (educationToUpdate) {
        educationToUpdate.university = newDegree;
      } else {
        this.educationsToUpdate.push(education);
      }
    }
  }

  updateSpecialization(newSpecialization: string, index: number) {
    const education: Education = this.educations[index];
    if (this.valuesAreDifferent(education.specialization, newSpecialization)) {
      this.makeUserEducationsCopy();
      education.specialization = newSpecialization;

      const educationToUpdate = this.getEducationFromUpdatedList(index);
      if (educationToUpdate) {
        educationToUpdate.specialization = newSpecialization;
      } else {
        this.educationsToUpdate.push(education);
      }
    }
  }


  updateStartDate(newStartDate: Event, index: number) {
    const target = newStartDate.target as HTMLDivElement;
    this.proceddEditableField(target);
    const from = target.innerHTML;

    const experience: Education = this.educations[index];
    if (from && this.valuesAreDifferent(experience.from, from)) {
      this.makeUserEducationsCopy();
      const existingExperience = this.getEducationFromUpdatedList(index);
      if (existingExperience) {
        existingExperience.from = from;
      } else {
        this.educationsToUpdate.push(experience);
      }
    }
  }

  updateEndDate(newEndate: Event, index: number) {
    const target = newEndate.target as HTMLDivElement;
    this.proceddEditableField(target);
    const to = target.innerHTML;

    const experience: Education = this.educations[index];
    if (to && this.valuesAreDifferent(experience.to, to)) {
      this.makeUserEducationsCopy();
      const existingExperience = this.getEducationFromUpdatedList(index);
      if (existingExperience) {
        existingExperience.to = to;
      } else {
        this.educationsToUpdate.push(experience);
      }
    }
  }

  deleteExistingExperience(index: number) {
    this.newEducations.splice(index, 1);
  }

  // update end

  getExistingExperience(index: number) {
    const existingExperience = this.educations[index];
    const id = existingExperience.id;
    const isAlreadyAdded = this.educationsToUpdate.filter((r: Education) => r.id === id);
    if (isAlreadyAdded.length) {
      return isAlreadyAdded[0];
    } else {
      return existingExperience
    }
  }

  decline() {
    if (this.educationsCopy.length) {
      this.educations = this.copyEducations(this.educationsCopy);
    }
    this.newEducations = [];
    this.educationsToUpdate = [];
    this.educationsToDelete = [];
    this.educationsCopy = [];
  }

  saveNewEducations() {
    const educationUpdateRequest: ModificationRequest<Education> = {
      add: this.newEducations,
      update: this.educationsToUpdate,
      delete: this.educationsToDelete
    }

    this.educationService.updateEducation(educationUpdateRequest)
      .subscribe((educations: Education[]) => {
        this.educations = educations;

        this.newEducations = [];
        this.educationsToUpdate = [];
        this.educationsToDelete = [];
      })
  }

  isSave() {
    return this.newEducations.length || this.educationsToUpdate.length || this.educationsToDelete.length;
  }

  addNewEducation() {
    const newEducation: Education = {
      university: "",
      degree: "",
      specialization: "",
      id: '',
      from: 'from',
      to: 'to'
    };
    this.newEducations.push(newEducation);
  }

  removeExistingExperience(index: number) {
    this.makeUserEducationsCopy();
    const experienceToRemove = this.educations[index];
    this.educationsToDelete.push(experienceToRemove);
    this.educations.splice(index, 1);
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }

  private getEducationFromUpdatedList(index: number): Education | null {
    const existingExperience: Education = this.educations[index];
    const isAlreadyAdded = this.educationsToUpdate
      .filter((experience: Education) => experience.id === existingExperience.id);
    if (isAlreadyAdded.length) {
      return isAlreadyAdded[0];
    }
    return null
  }

  private valuesAreDifferent(currentValue: string, newLevel: string) {
    return currentValue !== newLevel;
  }

  private copyEducations(educations: Education[]): Education[] {
    return educations.map(e => { return { ...e } });
  }

  private makeUserEducationsCopy() {
    if (!this.educationsCopy.length) {
      this.educationsCopy = this.copyEducations(this.educations);
    }
  }

  private proceddEditableField(target: HTMLDivElement) {
    const range = document.createRange();
    const sel: any = window.getSelection();
    range.selectNodeContents(target);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    target.focus();
    range.detach();
  }

}
