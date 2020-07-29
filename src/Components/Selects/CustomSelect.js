import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import Colors from "../../Styles/Colors";
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
    selectLabel: {
        marginTop: theme.spacing(1),
        color: Colors.grayDark,
        fontWeight: 'bold',
    },
    selectText: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
    selectTextError: {
      marginTop: theme.spacing(0.5),
    },
    labelTextError: {
      marginBottom: theme.spacing(1),
      color: "#f00",
    }
  }));

const CustomSelect = ({ name, label, items, defaultValue, labelError, ...rest }) => {
  const classes = useStyles();
  const selectRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  const optionsFormat = items.map(v => ({
    label: v,
    value: v
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
      <>
        {label && <label className={classes.selectLabel} htmlFor={fieldName}>{label}</label>}
        <Select
            className={error ? classes.selectTextError : classes.selectText}
            menuPortalTarget={document.querySelector('body')}
            ref={selectRef}
            options={optionsFormat}
            {...rest}
        />
        {error && <span className={classes.labelTextError}>{labelError}</span>}
    </>
  );
};

export default CustomSelect;