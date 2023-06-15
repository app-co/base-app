export function locale(valor: string) {
  const total = Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return total;
}
