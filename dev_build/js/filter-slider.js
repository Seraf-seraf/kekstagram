const preview = document.querySelector('.img-upload__preview img');
const filterList = document.querySelector('.effects__list');
const sliderFilter = document.querySelector('.effect-level');
const filterValue = document.querySelector('.effect-level__value');

sliderFilter.style.display = 'none';


noUiSlider.create(sliderFilter, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function(value) {
      if(Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(1);
    },
    from: function(value) {
      return parseFloat(value);
    }
  },
});

let currentFilter = '';
let valueEffect = 0;
sliderFilter.noUiSlider.on('update', () => {
  valueEffect = sliderFilter.noUiSlider.get();
  filterValue.value = valueEffect;

  const filterHandle = document.querySelector('.noUi-horizontal .noUi-handle');
  filterHandle.style.setProperty('--value-filter', `"${valueEffect}"`);

  getCurrentValueFilter(currentFilter, valueEffect);
});

filterList.addEventListener('change',  onClickFilter);

const getFormatValueFilter = (target) => {
  //Проверка наименования фильтра и установка нужного форматата
  if(target.includes('marvin')) {
    sliderFilter.noUiSlider.updateOptions({
      format: {
        to: function(value) {
          return value.toFixed(0);
        },
        from: function(value) {
          return value;
        }
      },
    });
  } else {
    sliderFilter.noUiSlider.updateOptions({
      format: {
        to: function(value) {
          if(Number.isInteger(value)) {
            return value;
          }
          return value.toFixed(1);
        },
        from: function(value) {
          return parseFloat(value);
        }
      },
    });
  }
};

function onClickFilter(evt) {
  const target = evt.target.getAttribute('value');
  preview.className = '';

  getFormatValueFilter(target);

  if(target.includes('none')) {
    sliderFilter.style.display = 'none';
    currentFilter = 'none';
  } else {
    sliderFilter.style.display = 'block';
  }

  if(target.includes('chrome')) {
    sliderFilter.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      step: 0.1
    });
    preview.classList.add('effects__preview--chrome');
    currentFilter = 'chrome';
  }

  if(target.includes('sepia')) {
    sliderFilter.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      step: 0.1
    });
    preview.classList.add('effects__preview--sepia');
    currentFilter = 'sepia';
  }

  if(target.includes('marvin')) {
    sliderFilter.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      step: 1
    });
    preview.classList.add('effects__preview--marvin');
    currentFilter = 'marvin';
  }

  if(target.includes('phobos')) {
    sliderFilter.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      step: 0.1
    });
    preview.classList.add('effects__preview--phobos');
    currentFilter = 'phobos';
  }

  if(target.includes('heat')) {
    sliderFilter.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      step: 0.1
    });
    preview.classList.add('effects__preview--heat');
    currentFilter = 'heat';
  }

  sliderFilter.noUiSlider.set(0);
  getCurrentValueFilter(currentFilter, valueEffect);
}

function getCurrentValueFilter(filterName, value) {
  if(filterName === 'none') {preview.style.filter = 'none';}
  if(filterName === 'sepia') {preview.style.filter = `sepia(${value})`;}
  if(filterName === 'chrome') {preview.style.filter = `grayscale(${value})`;}
  if(filterName === 'marvin') {preview.style.filter = `invert(${value}%)`;}
  if(filterName === 'phobos') {preview.style.filter = `blur(${value}px)`;}
  if(filterName === 'heat') {preview.style.filter = `brightness(${value})`;}
}

const resetFilters = () => {
  sliderFilter.style.display = 'none';
  preview.className = '';
  preview.style = 'none';
};

export { sliderFilter, onClickFilter, resetFilters };
