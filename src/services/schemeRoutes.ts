/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-underscore-dangle

interface I {
  params?: string;
}

export const routesScheme = {
  provider: {
    create: '/provider',
    listAll: '/provider',
  },
};

export function paramsRoutesScheme(params: string) {
  const routes = {};

  return routes;
}
