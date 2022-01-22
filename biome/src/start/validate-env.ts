import { readFileSync } from "fs";

const expected = readFileSync("./.env.example", "utf8");
const actual = readFileSync("./.env", "utf8");

const makeSet = (envString: string, checkValueIsPresent: boolean = false) => {
  const set = new Set<string>();
  const issues: string[] = [];
  envString.split("\n").forEach((line) => {
    if (line.trim().length === 0 || line.trim().startsWith("#")) {
      return;
    }
    const [key, value] = line.split("=");
    set.add(key.trim());
    if (!value || value.trim().length === 0) {
      issues.push(`Missing value for ${key}`);
    }
  });

  if (checkValueIsPresent) {
    if (issues.length > 0) {
      throw new Error(issues.join("\n"));
    }
  }

  return set;
};

const expectedSet = makeSet(expected);
const actualSet = makeSet(actual, true);

for (const value of Array.from(actualSet)) {
  expectedSet.delete(value);
}

if (expectedSet.size > 0) {
  throw new Error(`Missing keys in .env: ${[...expectedSet].join(", ")}`);
}
