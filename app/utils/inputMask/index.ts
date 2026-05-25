export type InputMask = 'phone-br' | 'cpf';

const onlyDigits = (value: string) => value.replaceAll(/\D/g, '');

const maskPhoneBr = (raw: string) => {
  const digits = onlyDigits(raw).slice(0, 11);
  if (digits.length === 0) return '';

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (rest.length === 0) return `(${ddd}`;
  if (rest.length <= 4) return `(${ddd}) ${rest}`;

  if (rest.length <= 8) {
    const p1 = rest.slice(0, 4);
    const p2 = rest.slice(4);
    return p2 ? `(${ddd}) ${p1}-${p2}` : `(${ddd}) ${p1}`;
  }

  const p1 = rest.slice(0, 5);
  const p2 = rest.slice(5);
  return p2 ? `(${ddd}) ${p1}-${p2}` : `(${ddd}) ${p1}`;
};

const maskCpf = (raw: string) => {
  const digits = onlyDigits(raw).slice(0, 11);
  if (digits.length === 0) return '';

  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 9);
  const p4 = digits.slice(9, 11);

  if (digits.length <= 3) return p1;
  if (digits.length <= 6) return `${p1}.${p2}`;
  if (digits.length <= 9) return `${p1}.${p2}.${p3}`;
  return `${p1}.${p2}.${p3}-${p4}`;
};

export function applyInputMask(
  mask: InputMask | undefined,
  raw: string
): string {
  if (!mask) return raw;
  if (mask === 'phone-br') return maskPhoneBr(raw);
  if (mask === 'cpf') return maskCpf(raw);
  return raw;
}
