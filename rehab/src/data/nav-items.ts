export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: 'ion:home-sharp',
    active: true,
    collapsible: false,
    
  },

  {
    title: 'Dashboard',
    path: '#!',
    icon: 'icomoon-free:drawer',
    active: true,
    collapsible: false,

  },
    {
    title: 'View Applications',
    path: '#!',
    icon: 'mingcute:grid-fill',
    active: true,
    collapsible: false,

  },

  {
    title: 'User Management',
    path: 'authentication',
    icon: 'tabler:shopping-bag',
    active: true,
    collapsible: true,
    sublist: [
      {
         title: 'Add Admin',
        path: 'applications',
        active: true,
        collapsible: false,
      },
      {
      title: 'Edit Admin',
        path: 'applications',
        active: true,
        collapsible: false,
      },
    ],
  },
  
   
  {
    title: 'Notification',
    path: '#!',
    icon: 'zondicons:notifications',
    active: false,
    collapsible: false,
  },
  {
    title: 'Message',
    path: '#!',
    icon: 'ph:chat-circle-dots-fill',
    active: false,
    collapsible: false,
  },
];

export default navItems;
