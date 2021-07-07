export default function loadMore (res, amount) {
  const messages = []

  if(res.length > amount) {
    for(let i = 0; i < amount; i++) {
      res[i].main = true
      messages.push(res[i])
    }
    return messages
  } else {
    for(let i = 0; i < res.length; i++) {
      res[i].main = true
      messages.push(res[i])
    }
    return messages
  }
}