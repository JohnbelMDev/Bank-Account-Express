let balance = document.getElementById('balance');
let current = 0;
let section = document.getElementById('section');


let deleteButton = document.getElementsByClassName('deleteButton')

Array.from(deleteButton).forEach(function(element) {
      element.addEventListener('click', function(){
        // const name = this.parentNode.parentNode.childNodes[1].innerText
        // const msg = this.parentNode.parentNode.childNodes[3].innerText
        // const deleteButton = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('/deleteDonation', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'id': element.value,
            // 'msg': msg,
            // 'thumbUp':thumbUp
          })
        })
        .then(response => {
        response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});













fetch('/getData')
.then(response => response.json())
.then(data => {
  if(data.length == 0){ //if there is no accounts
    balance.innerHTML = 'There is no account!'
    // section.hidden = false;
  }else{
    document.getElementById('balance').innerHTML = '$' + data[0].balance;
    current = data[0].balance;
  }
})

//when the deposit button is clicked
document.getElementById('deposit').addEventListener('click',function(){
  let amount = document.getElementById('amount').value;
  let total = parseInt(current)+ parseInt(amount);
  console.log(total);
  fetch(`deposit?name=Johnbel&amount=${total}`)
  .then(response=> window.location.reload())
});
document.getElementById('delete').addEventListener('click',function(){
  fetch(`/delete`,{
    method:'delete'
  })
  // reload everytime the user is clicked
  .then(response=> window.location.reload())
})
