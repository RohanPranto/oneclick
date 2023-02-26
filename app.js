(function(){
    var signIn = document.querySelector('#sign-in');
    var signOut = document.querySelector('#sign-out');
    var user = document.querySelector('#user');
    var popup = document.querySelector('#popup-sign-in');
    var login = popup.querySelector('#popup-login');
    var password = popup.querySelector('#popup-password');
    var form = popup.querySelector('#popup-sign-in-form');
    var close = popup.querySelector('#popup-close');
    var submit = popup.querySelector('#popup-submit');
    var storageLogin = localStorage.getItem('login');
  
    
    signIn.addEventListener('click',function(evt) {
      evt.preventDefault();
      popup.classList.add('visible');
      if (storageLogin) {
        login.value = storageLogin;
        password.focus();
      } else {
        login.focus();
      }
      window.addEventListener('keydown', closeIfKeyDown)
    });
    
  
    close.addEventListener('click', closePopup);
    
  
    submit.addEventListener('click', function(evt) {
      evt.preventDefault();
      if (!checkValidity(login) || !checkValidity(password)) {
        form.classList.remove('error');
        form.offsetWidth = form.offsetWidth;
        form.classList.add('error');
      } else {
        localStorage.setItem('login', login.value);
        closePopup();
        signIn.classList.add('js-hidden');
        signOut.classList.remove('js-hidden');
        user.classList.remove('js-hidden');
        user.textContent = login.value;
      }
    });
    
    
    signOut.addEventListener('click', function(evt) {
      signIn.classList.remove('js-hidden');
      signOut.classList.add('js-hidden');
      user.classList.add('js-hidden');
    });
  
    
    popup.addEventListener('click', function(evt) {
      if (evt.target === popup) {
        closePopup();
      }
    });
    
    
    function closeIfKeyDown(evt) {
      if (evt.keyCode === 27) {
        closePopup();
      }
    }
  
    
    function closePopup() {
      if (form.classList.contains('error')) {
        form.classList.remove('error');
      }
      if (popup.classList.contains('visible')) {
        popup.classList.remove('visible');
        window.removeEventListener('keydown', closeIfKeyDown);
      }
    }
    
    
    function checkValidity(input) {
      var value = input.value
      if (value.length >= 0 && value.length < 3) {
        input.classList.add('popup__input--warning');
        return false;
      } else {
        if (input.classList.contains('popup__input--warning')) {
          input.classList.remove('popup__input--warning');
        }
        return true;
      }
    }
    
    
    login.oninput = function() { checkValidity(login) };
    password.oninput = function() { checkValidity(password) };
    
  })();