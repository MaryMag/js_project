//==
// Запрос на сервер
//==
var form = document.forms.form;

qS('.btn__make-order').addEventListener('click', function(e) {
  e.preventDefault();
  if(validation()) {
  var url = 'https://jsonplaceholder.typicode.com/posts/1';
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      qS('.loader').style.display = 'block'
      qS('.modal_order').style.display = 'none';

      setTimeout(function(){
       qS('.loader').style.display = 'none'
       var result = qS('.modal_success');
       result.style.display = 'block'
      setTimeout(function(){
        result.style.display = 'none';
        form.submit();}
      , 1500)
    }, 1000)



      }

   }
  xhttp.open('GET', url);

  xhttp.send();

  };


});


function validation(){
  var validation = true;

  var fields = Array.from(form.querySelectorAll('input[type="text"]'));

  var reForm = {
    name: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/,
    phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    mail: /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/
  }
  for(var i = 0; i < fields.length; i++){
    var field = fields[i];
    var value = field.value;
    var type = field.dataset.type;
    if(!reForm[type].test(value)){
      validation = false;
      field.classList.add('modal__input--error');
    }
    else{
      field.classList.remove('modal__input--error');
    }
  }

  return validation;
}