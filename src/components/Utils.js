export async function* makeTextFileLineIterator(fileURL) {
  const utf8Decoder = new TextDecoder('utf-8')
  const response = await fetch(fileURL)
  const reader = response.body.getReader()
  let { value: chunk, done: readerDone } = await reader.read()
  chunk = chunk ? utf8Decoder.decode(chunk) : ''

  const re = /\n|\r|\r\n/gm
  let startIndex = 0

  for (;;) {
    const result = re.exec(chunk)
    if (!result) {
      if (readerDone) {
        break
      }
      const remainder = chunk.substr(startIndex)
      ;({ value: chunk, done: readerDone } = await reader.read())
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : '')
      startIndex = re.lastIndex = 0
      continue
    }
    yield chunk.substring(startIndex, result.index)
    startIndex = re.lastIndex
  }
  if (startIndex < chunk.length) {
    // last line didn't end in a newline char
    yield chunk.substr(startIndex)
  }
}

export function parseFastaSeq(text) {
  const seq = new Map()
  text.split('\n').forEach(line => {
    if (line[0] !== '#') {
      const t = line.split(' ')
      if (seq.get(t[0])) {
        seq.set(t[0], seq.get(t[0]) + t.slice(-1)[0])
      } else {
        seq.set(t[0], t.slice(-1)[0])
      }
    }
  })
  return seq
}

const lilac = '#C8A2C8' // nonstandard
export const colorScheme = {
  clustal: {
    G: 'orange',
    P: 'orange',
    S: 'orange',
    T: 'orange',
    H: 'red',
    K: 'red',
    R: 'red',
    F: 'blue',
    W: 'blue',
    Y: 'blue',
    I: 'green',
    L: 'green',
    M: 'green',
    V: 'green',
  },
  lesk: {
    G: 'orange',
    A: 'orange',
    S: 'orange',
    T: 'orange',
    C: 'green',
    V: 'green',
    I: 'green',
    L: 'green',
    P: 'green',
    F: 'green',
    Y: 'green',
    M: 'green',
    W: 'green',
    N: 'magenta',
    Q: 'magenta',
    H: 'magenta',
    D: 'red',
    E: 'red',
    K: 'blue',
    R: 'blue',
  },
  maeditor: {
    A: 'lightgreen',
    G: 'lightgreen',
    C: 'green',
    D: 'darkgreen',
    E: 'darkgreen',
    N: 'darkgreen',
    Q: 'darkgreen',
    I: 'blue',
    L: 'blue',
    M: 'blue',
    V: 'blue',
    F: lilac,
    W: lilac,
    Y: lilac,
    H: 'darkblue',
    K: 'orange',
    R: 'orange',
    P: 'pink',
    S: 'red',
    T: 'red',
  },
  cinema: {
    H: 'blue',
    K: 'blue',
    R: 'blue',
    D: 'red',
    E: 'red',
    S: 'green',
    T: 'green',
    N: 'green',
    Q: 'green',
    A: 'white',
    V: 'white',
    L: 'white',
    I: 'white',
    M: 'white',
    F: 'magenta',
    W: 'magenta',
    Y: 'magenta',
    P: 'brown',
    G: 'brown',
    C: 'yellow',
    B: 'gray',
    Z: 'gray',
    X: 'gray',
    '-': 'white',
    '.': 'white',
  },
}
