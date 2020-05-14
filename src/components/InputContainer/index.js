import React from 'react';
import './styles.css';

const InputContainer = ({ labelName, value, type="text", handleInputChange }) => {
  return (
    <div className="account-container">
      <label className="block text-gray-700 text-sm font-bold mb-2">{labelName}</label>
      <input
        type={type}
        className="account-input bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-2 block w-full appearance-none leading-normal"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default InputContainer;