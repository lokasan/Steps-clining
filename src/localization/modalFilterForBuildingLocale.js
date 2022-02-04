import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
i18n.translations = {
    en: {posts: 'posts', building: 'building', employees: 'employees', components: 'components'},
    ru: {posts: 'Посты', building: 'Участки', employees: 'Сотрудники', components: 'Компоненты'}
  }
  i18n.locale = Localization.locale
  i18n.fallbacks = true

  export default i18n;