/* */

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import GaugeChart from 'react-gauge-chart'
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom'

import HelpCard from "../components/Elements/HelpLineCard";
import Solutions from "../components/Solutions";

import { QUERY_QUIZSET } from "../utils/queries";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#18344A',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100vw',
    marginTop: '60px',
    marginBottom: '60px',
    padding: 0,
  },
  container2: {
    backgroundColor: '#18344A',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1200px',
    marginTop: '60px',
    marginBottom: '60px',
    padding: 0,
    gap: '24px',
  },
  container3: {
    backgroundColor: '#18344A',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '260px',
    maxWidth: '320px',
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
    padding: 0,
  },
  title: {
    fontSize: '4rem',
    textAlign: 'center',
    color: 'white',
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    },
  },
  text: {
    fontSize: '1.3rem',
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
    aspectRatio: 4 / 5,
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
    backgroundColor: '#255070',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    color: '#f5f5f5',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  },
  button: {
    color: '#4798D6',
    fontSize: '1rem',
    width: '100%',
  },
  h1: {
    fontSize: '9rem',
  },
}));

const Child = ({ quiz }) => {
  const classes = useStyles();
  let rating;
  switch (quiz.quizAnswer.includes("positive")) {
    case true:
      rating = 0.67;
      break;
    case false:
      rating = 0.34;
      break;
    default:
      throw new Error('Rating Error!')
  }

  return (
    <section className={classes.container3}>
      <GaugeChart id="gauge-chart1"
        nrOfLevels={2}
        percent={rating}
        hideText={true}
      />
      <span className={classes.text}>Results: {quiz.quizAnswer}</span>
    </section>
  );
}

const Results = () => {
  const classes = useStyles();
  const [showHelp, setShowHelp] = React.useState(false);
  const bottomRef = React.useRef(null);
  const { id: quizSetId } = useParams();
  const { loading, data } = useQuery(QUERY_QUIZSET, { variables: { quizSetId: quizSetId } });

  const quiz = data?.quizSet || [];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowHelp(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Extract positive conditions for solutions display
  const positiveConditions = quiz.quizResults
    ?.filter(result => result.quizAnswer.includes("positive"))
    .map(result => result.quizTaken) || [];

  // console.log(quiz.quizResults)

  return (
    <Container className={classes.container}>
      <h1 className={classes.title}>Here are your Results:</h1>
      <div className={classes.container2}>
        {quiz.quizResults.map(quiz => <Child key={quiz.quizTaken} quiz={quiz} />)}
      </div>

      {/* Display solutions for conditions with positive results */}
      {positiveConditions.length > 0 && (
        <div style={{ width: '100%' }}>
          {positiveConditions.map(condition => (
            <Solutions key={condition} condition={condition} />
          ))}
        </div>
      )}

      <Button sx={{ borderColor: 'white', border: 1, fontSize: 30, backgroundColor: '#255070', marginBottom: 7 }}>
        <Link to='/quizselect' style={{ textDecoration: 'none', color: 'white', }}>
          <span className={classes.buttonTitle}>
            Take Another Quiz
          </span>
        </Link>
      </Button>

      <Button sx={{ borderColor: 'white', border: 1, fontSize: 30, backgroundColor: '#255070', marginBottom: 7 }}>
        <Link to='/dashboard' style={{ textDecoration: 'none', color: 'white', }}>
          <span className={classes.buttonTitle}>
            Dashboard
          </span>
        </Link>
      </Button>

      <div ref={bottomRef} style={{ width: '100%', height: '1px' }} />
      {showHelp && <HelpCard />}
    </Container>
  );
};

export default Results;