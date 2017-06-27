const fs = require('fs');

const resolveAliases = (dir, aliases) => {
  const files = fs.readdirSync(dir);

  files.forEach(f => {
    const path = dir + '/' + f;

    try {
      if (fs.statSync(path).isDirectory() && f != 'node_modules') {
        resolveAliases(path, aliases);
      }

      if (f == 'package.json') {
        const data = JSON.parse(fs.readFileSync(path));
        if (data.name) {
          aliases[data.name] = dir;
        }
      }
    } catch(e) {
    }
  });

  return aliases;
};

exports.resolveAliases = resolveAliases;
