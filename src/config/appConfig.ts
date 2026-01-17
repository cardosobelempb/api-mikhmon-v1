import { AppConfig } from '../types/config.types';

/**
 * Configurações centrais da aplicação
 * Equivalente ao config.php do PHP
 */
export const appConfig: AppConfig = {
  mikhmon: {
    enabled: true,
    keys: ['mikhmon<|<mikhmon', 'mikhmon>|>aWNlbA==']
  },

  sessions: {
    session903: {
      enabled: true,
      timeout: 30,
      tokens: [
        'session903!',
        'session903@|@',
        'session903#|#',
        'session903%',
        'session903^',
        'session903&Rp',
        'session903*',
        'session903(',
        'session903)'
      ]
    },

    session542: {
      enabled: true,
      timeout: 30,
      tokens: [
        'session542!',
        'session542@|@',
        'session542#|#',
        'session542%',
        'session542^',
        'session542&Rp',
        'session542*',
        'session542(',
        'session542)'
      ]
    }
  }
};
