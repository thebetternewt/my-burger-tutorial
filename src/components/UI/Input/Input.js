import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (!props.valid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('textarea'):
      inputElement = <textarea
        onBlur={props.changed}
        onChange={props.changed}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}/>;
      break;
    case ('select'):
      inputElement = (
        <select
          onChange={props.changed}
          className={inputClasses.join(' ')}
          value={props.value}>
          {props.elementConfig.options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input
        onBlur={props.changed}
        onChange={props.changed}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}/>;
  }

  return (
  <div className={classes.Input}>
    <label className={classes.Label}>{props.label}</label>
    {inputElement}
  </div>
  )
};

export default input;
