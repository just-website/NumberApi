"use strict";

const randomFact = selector => {
  const element = document.querySelector(selector);
  const button = element.querySelector('.j-button');
  const tabs = element.querySelectorAll('.j-tab');
  const input = element.querySelector('.j-input');
  const factArea = element.querySelector('.j-fact');
  let dataMode = '';

  try {
    element.lenght;
  } catch (error) {
    console.log(error);
  }

  const checkNumber = value => {
    return !isNaN(Number(value)) || value[0] === '-' && !isNaN(Number(value.slice(1)));
  };

  const setDataMode = elem => {
    if (!elem.dataset.mode) {
      return false;
    } else {
      return dataMode = elem.dataset.mode;
    }
  };

  const toggleActive = (...elems) => {
    for (let elem of elems) {
      if (elem.length) {
        toggleActive(...elem);
      } else elem.addEventListener('mousedown', function () {
        this.classList.add('active');
        setDataMode(this);
        this.addEventListener('mouseup', function () {
          this.classList.remove('active');
        });
      });
    }
  };

  toggleActive(button, tabs);

  const getRandomFact = value => {
    const num = Number(value.trim());
    const url = dataMode ? `http://numbersapi.com/${num}/${dataMode}` : `http://numbersapi.com/${num}`;
    return fetch(url).then(data => data.text()).catch(error => error);
  };

  const translate = text => {
    const key = 'trnsl.1.1.20170814T101309Z.e2c6d2f6afe48015.34056fca7741ea623ac8159e70c7542fc12a1506';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=en-ru&format=plain&options=1`;
    return fetch(url).then(data => data.text()).then(data => JSON.parse(data)).then(data => data.text[0]).catch(error => error);
  };

  input.addEventListener('input', function () {
    this.value = this.value.trim();
    console.log(typeof this.value);
    if (!checkNumber(this.value)) this.value = this.value.slice(0, -1);
  });
  button.addEventListener('click', async function () {
    factArea.classList.remove('active');
    const text = await getRandomFact(input.value);
    const translateText = await translate(text);
    factArea.textContent = translateText;
    factArea.classList.add('active');
  });
};

randomFact('.block');