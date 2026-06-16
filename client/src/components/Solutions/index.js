import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SOLUTIONS } from '../../utils/queries';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Grid, 
  Typography, 
  Box, 
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#18344A',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  title: {
    color: 'white',
    fontSize: '2rem',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#255070',
    color: '#f5f5f5',
    marginBottom: theme.spacing(2),
  },
  cardHeader: {
    borderBottom: '2px solid #4798D6',
    paddingBottom: theme.spacing(2),
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#4798D6',
  },
  summary: {
    marginTop: theme.spacing(1),
    fontStyle: 'italic',
    color: '#333',
  },
  description: {
    marginTop: theme.spacing(1),
    color: 'black',
  },
  summaryContainer: {
    backgroundColor: '#204559',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  summaryIntro: {
    fontWeight: 'bold',
    color: '#f5f5f5',
    marginBottom: theme.spacing(1),
  },
  summaryItem: {
    color: '#d3e3f1',
    marginBottom: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: '#4798D6',
    color: 'white',
  },
  steps: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  stepTitle: {
    fontWeight: 'bold',
    color: '#4798D6',
    marginTop: theme.spacing(1),
  },
  stepItem: {
    color: 'black',
    paddingLeft: theme.spacing(2),
  },
  resources: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: '1px solid #4798D6',
  },
  resourceTitle: {
    fontWeight: 'bold',
    color: '#4798D6',
    marginBottom: theme.spacing(1),
  },
  resourceItem: {
    color: 'black',
    paddingLeft: theme.spacing(2),
  },
}));

const SolutionCard = ({ solution }) => {
  const classes = useStyles();

  const getCategoryColor = (category) => {
    const colors = {
      'coping-strategy': '#FFB74D',
      'professional-help': '#81C784',
      'lifestyle': '#64B5F6',
      'emergency': '#E57373',
      'resource': '#BA68C8',
    };
    return colors[category] || '#4798D6';
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={solution.title}
        titleTypographyProps={{ className: classes.cardTitle }}
        className={classes.cardHeader}
        avatar={
          <Chip
            label={solution.category.replace('-', ' ')}
            style={{ backgroundColor: getCategoryColor(solution.category), color: 'white' }}
          />
        }
      />
      <CardContent>
        {solution.summary && (
          <Typography className={classes.summary}>
            {solution.summary}
          </Typography>
        )}
        <Typography className={classes.description}>
          {solution.description}
        </Typography>

        {solution.steps && solution.steps.length > 0 && (
          <Box className={classes.steps}>
            <Typography className={classes.stepTitle}>
              Steps:
            </Typography>
            <List disablePadding>
              {solution.steps.map((step, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText
                    primary={`${index + 1}. ${step}`}
                    primaryTypographyProps={{ className: classes.stepItem }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {solution.resources && solution.resources.length > 0 && (
          <Box className={classes.resources}>
            <Typography className={classes.resourceTitle}>
              Resources:
            </Typography>
            <List disablePadding>
              {solution.resources.map((resource, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText
                    primary={`• ${resource}`}
                    primaryTypographyProps={{ className: classes.resourceItem }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const Solutions = ({ condition }) => {
  const classes = useStyles();
  const { loading, data, error } = useQuery(QUERY_SOLUTIONS, {
    variables: { condition },
  });

  if (loading) {
    return <Typography color="white">Loading solutions...</Typography>;
  }

  if (error) {
    console.error('Error fetching solutions:', error);
    return <Typography color="white">Unable to load solutions</Typography>;
  }

  const solutions = data?.solutions || [];

  if (solutions.length === 0) {
    return null;
  }

  const summaryItems = solutions
    .map((solution) => solution.summary)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>
        Coping Strategies & Resources for {condition.charAt(0).toUpperCase() + condition.slice(1)}
      </Typography>
      {summaryItems.length > 0 && (
        <Box className={classes.summaryContainer}>
          <Typography className={classes.summaryIntro}>
            Quick summary for {condition}:
          </Typography>
          {summaryItems.map((item, index) => (
            <Typography key={index} className={classes.summaryItem}>
              • {item}
            </Typography>
          ))}
        </Box>
      )}
      <Grid container spacing={2}>
        {solutions.map((solution) => (
          <Grid item xs={12} key={solution._id}>
            <SolutionCard solution={solution} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Solutions;
