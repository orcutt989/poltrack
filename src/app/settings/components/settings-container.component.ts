import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  selectorSettings,
  ActionSettingsChangeTheme,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAnimationsElements,
  SettingsState,
  ActionSettingsPersist
} from '../settings.reducer';

@Component({
  selector: 'vispt-settings',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  settings: SettingsState;

  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  languages = [{ value: 'en', label: 'en' }, { value: 'sk', label: 'sk' }];

  constructor(private store: Store<{}>) {
    store
      .pipe(select(selectorSettings), takeUntil(this.unsubscribe$))
      .subscribe(settings => (this.settings = settings));
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onAutoNightModeToggle({ checked: autoNightMode }) {
    this.store.dispatch(
      new ActionSettingsChangeAutoNightMode({ autoNightMode })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.store.dispatch(
      new ActionSettingsChangeAnimationsPage({ pageAnimations })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.store.dispatch(
      new ActionSettingsChangeAnimationsElements({ elementsAnimations })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }
}
