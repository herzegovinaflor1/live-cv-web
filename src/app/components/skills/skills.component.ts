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
  skills: Skill[] = [];

  skillsCopy: Skill[] = [];
  formControl = new FormControl(['angular']);

  add: Skill[] = [];
  delete: Skill[] = [];

  constructor(
    private authorizationService: AuthorizationService,
    private skillService: SkillService
  ) { }

  ngOnInit(): void {
  }

  addSkill(event: MatChipInputEvent) {
    this.makeUserSkillsCopy();
    if (event.value) {
      this.skills.push({
        name: event.value,
        id: uuidv4()
      });
      this.add.push(
        {
          name: event.value,
          id: uuidv4()
        }
      );
      event.chipInput!.clear();
    }
  }

  removeSkill(skill: Skill, index: number) {
    this.makeUserSkillsCopy();
    this.skills.splice(index, 1);
    const newSkillsIdx = this.add.findIndex((t: any) => t.id = skill.id);
    if (newSkillsIdx > -1) {
      this.add.splice(newSkillsIdx, 1);
    } else {
      this.delete.push({
        id: skill.id
      });
    }
  }

  isSave() {
    return this.delete.length || this.add.length;
  }

  saveSkills() {
    const modificationrequest: ModificationRequest<Skill> = {
      add: this.add,
      update: [],
      delete: this.delete
    }

    this.skillService.updateSkills(modificationrequest)
      .subscribe((res: Skill[]) => {
        this.skills = res;
      });
    this.delete = [];
    this.add = [];
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }

  cancel() {
    if (this.skillsCopy.length) {
      this.skills = this.copySkills(this.skillsCopy);
    }
    this.add = [];
    this.delete = [];
    this.skillsCopy = [];
  }

  private copySkills(skills: Skill[]): Skill[] {
    return skills.map(s => { return { ...s } });
  }

  private makeUserSkillsCopy() {
    if (!this.skillsCopy.length) {
      this.skillsCopy = this.copySkills(this.skills);
    }
  }
}
