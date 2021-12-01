const MENU_ITEMS = [
  {
    name: 'dashboardOverview',
    label: 'Overview',
    route: '/',
    permissions: ['Admin'],
  },
  {
    name: 'database',
    label: 'Database',
    route: null,
    children: [
      {
        name: 'manageData',
        label: 'Manage Data',
        route: '/database',
        permissions: ['Admin'],
      },
      {
        name: 'manageIndicators',
        label: 'Manage Indicators',
        route: '/database/indicators',
        permissions: ['Admin'],
      },
      {
        name: 'country',
        label: 'Country Dashboard',
        route: '/country',
        permissions: ['Admin'],
      },
    ],
    permissions: ['Admin'],
  },
  {
    name: 'activities',
    label: 'View Activity',
    route: null,
    children: [
      {
        name: 'userActivities',
        label: 'User Activity',
        route: '/activities/user',
        permissions: ['Admin'],
      },
      {
        name: 'adminActivities',
        label: 'Admin Activity',
        route: '/activities/admin',
        permissions: ['Admin'],
      },
    ],
    permissions: ['Admin'],
  },
  {
    name: 'users',
    label: 'Users',
    route: '/users',
    permissions: ['Admin'],
  },
  {
    name: 'settings',
    label: 'Settings',
    route: '/settings',
    permissions: ['Admin'],
  },
];

const ROLES = [
  'admin',
  'guest',
  'super admin',
];

export { MENU_ITEMS, ROLES };
