const people = [
  {
     name:'jon', 
     age: 29
  },
  {
     name: 'tyson', 
     age: 39,
  },
  {
     name: 'Jilly', 
     age: 16,
  }, 
  {
     name: 'jordanya', 
     age: 10,
  }
];

// create the following variables

//sorted names of people
// people over the age of 20

//person with age of 10   (.find())

// average age of people

//people sorted from youngest to oldrs

// an array of all ages

// an array of all names


allName = () => {
  let nameArr = [];
  nameArr = people.map(person => {
    nameArr.push(person.name);
  }
}