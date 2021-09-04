module.exports = {
  generateID: (length) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let ID = "";

    for (let i = 0; i < length; i++) {
      ID += numbers[Math.floor(Math.random() * numbers.length)];
    }
    
    return ID;
  },
  objectIsEmpty: (object) => {
    return Object.keys(object).length < 1;
  }
}