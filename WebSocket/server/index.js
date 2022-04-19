const Ws = require('ws')

  ; ((Ws) => {
    // ws.localhose:8000
    const server = new Ws.Server({ port: 8000 })

    const init = () => {
      bindEvent()
    }

    function bindEvent() {
      server.on('open', handleOpen)
      server.on('close', handleClose)
      server.on('error', handleError)
      server.on('connection', handleConnection)
    }

    function handleOpen() {
      console.log('WebSocket open');
    }

    function handleClose() {
      console.log('WebSocket close');
    }

    function handleError() {
      console.log('WebSocket error');
    }

    function handleConnection(ws) {
      console.log('WebSocket connection');
      ws.on('message', handleMessage)
    }

    function handleMessage(msg) {
      // console.log(msg);
      server.clients.forEach((c) => {
        c.send(msg)
      })
    }
    init()
  })(Ws)