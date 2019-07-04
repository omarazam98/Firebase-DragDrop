import React from "react";
import { blue, green } from '@material-ui/core/colors';
import { Button, TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import {
  createStyles,
  Theme,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    button: {
      margin: theme.spacing(1),
    },
    margin: {
      margin: theme.spacing(1),
    },
    email: {
      margin: theme.spacing(1),
      width: 250,
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: blue,
  },
});

interface TextFormProps {
  state: {
    isQuestionAsked: boolean,
    questionValue: string,
    questionLabel: string,
    prompt: string,
    afterSubmit: string,
    submitLabel: string,
    userEmail: string,
    userEmailLabel: string,
  };
  handleSubmit: any;
  handleChange: any;
  handleBlur: any;
}

const TextInputForm : React.FC<TextFormProps> = (props) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
    <form onSubmit={props.handleSubmit} name="questionText">
      <h3>
        {props.state.prompt}
      </h3>
      <TextField
        id="mui-theme-provider-outlined-input-question"
        label={props.state.questionLabel}
        variant="outlined"
        className={classes.margin}
        multiline
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.state.questionValue}
      />
      <TextField
        id="mui-theme-provider-outlined-input-email"
        label={props.state.userEmailLabel}
        variant="outlined"
        className={classes.email}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.state.userEmail}
      />
      <Button
        variant="contained"
        className={classes.button}
        color="secondary"
        type="submit"
        id="question-submit"
        onClick={props.handleSubmit}>
        {props.state.submitLabel}
      </Button>
      {
        props.state.isQuestionAsked ?
          <p className={classes.margin}>
            {props.state.afterSubmit}
          </p>
          : null
      }
    </form>
    </ThemeProvider>
  );
};
export default TextInputForm;
