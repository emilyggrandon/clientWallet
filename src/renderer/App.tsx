import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Typography,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material';
import icon from '../../assets/icon.svg';
import CreateNewId from './components/CreateNewId';
import MyCredentials from './components/MyCredentials';
import SendCredentials from './components/SendCredentials';
import MyHistory from './components/MyHistory';
import MyIds from './components/MyIds';
import SignCredentials from './components/SignCredentials';

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Router>
        <Grid item xs={2}>
          <Drawer
            style={{ width: '200px' }}
            variant="permanent"
            anchor="left"
            open
            classes={{ paper: classes.drawerPaper }}
          >
            <List>
              <br />
              <br />
              <Link to="/" className={classes.link}>
                <ListItem button>
                  <ListItemText primary="My History">HELLO</ListItemText>
                </ListItem>
              </Link>
              <Link to="/my-ids" className={classes.link}>
                <ListItem button>
                  <ListItemText primary="My IDs" />
                </ListItem>
              </Link>
              <Link to="/create-id" className={classes.link}>
                <ListItem button>
                  <ListItemText primary="Create A New DID" />
                </ListItem>
              </Link>
              <Link to="/my-credentials" className={classes.link}>
                <ListItem button>
                  <ListItemText primary="View Credentials" />
                </ListItem>
              </Link>
            </List>
          </Drawer>
        </Grid>
        <Grid item xs>
          <Grid container direction="column" spacing={10}>
            <Grid item xs={2}>
              <AppBar>
                <Toolbar>
                  <Typography> </Typography>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs>
              <Routes>
                <Route exact path="/" index={true} element={<MyHistory />} />
                <Route path="/my-ids" element={<MyIds />} />
                <Route path="/my-credentials">
                  <Route index={true} element={<MyCredentials />} />
                  <Route index={false} path="sign" element={<SignCredentials />} />

                </Route>
                <Route path="/create-id" element={<CreateNewId />} />
              </Routes>
            </Grid>
          </Grid>
        </Grid>
      </Router>
    </Grid>
  );
}
