const path = require('path');

module.exports = { 
  "mode": "none", 
  "entry": {
    "app": "./src/script.js",
    "service-worker": "./src/firebase.js",
  },
  "output": { 
    "path": __dirname + '/dist', 
    "filename": "[name].bundle.js" 
  },
  "module": { 
    "rules": [ { 
      "test": /\.css$/, 
      "use": [ "style-loader", "css-loader" ] 
    }, 
    { 
      "test": /\.js$/, 
      "exclude": /node_modules/, 
      "use": { 
        "loader": "babel-loader", 
        "options": { 
          "presets": [ "@babel/preset-env", ] 
        } 
      } 
    }, 
  ] }
};