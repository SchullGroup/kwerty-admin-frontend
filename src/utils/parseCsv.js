function parseCsv(data, fs, nl) {
  const fieldSep = fs || ',';
  const newLine = nl || '\n';
  const nSep = '\x1D';
  const qSep = '\x1E';
  const cSep = '\x1F';
  const nSepRe = new RegExp(nSep, 'g');
  const qSepRe = new RegExp(qSep, 'g');
  const cSepRe = new RegExp(cSep, 'g');
  const fieldRe = new RegExp(
    `(?<=(^|[${fieldSep}\\n]))"(|[\\s\\S]+?(?<![^"]"))"(?=($|[${fieldSep}\\n]))`, 'g',
  );
  const grid = [];
  data
    .replace(/\r/g, '')
    .replace(/\n{1,5}$/, '')
    .replace(fieldRe, (match, p1, p2) => p2.replace(/\n/g, nSep)
      .replace(/""/g, qSep)
      .replace(/,/g, cSep))
    .split(/\n/)
    .forEach((line) => {
      const row = line
        .split(fieldSep)
        .map((cell) => cell
          .replace(nSepRe, newLine)
          .replace(qSepRe, '"')
          .replace(cSepRe, ','));
      grid.push(row);
    });
  return grid;
}

export default parseCsv;
