export interface IServiceProvider {
  id: string;
  amount: number;
  created_at: Date | string;
  description: string;
  duration: number;
  fk_provider_id: string;
  image: string;
  name: string;
  updated_at: Date | string;
}

export interface IVocation {
  id: string;
  created_at: Date | string;
  end: Date | string;
  fk_provider_id: string;
  start: Date | string;
  type: string;
  updated_at: Date | string;
  weekend: number[];
}

export interface IWorkHour {
  at: number;
  created_at: Date | string;
  fk_provider_id: string;
  from: number;
  id: string;
  updated_at: Date | string;
  week: number[];
}

export interface IAppointment {
  created_at: Date | string;
  client_name: string;
  end: Date | string;
  fk_client_id: string;
  fk_provider_id: string;
  id: string;
  service: string;
  start: Date | string;
  formated: string;
  updated_at: Date | string;
  status: 'pendente' | 'realizado' | 'não realizado';
}

export interface IProvider {
  avatar: string;
  cell: string;
  city: string;
  cnpj: string;
  cpf: string;
  created_at: Date | string;
  email: string;
  home_number: string;
  id: string;
  locality: string;
  name: string;
  password: string;
  postal_code: string;
  razao_social: string;
  region_code: string;
  updated_at: Date | string;

  Service: IServiceProvider[];
  Vocation: IVocation[];
  appointment: IAppointment[];
  workhour: IWorkHour;
}

export interface IClient {
  avatar: string;
  cell: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
}
