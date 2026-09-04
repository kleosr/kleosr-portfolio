import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LIMITS = {
  loc: 499,
  cyclomatic: 21,
  cognitive: 21,
  halstead: 80,
  crap: 25,
};

const OPERATOR_KINDS = new Set([
  ts.SyntaxKind.PlusToken,
  ts.SyntaxKind.MinusToken,
  ts.SyntaxKind.AsteriskToken,
  ts.SyntaxKind.SlashToken,
  ts.SyntaxKind.PercentToken,
  ts.SyntaxKind.PlusPlusToken,
  ts.SyntaxKind.MinusMinusToken,
  ts.SyntaxKind.EqualsToken,
  ts.SyntaxKind.PlusEqualsToken,
  ts.SyntaxKind.MinusEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.ExclamationToken,
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.QuestionQuestionToken,
  ts.SyntaxKind.QuestionDotToken,
  ts.SyntaxKind.LessThanToken,
  ts.SyntaxKind.GreaterThanToken,
  ts.SyntaxKind.LessThanEqualsToken,
  ts.SyntaxKind.GreaterThanEqualsToken,
  ts.SyntaxKind.AmpersandToken,
  ts.SyntaxKind.BarToken,
  ts.SyntaxKind.CaretToken,
  ts.SyntaxKind.TildeToken,
  ts.SyntaxKind.QuestionToken,
  ts.SyntaxKind.ColonToken,
  ts.SyntaxKind.DotToken,
  ts.SyntaxKind.CommaToken,
  ts.SyntaxKind.IfKeyword,
  ts.SyntaxKind.ElseKeyword,
  ts.SyntaxKind.ForKeyword,
  ts.SyntaxKind.WhileKeyword,
  ts.SyntaxKind.DoKeyword,
  ts.SyntaxKind.SwitchKeyword,
  ts.SyntaxKind.CaseKeyword,
  ts.SyntaxKind.ReturnKeyword,
  ts.SyntaxKind.ThrowKeyword,
  ts.SyntaxKind.TryKeyword,
  ts.SyntaxKind.CatchKeyword,
  ts.SyntaxKind.FinallyKeyword,
  ts.SyntaxKind.NewKeyword,
  ts.SyntaxKind.DeleteKeyword,
  ts.SyntaxKind.TypeOfKeyword,
  ts.SyntaxKind.VoidKeyword,
  ts.SyntaxKind.AwaitKeyword,
  ts.SyntaxKind.YieldKeyword,
  ts.SyntaxKind.InstanceOfKeyword,
  ts.SyntaxKind.InKeyword,
  ts.SyntaxKind.FunctionKeyword,
  ts.SyntaxKind.ArrowFunction,
]);

const OPERAND_KINDS = new Set([
  ts.SyntaxKind.Identifier,
  ts.SyntaxKind.PrivateIdentifier,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.BigIntLiteral,
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TrueKeyword,
  ts.SyntaxKind.FalseKeyword,
  ts.SyntaxKind.NullKeyword,
  ts.SyntaxKind.ThisKeyword,
  ts.SyntaxKind.SuperKeyword,
]);

const failures = [];

function walkFiles(dir, acc) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      walkFiles(path, acc);
      continue;
    }
    if (/\.(ts|tsx)$/.test(entry.name)) acc.push(path);
  }
}

function isFn(node) {
  return (
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node)
  );
}

function fnName(node, source) {
  if ("name" in node && node.name) return node.name.getText(source);
  const start = source.getLineAndCharacterOfPosition(node.getStart(source));
  return `<anonymous>:${start.line + 1}`;
}

function locOf(text) {
  let inBlock = false;
  let count = 0;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (inBlock) {
      if (line.includes("*/")) inBlock = false;
      continue;
    }
    if (line.startsWith("/*")) {
      if (!line.includes("*/")) inBlock = true;
      continue;
    }
    if (line.startsWith("//") || line.startsWith("*")) continue;
    count += 1;
  }
  return count;
}

function walkSkipNested(node, visit) {
  visit(node);
  ts.forEachChild(node, (child) => {
    if (isFn(child)) return;
    walkSkipNested(child, visit);
  });
}

function cyclomatic(node) {
  let score = 1;
  walkSkipNested(node, (current) => {
    if (ts.isIfStatement(current) || ts.isForStatement(current) || ts.isForInStatement(current)) score += 1;
    if (ts.isForOfStatement(current) || ts.isWhileStatement(current) || ts.isDoStatement(current)) score += 1;
    if (ts.isCatchClause(current) || ts.isConditionalExpression(current) || ts.isCaseClause(current)) score += 1;
    if (ts.isBinaryExpression(current)) {
      const kind = current.operatorToken.kind;
      if (
        kind === ts.SyntaxKind.AmpersandAmpersandToken ||
        kind === ts.SyntaxKind.BarBarToken ||
        kind === ts.SyntaxKind.QuestionQuestionToken
      ) {
        score += 1;
      }
    }
  });
  return score;
}

function cognitive(node) {
  let score = 0;
  function visit(current, nest) {
    if (isFn(current) && current !== node) return;
    let next = nest;
    let increment = 0;
    if (ts.isIfStatement(current) || ts.isSwitchStatement(current) || ts.isConditionalExpression(current)) increment = 1;
    if (ts.isForStatement(current) || ts.isForInStatement(current) || ts.isForOfStatement(current)) increment = 1;
    if (ts.isWhileStatement(current) || ts.isDoStatement(current) || ts.isCatchClause(current)) increment = 1;
    if (increment) {
      score += increment + nest;
      next = nest + 1;
    }
    if (ts.isBinaryExpression(current)) {
      const kind = current.operatorToken.kind;
      if (
        kind === ts.SyntaxKind.AmpersandAmpersandToken ||
        kind === ts.SyntaxKind.BarBarToken ||
        kind === ts.SyntaxKind.QuestionQuestionToken
      ) {
        score += 1;
      }
    }
    ts.forEachChild(current, (child) => visit(child, next));
  }
  visit(node, 0);
  return score;
}

function halstead(source, node) {
  const operators = new Map();
  const operands = new Map();
  let operatorCount = 0;
  let operandCount = 0;
  const start = node.getStart(source);
  const end = node.getEnd();
  const scanner = ts.createScanner(ts.ScriptTarget.ES2022, true, ts.LanguageVariant.Standard, source.text);
  scanner.setTextPos(start);
  while (scanner.getTextPos() < end) {
    const kind = scanner.scan();
    if (kind === ts.SyntaxKind.EndOfFileToken) break;
    const text = scanner.getTokenText();
    if (OPERATOR_KINDS.has(kind)) {
      operatorCount += 1;
      operators.set(text, true);
    } else if (OPERAND_KINDS.has(kind)) {
      operandCount += 1;
      operands.set(text, true);
    }
  }
  const n1 = operators.size;
  const n2 = operands.size;
  if (!n1 || !n2) return 0;
  return (n1 / 2) * (operandCount / n2);
}

function collectFunctions(source) {
  const functions = [];
  function visit(node) {
    if (isFn(node) && node.body) functions.push(node);
    ts.forEachChild(node, visit);
  }
  visit(source);
  return functions;
}

function bannedTypes(source, file) {
  function visit(node) {
    if (node.kind === ts.SyntaxKind.AnyKeyword || node.kind === ts.SyntaxKind.UnknownKeyword) {
      const { line } = source.getLineAndCharacterOfPosition(node.getStart(source));
      const word = node.kind === ts.SyntaxKind.AnyKeyword ? "any" : "unknown";
      failures.push(`${file}:${line + 1} uses banned type ${word}`);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}

function analyzeFile(path) {
  const rel = relative(ROOT, path);
  const text = readFileSync(path, "utf8");
  const loc = locOf(text);
  if (loc > LIMITS.loc) failures.push(`${rel} has ${loc} lines of code (max ${LIMITS.loc})`);
  const kind = path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.ES2022, true, kind);
  bannedTypes(source, rel);
  const metrics = [];
  for (const fn of collectFunctions(source)) {
    const name = fnName(fn, source);
    const start = source.getLineAndCharacterOfPosition(fn.getStart(source)).line + 1;
    const end = source.getLineAndCharacterOfPosition(fn.getEnd()).line + 1;
    const cyclo = cyclomatic(fn);
    const cog = cognitive(fn);
    const difficulty = halstead(source, fn);
    if (cyclo > LIMITS.cyclomatic) {
      failures.push(`${rel} ${name} cyclomatic ${cyclo} (max ${LIMITS.cyclomatic})`);
    }
    if (cog > LIMITS.cognitive) {
      failures.push(`${rel} ${name} cognitive ${cog} (max ${LIMITS.cognitive})`);
    }
    if (difficulty >= LIMITS.halstead) {
      failures.push(`${rel} ${name} Halstead difficulty ${difficulty.toFixed(2)} (max < ${LIMITS.halstead})`);
    }
    metrics.push({ name, start, end, cyclo });
  }
  return metrics;
}

function coverageRatio(fileCov, start, end) {
  let total = 0;
  let hit = 0;
  for (const [id, loc] of Object.entries(fileCov.statementMap ?? {})) {
    const line = loc.start.line;
    if (line < start || line > end) continue;
    total += 1;
    if ((fileCov.s?.[id] ?? 0) > 0) hit += 1;
  }
  for (const [id, loc] of Object.entries(fileCov.branchMap ?? {})) {
    const line = loc.loc?.start.line ?? loc.start?.line;
    if (!line || line < start || line > end) continue;
    for (const count of fileCov.b?.[id] ?? []) {
      total += 1;
      if (count > 0) hit += 1;
    }
  }
  if (!total) return 1;
  return hit / total;
}

function crapScore(cyclo, coverage) {
  const uncovered = 1 - coverage;
  return cyclo * cyclo * uncovered * uncovered + cyclo;
}

function applyCrap(files, metricsByFile) {
  const coveragePath = join(ROOT, "coverage/coverage-final.json");
  if (!existsSync(coveragePath)) {
    failures.push("coverage/coverage-final.json is missing; run pnpm coverage first");
    return;
  }
  const coverage = JSON.parse(readFileSync(coveragePath, "utf8"));
  const byRel = new Map();
  for (const [abs, data] of Object.entries(coverage)) {
    byRel.set(relative(ROOT, abs).replaceAll("\\", "/"), data);
  }
  for (const file of files) {
    const rel = relative(ROOT, file).replaceAll("\\", "/");
    if (rel.includes(".test.") || rel.startsWith("src/test/")) continue;
    if (rel.endsWith("vite.config.ts") || rel.endsWith("vitest.config.ts")) continue;
    const fileCov = byRel.get(rel);
    if (!fileCov) {
      failures.push(`${rel} has no coverage data`);
      continue;
    }
    for (const fn of metricsByFile.get(file) ?? []) {
      const crap = crapScore(fn.cyclo, coverageRatio(fileCov, fn.start, fn.end));
      if (crap >= LIMITS.crap) {
        failures.push(`${rel} ${fn.name} CRAP ${crap.toFixed(2)} (max < ${LIMITS.crap})`);
      }
    }
  }
}

const files = [];
walkFiles(join(ROOT, "src"), files);
files.push(join(ROOT, "vite.config.ts"), join(ROOT, "vitest.config.ts"));
const metricsByFile = new Map();
for (const file of files) metricsByFile.set(file, analyzeFile(file));
applyCrap(files, metricsByFile);

if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(
  `quality-gates ok: loc<${LIMITS.loc + 1} cyclo<=${LIMITS.cyclomatic} cognitive<=${LIMITS.cognitive} halstead<${LIMITS.halstead} CRAP<${LIMITS.crap} no any/unknown`,
);
