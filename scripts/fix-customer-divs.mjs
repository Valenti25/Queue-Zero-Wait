import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const badClose = "</" + "motion.div>";
const goodClose = "</" + "div>";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".tsx")) fixFile(p);
  }
}

function fixFile(p) {
  let s = readFileSync(p, "utf8");
  if (!s.includes(badClose) && !s.includes("<motion.div className")) return;
  const orig = s;
  s = s.replaceAll(badClose, goodClose);
  s = s.replaceAll("<motion.div className=", "<div className=");
  // restore framer-motion animated blocks
  s = s.replace(
    /<div\n                key="called"/g,
    '<motion.div\n                key="called"'
  );
  s = s.replace(
    /<motion\.div\n                key="called"/g,
    '<motion.div\n                key="called"'
  );
  s = s.replace(
    /<div\n                key="waiting"/g,
    '<motion.div\n                key="waiting"'
  );
  s = s.replace(
    /(animate=\{[^}]+\}\s+exit=\{[^}]+\}\s*>)/g,
    (m, _g, offset, str) => m
  );
  // fix closings after framer blocks: </motion.div> before ) : ( or )}
  s = s.replace(
    /(<motion\.div\n                key="called"[\s\S]*?)<\/motion\.motion\.motion\.div>/g,
    "$1</motion.div>"
  );
  if (s !== orig) {
    writeFileSync(p, s);
    console.log("fixed", p);
  }
}

walk("src/components/customer");
