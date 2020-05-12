import React from 'react';
import './styles.css';

const InputContainer = ({ labelName, value, type="text", handleInputChange }) => {
  return (
    <div className="account-container">
      <label htmlFor="">{labelName}</label>
      <input
        type={type}
        className="account-input"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default InputContainer;