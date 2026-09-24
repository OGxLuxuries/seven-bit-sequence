import { Container } from "@mui/material";
import { BasicGauge } from "../components/gauge";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../css/dashboard.css";
import Card from "../components/weatherCard";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export function Dashboard() {
  return (
    <>
    
      <main className="page-main dashboard-page">
        <div id="battery-health">
          <Container className="battery" disableGutters maxWidth={false}>
            <Box>
              <BasicGauge value="20" />
              <h3>Node 1</h3>
            </Box>
            <Box>
              <BasicGauge value="35" />
              <h3>Node 2</h3>
            </Box>
            <Box>
              <BasicGauge value="80" />
              <h3>Node 3</h3>
            </Box>
            <Box>
              <BasicGauge value="0" />
              <h3>Node 4</h3>
            </Box>
          </Container>
        </div>


        <div id="metrics-dashboard">
          {/* Chart for volume metric- hortizontal bar chart */}
          <Card />
           <div id="chart-creation">
          <Box className="menu">
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={6}>
                <Item>1</Item>
              </Grid>
              <Grid size={6}>
                <Item>2</Item>
              </Grid>
              <Grid size={6}>
                <Item>3</Item>
              </Grid>
              <Grid size={6}>
                <Item>4</Item>
              </Grid>
              <Grid size={6}>
                <Item>5</Item>
              </Grid>
              <Grid size={6}>
                <Item>6</Item>
              </Grid>
            </Grid>
          </Box>
            {/* Weather dashboard component*/}
          </div>

        </div>



       
      </main>
    </>
  );
}