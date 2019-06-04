console.log('Client-side code running');

const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
  e.preventDefault();
  console.log('button was clicked');
});