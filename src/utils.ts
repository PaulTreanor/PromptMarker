function sanitizeStringForJS (str: string): string {
  // Convert the string to its unicode escape sequence representation.
  // This avoids any potentially dangerous characters and sequences.
  let sanitized = ''
  for (let i = 0; i < str.length; i++) {
    sanitized += '\\u' + ('0000' + str.charCodeAt(i).toString(16)).slice(-4)
  }
  return sanitized
}

export default sanitizeStringForJS
