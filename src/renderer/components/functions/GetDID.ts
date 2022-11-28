// WARNING: For POST requests, body is set to null by browsers.
var data =
  '{\n    "chaincode": "DidTest",\n    "args": [\n        "TestCreateDID"\n        "\n-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAlRuRnThUjU8/prwYxbty\nWPT9pURI3lbsKMiB6Fn/VHOKE13p4D8xgOCADpdRagdT6n4etr9atzDKUSvpMtR3\nCP5noNc97WiNCggBjVWhs7szEe8ugyqF23XwpHQ6uV1LKH50m92MbOWfCtjU9p/x\nqhNpQQ1AZhqNy5Gevap5k8XzRmjSldNAFZMY7Yv3Gi+nyCwGwpVtBUwhuLzgNFK/\nyDtw2WcWmUU7NuC8Q6MWvPebxVtCfVp/iQU6q60yyt6aGOBkhAX0LpKAEhKidixY\nnP9PNVBvxgu3XZ4P36gZV6+ummKdBVnc3NqwBLu5+CcdRdusmHPHd5pHf4/38Z3/\n6qU2a/fPvWzceVTEgZ47QjFMTCTmCwNt29cvi7zZeQzjtwQgn4ipN9NibRH/Ax/q\nTbIzHfrJ1xa2RteWSdFjwtxi9C20HUkjXSeI4YlzQMH0fPX6KCE7aVePTOnB69I/\na9/q96DiXZajwlpq3wFctrs1oXqBp5DVrCIj8hU2wNgB7LtQ1mCtsYz //heai0K9\nPhE4X6hiE0YmeAZjR0uHl8M/5aW9xCoJ72+12kKpWAa0SFRWLy6FejNYCYpkupVJ\nyecLk/4L1W0l6jQQZnWErXZYe0PNFcmwGXy1Rep83kfBRNKRy5tvocalLlwXLdUk\nAIU+2GKjyT3iMuzZxxFxPFMCAwEAAQ==\n-----END PUBLIC KEY-----"\n    ],\n    "sync": true\n}';

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open(
  'POST',
  'https://test1-oracleoncampus-iad.blockchain.ocp.oraclecloud.com:7443/restproxy/api/v2/channels/agk423/transactions'
);
xhr.setRequestHeader(
  'Authorization',
  'Basic YWdrNDIzQGxlaGlnaC5lZHU6RW1tZXR0ODY0MiEh'
);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.send(data);
