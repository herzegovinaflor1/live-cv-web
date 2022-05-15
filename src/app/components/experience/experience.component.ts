import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { ExperienceService } from 'src/app/service/experience/experience.service';
import { ChangeListOrderCommand, Experience, ModificationRequest } from 'src/app/types/types';

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

  updatePosition(newPosition: string, currentExperienceId: string) {
    const experience: Experience = this.getExperienceById(currentExperienceId);
    if (this.valuesAreDifferent(experience.position, newPosition)) {
      this.makeUserExperienceCopy();

      experience.position = newPosition;
      const experienceToUpdate = this.getExperienceFromUpdatedList(currentExperienceId);
      if (experienceToUpdate) {
        experienceToUpdate.position = newPosition;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  updateCompanyName(newCompanyName: string, currentExperienceId: string) {
    const experience: Experience = this.getExperienceById(currentExperienceId);
    if (this.valuesAreDifferent(experience.company.name, newCompanyName)) {
      this.makeUserExperienceCopy();

      experience.company.name = newCompanyName;
      const experienceToUpdate = this.getExperienceFromUpdatedList(currentExperienceId);
      if (experienceToUpdate) {
        experienceToUpdate.company.name = newCompanyName;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  updateDescription(newDescription: string, currentExperienceId: string) {
    const experience: Experience = this.getExperienceById(currentExperienceId);
    if (this.valuesAreDifferent(experience.description, newDescription)) {
      this.makeUserExperienceCopy();

      experience.description = newDescription;
      const experienceToUpdate = this.getExperienceFromUpdatedList(currentExperienceId);
      if (experienceToUpdate) {
        experienceToUpdate.description = newDescription;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  updateStartDate(newStartDate: Event, currentExperienceId: string) {
    const target = newStartDate.target as HTMLDivElement;
    this.proceddEditableField(target);
    const from = target.innerHTML;

    const experience: Experience = this.getExperienceById(currentExperienceId);
    if (from && this.valuesAreDifferent(experience.from, from)) {
      this.makeUserExperienceCopy();

      experience.from = from;
      const existingExperience = this.getExperienceFromUpdatedList(currentExperienceId);
      if (existingExperience) {
        existingExperience.from = from;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  updateEndDate(newEndate: Event, currentExperienceId: string) {
    const target = newEndate.target as HTMLDivElement;
    this.proceddEditableField(target);
    const to = target.innerHTML;

    const experience: Experience = this.getExperienceById(currentExperienceId);

    if (this.valuesAreDifferent(experience.to, to)) {
      this.makeUserExperienceCopy();

      experience.to = to;
      const existingExperience = this.getExperienceFromUpdatedList(currentExperienceId);
      if (existingExperience) {
        existingExperience.to = to;
      } else {
        this.experiencesToUpdate.push(experience);
      }
    }
  }

  updateOrder(newOrder: ChangeListOrderCommand, index: number) {
    const experience: Experience = this.experiences[index];
    this.makeUserExperienceCopy();
    if (newOrder === 'UP') {
      const indexOfTopElement = index - 1;
      const topExperience: Experience = this.experiences[indexOfTopElement];
      this.experiences[indexOfTopElement] = experience;
      this.experiences[index] = topExperience;
      experience.order = indexOfTopElement;
      topExperience.order = index;
    } else if (newOrder === 'DOWN') {
      const indexOfDownlement = index + 1;
      const topExperience: Experience = this.experiences[indexOfDownlement];
      this.experiences[indexOfDownlement] = experience;
      this.experiences[index] = topExperience;
      experience.order = indexOfDownlement;
      topExperience.order = index;
    }
    this.experiences.forEach((val) => {
      const existingExperience = this.getExperienceFromUpdatedList(val.id);
      if (existingExperience) {
        existingExperience.order = val.order;
      } else {
        this.experiencesToUpdate.push(val);
      }
    })
  }

  deleteExistingExperience(index: number) {
    this.makeUserExperienceCopy();
    this.newExperiences.splice(index, 1);
  }

  // end update experience

  decline() {
    if (this.experiencesCopy.length) {
      this.experiences = this.copyExperiences(this.experiencesCopy);
    }
    this.newExperiences = [];
    this.experiencesToUpdate = [];
    this.experiencesToDelete = [];
    this.experiencesCopy = [];
  }

  saveNewExperiences() {
    debugger;
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

  addNewExperience() {
    const newExperience: Experience = {
      id: '',
      from: 'From',
      to: 'To',
      position: "",
      description: "",
      company: {
        name: ""
      },
      order: this.generateOrderForNewlyCreatedExperience()
    };
    this.newExperiences.push(newExperience);
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

  isCancelAndSaveButtonsEnabled() {
    return this.experiencesCopy.length || this.newExperiences.length;
  }

  isUpButtonEnabled(index: number): boolean {
    return index > 0;
  }

  isDownButtonEnabled(index: number): boolean {
    return index < this.experiences.length - 1;
  }

  private generateOrderForNewlyCreatedExperience(): number {
    return (this.experiences.length - 1) + this.newExperiences.length;
  }

  private getExperienceFromUpdatedList(experienceId: string): Experience | null {
    const existingExperience: Experience = this.getExperienceById(experienceId);
    const isAlreadyAdded = this.experiencesToUpdate
      .filter((experience: Experience) => experience.id === existingExperience.id);
    if (isAlreadyAdded.length) {
      return isAlreadyAdded[0];
    }
    return null
  }

  private getExperienceById(experienceId: string): Experience {
    return this.experiences.filter(e => e.id === experienceId)[0];
  }

  private valuesAreDifferent(currentValue: string | number, newLevel: string | number) {
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
