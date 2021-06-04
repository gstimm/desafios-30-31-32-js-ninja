(function (DOM, document) {
  'use strict';

  /*
  Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
  salvando-os temporariamente na memória de um servidor.
  Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
  que possamos utilizar para salvar as informações dos nossos carros.
  Para utilizá-lo, você vai precisar fazer o seguinte:
  - Via terminal, acesse o diretório `server`;
  - execute o comando `npm install` para instalar as dependências;
  - execute `node app.js` para iniciar o servidor.
  Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
  `http://localhost:3000`
  O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
  As mudanças que você irá precisar fazer no seu projeto são:
  - Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
  `http://localhost:3000/car`
  - Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
  os seguintes campos:
    - `image` com a URL da imagem do carro;
    - `brandModel`, com a marca e modelo do carro;
    - `year`, com o ano do carro;
    - `plate`, com a placa do carro;
    - `color`, com a cor do carro.
  Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.
  Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
  do pull request.
  */

  console.log('https://github.com/gstimm/desafio-30-js-ninja/pull/4');

  const app = (() => {
    return {
      init: function () {
        this.companyInfo();
        this.getCars();
        this.initEvents();
      },

      initEvents: function () {
        DOM('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function (e) {
        e.preventDefault();
        app.postCar();
      },

      createNewCar: function (car) {
        const $tr = document.createElement('tr');
        const $tdImage = document.createElement('td');
        const $tdModel = document.createElement('td');
        const $tdYear = document.createElement('td');
        const $tdPlate = document.createElement('td');
        const $tdColor = document.createElement('td') ;
        const $image = document.createElement('img');
        
        $image.src = car.image;
        $tdModel.textContent = car.model;
        $tdYear.textContent = car.year;
        $tdPlate.textContent = car.plate;
        $tdColor.textContent = car.color;

        $tdImage.appendChild($image);
        $tr.appendChild($tdImage);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild(this.removeCarButton());

        return $tr;
      },

      removeCarButton: function () {
        const $tdDelete = document.createElement('td');
        const $deleteButton = document.createElement('button');
        
        $deleteButton.textContent = 'X';
        $tdDelete.appendChild($deleteButton);

        $deleteButton.addEventListener('click', () => {
          const row = $tdDelete.parentNode;
          row.parentNode.removeChild(row);
        }, false)

        return $tdDelete;
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

      getCars: function() {
        const $tableCar = DOM('[data-js="table-car"]').get();
        const $fragment = document.createDocumentFragment();
        const ajax = new XMLHttpRequest();
        
        ajax.open('GET', 'http://localhost:3000/car');
        ajax.send();
        ajax.onreadystatechange = function() {
          if (ajax.readyState === 4) {
            console.log('Carros Listados:', JSON.parse(ajax.responseText).length);

            Array.prototype.forEach.call(JSON.parse(ajax.responseText), car => {
              console.log(JSON.parse(ajax.responseText));
              console.log(car.model);
              $fragment.appendChild(app.createNewCar(car));
            })
            $tableCar.appendChild($fragment);
          }
        }
      },

      postCar: function() {
        const ajax = new XMLHttpRequest();

        const car = {
          image: DOM('[data-js="car-image"]').get().value,
          model: DOM('[data-js="car-model"]').get().value,
          year: DOM('[data-js="car-year"]').get().value,
          plate: DOM('[data-js="car-plate"]').get().value,
          color: DOM('[data-js="car-color"]').get().value,
        };

        const $input = DOM('input');
        this.hasEmptyInputs($input);

        this.clearInput($input);

        ajax.open('POST', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send(
          `image=${car.image}&model=${car.model}&year=${car.year}&plate=${car.plate}&color=${car.color}`
        );

        ajax.onreadystatechange = function() {
          if(ajax.readyState === 4) {
            console.log('Carro cadastrado: ', ajax.responseText);
          }
        }

        window.location.reload();
      }
    }
  })();

  app.init();

})(window.DOM, document);
