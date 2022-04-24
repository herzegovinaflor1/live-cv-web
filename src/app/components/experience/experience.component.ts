import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  deleteExistingExperience(index: number) {
    this.makeUserExperienceCopy();
    this.newExperiences.splice(index, 1);
  }

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
    const newExperiences = this.newExperiences.reduce((map: any, obj: any) => {
      const y = {
        ...obj,
        from: obj.range.value.start.getTime(),
        to: obj.range.value.end.getTime()
      };
      delete y.range;
      map.push(y);
      return map;
    }, []);

    const experienceUpdateRequest: ModificationRequest<Experience> = {
      add: newExperiences,
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
      from: '',
      to: '',
      position: "",
      description: "",
      company: {
        name: ""
      },
      range: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
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

}
