// test.js
function getTestData(data) {
    return {
      message: `Hello from ${data}!`, // Use template literals for dynamic data
      value: 42,
    };
  }
  
  module.exports = getTestData; // Correct export statement