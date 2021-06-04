(function (DOM, document) {
  'use strict';

  /*
  Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
  coluna na tabela, com um botão de remover.
  Ao clicar nesse botão, a linha da tabela deve ser removida.
  Faça um pull request no seu repositório, na branch `challenge-31`, e cole
  o link do pull request no `console.log` abaixo.
  Faça um pull request, também com a branch `challenge-31`, mas no repositório
  do curso, para colar o link do pull request do seu repo.
  */

  console.log('https://github.com/gstimm/desafio-30-js-ninja/pull/3');

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
        const $tdDelete = document.createElement('td');
        const $image = document.createElement('img');
        const $deleteButton = document.createElement('button');

        $image.src = DOM('[data-js="car-image"]').get().value;
        $tdModel.textContent = DOM('[data-js="car-model"]').get().value;
        $tdYear.textContent = DOM('[data-js="car-year"]').get().value;
        $tdPlate.textContent = DOM('[data-js="car-plate"]').get().value;
        $tdColor.textContent = DOM('[data-js="car-color"]').get().value;
        $deleteButton.textContent = 'X';

        $tdDelete.appendChild($deleteButton);
        $tdImage.appendChild($image);
        $tr.appendChild($tdImage);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdDelete);
        
        $deleteButton.addEventListener('click', this.removeCar, false);

        this.clearInput($input);

        return $fragment.appendChild($tr);
      },

      removeCar: function () {
        const carIndex = this.parentNode.parentNode.rowIndex;
        document.querySelector('table').deleteRow(carIndex);
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
      },
    }
  })();

  app.init();

})(window.DOM, document);
