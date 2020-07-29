import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import {TextField } from '@material-ui/core';
import Colors from "../../Styles/Colors";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    inputLabel: {
        marginTop: theme.spacing(1),
        color: Colors.grayDark,
        fontWeight: 'bold',
    },
    inputText: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(1),
    },
  }));

export default function MaterialInput({ name, label, placeholder, labelError, ...rest }) {
  const inputRef = useRef(null);
  const classes = useStyles();

  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && <label className={classes.inputLabel} htmlFor={fieldName}>{label}</label>}
      <TextField
        error={error ? true : false}
        inputRef={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        className={classes.inputText}
        placeholder={placeholder}
        inputProps={{
          style: {
            padding: 10
          }
       }}
       variant={"outlined"}
        {...rest}
      />
      {error && <span style={{ color: "#f00" }}>{labelError}</span>}
    </>
  );
}