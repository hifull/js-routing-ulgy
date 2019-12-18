exports.createRequest = (socket) => {
  let header, buffer = Buffer.from('');
  let tempBuffer;
  
  tempBuffer = socket.read();

  console.log(tempBuffer, buffer);
  if (!tempBuffer) return null;

  buffer = Buffer.concat([buffer, tempBuffer])
  const separator = buffer.indexOf('\r\n\r\n')
  if (separator !== -1) {
    const remaining = buffer.slice(separator + 4)
    header = buffer.slice(0, separator).toString()
    socket.unshift(remaining)
  }
  

  const tempHeaders = header.split('\r\n')
  const startingLine = tempHeaders.shift().split(' ')
  const headers = {}
  for (const header of tempHeaders) {
    const [key, value] = header.split(':')
    headers[key] = value.trim()
  }

  return {
    socket,
    headers,
    method: startingLine[0],
    url: startingLine[1],
    on(...args) {
      socket.on(...args)
    }
  }
}