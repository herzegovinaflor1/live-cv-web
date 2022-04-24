import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { LanguageService } from 'src/app/service/language/language.service';
import { Language, ModificationRequest } from 'src/app/types/types';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {

  @Input()
  languages: Language[] = [];

  languageLevel = ["A1", "A2", "B1", "B2", "C1", "C2", "NATIVE"];
  supportedLanguages = ["English", "Deutch", "French"];

  newLanguages: Language[] = [];
  languagesToUpdate: Language[] = [];
  languagesToRemove: Language[] = [];

  languagesCopy: Language[] = [];

  constructor(
    private authorizationService: AuthorizationService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void { }

  changeLanguageLevelOfSaved(newLevel: string, index: number) {
    const userLanguageToModify: Language = this.languages[index];
    if (this.languageLevelIsDifferent(userLanguageToModify, newLevel)) {
      this.makeUserLanguageCopy();

      userLanguageToModify.level = newLevel;
      const indexOfLanguageToUpdate = this.findLanguageIndexInListById(this.languagesToUpdate, userLanguageToModify.id)

      if (indexOfLanguageToUpdate > -1) {
        this.languagesToUpdate[index].level = newLevel;
      } else {
        this.languagesToUpdate.push(userLanguageToModify);
      }
    }
  }

  changeLanguageLevelOfNew(newLevel: string, index: number) {
    this.newLanguages[index].level = newLevel;
  }

  addNewLang() {
    this.newLanguages.push({
      id: "",
      name: "",
      level: ""
    });
  }

  saveNewLanguages() {
    const modificationrequest: ModificationRequest<Language> = {
      add: this.newLanguages,
      update: this.languagesToUpdate,
      delete: this.languagesToRemove
    }

    this.languageService.updateLanguages(modificationrequest)
      .subscribe({
        next: (res) => {
          this.newLanguages = [];
          this.languagesToUpdate = [];
          this.languagesToUpdate = [];
          this.languages = res;
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

  onLanguageSelect(newLanguageIndex: number, supportedLangIndex: number) {
    this.newLanguages[newLanguageIndex].name = this.supportedLanguages[supportedLangIndex];
  }

  onNewLanguageSelectLevel(newLanguageIndex: number, supportedLanguageLevel: number) {
    this.newLanguages[newLanguageIndex].level = this.languageLevel[supportedLanguageLevel];
  }

  isNewLanguagesAdded() {
    return this.newLanguages.length || this.languagesToUpdate.length || this.languagesToRemove.length;
  }

  removeLanguage(index: number) {
    this.newLanguages.splice(index, 1);
  }

  removeExistingLanguage(index: number) {
    this.makeUserLanguageCopy();
    const langToRemove = this.languages[index];
    this.languagesToRemove.push(langToRemove);
    this.languages.splice(index, 1);
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }

  cancelLanguageModifications() {
    if (this.languagesCopy.length) {
      this.languages = this.copyLanguages(this.languagesCopy);
    }
    this.languagesCopy = [];
    this.newLanguages = [];
    this.languagesToUpdate = [];
    this.languagesToRemove = [];
  }

  isLanguageLevelMatch(languageLevel: string, level: string) {
    return languageLevel === level;
  }

  private findLanguageIndexInListById(list: Language[], searchId: string) {
    return list.findIndex((lang) => lang.id === searchId);
  }

  private makeUserLanguageCopy() {
    if (!this.languagesCopy.length) {
      this.languagesCopy = this.copyLanguages(this.languages);
    }
  }

  private copyLanguages(languages: Language[]): Language[] {
    return languages.map(l => { return { ...l } });
  }

  private languageLevelIsDifferent(userLanguageToModify: Language, newLevel: string) {
    return userLanguageToModify.level !== newLevel;
  }

}
