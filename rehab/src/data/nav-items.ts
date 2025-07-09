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
    path: 'authentication',
    icon: 'icomoon-free:drawer',
    active: true,
    collapsible: true,
    sublist: [
      {
         title: 'Stats',
        path: 'dashboard',
        active: true,
        collapsible: false,
      },
    ],

  },
    {
    title: 'View Applications',
    path: 'authentication',
    icon: 'mingcute:grid-fill',
    active: true,
    collapsible: true,
        sublist: [
      {
         title: 'Applications',
        path: 'applicationmanagement',
        active: true,
        collapsible: false,
      },
    ],

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
        path: 'addrehabadmin',
        active: true,
        collapsible: false,
      },
    ],
  },
  
   
  {
    title: 'Client Progress',
    path: 'authentication',
    icon: 'zondicons:notifications',
    active: true,
    collapsible: true,
    sublist: [
      {
         title: 'Add Progress',
        path: 'clientprogress',
        active: true,
        collapsible: false,
      },
    ],
  },
  {
    title: 'User Profile',
    path: 'authentication',
    icon: 'ph:user-circle-fill',
    active: true,
    collapsible: true,
    sublist: [
      {
         title: 'Profile',
        path: 'userprofile',
        active: true,
        collapsible: false,
      },
    ],
    
  },
];

export default navItems;
