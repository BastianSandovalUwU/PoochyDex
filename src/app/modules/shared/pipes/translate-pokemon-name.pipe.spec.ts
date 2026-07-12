import { TestBed } from '@angular/core/testing';
import { TranslatePokemonNamePipe } from './translate-pokemon-name.pipe';
import { LanguageService } from '../services/language.service';

describe('TranslatePokemonNamePipe', () => {
  let pipe: TranslatePokemonNamePipe;
  let languageService: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService]
    });
    languageService = TestBed.inject(LanguageService);
    pipe = TestBed.runInInjectionContext(() => new TranslatePokemonNamePipe());
  });

  it('should translate a known form name to Spanish', () => {
    languageService.setCurrentLanguage('es');
    expect(pipe.transform('flutter-mane')).toBe('Melenaleteo');
  });

  it('should return the original name in English', () => {
    languageService.setCurrentLanguage('en');
    expect(pipe.transform('flutter-mane')).toBe('flutter-mane');
  });

  it('should return the original name when there is no Spanish translation', () => {
    languageService.setCurrentLanguage('es');
    expect(pipe.transform('pikachu')).toBe('pikachu');
  });

  it('should react to language changes', () => {
    languageService.setCurrentLanguage('en');
    expect(pipe.transform('flutter-mane')).toBe('flutter-mane');

    languageService.setCurrentLanguage('es');
    expect(pipe.transform('flutter-mane')).toBe('Melenaleteo');
  });
});
