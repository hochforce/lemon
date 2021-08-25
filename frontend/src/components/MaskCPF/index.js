export function maskCpfCnpj(value) {
  if (!value) return value;

  if (value.length === 11) {
    return (
      value.slice(0, 3) +
      '.' +
      value.slice(3, 6) +
      '.' +
      value.slice(6, 9) +
      '-' +
      value.slice(9, 12)
    );
  } else if (value.length === 14) {
    return (
      value.slice(0, 2) +
      '.' +
      value.slice(2, 5) +
      '.' +
      value.slice(5, 8) +
      '/' +
      value.slice(8, 12) +
      '-' +
      value.slice(12, 15)
    )
  }
}