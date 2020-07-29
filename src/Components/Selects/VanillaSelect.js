import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import Colors from "../../Styles/Colors";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    selectLabel: {
        marginTop: theme.spacing(2),
        color: Colors.grayDark,
        fontWeight: 'bold',
    },
    selectText: {
        marginTop: theme.spacing(0.5),
        padding: theme.spacing(0.5),
        borderRadius: 3,
        lineHeight: 4
    },
  }));

const VanillaSelect = ({ name, label, defaultValue, ...rest }) => {
  const classes = useStyles();
  const selectRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.value) {
            return [];
          }
          return ref.value.map((option) => option.value);
        }
        if (!ref.value) {
          return '';
        }
        return ref.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
      <>
        {label && <label className={classes.selectLabel} htmlFor={fieldName}>{label}</label>}

        <select
        defaultValue={defaultValue}
        className={classes.selectText} 
        ref={selectRef}
        id={fieldName}
        {...rest}
        />
    </>
  );
};

export default VanillaSelect;