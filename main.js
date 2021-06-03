(function (DOM, document) {
  'use strict';

  /*
  A loja de carros será nosso desafio final. Na aula anterior, você fez a parte
  do cadastro dos carros. Agora nós vamos começar a deixar ele com cara de
  projeto mesmo.
  Crie um novo repositório na sua conta do GitHub, com o nome do seu projeto.
  Na hora de criar, o GitHub te dá a opção de criar o repositório com um
  README. Use essa opção.
  Após criar o repositório, clone ele na sua máquina.
  Crie uma nova branch chamada `challenge-30`, e copie tudo o que foi feito no
  desafio da aula anterior para esse novo repositório, nessa branch
  `challenge-30`.
  Adicione um arquivo na raiz desse novo repositório chamado `.gitignore`.
  O conteúdeo desse arquivo deve ser somente as duas linhas abaixo:
  node_modules
  npm-debug.log
  Faça as melhorias que você achar que são necessárias no seu código, removendo
  duplicações, deixando-o o mais legível possível, e então suba essa alteração
  para o repositório do seu projeto.
  Envie um pull request da branch `challenge-30` para a `master` e cole aqui
  nesse arquivo, dentro do `console.log`, o link para o pull request no seu
  projeto.
  */

console.log(
  'Link do seu projeto no seu github de forma privada, adicionando aristotelesFerreira'
);

  const app = (() => {
    return {
      init: function () {
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function () {
        DOM('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function (e) {
        e.preventDefault();
        const $tableCar = DOM('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar: function () {
        const $input = DOM('input');

        this.hasEmptyInputs($input);

        const $fragment = document.createDocumentFragment();
        const $tr = document.createElement('tr');
        const $tdImage = document.createElement('td');
        const $tdModel = document.createElement('td');
        const $tdYear = document.createElement('td');
        const $tdPlate = document.createElement('td');
        const $tdColor = document.createElement('td') ;
        const $image = document.createElement('img');

        $image.src = DOM('[data-js="car-image"]').get().value;
        $tdModel.textContent = DOM('[data-js="car-model"]').get().value;
        $tdYear.textContent = DOM('[data-js="car-year"]').get().value;
        $tdPlate.textContent = DOM('[data-js="car-plate"]').get().value;
        $tdColor.textContent = DOM('[data-js="car-color"]').get().value;

        $tdImage.appendChild($image);
        $tr.appendChild($tdImage);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);

        this.clearInput($input);

        return $fragment.appendChild($tr);
      },

      companyInfo: function () {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function () {
        if (!app.isReady.call(this))
          return;
        
        const data = JSON.parse(this.responseText);
        const $companyName = DOM('[data-js="company-name"]').get();
        const $companyPhone = DOM('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function () {
        return this.readyState === 4 && this.status === 200;
      },

      clearInput: function ($input) {
        $input.map(input => input.value = '');
      },

      hasEmptyInputs: function ($input) {
        $input.forEach(input => {
          if(!input.value) {
            alert('Preencha todos os campos.');
            throw new Error('Please fill all fields');
          }
        })
      }
    }
  })();

  app.init();

})(window.DOM, document);
