export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flagCode: string;
  sampleGreeting: string;
  bilingualNote: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flagCode: 'US',
    sampleGreeting: "I'm getting started with the project. How would you like to set up the file? Here are a few options.",
    bilingualNote: 'Auto-detected · Crisp punctuation & formatting',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flagCode: 'ES',
    sampleGreeting: 'Ya estoy empezando con el proyecto. ¿Cómo te gustaría configurar el archivo? Aquí tienes unas opciones.',
    bilingualNote: 'Auto-detected · Preserves accents & ¿¡ punctuation',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flagCode: 'FR',
    sampleGreeting: 'Je commence le projet maintenant. Comment souhaitez-vous configurer le fichier ? Voici quelques options.',
    bilingualNote: 'Auto-detected · Proper French spacing & diacritics',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flagCode: 'DE',
    sampleGreeting: 'Ich starte jetzt mit dem Projekt. Wie möchtest du die Datei einrichten? Hier sind ein paar Optionen.',
    bilingualNote: 'Auto-detected · Accurate noun capitalization',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flagCode: 'JP',
    sampleGreeting: 'プロジェクトを始めます。ファイルはどのように設定しますか？いくつか選択肢があります。',
    bilingualNote: 'Auto-detected · Natural kanji & kana conversion',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flagCode: 'BR',
    sampleGreeting: 'Estou começando o projeto agora. Como você gostaria de configurar o arquivo? Aqui estão algumas opções.',
    bilingualNote: 'Auto-detected · Brazilian & European support',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flagCode: 'IN',
    sampleGreeting:
      'Aquí tienes algunas opciones. प्रोजेक्ट पर काम शुरू हो गया। आप इसे कैसे सेटअप करना चाहेंगे?',
    bilingualNote: 'Auto-detected · Seamless multilingual & Devanagari',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flagCode: 'KR',
    sampleGreeting: '프로젝트를 시작하고 있습니다. 파일을 어떻게 설정하시겠습니까? 몇 가지 옵션이 있습니다.',
    bilingualNote: 'Auto-detected · Context-aware Hangul spacing',
  },
];
