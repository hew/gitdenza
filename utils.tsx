export const alphabetValues = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
};

export const countNumbers = (accumulator: number, current: string) => {
  let newCount = parseInt(current) + accumulator;
  return newCount;
};

export const countLetters = (accumulator: number, current: string) => {
  let newCount = alphabetValues[current] + accumulator;
  return newCount;
};

export const DistortionSVGFilter = (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg-filters">
      <defs>
        <filter id="filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0 0.15"
            numOctaves="1"
            result="warp"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="8"
            in="SourceGraphic"
            in2="warp"
          />
        </filter>
      </defs>
    </svg>
  );

export const determineStyle = (ratio: number, mode) => {
  const funk = [
    '#000',
    '#fff',
    '#609',
    '#306',
    '#f6f6f6',
    '#b5d5ff',
    '#808080',
    '#bfbbbb',
  ];

  const swiss = [
    'hsl(10, 20%, 20%)',
    'hsl(10, 10%, 98%)',
    'hsl(10, 80%, 50%)',
    'hsl(10, 60%, 50%)',
    'hsl(10, 40%, 90%)',
    'hsl(250, 60%, 30%)',
    'hsl(10, 20%, 94%)',
    'hsl(10, 20%, 50%)',
  ];

  const deep = [
    'hsl(210, 50%, 96%)',
    'hsl(230, 25%, 18%)',
    'hsl(260, 100%, 80%)',
    'hsl(290, 100%, 80%)',
    'hsl(260, 20%, 40%)',
    'hsl(290, 100%, 80%)',
    'hsla(230, 20%, 0%, 20%)',
    'hsl(210, 50%, 60%)',
  ];

  const tosh = [
    '#000',
    '#fff',
    '#000',
    '#3f3f3f',
    '#e0e0e0',
    '#9f9f9f',
    '#6c6c6c',
    '#3f3f3f',
  ];

  /* dev */
  if (mode === 'random') {
    const random = Math.floor(Math.random() * (9 - 0 + 1) + 0);

    if ([0, 9, 8].includes(random)) return deep;
    if ([5, 6, 7].includes(random)) return funk;
    if ([2, 3, 4].includes(random)) return swiss;
    if ([1].includes(random)) return tosh;
  }

  /* prod */
  const str = ratio.toString();
  const first = str[0];

  // console.log(first, "first (colors)")

  if (['0', '9', '8'].includes(first)) return deep;
  if (['5', '6', '7'].includes(first)) return funk;
  if (['2', '3', '4'].includes(first)) return swiss;
  if (['1'].includes(first)) return tosh;
};

export const determineColumns = (letterTotal: number, mode: string) => {
  /* dev */
  if (mode === 'random') {
    const random = Math.floor(Math.random() * (9 - 0 + 1) + 0);

    if ([0, 9, 8].includes(random)) return 8;
    if ([5, 6, 7].includes(random)) return 6;
    if ([1, 2, 3, 4].includes(random)) return 4;
  }

  /* prod */
  const str = letterTotal.toString();
  const first = str[0];

  // console.log(first, "first (columns)")

  if (['0', '9', '8'].includes(first)) return 8;
  if (['5', '6', '7'].includes(first)) return 6;
  if (['1', '2', '3', '4'].includes(first)) return 4;
};

export const determineGap = (numberTotal: number, mode: string) => {
  /* dev */
  if (mode === 'random') {
    const random = Math.floor(Math.random() * (9 - 0 + 1) + 0);

    if ([0, 9, 8].includes(random)) return 10;
    if ([5, 6, 7].includes(random)) return 6;
    if ([2, 3, 4].includes(random)) return 4;
    if ([1].includes(random)) return 0;
  }

  /* prod */
  const str = numberTotal.toString();
  const first = str[0];

  // console.log(first, "first (gap)")

  if (['0', '9', '8'].includes(first)) return 10;
  if (['5', '6', '7'].includes(first)) return 6;
  if (['2', '3', '4'].includes(first)) return 4;
  if (['1'].includes(first)) return 0;
};

interface Effects {
  effect: string;
  data: string[] | JSX.Element;
}

export const determineRandomStyle = (ratio: number, mode: string): Effects => {
  const skewStyles = ['skew(0deg, 0deg) scale(1)', `skew(2deg, 2deg) scale(0.95)`];
  const skew = {effect: 'SKEW', data: skewStyles};
  const distort = {effect: 'DISTORT', data: DistortionSVGFilter};
  const none = {effect: undefined, data: undefined};

  /* dev */
  if (mode === 'random') {
    const random = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    if ([0, 9].includes(random)) return skew;
    if ([1].includes(random)) return distort;
    return none;
  }

  /* prod */
  const str = ratio.toString();
  const last = str[str.length - 1];

  // console.log(last, "last (random style)")

  if (['0', '9'].includes(last)) return skew;
  if (['1'].includes(last)) return distort;
  return none;
};

export const SEED = (hash: string) => {
  if (!hash?.length) return;

  let normalized = hash.toLowerCase();

  const numbers = normalized.match(/\d/g);
  const letters = normalized.match(/[A-Za-z]/g);
  const numberTotal = numbers.reduce(countNumbers, 0);
  const letterTotal = letters.reduce(countLetters, 0);
  const ratio = numberTotal / letterTotal;

  return {
    //@ts-ignore
    hashArr: [...hash],
    numbers,
    letters,
    numberTotal,
    letterTotal,
    ratio,
  };
};
