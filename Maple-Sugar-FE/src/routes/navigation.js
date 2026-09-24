import { can, Capability } from '../business/permissions';

export const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'The Bush',
    icon: 'bush',
    capability: Capability.VIEW_DASHBOARD,
  },
  {
    to: '/schedule',
    label: 'Schedule',
    icon: 'schedule',
    capability: Capability.VIEW_SCHEDULE,
  },
  {
    to: '/collection',
    label: 'Collection',
    icon: 'collection',
    capability: Capability.RECORD_DATA,
  },
  {
    to: '/table',
    label: 'Sugar Woods',
    icon: 'woods',
    capability: Capability.VIEW_DATA_TABLE,
  },
  {
    to: '/notifications',
    label: 'Notifications',
    icon: 'notifications',
    capability: Capability.VIEW_ALERTS,
  },
  {
    to: '/schedule-admin',
    label: 'Schedule Admin',
    icon: 'scheduleAdmin',
    capability: Capability.MANAGE_SCHEDULE,
  },
  {
    to: '/admin',
    label: 'Admin',
    icon: 'admin',
    capability: Capability.MANAGE_USERS,
  },
];

export function navItemsFor(role) {
  return NAV_ITEMS.filter((item) => can(role, item.capability));
}

export function landingRouteFor(role) {
  return navItemsFor(role)[0]?.to ?? '/dashboard';
}
