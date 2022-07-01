import React, { useEffect, useState } from 'react';

const Cell = (props) => {

  const determineDisplay = ({ x, y }, value) => {
    return value
  }

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(props.value);
  const [display, setDisplay] = useState(
    determineDisplay(
      { x: props.x, y: props.y },
      props.value
    )
  )

  useEffect(()=>{
    setDisplay(determineDisplay(
      { x: props.x, y: props.y }, value
    ))
  },[props.x, props.y, value]);

  const onChange = (e) => {
    setValue(e.target.value)
    setDisplay(determineDisplay(
      { x: props.x, y: props.y }, e.target.value))
  }
  
  const onKeyPressOnInput = (e) => {
    if (e.key === 'Enter') {
      hasNewValue(e.target.value)
    }
  }

  const onKeyPressOnSpan = () => {
    if (!editing) {
      setEditing(true);
    }
  }

  const onBlur = (e) => {
    hasNewValue(e.target.value)
  }

  const hasNewValue = (value) => {
    props.onChangedValue(
      {
        x: props.x,
        y: props.y,
      },
      value,
    )
    setEditing(false);
  }

  const clicked = () => {
    setEditing(true);
  }

  const calculateCss = () => {
    const css = {
      width: '100px',
      padding: '4px',
      margin: '0',
      height: '30px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      border: '1px solid #cacaca',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '14px',
      lineHeight: '15px',
      overflow: 'hidden',
    }

    if (props.x === 0 || props.y === 0) {
      css.textAlign = 'center'
      css.backgroundColor = '#f0f0f0'
      css.fontWeight = 'bold'
    }

    return css
  }

  const css = calculateCss()

  // column 0
  if (props.x === 0) {
    return (
      <span style={css}>
        {props.y}
      </span>
    )
  }

  // row 0
  if (props.y === 0) {
    const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('')
    return (
      <span
        onKeyPress={onKeyPressOnSpan}
        style={css}
        role="presentation">
        {alpha[props.x]}
      </span>
    )
  }

  if (editing) {
    return (
      <input
        style={css}
        type="text"
        onBlur={onBlur}
        onKeyPress={onKeyPressOnInput}
        value={value}
        onChange={onChange}
        autoFocus
      />
    )
  }

  return (
    <span
      onClick={e => clicked(e)}
      style={css}
      role="presentation"
    >
      {display}
    </span>
  )
}

export default Cell;