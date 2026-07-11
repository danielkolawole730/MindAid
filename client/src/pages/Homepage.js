import React from 'react';
//mui
import { makeStyles } from '@mui/styles';
import { Container, Typography, CardActions, Box, CardContent, CardMedia } from '@mui/material';
import Button from '@mui/material/Button';
import jumbo from '../assets/images/jumbo.jpg';
import jumbo2 from '../assets/images/jumbo2.jpg';
import { Grid } from '@mui/material';
import Copyright from '../components/Elements/Copyright';
import Auth from '../utils/auth';

//routes
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#18344A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: '0 10px',
        marginBottom: 0,
        marginTop: 36,
    },
    title: {
        fontSize: '20rem',
        fontWeight: 900,
        lineHeight: 1.0,
        letterSpacing: '0.03em',
        textAlign: 'center',
        color: 'white',
        paddingBottom: theme.spacing(3),
        maxWidth: '1000px',
        [theme.breakpoints.down('md')]: {
            fontSize: '12rem',
            maxWidth: '100%',
        },
    },
    text: {
        fontSize: '1.6rem',
        textAlign: 'center',
        color: '#f5f5f5',
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
        },
    },
    hero: {
        width: '50%',
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            width: '75%',
        },
    },
    img: {
        aspectRatio: 5 / 5,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    card: {
        backgroundColor: '#255070',
        display: 'flex',
        flexDirection: 'column',
    },
    cardButtons: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing(2),
        backgroundColor: '#255070',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'stretch',
        },
    },
    cardTitle: {
        color: '#f5f5f5',
        fontSize: '2.5rem',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
        },
    },
    cardText: {
        fontSize: '1.3rem',
        textAlign: 'center',
        color: 'white',
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
        },
    },
    button: {
        backgroundColor: '#18344A',
        padding: '15px',
        fontSize: '1rem',
    },
    buttonTitle: {
        color: 'white'
    }
}));

const picRandomizer = () => {
    if (Math.random() > 0.5) {
        return jumbo;
    } else {
        return jumbo2;
    }
}

function Homepage() {
    const classes = useStyles();
    const loggedIn = Auth.loggedIn();

    return (

        <Container className={classes.container}>
            <Typography
                className={classes.title}
                sx={{
                    fontSize: '3rem',
                    lineHeight: 1,
                    fontWeight: 900,
                    color: 'white',
                    textAlign: 'center',
                    maxWidth: '1000px'
                }}
            >
                Take the First Step to Better Mental Health
            </Typography>
            <Grid spacing={10} container sx={{ alignItems: 'center' }}>
                <Grid item xs={12} md={4}>
                    <CardContent className={classes.card}>
                        <Typography className={classes.text} variant='body1'>
                            Use Mental Health Check to check-in with yourself and how you're feeling.
                        </Typography>
                        <Typography className={classes.text} variant='body1'>
                            Mental Health Check uses questions from mental illness screenings, but with Yes/No questions.
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box >
                        <CardMedia className={classes.img}
                            component="img"
                            height="300"
                            image={picRandomizer()}
                            alt="therapy session"
                        />
                        <CardContent className={classes.card}>
                            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="div">
                                Take the Mental Health Check
                            </Typography>
                            <Typography className={classes.cardText}>
                                Select from our question categories and begin taking your customized mental health check quiz!
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.cardButtons} sx={{ justifyContent: loggedIn ? 'center' : 'space-evenly' }}>
                            <Button sx={{ backgroundColor: '#18344A', borderColor: 'white', border: 1, fontSize: { xs: '0.9rem', sm: '1rem' }, py: 1, px: 2, width: { xs: '100%', sm: loggedIn ? '50%' : 'auto' }, justifyContent: 'center' }}>
                                <Link to='/quizselect' style={{ textDecoration: 'none' }} >
                                    <span className={classes.buttonTitle} >
                                        Take the quiz
                                    </span>
                                </Link>
                            </Button>
                            {!loggedIn && (
                                <Button sx={{ backgroundColor: '#18344A', borderColor: 'white', border: 1, fontSize: { xs: '0.9rem', sm: '1rem' }, py: 1, px: 2, width: { xs: '100%', sm: 'auto' } }}>
                                    <Link to='/signup' style={{ textDecoration: 'none' }}>
                                        <span className={classes.buttonTitle}>
                                            Create An Account
                                        </span>
                                    </Link>
                                </Button>
                            )}
                        </CardActions>
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <Copyright sx={{ color: 'white', marginTop: '50px', fontSize: '20px' }} />
            </Box>
        </Container>

    )
}

export default Homepage;
