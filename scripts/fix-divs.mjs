import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".tsx")) fix(p);
  }
}

function fix(p) {
  let s = readFileSync(p, "utf8");
  const orig = s;
  s = s.replaceAll("</motion.div>", "</div>");
  s = s.replace(/<motion\.div className=/g, "<motion.div className=");
  s = s.replace(/<motion\.motion\.motion\.div className=/g, "<div className=");
  // fix mistaken opening without framer props (no key/initial on same line)
  s = s.replace(/<motion\.div className=/g, "<div className=");
  // restore framer motion.div openings
  s = s.replace(
    /<div\n                key=/g,
    "<motion.div\n                key="
  );
  s = s.replace(
    /<div\n                key="called"/g,
    '<motion.div\n                key="called"'
  );
  s = s.replace(
    /<motion\.div\n                key="called"/g,
    '<motion.div\n                key="called"'
  );
  if (s !== orig) writeFileSync(p, s);
}

walk("src/components/customer");
