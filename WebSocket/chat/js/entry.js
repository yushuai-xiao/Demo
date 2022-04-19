; ((doc, location, storage) => {
  const username = doc.querySelector('#username')
  const entryBtn = doc.querySelector('#entry')

  const init = () => {
    bindEvent()
  }
  function bindEvent() {
    entryBtn.addEventListener('click', handleEnterBtnClick, false)
  }

  function handleEnterBtnClick() {
    console.log(username.value);
    const uValue = username.value.trim()
    if (uValue.length < 6) {
      alert('用户名不能低于6位')
      return
    }
    storage.setItem('userName', uValue)
    location.href = 'index.html'
  }

  init()
})(document, location, localStorage)