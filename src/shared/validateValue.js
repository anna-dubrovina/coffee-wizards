import * as vars from './globalVars';

const nameRe = /^[A-Za-zА-я ]{2,}/;
const cityRe = /^[A-Za-zА-я ]{2,}/;
const addressRe = /^[\S ]{8,}/;
const emailRe =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordRe = /^(?=.*[A-ZА-яa-z])(?=.*\d)[A-ZА-яa-z\d]{8,}$/;
const postCodeRe = /^[0-9]{5}$/;
const priceRe = /[0-9.]{1,6}/;
const phoneRe =
  /^(\+)?(\d{2})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{2}[-. ]?\d{2}$/;

export const validateValue = (type, value) => {
  let isValid;
  let errorMsg;
  switch (type) {
    case vars.NAME_INPUT:
      isValid = nameRe.test(value.trim());
      errorMsg = 'Entered name is too short';
      break;
    case vars.EMAIL_INPUT:
      isValid = emailRe.test(value);
      errorMsg = 'Wrong email format';
      break;
    case vars.PHONE_INPUT:
      isValid = phoneRe.test(value);
      errorMsg = 'Wrong phone number format';
      break;
    case vars.PASSWORD_INPUT:
      isValid = passwordRe.test(value);
      errorMsg =
        'Password must be at least 8 characters long and include letters and digits';
      break;
    case vars.CITY_INPUT:
      isValid = cityRe.test(value);
      errorMsg = 'Enter valid city name';
      break;
    case vars.ADDRESS_INPUT:
      isValid = addressRe.test(value.trim());
      errorMsg = 'Entered address is too short';
      break;
    case vars.POSTCODE_INPUT:
      isValid = postCodeRe.test(value);
      errorMsg = 'Wrong post code format';
      break;
    case vars.PRICE_INPUT:
      isValid = priceRe.test(value);
      errorMsg = 'Not correct price';
      break;
    default:
      break;
  }
  return { isValid, errorMsg };
};
