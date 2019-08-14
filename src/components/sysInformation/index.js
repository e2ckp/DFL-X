const si = require('systeminformation');

si.cpu()
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error(error));
si.graphics()
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error(error));
si.mem()
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error(error));
si.currentLoad()
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error(error));
si.blockDevices()
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error(error));