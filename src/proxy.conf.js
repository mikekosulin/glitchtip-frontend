const apiTarget = process.env.API_URL || 'http://localhost:8000';

module.exports = {
  "/api": {
    "target": apiTarget,
    "secure": false
  },
  "/accounts": {
    "target": apiTarget,
    "secure": false
  },
  "/_allauth": {
    "target": apiTarget,
    "secure": false
  }
};
