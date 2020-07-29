import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import Colors from "../../Styles/Colors";
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from "@material-ui/lab";
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    selectLabel: {
        marginTop: theme.spacing(2),
        color: Colors.grayDark,
        fontWeight: 'bold',
    },
    selectText: {
        marginTop: theme.spacing(0.5),
    },
  }));

const CustomAutoComplete = ({ name, label, placeholder, defaultValue, ...rest }) => {
  const classes = useStyles();
  const selectRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef,
      getValue: (ref) => {
        console.log(selectRef);
        if (rest.isMulti) {
          if (!ref.current.value) {
            return [];
          }
          return ref.current.value.map((option) => option.value);
        }
        if (!ref.current.value) {
          return '';
        }
        return ref.current.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
      <>
        {label && <label className={classes.selectLabel} htmlFor={fieldName}>{label}</label>}
        <Autocomplete

        renderInput={(params) => <TextField {...params} ref={selectRef} inputProps={params.inputProps} placeholder={placeholder} variant="standard" InputLabelProps={{
            shrink: true,
            className: classes.inputLabel,
          }}/>}

        className={classes.selectText}
        id={fieldName}
        ref={selectRef}

        {...rest}
        />
    </>
  );
};

export default CustomAutoComplete;