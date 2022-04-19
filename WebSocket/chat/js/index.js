; ((doc, WebSocket, storage, location) => {
  const oList = doc.querySelector('#list')
  const oMsg = doc.querySelector('#message')
  const oSendBtn = doc.querySelector('#send')

  const ws = new WebSocket('ws:localhost:8000')
  let username = ''
  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oSendBtn.addEventListener('click', handleSendBtnClick, false);
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage)
  }

  function handleSendBtnClick() {
    // console.log('send message');
    username = storage.getItem('userName')
    const msg = oMsg.value
    if (username.trim() === '') {
      location.href = 'entry.html'
      return
    }
    if (!msg.trim().length) {
      alert('请输入消息')
      return
    }

    ws.send(JSON.stringify({
      user: username,
      createdTime: new Date().getTime(),
      message: msg
    }))
    oMsg.value = ''
  }

  function handleOpen(e) {
    console.log('WebSocket open', e);
  }

  function handleClose(e) {
    console.log('WebSocket close', e);
  }

  function handleError(e) {
    console.log('WebSocket error', e);
  }
  function handleMessage(e) {
    // console.log('WebSocket message');
    console.log(e);
    const msgData = JSON.parse(e.data)
    oList.appendChild(createMsg(msgData))
  }
  function createMsg(data) {
    const { user, createdTime, message } = data;
    const oItem = doc.createElement('li')
    oItem.innerHTML = `
      <p>
        <span>${user}<span>
        <i> ${new Date(createdTime)}</i>
      </p>
      <p>消息:${message}<p>
    `
    return oItem
  }
  init()
})(document, WebSocket, localStorage, location)