import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { ExperienceService } from 'src/app/service/experience/experience.service';
import { Experience, ModificationRequest } from 'src/app/types/types';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {

  @Input()
  experiences: Experience[] = [];

  experiencesCopy: Experience[] = [];

  newExperiences: Experience[] = [];
  experiencesToUpdate: Experience[] = [];
  experiencesToDelete: Experience[] = [];

  constructor(
    private authorizationService: AuthorizationService,
    private experienceService: ExperienceService
  ) { }

  ngOnInit(): void { }

  // add experience

  addPosition(position: string, index: number) {
    this.newExperiences[index].position = position;
  }

  addCompanyName(companyName: string, index: number) {
    this.newExperiences[index].company.name = companyName;
  }

  addDescription(description: string, index: number) {
    this.newExperiences[index].description = description;
  }

  addStartDate(newStartDate: Event, index: number) {
    const target = newStartDate.target as HTMLDivElement;
    this.proceddEditableField(target);
    const from = target.innerHTML;
    if (from) {
      this.newExperiences[index].from = from;
    }
  }

  addEndDate(newDateEvent: Event, index: number) {
    const target = newDateEvent.target as HTMLDivElement;
    this.proceddEditableField(target);
    const to = target.innerHTML;
    if (to) {
      this.newExperiences[index].to = to;
    }
  }


  deleteNewExperience(index: number) {
    this.newExperiences.splice(index, 1);
  }

  // update experience

  updatePosition(newPosition: string, index: number) {
    const experience: Experience = this.experiences[index];
    if (this.valuesAreDifferent(experience.position, newPosition)) {
      this.makeUserExperienceCopy();

      experience.position = newPosition;
      const experienceToUpdate = this.getExperienceFromUpdatedList(index);
      if (experienceToUpdate) {
        experienceToUpdate.position = newPosition;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  updateCompanyName(newCompanyName: string, index: number) {
    const experience: Experience = this.experiences[index];
    if (this.valuesAreDifferent(experience.company.name, newCompanyName)) {
      this.makeUserExperienceCopy();

      experience.company.name = newCompanyName;
      const experienceToUpdate = this.getExperienceFromUpdatedList(index);
      if (experienceToUpdate) {
        experienceToUpdate.company.name = newCompanyName;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  updateDescription(newDescription: string, index: number) {
    const experience: Experience = this.experiences[index];
    if (this.valuesAreDifferent(experience.description, newDescription)) {
      this.makeUserExperienceCopy();

      experience.description = newDescription;
      const experienceToUpdate = this.getExperienceFromUpdatedList(index);
      if (experienceToUpdate) {
        experienceToUpdate.description = newDescription;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  updateStartDate(newStartDate: Event, index: number) {
    const target = newStartDate.target as HTMLDivElement;
    this.proceddEditableField(target);
    const from = target.innerHTML;

    const experience: Experience = this.experiences[index];
    if (from && this.valuesAreDifferent(experience.from, from)) {
      this.makeUserExperienceCopy();

      experience.from = from;
      const existingExperience = this.getExperienceFromUpdatedList(index);
      if (existingExperience) {
        existingExperience.from = from;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  updateEndDate(newEndate: Event, index: number) {
    const target = newEndate.target as HTMLDivElement;
    this.proceddEditableField(target);
    const to = target.innerHTML;

    const experience: Experience = this.experiences[index];
    
    if (this.valuesAreDifferent(experience.to, to)) {
      this.makeUserExperienceCopy();

      experience.to = to;
      const existingExperience = this.getExperienceFromUpdatedList(index);
      if (existingExperience) {
        existingExperience.to = to;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  deleteExistingExperience(index: number) {
    this.makeUserExperienceCopy();
    this.newExperiences.splice(index, 1);
  }

  // end update experience

  decline() {
    if (this.copyExperiences.length) {
      this.experiences = this.copyExperiences(this.experiencesCopy);
    }
    this.newExperiences = [];
    this.experiencesToUpdate = [];
    this.experiencesToDelete = [];
    this.experiencesCopy = [];
  }

  saveNewCompanies() {
    const experienceUpdateRequest: ModificationRequest<Experience> = {
      add: this.newExperiences,
      update: this.experiencesToUpdate,
      delete: this.experiencesToDelete
    }

    this.experienceService.updateExperience(experienceUpdateRequest)
      .subscribe((experiences: Experience[]) => {
        this.experiences = experiences;

        this.newExperiences = [];
        this.experiencesToUpdate = [];
        this.experiencesToDelete = [];
      });
  }

  isSave() {
    return this.newExperiences.length || this.experiencesToUpdate.length || this.experiencesToDelete.length;
  }

  addNewCompany() {
    const newCompany: Experience = {
      id: '',
      from: 'From',
      to: 'To',
      position: "",
      description: "",
      company: {
        name: ""
      }
    };
    this.newExperiences.push(newCompany);
  }

  removeExistingExperience(index: number) {
    this.makeUserExperienceCopy();
    const experienceToRemove = this.experiences[index];
    this.experiencesToDelete.push(experienceToRemove);
    this.experiences.splice(index, 1);
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }

  getToDate(toDate: string) {
    if (toDate) {
      return toDate;
    }
    return "Present"
  }

  private getExperienceFromUpdatedList(index: number): Experience | null {
    const existingExperience: Experience = this.experiences[index];
    const isAlreadyAdded = this.experiencesToUpdate
      .filter((experience: Experience) => experience.id === existingExperience.id);
    if (isAlreadyAdded.length) {
      return isAlreadyAdded[0];
    }
    return null
  }

  private valuesAreDifferent(currentValue: string, newLevel: string) {
    return currentValue !== newLevel;
  }

  private copyExperiences(experiences: Experience[]): Experience[] {
    return experiences.map(e => { return { ...e } });
  }

  private makeUserExperienceCopy() {
    if (!this.experiencesCopy.length) {
      this.experiencesCopy = this.copyExperiences(this.experiences);
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
