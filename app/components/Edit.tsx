import React, { useState } from 'react';
import axios from 'axios';

const ToggleFormModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [numericalInput, setNumericalInput] = useState('');
  const [message, setMessage] = useState('');

  const options1 = ['BAUDPUR', 'BAGHUAPAL', 'CHATRAPUR', 'CHILIKIDARA'];
  const options2 = ['Status', 'Train', 'Start_Time', 'End_Time'];

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedOption1 && selectedOption2 && numericalInput) {
        console.log("Hello")
        const response = await axios.post('http://localhost:3002/edit-sidings', {
          siding: selectedOption1,
          train: selectedOption2,
          value: numericalInput,
        });

        console.log('Data sent successfully:', response.data);
        window.alert('Form submitted successfully');

        setSelectedOption1('');
        setSelectedOption2('');
        setNumericalInput('');
      } else {
        alert('Please fill in all fields.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(!showModal)}
      >
        Toggle Modal
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 w-full mx-2 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Form Modal</h2>
            <form onSubmit={handleSubmit}>
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
                  {options1.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
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
                  {options2.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="numericalInput"
                  className="block font-semibold mb-2"
                >
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
