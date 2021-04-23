# plugin popups

| mechanism | issues | possible solution |
| --------- | ----- | ----------------- |
| built-in react-modal (current) | blocks content scroll, affected by consumer CSS (transform) | empty transform on editor wrapper |
| innerModal | involves recursive position calculation; scroll is screwed up | consider scroll position [too complicated] |
| react-modal inside toolbar container | blocks content scroll, click outside does not work (overlay in toolbar only) | ? |
| innerModal inside toolbar container | ? | ? |
