let errors = {
  name: {
    message:
      "Error en el nombre. Ayuda: Debe ser de 1 a 4 nombres de 2 a 20 caracteres",
    regExp:
      /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü'"^`]{2,20})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü'"^`]{2,20})?(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü'"^`]{2,20})?(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü'"^`]{2,20})?$/,
  },
  email: {
    message: "Error en el email. Ayuda: Debe contener @ y un dominio",
    regExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  subject: {
    message: "Error en el asunto. Ayuda: Mínimo 5 caracteres. Máximo 100",
    regExp:
      /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{5,100}$/,
  },
  message: {
    message: "Error en el mensaje. Ayuda: Mínimo 10 caracteres. Máximo 400",
    regExp:
      /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{10,400}$/,
  },
};

const contactFormHTML = document.querySelector(".form");
const submitButton = contactFormHTML.querySelector("[type=submit]");
const contactForm = new Form(contactFormHTML, errors, submitButton);
