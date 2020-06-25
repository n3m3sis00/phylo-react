export function parseNewick(a) {
  for (
    var e = [], r = {}, s = a.split(/\s*(;|\(|\)|,|:)\s*/), t = 0;
    t < s.length;
    t++
  ) {
    var n = s[t]
    switch (n) {
      case '(':
        var c = {}
        r.branchset = [c]
        e.push(r)
        r = c
        break
      case ',':
        c = {}
        e[e.length - 1].branchset.push(c)
        r = c
        break
      case ')':
        r = e.pop()
        break
      case ':':
        break
      default:
        var h = s[t - 1]
        ')' === h || '(' === h || ',' === h
          ? (r.name = n)
          : ':' === h && (r.length = parseFloat(n))
    }
  }
  return r
}

export async function* makeTextFileLineIterator(fileURL) {
  const utf8Decoder = new TextDecoder('utf-8')
  const response = await fetch(fileURL)
  const reader = response.body.getReader()
  let { value: chunk, done: readerDone } = await reader.read()
  chunk = chunk ? utf8Decoder.decode(chunk) : ''

  const re = /\n|\r|\r\n/gm
  let startIndex = 0
  let result

  for (;;) {
    let result = re.exec(chunk)
    if (!result) {
      if (readerDone) {
        break
      }
      let remainder = chunk.substr(startIndex)
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
