import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { Scope } from "@unform/core";
import { Form } from "@unform/web";

import {
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Box,
  FormLabel,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from '@material-ui/lab/Alert';
import SendIcon from '@material-ui/icons/Send';

import MaterialInput from "../../../Components/Inputs/MaterialInput";
import MaterialNativeSelect from "../../../Components/Selects/MaterialNativeSelect";
import json_general_info from "../../../Json/Study/study_general_info.json";
import Colors from "../../../Styles/Colors";
import Texts from "../../../Styles/Texts";

import * as Yup from 'yup';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: Colors.grayUltraLight,
  },
  selectEmpty: {
    textAlign: "left",
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  inputLabel: {
    marginTop: theme.spacing(1),
    color: Colors.grayDark,
    fontWeight: 'bold',
  },
  textInputControl: {
    fontSize: "25px",
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(1),
  },
  customBTN: {
    backgroundColor: Colors.secondaryDark,
    color: Colors.white,
    minWidth: "200px",
    "&:hover": {
      backgroundColor: Colors.secondaryUltraDark,
    },
  },
  formWide: {
    width: "100%",
  },
  input: {
    display: 'none',
  },
}));

export default function BacteriaNew() {
  const blank_text = Texts.leave_blank;
  const required_text = Texts.required;
  const blank_text_error = Texts.blank_error;
  
  const formType0Ref = useRef(null);
  const formType1Ref = useRef(null);

  const [rawFile, setRawFile] = useState(null);
  const [workFile, setWorkFile] = useState({});


  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // Tree & General Info
  const jsonGeneralInfo = json_general_info;
  const [dataGeneralInfo, setDataGeneralInfo] = useState({});

  const [registerType,setRegisterType] = useState("0");
  const [openSnackAlert,setOpenSnackAlert] = useState(false);

  async function handleSubmitFormType0(data, { reset }) {
    console.log(data);

    let resErrors = {}
    let haveErrors = false;
    Object.keys(data).map((value,index) => {
        let isTextField = formType0Ref.current.getFieldRef(value).current || formType0Ref.current.getFieldRef(value).props || true;

        if (typeof isTextField != 'boolean') {
          if (data[value] === "") {
            formType0Ref.current.setFieldError(value, true);
            haveErrors = true;
            resErrors[value] = Yup.string().required();
          } else {
            formType0Ref.current.setFieldError(value, false);
          }
        } else {
          if (data[value] === "") {
            if (formType0Ref.current.getFieldRef(value).required) {
              formType0Ref.current.setFieldError(value, true);
              haveErrors = true;
              resErrors[value] = Yup.string().required();
            }
          } else {
            formType0Ref.current.setFieldError(value, false);
          }
        }
    });

    if (!haveErrors) {
      console.log("Registrado com sucesso!");
    } else {
      setOpenSnackAlert(true);
    }
  }

  const handleRegisterType = (event) => {
    setRegisterType(event.target.value);
  }

  const handleFileVariables = () => {
    setWorkFile({});

    let raw = rawFile;
    let rawLine = raw.split(/\n/);
    for (let i in rawLine) {
      if (rawLine[i].includes('=')) {
        let varValue = rawLine[i].split('=')[1];
        let varName = rawLine[i].split('=')[0].trim();  
        //console.log(varName," -> ",varValue);
        setWorkFile({...workFile, [varName]: varValue});
      }
    }
  }

  const handleFileChosen = (file) => {
    if (file === undefined || file === null) {
      setRawFile(null);
      return null;
    }
    
    let fileReader = new FileReader();
    fileReader.onloadend = (read) => {
      //this.setState({filetext : read.result});
      console.log(read.currentTarget.result);
      setRawFile(read.currentTarget.result);
    }
    fileReader.readAsText(file);
  }

  return (
      <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Register Type</Typography>
        <Divider />
        <Paper className={fixedHeightPaper}>
          <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup row aria-label="essayType" name="registerType" value={registerType} onChange={handleRegisterType}>
            <FormControlLabel value="0" selected control={<Radio />} label="From BibTex" />
            <FormControlLabel value="1" control={<Radio />} label="Manual Entry" />
          </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>
      {registerType === "0" 
      ? 
      <Grid item xs={12} md={12}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Upload File (only bib/txt)</Typography>
        <Divider />
        <Paper className={fixedHeightPaper}>
        <Grid container>
        <div>
          <input
            accept=".bib,.txt"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={e => handleFileChosen(e.target.files[0])}
          />
          <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="default"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
          </label>
        </div>
        <Box ml={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            disabled={rawFile === null ? true : false}
            onClick={handleFileVariables}
          >
          Read File
          </Button>
        </Box>
        </Grid>
        </Paper>

      <Grid item xs={12} md={12}>
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Study Info</Typography>
      <Divider />
      <Paper className={fixedHeightPaper}>
      { 
          Object.entries(workFile).map(([key, value]) => {
            return value.data == null 
            ?
            <MaterialInput
            key={key}
            name={key}
            label={value}
            type={"text"}
            isrequired={true}
            labelError={blank_text_error}
            placeholder={"enter text..."}
          />
          : null
      })}
      </Paper>
      </Grid>

      </Grid>
      : null
      }
      {registerType === "1"
      ? 
      <Grid item xs={12} md={12}>
      <Form ref={formType0Ref} className={classes.formWide} onSubmit={handleSubmitFormType0}>
      <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Study Info
            </Typography>
            <Divider />
            {/*console.log("RODOU")*/}
            <Paper className={fixedHeightPaper}>
            { 
              Object.entries(jsonGeneralInfo).map(([key, value]) => {
                return value.data == null 
                ?
              <MaterialInput
                key={key}
                name={key}
                label={value.label + (value.required ? required_text : blank_text)}
                type={value.type || "text"}
                isrequired={value.required}
                labelError={blank_text_error}
                placeholder={"enter text..."}
              />
              :
              <MaterialNativeSelect
              key={key}
              label={value.label + (value.required ? required_text : blank_text)}
              defaultValue={""}
              labelError={blank_text_error}
              name={key}
              >
              <option value={""}>Select</option >
              {value.data.map((dataValue) =>
                dataValue != "label" && dataValue != "selected" ? (
                  <option key={dataValue} value={dataValue}>
                    {dataValue}
                  </option >
                ) : null
              )}
              </MaterialNativeSelect>
            })}
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} container justify="flex-end">
              <Button
                onClick={() => formType0Ref.current.submitForm()}
                variant="contained"
                size="large"
                className={classes.customBTN}
              >
                Register
              </Button>
            </Grid>
      </Grid>
      </Form>
      </Grid>
      : null}

      <Snackbar open={openSnackAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={() => setOpenSnackAlert(false)}>
        <Alert onClose={() => setOpenSnackAlert(false)} severity="error">
          ERROR: Check that all required fields have been completed.
        </Alert>
      </Snackbar>

    </Grid>
  );
}