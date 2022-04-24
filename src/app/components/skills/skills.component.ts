import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { SkillService } from 'src/app/service/skill/skill.service';
import { ModificationRequest, Skill } from 'src/app/types/types';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  @Input()
  skills: any = [];
  formControl = new FormControl(['angular']);

  addSkills: Skill[] = [];
  removeSkills: Skill[] = [];

  constructor(
    private authorizationService: AuthorizationService,
    private skillService: SkillService
  ) { }

  ngOnInit(): void {
  }

  addSkill(event: MatChipInputEvent) {
    if (event.value) {
      this.skills.push({
        name: event.value,
        id: uuidv4()
      });
      this.addSkills.push(
        {
          name: event.value,
          id: uuidv4()
        }
      );
      event.chipInput!.clear();
    }
  }

  removeSkill(skill: any, index: any) {
    this.skills.splice(index, 1);
    const newSkillsIdx = this.addSkills.findIndex((t: any) => t.id = skill.id);
    if (newSkillsIdx > -1) {
      this.addSkills.splice(newSkillsIdx, 1);
    } else {
      this.removeSkills.push({
        id: skill.id
      });
    }
  }

  isSave() {
    return this.removeSkills.length || this.addSkills.length;
  }

  saveSkills() {
    const modificationrequest: ModificationRequest<Skill> = {
      add: this.addSkills,
      update: [],
      delete: this.removeSkills
    }

    this.skillService.updateSkills(modificationrequest)
      .subscribe(res => {
        this.skills = res;
      });
    this.removeSkills = [];
    this.addSkills = [];
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }
}
