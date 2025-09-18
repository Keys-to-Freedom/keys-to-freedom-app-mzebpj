
export interface ContentItem {
  id: string;
  type: 'text' | 'title' | 'subtitle' | 'description' | 'button';
  content: string;
  section: string;
  screen: string;
}

export const defaultContent: ContentItem[] = [
  // Home Screen Content
  {
    id: 'home_title',
    type: 'title',
    content: 'Keys to Freedom',
    section: 'hero',
    screen: 'home'
  },
  {
    id: 'home_description',
    type: 'description',
    content: 'Entfalte dein Potenzial und entdecke den Weg zur wahren Freiheit durch Wissen, Gemeinschaft und persönliches Wachstum.',
    section: 'hero',
    screen: 'home'
  },
  {
    id: 'home_welcome_title',
    type: 'subtitle',
    content: 'Willkommen zu deiner Reise',
    section: 'welcome',
    screen: 'home'
  },
  {
    id: 'home_welcome_text1',
    type: 'text',
    content: 'Das ist mehr als nur eine App – es ist dein Tor zu einer Gemeinschaft, die sich dem Durchbrechen von Grenzen und dem Erreichen echter Unabhängigkeit verschrieben hat.',
    section: 'welcome',
    screen: 'home'
  },
  {
    id: 'home_welcome_text2',
    type: 'text',
    content: 'Erkunde unsere Ressourcen, verbinde dich mit anderen und mache die ersten Schritte in Richtung der Freiheit, die du verdienst.',
    section: 'welcome',
    screen: 'home'
  },
  {
    id: 'home_features_title',
    type: 'subtitle',
    content: 'Funktionen entdecken',
    section: 'features',
    screen: 'home'
  },
  {
    id: 'home_cta_button',
    type: 'button',
    content: 'Der Community beitreten',
    section: 'cta',
    screen: 'home'
  },

  // Chat Screen Content
  {
    id: 'chat_title',
    type: 'title',
    content: 'Community Chat',
    section: 'header',
    screen: 'chat'
  },
  {
    id: 'chat_description',
    type: 'description',
    content: 'Verbinde dich mit unserer Community durch exklusive Kanäle. Nimm an Diskussionen teil, teile Erkenntnisse und lerne von anderen auf ihrer Reise zur Freiheit.',
    section: 'header',
    screen: 'chat'
  },
  {
    id: 'chat_login_title',
    type: 'subtitle',
    content: 'An der Unterhaltung teilnehmen',
    section: 'login',
    screen: 'chat'
  },
  {
    id: 'chat_login_text',
    type: 'text',
    content: 'Melde dich mit deiner E-Mail an, um Zugang zu unseren exklusiven Community-Kanälen zu erhalten und dich mit Gleichgesinnten zu verbinden.',
    section: 'login',
    screen: 'chat'
  },
  {
    id: 'chat_channels_title',
    type: 'subtitle',
    content: 'Verfügbare Kanäle',
    section: 'channels',
    screen: 'chat'
  },

  // Shop Screen Content
  {
    id: 'shop_title',
    type: 'title',
    content: 'Freiheits-Shop',
    section: 'header',
    screen: 'shop'
  },
  {
    id: 'shop_description',
    type: 'description',
    content: 'Entdecke Bücher, Kurse und Ressourcen, die deine Reise zur persönlichen und finanziellen Freiheit beschleunigen.',
    section: 'header',
    screen: 'shop'
  },
  {
    id: 'shop_featured_title',
    type: 'subtitle',
    content: 'Empfohlene Produkte',
    section: 'featured',
    screen: 'shop'
  },
  {
    id: 'shop_categories_title',
    type: 'subtitle',
    content: 'Nach Kategorie durchsuchen',
    section: 'categories',
    screen: 'shop'
  },

  // Media Screen Content
  {
    id: 'media_title',
    type: 'title',
    content: 'Mediathek',
    section: 'header',
    screen: 'media'
  },
  {
    id: 'media_description',
    type: 'description',
    content: 'Zugang zu exklusiven Artikeln, Videos, Audio-Inhalten und Bildergalerien. Alle Inhalte sind sorgfältig kuratiert, um deine Reise zur Freiheit zu unterstützen.',
    section: 'header',
    screen: 'media'
  },
  {
    id: 'media_featured_title',
    type: 'subtitle',
    content: 'Neueste Veröffentlichung',
    section: 'featured',
    screen: 'media'
  },
  {
    id: 'media_browse_title',
    type: 'subtitle',
    content: 'Inhalte durchsuchen',
    section: 'browse',
    screen: 'media'
  },

  // Contact Screen Content
  {
    id: 'contact_title',
    type: 'title',
    content: 'Kontakt aufnehmen',
    section: 'header',
    screen: 'contact'
  },
  {
    id: 'contact_description',
    type: 'description',
    content: 'Hast du Fragen zu deiner Reise zur Freiheit? Benötigst du persönliche Beratung? Wir sind hier, um dir bei jedem Schritt zu helfen.',
    section: 'header',
    screen: 'contact'
  },
  {
    id: 'contact_methods_title',
    type: 'subtitle',
    content: 'Kontaktmöglichkeiten',
    section: 'methods',
    screen: 'contact'
  },
  {
    id: 'contact_form_title',
    type: 'subtitle',
    content: 'Sende uns eine Nachricht',
    section: 'form',
    screen: 'contact'
  }
];

export const featureCards = [
  {
    id: 'feature_chat',
    title: 'Chat Community',
    description: 'Tritt unseren exklusiven Kanälen bei und verbinde dich mit Gleichgesinnten auf dem Weg zur Freiheit.',
    icon: 'chatbubbles',
    route: '/chat',
  },
  {
    id: 'feature_shop',
    title: 'Shop',
    description: 'Entdecke Bücher, Kurse und Ressourcen, um deinen Weg zur persönlichen und finanziellen Freiheit zu beschleunigen.',
    icon: 'storefront',
    route: '/shop',
  },
  {
    id: 'feature_media',
    title: 'Mediathek',
    description: 'Zugang zu exklusiven Inhalten, Artikeln, Videos und Audioaufnahmen unserer Community.',
    icon: 'library',
    route: '/media',
  },
  {
    id: 'feature_contact',
    title: 'Kontakt',
    description: 'Verbinde dich direkt mit unserem Team und Community-Leitern für persönliche Beratung.',
    icon: 'mail',
    route: '/contact',
  },
];
