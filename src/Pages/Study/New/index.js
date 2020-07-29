import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { Scope } from "@unform/core";
import { Form } from "@unform/web";

import MaterialInput from "../../../Components/Inputs/MaterialInput";
import MaterialNativeSelect from "../../../Components/Selects/MaterialNativeSelect";
import json_general_info from "../../../Json/Study/study_general_info.json";
import Colors from "../../../Styles/Colors";
import Texts from "../../../Styles/Texts";

import * as Yup from 'yup';

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
}));

export default function BacteriaNew() {
  const blank_text = Texts.leave_blank;
  const blank_text_error = Texts.blank_error;
  const formRef = useRef(null);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // Tree & General Info
  const jsonGeneralInfo = json_general_info;
  const [dataGeneralInfo, setDataGeneralInfo] = useState({});

  async function handleSubmit(data, { reset }) {

    //console.log(Yup.object());
    console.log(data);
    
    let resErrors = {}
    Object.keys(data).map((value,index) => {
        //console.log(value,"->",formRef.current.getFieldRef(value));
        //console.log(typeof formRef.current.getFieldRef(value));
        //console.log(value,"->",);
        //console.log("-----");

        let isTextField = formRef.current.getFieldRef(value).current || formRef.current.getFieldRef(value).props || true;
        //console.log(value," -> ",isTextField);

        if (typeof isTextField != 'boolean') {
          if (data[value] == "") {
            formRef.current.setFieldError(value, true);
            resErrors[value] = Yup.string().required();
            
          } else {
            formRef.current.setFieldError(value, false);
          }
        } else {
          //console.log("Nao é Dropdown: ",value);
          //console.log(typeof isTextField)
        }
    });
  }

  const handleGeneralInfo = (key, value) => {
    if (value == "null") {
      value = null;
    }
    setDataGeneralInfo({ ...dataGeneralInfo, [key]: value });
  };

  const validateForm = () => {
    let finalJson = {};

    //console.log("General Info:",dataGeneralInfo,"Size: ",dataAux.length);
    Object.keys(jsonGeneralInfo).map((key) => {
      finalJson[key] = dataGeneralInfo[key] || "NA";
    });

    //console.log("\n\n\nFIM:");

    console.log(finalJson);
  };

  const formatLabel = (label) => {
    label = label.split("_").join(" ");
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  return (
      <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
      <Form ref={formRef} className={classes.formWide} onSubmit={handleSubmit}>
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
              {Object.keys(jsonGeneralInfo).map((json, index) => {
                return jsonGeneralInfo[json] == null ? (
                  <MaterialInput
                    key={json}
                    name={json}
                    label={formatLabel(json)}
                    placeholder={"enter text..."}
                  />
                ) : (
                    <MaterialNativeSelect
                      key={json}
                      label={formatLabel(json)}
                      labelError={blank_text_error}
                      defaultValue={""}
                      name={json}
                    >
                      <option value={""}>Select</option >
                      {Object.keys(jsonGeneralInfo[json]).map((key) =>
                        key != "label" && key != "selected" ? (
                          <option key={key} value={key}>
                            {key}
                          </option >
                        ) : null
                      )}
                    </MaterialNativeSelect>
                  );
              })}
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} container justify="flex-end">
              <Button
                type="submit"
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
    </Grid>
  );
}