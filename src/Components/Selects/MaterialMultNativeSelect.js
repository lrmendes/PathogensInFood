import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import Colors from "../../Styles/Colors";
import { makeStyles } from '@material-ui/core/styles';
import { NativeSelect, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    selectLabel: {
        marginTop: theme.spacing(2),
        color: Colors.grayDark,
        fontWeight: 'bold',
    },
    selectText: {
        marginTop: theme.spacing(0.5),
    },
    selectTextError: {
      marginTop: theme.spacing(0.5),
    },
    labelTextInfo: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(2),
      color: Colors.primaryDarkHigh
    },
    labelTextError: {
      color: Colors.errorDefault
    },
  }));

const MaterialMultNativeSelect = ({ name, label, defaultValue, labelError, ...rest }) => {
  const classes = useStyles();
  const selectRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  const [selectedNumber, setSelectedNumber] = useState(0);

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    let total = 0;
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        total += 1;
      }
    }
    setSelectedNumber(total);
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef,
      getValue: (ref) => {
        if (rest.multiple) {
          //console.log(fieldName);
          //console.log(selectRef);

          if (!ref.current.value) {
            return [];
          }

          let value = [];
          const { options } = selectRef.current;
          for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
              value.push(options[i].value);
            }
          }
          return value;
          //return ref.current.value.map((option) => option.value);
        }
        if (!ref.current.value) {
          return '';
        }
        return ref.current.value;
      },
    });
  }, [fieldName, registerField, rest.multiple]);

  return (
      <>
        {label && <label className={classes.selectLabel} htmlFor={fieldName}>{label}</label>}
        <Select
            native={true}
            inputRef={selectRef}
            defaultValue={defaultValue}
            className={classes.selectText}
            id={fieldName}
            variant="outlined"
            inputProps={{
                style: {
                    padding: 10,
                }
            }}
            onChange={handleChangeMultiple}

            {...rest}
        />
        {error && <span className={classes.labelTextError}>{labelError}</span>}
        {<span className={classes.labelTextInfo}>Selected Items: {selectedNumber}</span>}
    </>
  );
};

export default MaterialMultNativeSelect;