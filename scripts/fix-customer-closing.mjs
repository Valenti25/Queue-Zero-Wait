import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const bad = "</" + "motion.div>";
const good = "</" + "div>";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".tsx")) {
      let s = readFileSync(p, "utf8");
      if (!s.includes(bad)) continue;
      let n = s.replaceAll(bad, good);
      // restore framer-motion closings (lines after animate/exit blocks)
      n = n.replace(
        /(<motion\.div[\s\S]*?)<\/motion\.div>(\s*\)\s*:\s*\()/g,
        "$1</motion.div>$2".replaceAll(good, "</motion.div>")
      );
      n = n.replace(
        /(key="(?:called|waiting)"[\s\S]*?)<\/motion\.motion\.div>/g,
        "$1</motion.div>"
      );
      n = n.replace(
        /(exit=\{[^}]+\}\s*>[\s\S]*?)<\/motion\.motion\.motion\.motion\.div>/g,
        "$1</motion.div>"
      );
      // second pass: motion.div with key= should close with motion.div
      const lines = n.split("\n");
      const out = [];
      const stack = [];
      for (const line of lines) {
        if (line.includes("<motion.div") && (line.includes("key=") || line.includes("initial="))) {
          stack.push("motion");
        } else if (line.trim() === good && stack.length && stack[stack.length - 1] === "motion") {
          out.push(line.replace(good, "</motion.div>"));
          stack.pop();
          continue;
        } else if (line.trim() === good) {
          stack.pop();
        }
        out.push(line);
      }
      writeFileSync(p, out.join("\n"));
    }
  }
}

walk("src/components/customer");
