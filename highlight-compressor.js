const sourceText = document.querySelector("#sourceText");
const charCount = document.querySelector("#charCount");
const compressBtn = document.querySelector("#compressBtn");
const clearBtn = document.querySelector("#clearBtn");
const copyBtn = document.querySelector("#copyBtn");
const resultBox = document.querySelector("#resultBox");
const emptyState = document.querySelector("#emptyState");
const errorText = document.querySelector("#errorText");

const actionVerbs = [
  "完成",
  "梳理",
  "整理",
  "推进",
  "推动",
  "搭建",
  "设计",
  "优化",
  "协调",
  "跟进",
  "支持",
  "参与",
  "负责",
  "落地",
  "输出",
  "产出",
  "复盘",
  "分析",
  "对接",
  "组织",
  "制定",
  "沉淀",
  "验证",
  "测试",
  "上线",
  "交付",
  "解决"
];

const resultVerbs = [
  "输出",
  "产出",
  "形成",
  "沉淀",
  "解决",
  "完成",
  "提升",
  "优化",
  "落地",
  "上线",
  "交付",
  "明确",
  "统一",
  "缩短",
  "减少",
  "拿到"
];

const resultPattern =
  /(输出了?|产出了?|形成了?|沉淀了?|解决了?|完成了?|提升了|优化了|落地了?|上线了?|交付了?|明确了?|统一了?|缩短了|减少了|拿到了?|整理成|沉淀成|同步了?|同步给)/;

const stopPrefixes = ["然后", "并且", "并", "同时", "最后", "后续", "也", "再", "先", "还", "后来"];

function normalizeText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function splitSentences(text) {
  return text
    .split(/[\n。；;！？!?\u2026]/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 6);
}

function cleanSegment(segment) {
  let output = segment.trim();

  stopPrefixes.forEach((prefix) => {
    if (output.startsWith(prefix) && output.length > prefix.length + 2) {
      output = output.slice(prefix.length).trim();
    }
  });

  return output.replace(/[：:]+$/, "").trim();
}

function containsAny(text, list) {
  return list.some((item) => text.includes(item));
}

function scoreClause(clause) {
  let score = 0;

  if (containsAny(clause, actionVerbs)) score += 3;
  if (containsAny(clause, resultVerbs)) score += 3;
  if (/[0-9一二三四五六七八九十百千%]/.test(clause)) score += 2;
  if (/(文档|方案|SOP|FAQ|报告|看板|模板|清单|机制|流程|口径|页面|活动|项目|问题|需求|数据|指标|素材|结果|版本)/.test(clause)) score += 2;
  if (/(为了|因为|觉得|希望|学习|了解|知道)/.test(clause)) score -= 1;

  return score;
}

function pickAction(clause) {
  const cleaned = cleanSegment(clause);
  const matchedVerb = actionVerbs
    .map((verb) => ({ verb, index: cleaned.indexOf(verb) }))
    .filter((item) => item.index > -1)
    .sort((a, b) => a.index - b.index)[0]?.verb;

  if (!matchedVerb) return "";

  const start = cleaned.indexOf(matchedVerb);
  return cleaned.slice(start).trim();
}

function findMarkerIndex(text) {
  const match = text.match(resultPattern);
  return match ? match.index : -1;
}

function pickResult(sentence, actionPart) {
  const fragments = sentence
    .split(/[，,]/)
    .map((item) => cleanSegment(item))
    .filter(Boolean);

  const normalizedAction = cleanSegment(actionPart);
  const actionIndex = fragments.findIndex(
    (item) => item === normalizedAction || item.includes(normalizedAction) || normalizedAction.includes(item)
  );
  const sameFragment = actionIndex > -1 ? fragments[actionIndex] : "";

  if (sameFragment) {
    const markerIndex = findMarkerIndex(sameFragment);
    if (markerIndex > 0) {
      const resultFromSame = sameFragment.slice(markerIndex).trim();
      if (resultFromSame && resultFromSame !== normalizedAction) return resultFromSame;
    }
  }

  const nextResult = fragments
    .slice(actionIndex > -1 ? actionIndex + 1 : 1)
    .find((item) => findMarkerIndex(item) > -1 || /(文档|方案|SOP|FAQ|报告|看板|模板|清单|流程|口径|页面|结果|版本|示例)/.test(item));

  if (nextResult) return nextResult;

  const sentenceMarkerIndex = findMarkerIndex(sentence);
  if (sentenceMarkerIndex > -1) {
    const resultFromSentence = sentence.slice(sentenceMarkerIndex).replace(/^[，,]/, "").trim();
    if (resultFromSentence && resultFromSentence !== normalizedAction) return resultFromSentence;
  }

  return "";
}

function polishLine(actionPart, resultPart) {
  const action = cleanSegment(actionPart);
  const result = cleanSegment(resultPart);
  return `${action}，${result}`.replace(/[。；;]+$/g, "");
}

function dedupeLines(lines) {
  const seen = new Set();
  return lines.filter((line) => {
    const key = line.replace(/[，,\s]/g, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractHighlights(text) {
  const normalized = normalizeText(text);
  const sentences = splitSentences(normalized);
  const sorted = sentences
    .map((sentence, index) => ({ sentence, index, score: scoreClause(sentence) }))
    .filter((item) => item.score >= 4)
    .sort((a, b) => b.score - a.score);

  const results = [];

  for (const item of sorted) {
    const fragments = item.sentence
      .split(/[，,]/)
      .map((part) => cleanSegment(part))
      .filter(Boolean);

    const actionFragment = fragments.find((fragment) => containsAny(fragment, actionVerbs)) || item.sentence;
    const actionPart = pickAction(actionFragment);
    const resultPart = pickResult(item.sentence, actionPart);

    if (!actionPart || !resultPart || actionPart === resultPart) continue;

    const line = polishLine(actionPart, resultPart);
    if (line.length < 8) continue;
    results.push({ index: item.index, line });

    if (results.length === 3) break;
  }

  return dedupeLines(results.map((item) => item.line))
    .map((line) => ({
      line,
      index: results.find((item) => item.line === line)?.index ?? 0
    }))
    .sort((a, b) => a.index - b.index)
    .map((item) => item.line)
    .slice(0, 3);
}

function renderResults(lines) {
  resultBox.innerHTML = "";

  if (!lines.length) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  lines.forEach((line) => {
    const item = document.createElement("div");
    item.className = "result-line";
    item.textContent = line;
    resultBox.appendChild(item);
  });
}

function setError(message) {
  errorText.textContent = message;
}

function updateCount() {
  charCount.textContent = `${sourceText.value.length} / 2000`;
}

compressBtn.addEventListener("click", () => {
  const text = sourceText.value.trim();
  setError("");

  if (!text) {
    renderResults([]);
    setError("请先粘贴一段过程描述。");
    return;
  }

  const lines = extractHighlights(text);
  renderResults(lines);

  if (!lines.length) {
    setError("未识别出明确的“动作 + 结果”表达，请补充更具体的动作或产出结果。");
  }
});

clearBtn.addEventListener("click", () => {
  sourceText.value = "";
  updateCount();
  renderResults([]);
  setError("");
});

copyBtn.addEventListener("click", async () => {
  const lines = [...resultBox.querySelectorAll(".result-line")].map((item) => item.textContent);

  if (!lines.length) {
    setError("当前没有可复制的亮点内容。");
    return;
  }

  try {
    await navigator.clipboard.writeText(lines.join("\n"));
    setError("已复制到剪贴板。");
  } catch (error) {
    setError("复制失败，请手动复制结果。");
  }
});

sourceText.addEventListener("input", updateCount);

updateCount();
renderResults([]);
