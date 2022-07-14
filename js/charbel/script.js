let passwordField = document.querySelectorAll(".PasswordField");
    let passwordFieldError = document.querySelector(".PasswordFieldError");
    let ConfirmpasswordFieldError = document.querySelector(".ConfirmPasswordFieldError");
    let EmptyError = document.getElementById("EmptyError");
    let PrimaryPassword = document.querySelector(".PasswordField.Primary");
    let LoginPassword = document.getElementById("LoginPassword");
    let SecondaryPassword = document.querySelector(".PasswordField.Secondary");
    let Email_Regex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;//The regex for the Email
    let Email = document.getElementById("Email");
    let SigninEmail = document.getElementById("SigninEmail");
    let SigninEmailError = document.getElementById("SigninEmailError");
    let EmailError = document.getElementById("MailError");
    let Nom = document.getElementById("Nom");
    let Prenom = document.getElementById("Prenom");
    var regExpWeak = /^(?=.*[0-9])(?=.*[!@;#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@;#$%^&*]{8,16}$/;
    let SignupEmptyError = document.getElementById("SignupEmptyError");
    let ShowIcon = document.querySelectorAll(".show-icon");


    for (let i = 0; i < passwordField.length; i++) {
        for (let j = 0; j < ShowIcon.length; j++) {
          ShowIcon[i].classList.add("hide-btn");
            ShowIcon[i].onclick = (()=>{
                if(passwordField[i].type === "password"){
                    passwordField[i].type = "text";
                    ShowIcon[i].classList.remove("hide-btn");
                    }else{
                    passwordField[i].type = "password";
                    ShowIcon[i].classList.add("hide-btn");
                }
            });
        }
    }
    PrimaryPassword.onfocus = (()=>{
              if (PrimaryPassword.value.trim() == '') {
                    passwordFieldError.textContent = "Le champs du mot de passe est vide";
                    passwordFieldError.style.color="red";
              }
              setInterval(() => {
                if (PrimaryPassword.value.trim() == '') {
                    passwordFieldError.textContent = "Le champs du mot de passe est vide";
                    passwordFieldError.style.color="red";
                }
                else if (regExpWeak.test(PrimaryPassword.value) == true) {
                    passwordFieldError.textContent = "Votre mot de passe est valide";
                    passwordFieldError.style.color="green";
                }
                else{
                  passwordFieldError.textContent = "Votre mot de passe doit contenir une Majuscule, un minuscule, un chiffre et un caractère spéciale";
                  passwordFieldError.style.color="red";
                }
                
              }, 1500);
            });
            SecondaryPassword.onfocus = (()=>{
              if (SecondaryPassword.value.trim() == '') {
                ConfirmpasswordFieldError.textContent = "Le champs de confirmation est vide";
                ConfirmpasswordFieldError.style.color="red";
              }
              setInterval(() => {
                if (SecondaryPassword.value.trim() == '') {
                  ConfirmpasswordFieldError.textContent = "Le champs de confirmation est vide";
                  ConfirmpasswordFieldError.style.color="red";
                }
                else if (PrimaryPassword.value === SecondaryPassword.value) {
                  ConfirmpasswordFieldError.textContent = "Les mots de passes sont conformes";
                  ConfirmpasswordFieldError.style.color="green";
                }
                else{
                  ConfirmpasswordFieldError.textContent = "Les mots de passes doivent être les mêmes";
                  ConfirmpasswordFieldError.style.color="red";
                }
                
              }, 1500);
            });
    Email.onfocus = (()=>{
      setInterval(() => {
        if (Email_Regex.test(Email.value) == false) {
                EmailError.textContent = "Adresse email non valide";
                EmailError.style.color="red";
                e.preventDefault();
              }else{
                EmailError.textContent = "Adresse email valide";
                EmailError.style.color="green";
                e.preventDefault();
              }
      }, 1500);
    });


    document.getElementById("Signup-form").addEventListener("submit", function (e) {
            if (Prenom.value.trim() == '' || Nom.value.trim() == '' || PrimaryPassword.value.trim() == '' || SecondaryPassword.value.trim() == '' || Email.value.trim() == '') {
              SignupEmptyError.textContent = "Veuillez remplir tous les champs";
              SignupEmptyError.style.color="red";
              SignupEmptyError.style.fontSize="12px";
              e.preventDefault();
            }
    })
    document.getElementById("Signin-form").addEventListener("submit", function (e) {
            if (LoginPassword.value.trim() == '' || SigninEmail.value.trim() == '') {
              EmptyError.textContent = "Veuillez remplir tous les champs";
              EmptyError.style.color="red";
              EmptyError.style.fontSize="12px";
              e.preventDefault();
            }
    })
