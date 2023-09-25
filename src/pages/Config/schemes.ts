import * as y from 'yup';

export const workScheme = y.object({
  das: y.string().required('Digite a hora inicial'),
  as: y.string().required('Digite a hora final'),
});

export const daySchemeVocation = y.object({
  das: y.string().required('Informe a hora').min(5, 'Mínimo 4 digitos'),
  as: y.string().required('*').min(5, 'Mínimo 4 digitos'),
  day: y.string().required('Informe o dia'),
  month: y.string().required('Infrome o mes'),
});

export const weekSchemeVocation = y.object({
  das: y.string().required('*').min(5, 'Mínimo 4 digitos'),
  as: y.string().required('*').min(5, 'Mínimo 4 digitos'),
});

export const monthSchemeVocation = y.object({
  das: y.string().required('*').min(5, 'Mínimo 4 digitos'),
  as: y.string().required('*').min(5, 'Mínimo 4 digitos'),
  month: y.string().optional(),
});

export const serviceScheme = y.object({
  name: y.string().required('Informe o nome'),
  description: y.string().required('Informe a descrição'),
  time: y.string().required('Informe o tempo de serviço'),
  value: y.string().required('Informe o valor'),
});
