# Day 1 - JavaScript Fundamentals

### [Crash Course Tutorial Video](https://www.youtube.com/watch?v=hdI2bqOjy3c)

### [JS CheatSheet](https://embed.plnkr.co/plunk/8ujYdL1BxZftGoS4Cf14)

## What is JavaScript?

- High level, Interpreted programming language
- Conforms to ECMAScript specification
- Multi-paradigm
- Runs on client/browser and server with `Node.js`

## Why one should learn JS?

- Programming language which runs on browser
- Build interactive UI with frameworks like `React`
- Building very fast server side and full stack apps
- Used in Mobile dev with `React native, Ionic`
- Desktop Apps with `ElectronJS`

## What one needs to learn?

- Variables & Data types
- Arrays
- Object Literals
- Methods for data structures
- Conditionals - if, ternary, switch
- Functions - normal & arrow
- OOP - prototypes and classes
- DOM selection
- DOM manipulation
- Events
- Form Validation

## Variables

- var is globally scoped
- let is block level scoped and can be reassigned
- const is block level scoped and can't be reassigned

- Always use const until you know you are going to reassign the variable

## Data types

- String
  - const name = 'John';
- Numbers
  - const age = 30;
  - const rating = 4.5;
- Boolean
  - const isCool = true;
- null
  - const x = null;
- undefined
  - const y = undefined;
  - let z;

console.log(typeof age);

## Concatenation

    console.log(`My name is ${var_name} and I am ${age}`);

## String Methods

    console.log(s.toUpperCase()):
    console.log(s.length);
    console.log(s.toLowerCase());
    console.log(s.substring(0,5).toUpperCase());
    console.log(s.split(''));

## Arrays

    Arrays are variables that holds multiple values

    const numbers = new Array(1,2,3,4,5);
    const fruits = ['abc', 23];

    console.log(fruits[0]); //Retreive value of Array index

    fruits.push('mangoes'); //Add at end
    fruits.unshift('banana'); //Add at beginning
    fruits.pop(); //Remove last value

    console.log(fruits.indexOf('oranges)); //Retreive index of Array item

## Object Literals

    const person = {
        firstName: 'John',
        lastName: 'Doe',
        age: 21,
        hobbies: ['music', 'movies', 'sports'],
        address: { street: 'Some Colony', city: 'Nevada'}
    }

    console.log(person.hobbies[1]);

    person.email = 'john@gmail.com';

    const personJSON = JSON.stringify(person); //Convert Object literals to JSON
    console.log(personJSON);

## Loops and Methods

### For Loop

    for(let i = 0; i < arrayName.length; i++){
        console.log(arrayName[i].text);
    }

### While Loop

    let i = 0;
    while(i < 10) {
        console.log(i);
        i++;
    }

### forEach Loop

    person.forEach( function(todo){
        console.log(todo.text);
    });

### Map - Return Array

    const todoText = person.map( function(todo){
        return todo.text;
    });

### Filter

    const todoCompleted = person.filter(function(todo){
        return todo.isCompleted === true;
    });

## Conditional Statements

### If-Else

    if(x === 10) {
    console.log('X is 10');
    } else {
    console.log('X is not 10');
    }

### Turnary operator

    const color = x > 10 ? 'red' : 'blue';

### Switch

    switch(){
        case 'red':
            console.log('red');
            break;
        case 'blue':
            console.log('blue);
            break;
        default:
            console.log('Not Red or Blue');
            break;
    }

## Functions

### Simple Function

    function addNums(num1 = 0 , num2 = 0){
        return num1 + num2;
    }

### Arrow Function

    const addNums = (num1, num2) => num1 + num2;

## Object Oriented Programming (OOP) Concept

    class Person{
        constructor(firstName, lastName, dob){
            this.firstName = firstName;
            this.lastName = lastName;
            this.dob = new Date(dob);
        }

        getBirthYear(){
            return this.dob.getFullYear();
        }
    }

    const person1 = new Person('John', 'Doe', '05-09-1999');

    console.log(person1.dob.getFullYear());
    console.log(person1.dob.getBirthYear());

## DOM - Document Object Model

### Single Element Selectors

    console.log(document.getElementById('my-form'));
    console.log(document.querySelector('.container'));

### Multiple Element Selectors

    console.log(document.querySelectorAll('.item'));
    console.log(document.getElementsByTagName('li'));
    console.log(document.getElementsByClassName('item'));

    const items = document.querySelectorAll('.item');
    items.forEach((item) => console.log(item));

### MANIPULATING THE DOM

    const ul = document.querySelector('.items');
    // ul.remove();
    // ul.lastElementChild.remove();
    ul.firstElementChild.textContent = 'Hello';
    ul.children[1].innerText = 'Brad';
    ul.lastElementChild.innerHTML = '<h1>Hello</h1>';

    const btn = document.querySelector('.btn');
    // btn.style.background = 'red';

## Events

### Mouse Event

    btn.addEventListener('click', e => {
    e.preventDefault();
    console.log(e.target.className);
    document.getElementById('my-form').style.background = '#ccc';
    document.querySelector('body').classList.add('bg-dark');
    ul.lastElementChild.innerHTML = '<h1>Changed</h1>';
    });

### Keyboard Event

    const nameInput = document.querySelector('#name');
    nameInput.addEventListener('input', e => {
    document.querySelector('.container').append(nameInput.value);
    });

## Form Validation

### Put DOM elements into variables

    const myForm = document.querySelector('#my-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const msg = document.querySelector('.msg');
    const userList = document.querySelector('#users');

### Listen for form submit

    myForm.addEventListener('submit', onSubmit);

    function onSubmit(e) {
    e.preventDefault();

    if(nameInput.value === '' || emailInput.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
    } else {
        // Create new list item with user
        const li = document.createElement('li');

        // Add text node with input values
        li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

        // Add HTML
        // li.innerHTML = `<strong>${nameInput.value}</strong>e: ${emailInput.value}`;

        // Append to ul
        userList.appendChild(li);

        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
    }
    }
