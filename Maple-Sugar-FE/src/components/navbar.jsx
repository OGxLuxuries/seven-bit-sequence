import * as React from 'react';
import Box from '@mui/material/Box';
import RestoreIcon from '@mui/icons-material/Restore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import TableChartIcon from '@mui/icons-material/TableChart';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [value, setValue] = React.useState(0);

    const navigate = useNavigate(); //Utilize to change navbar paths on selection
    const location = useLocation(); //Read current path

    const handleChange = (event, newValue) => {
        navigate(newValue);
    };

  return (   
      <Box>
            <BottomNavigation value={location.pathname} onChange={handleChange} className="navbar" showLabels>

                <BottomNavigationAction 
                label="Dashboard" value="/dashboard" icon={<RestoreIcon/>} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:1}}
                />

                <BottomNavigationAction 
                label="Schedule" value="/schedule" icon={<CalendarMonthIcon/>} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:1}}/>

                <BottomNavigationAction 
                label="Input" value="/input" icon={<DriveFolderUploadIcon />} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:1}} 
                />

                <BottomNavigationAction 
                label="Table" value="/table" icon={<TableChartIcon/>} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:1}} 
                />
            </BottomNavigation>
      </Box>
  )
}

export { Navbar }