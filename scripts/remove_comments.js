const fs = require('fs');
const path = require('path');

const ROOT = 'D:\\Codes\\Alegis';
const EXTS = new Set(['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.py']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'dist', 'build', 'coverage', '.git', 'venv', 'env', '.vercel', '.cache', '.trae']);

function stripHTML(s) {
  return s.replace(/<!--[\s\S]*?-->/g, '');
}

function stripCSS(s) {
  return s.replace(/\/\*[\s\S]*?\*\
}

function stripPython(s) {
  let out = '';
  let inSingle = false;
  let inDouble = false;
  let inTripleSingle = false;
  let inTripleDouble = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const n1 = s[i + 1];
    const n2 = s[i + 2];
    if (!inSingle && !inDouble && !inTripleSingle && !inTripleDouble) {
      if (c === "'" && n1 === "'" && n2 === "'") {
        inTripleSingle = true;
        out += c + n1 + n2;
        i += 2;
        continue;
      }
      if (c === '"' && n1 === '"' && n2 === '"') {
        inTripleDouble = true;
        out += c + n1 + n2;
        i += 2;
        continue;
      }
      if (c === '#') {
        while (i < s.length && s[i] !== '\n') i++;
        out += s[i] || '';
        continue;
      }
      if (c === "'") {
        inSingle = true;
        out += c;
        continue;
      }
      if (c === '"') {
        inDouble = true;
        out += c;
        continue;
      }
      out += c;
    } else if (inTripleSingle) {
      out += c;
      if (c === "'" && n1 === "'" && n2 === "'") {
        out += n1 + n2;
        i += 2;
        inTripleSingle = false;
      }
    } else if (inTripleDouble) {
      out += c;
      if (c === '"' && n1 === '"' && n2 === '"') {
        out += n1 + n2;
        i += 2;
        inTripleDouble = false;
      }
    } else if (inSingle) {
      out += c;
      if (c === '\\') {
        out += s[i + 1] || '';
        i++;
      } else if (c === "'") {
        inSingle = false;
      }
    } else if (inDouble) {
      out += c;
      if (c === '\\') {
        out += s[i + 1] || '';
        i++;
      } else if (c === '"') {
        inDouble = false;
      }
    }
  }
  return out;
}

function stripJS(s) {
  let out = '';
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inBlock = false;
  let inLine = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const n = s[i + 1];
    if (inLine) {
      if (c === '\n') {
        inLine = false;
        out += c;
      }
      continue;
    }
    if (inBlock) {
      if (c === '*' && n === '/') {
        inBlock = false;
        i++;
      }
      continue;
    }
    if (!inSingle && !inDouble && !inTemplate) {
      if (c === '/' && n === '/') {
        inLine = true;
        i++;
        continue;
      }
      if (c === '/' && n === '*') {
        inBlock = true;
        i++;
        continue;
      }
      if (c === "'") {
        inSingle = true;
        out += c;
        continue;
      }
      if (c === '"') {
        inDouble = true;
        out += c;
        continue;
      }
      if (c === '`') {
        inTemplate = true;
        out += c;
        continue;
      }
      out += c;
    } else if (inSingle) {
      out += c;
      if (c === '\\') {
        out += s[i + 1] || '';
        i++;
      } else if (c === "'") {
        inSingle = false;
      }
    } else if (inDouble) {
      out += c;
      if (c === '\\') {
        out += s[i + 1] || '';
        i++;
      } else if (c === '"') {
        inDouble = false;
      }
    } else if (inTemplate) {
      out += c;
      if (c === '\\') {
        out += s[i + 1] || '';
        i++;
      } else if (c === '`') {
        inTemplate = false;
      }
    }
  }
  return out;
}

function processFile(fp) {
  const ext = path.extname(fp).toLowerCase();
  let s = fs.readFileSync(fp, 'utf8');
  const before = s.length;
  try {
    if (ext === '.html') s = stripHTML(s);
    else if (ext === '.css') s = stripCSS(s);
    else if (ext === '.py') s = stripPython(s);
    else if (EXTS.has(ext)) s = stripJS(s);
  } catch (e) {}
  if (s.length !== before) {
    fs.writeFileSync(fp, s, 'utf8');
    return before - s.length;
  }
  return 0;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let removed = 0;
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      removed += walk(path.join(dir, e.name));
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (EXTS.has(ext)) removed += processFile(path.join(dir, e.name));
    }
  }
  return removed;
}

const removedBytes = walk(ROOT);
console.log('Removed bytes:', removedBytes);
