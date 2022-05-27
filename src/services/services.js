// source: https://stackoverflow.com/questions/6274339/how-can-i-this.shuffle-an-array,
// função this.shuffle
export function shuffle(a) {
  let j;
  let x;
  let i;
  for (i = a.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export function questionDifficult(difficulty) {
  const EASY = 1;
  const MEDIUM = 2;
  const HARD = 3;
  let dificuldade;

  if (difficulty === 'easy') {
    dificuldade = EASY;
    return dificuldade;
  }
  if (difficulty === 'medium') {
    dificuldade = MEDIUM;
    return dificuldade;
  }
  if (difficulty === 'hard') {
    dificuldade = HARD;
    return dificuldade;
  }
}
