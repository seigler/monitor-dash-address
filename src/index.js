window.addEventListener('load', function () {
  const containers = document.querySelectorAll('div[data-dash-address-watch]');
  const addresses = [], watchers = {};
  var insight;
  if (containers.length === 0) {
    console.log('No addresses to monitor.')
    return;
  }
  insight = require('socket.io-client').connect(
    'https://insight.dash.org:443/'
  );

  containers.forEach(function (container) {
    const address = container.getAttribute('data-dash-address-watch');
    const status = document.createElement('div');
    status.className = 'dash-address-watch-status';
    status.textContent = 'Loading...';
    const label = document.createElement('div');
    label.className = 'dash-address-watch-label';
    label.textContent = address;
    const log = document.createElement('div');
    log.className = 'dash-address-watch-log';
    container.appendChild(label);
    container.appendChild(status);
    container.appendChild(log);
    addresses.push(address);
    watchers[address] = {
      container,
      label,
      status,
      log
    };
  });

  insight.on('connect', function () {
    Object.values(watchers).forEach(function (c) {
      c.status.textContent = 'Watching...'
    });
    insight.emit('subscribe', 'inv');
  });
  insight.on('disconnect', function () {
    Object.values(watchers).forEach(function (c) {
      c.status.textContent = 'Reconnecting...'
    });
  });
  insight.on('tx', function(data) {
    addresses.forEach(function (address) {
      const amount = data.vout.reduce(
        function (accum, item) {
          return accum + (
            Object.keys(item)[0] === address
            ? Object.values(item)[0]
            : 0
          );
        },
        0
      );
      if (amount > 0) {
        const a = document.createElement('a');
        a.setAttribute('href', 'https://insight.dash.org/insight/tx/' +
          data.txid);
        a.textContent = 'Received ' + amount / 100000000 + ' DASH';
        watchers[address].log.insertBefore(a, watchers[address].log.firstChild);
      }
    });
  });
});
