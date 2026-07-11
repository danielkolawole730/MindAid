import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PsychologyIcon from '@mui/icons-material/Psychology';

import LightbulbIcon from '@mui/icons-material/Lightbulb';

import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NotesIcon from '@mui/icons-material/Notes';

//apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//CSS
import './components/CSS/App.css';

//routes
//import AudioRecorder from './components/AudioRecorder';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import SingleQuiz from './pages/Result';
import Legal from './pages/Legal';
import HelpLineCard from './components/Elements/HelpLineCard';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Homepage';
import QuizSelectForm from './components/QuizSelectForm';
import Therapy from './pages/Therapy';
import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'mobile' })(
  ({ theme, open, mobile }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: mobile ? 0 : `-${drawerWidth}px`,
    ...(open && !mobile && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'mobile',
})(({ theme, open, mobile }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && !mobile && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };


  const handleMainClick = () => {
    if (!isMobile && open) {
      setOpen(false);
    }
  };

  const listOne = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      link: '/',
    },
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      link: '/dashboard',
    },
    {
      text: 'Quiz',
      icon: <PsychologyIcon />,
      link: '/quizselect',
    },
    {
      text: 'Therapy',
      icon: <NotesIcon />,
      link: '/therapy',
    },
    {
      text: 'Legal',
      icon: <LightbulbIcon />,
      link: '/legal',
    },
  ];

  const listThree = Auth.loggedIn()
    ? []
    : [
      {
        text: 'Signup',
        icon: <CreateIcon />,
        link: '/signup',
      },
      {
        text: 'Login',
        icon: <LoginIcon />,
        link: '/login',
      }
    ];

  const isLoggedIn = Auth.loggedIn();

  return (
    <ApolloProvider client={client}>
      <Box sx={{ marginTop: '30px', marginBottom: '60px' }}>
        <Router>
          <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            <AppBar position="fixed" open={open && !isMobile} mobile={isMobile} sx={{ backgroundColor: '#326B96' }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && !isMobile ? { display: 'none' } : {}) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Mental Health Check
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant={isMobile ? 'temporary' : 'persistent'}
              anchor="left"
              open={open}
              onClose={handleDrawerClose}
              ModalProps={{ keepMounted: true }}
            >
              <Box sx={{ backgroundColor: '#326B96', height: '100%', color: 'white', border: 'none', }}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider variant='middle' color='white' />
                <List>
                  {listOne.map((item) => {
                    const { text, icon, link } = item;
                    return (
                      <Link to={link} key={text} style={{ textDecoration: 'none' }} onClick={handleNavClick}>
                        <ListItem disablePadding>
                          <ListItemButton>
                            {icon && <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>}
                            <ListItemText sx={{ color: 'white' }} primary={text} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    )
                  })}
                </List>
                <List>
                  {listThree.map((item, index) => {
                    const { text, icon, link } = item;
                    return (
                      <Link to={link} key={index} style={{ textDecoration: 'none' }} onClick={handleNavClick}>
                        <ListItem key={text} disablePadding>
                          <ListItemButton>
                            {icon && <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>}
                            <ListItemText sx={{ color: 'white' }} primary={text} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    )
                  })}
                  {isLoggedIn && (
                    <Link to={'/'} onClick={() => { Auth.logout(); handleNavClick(); }} style={{ textDecoration: 'none' }}>
                      <ListItem key='logout' disablePadding>
                        <ListItemButton>
                          <ListItemIcon sx={{ color: 'white' }}><LogoutIcon /></ListItemIcon>
                          <ListItemText sx={{ color: 'white' }} primary={'Logout'} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  )}
                </List>
              </Box>
            </Drawer>
            <Main onClick={handleMainClick} open={open} mobile={isMobile} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              backgroundColor: '#18344A'
            }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="quiz/:id" element={<Quiz />} />
                <Route path="singlequiz/:id" element={<SingleQuiz />} />
                <Route path="quizselect" element={<QuizSelectForm />} />
                <Route path="legal" element={<Legal />} />
                <Route path='helpCard' element={<HelpLineCard />} />
                <Route path='therapy' element={<Therapy />} />
              </Routes>
            </Main>
          </Box>
        </Router >
      </Box>
    </ApolloProvider >
  );
};