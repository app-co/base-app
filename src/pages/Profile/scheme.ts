import * as y from 'yup';

export const schemeProfile = y.object({
  name: y.string().optional(),
  email: y.string().email().optional(),
  cell: y.string().optional(),
  cnpj: y.string().optional(),
  cpf: y.string().optional(),

  locality: y.string().optional(),
  city: y.string().optional(),
  home_number: y.string().optional(),
  region_code: y.string().optional(),

  postal_code: y.string().optional(),
  razao_social: y.string().optional(),
});
