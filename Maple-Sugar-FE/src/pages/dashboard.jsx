import { Container } from "@mui/material";
import { BasicGauge } from "../components/gauge";
import Report from "../components/weatherReport";
import Box from "@mui/material/Box";
import "../css/dashboard.css";

export function Dashboard() {
  return (
    <>
      <main className="page-main">
        <h1>Dashboard</h1>
        {/* <Container className="battery" margin={0} disableGutters>
                <BasicGauge count={3}/>
            </Container> 
            Future code for implementing dynamic creation of new battery nodes
            */}
        <Container className="battery" disableGutters 
  maxWidth={false} sx={{display: 'flex', 
                        justifySelf: 'center', 
                        border: '2px solid black',
                        width: 'calc(100% - 40px)'
  }}>
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
        </Container>
        <Report/>
      </main>
    </>
  );
}
