/* eslint-disable no-underscore-dangle */

export function _hora(text: string) {
  let value = null;

  if (text) {
    value = text.replace(/\D/g, '');

    value = value.replace(/^(\d{2})(\d)/, '$1:$2');
  }

  return value;
}

export function _stringToNumber(text: string) {
  let value = null;
  value = text.replace(/\D/g, '');

  return Number(value);
}

export function _money(e: string) {
  let value = null;

  if (e) {
    value = e.replace(/\D/g, '');

    value = value.replace(/(\d)(\d{2})$/, '$1,$2');

    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

    value = `R$ ${value}`;
  }

  return value;
}
