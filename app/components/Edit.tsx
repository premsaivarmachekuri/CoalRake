'use client';
import React, { useState } from 'react';
import axios from 'axios'
  
const ToggleFormModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [numericalInput, setNumericalInput] = useState('');
    const [message, setMessage] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const options1 = ['BAUDPUR', 'BAGHUAPAL', 'CHATRAPUR', 'CHILIKIDARA'];
    const options2 = ['Status', 'Train', 'Start_Time', 'End_Time'];
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Check if any of the fields are empty
      if (!selectedOption1 || !selectedOption2 || !numericalInput) {
        setValidationMessage('Please fill in all fields');
        return;
      }
  
      // Clear the validation message
      setValidationMessage('');
      const response = axios.post("http://localhost:3002/edit-sidings", {
        siding: selectedOption1 ,
        property:selectedOption2,
        value:numericalInput

      })
  
      // Handle form submission logic here
      window.alert('Form submitted successfully');
  
      // Clear the form fields
      setSelectedOption1('');
      setSelectedOption2('');
      setNumericalInput('');
    };
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    return (
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Edit Details 
        </button>
  
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 w-full mx-2 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Form Modal</h2>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={closeModal}
                >
                  &#x2715; {/* Close (cross) icon */}
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                {/* Dropdown 1 */}
                <div className="mb-4">
                  <label htmlFor="option1" className="block font-semibold mb-2">
                    Dropdown 1
                  </label>
                  <select
                    id="option1"
                    className="w-full p-2 border rounded"
                    value={selectedOption1}
                    onChange={(e) => setSelectedOption1(e.target.value)}
                  >
                    <option value="">Select an option</option>
                    {options1.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
  
                {/* Dropdown 2 */}
                <div className="mb-4">
                  <label htmlFor="option2" className="block font-semibold mb-2">
                    Dropdown 2
                  </label>
                  <select
                    id="option2"
                    className="w-full p-2 border rounded"
                    value={selectedOption2}
                    onChange={(e) => setSelectedOption2(e.target.value)}
                  >
                    <option value="">Select an option</option>
                    {options2.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
  
                {/* Numerical Input */}
                <div className="mb-4">
                  <label htmlFor="numericalInput" className="block font-semibold mb-2">
                    Numerical Input
                  </label>
                  <input
                    type="number"
                    id="numericalInput"
                    className="w-full p-2 border rounded"
                    value={numericalInput}
                    onChange={(e) => setNumericalInput(e.target.value)}
                  />
                </div>
  
                {/* Validation Message */}
                {validationMessage && (
                  <p className="text-red-500 mb-4">{validationMessage}</p>
                )}
  
                {/* Submit Button */}
                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
  
        {message && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 w-full md:w-1/2 mx-2 rounded-lg shadow-lg">
              <p className="text-lg font-semibold mb-4">{message}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setMessage('')}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ToggleFormModal;