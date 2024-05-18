const monthsNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const monthsNames2 = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const addZero = (value) => {
  if (value < 10) {
    return '0' + value;
  }
  return '' + value;
}

const checkParent = (el, parent)=>{
  if( el!= parent){
      if (!el.parentNode){
          return false;
      }
      return checkParent(el.parentNode, parent);
  }
  return true;
}

export {monthsNames, monthsNames2, addZero, checkParent};