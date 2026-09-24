import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ParkIcon from '@mui/icons-material/Park';
import RestoreIcon from '@mui/icons-material/Restore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { navItemsFor } from '../../routes/navigation';

const ICONS = {
  bush: RestoreIcon,
  schedule: CalendarMonthIcon,
  collection: MenuBookIcon,
  woods: ParkIcon,
  notifications: NotificationsIcon,
  scheduleAdmin: EditCalendarIcon,
  admin: AdminPanelSettingsIcon,
};

export function MainNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuth();
  const items = navItemsFor(role);

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 0.5,
        px: 1,
      }}
    >
      {items.map((item) => {
        const selected = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
        const Icon = ICONS[item.icon];
        return (
          <Button
            key={item.to}
            onClick={() => navigate(item.to)}
            startIcon={<Icon sx={{ fontSize: 18 }} />}
            aria-current={selected ? 'page' : undefined}
            sx={{
              color: selected ? '#FFFFFF' : '#F4F1EE',
              bgcolor: selected ? '#F76902' : 'transparent',
              borderRadius: 999,
              minHeight: 36,
              px: 1.5,
              fontWeight: 600,
              fontSize: 14,
              '&:hover': { bgcolor: selected ? '#C75300' : 'rgba(255,255,255,0.08)' },
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
}
