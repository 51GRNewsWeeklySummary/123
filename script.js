const meetingInput = document.querySelector("#meetingInput");
const charCount = document.querySelector("#charCount");
const extractBtn = document.querySelector("#extractBtn");
const clearBtn = document.querySelector("#clearBtn");
const copyBtn = document.querySelector("#copyBtn");
const emptyState = document.querySelector("#emptyState");
const resultCard = document.querySelector("#resultCard");
const resultType = document.querySelector("#resultType");
const resultList = document.querySelector("#resultList");
const errorText = document.querySelector("#errorText");

const decisionMarkers = [
  "决定",
  "确定",
  "明确",
  "统一",
  "定为",
  "采用",
  "按",
  "先",
  "本次",
  "不做",
  "不上",
  "停止",
  "由",
  "控制在",
  "上线",
  "安排",
  "改为"
];

const pendingMarkers = [
  "待确认",
  "还没定",
  "尚未确定",
  "未定",
  "需要确认",
  "后续确认",
  "再确认",
  "进一步确认",
  "还要确认",
  "待定",
  "再讨论",
  "继续讨论",
  "没拍板",
  "暂未确定",
  "尚未拍板"
];

const fillerMarkers = [
  "先同步",
  "先说一下",
  "简单说",
  "大家讨论了",
  "大家聊了",
  "总体来说",
  "回头看",
  "辛苦大家",
  "补充一下",
  "背景是",
  "先过一下",
  "我们今天"
];

function normalizeText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function splitSentences(text) {
  return text
    .split(/[\n。；;！？!?]/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 6);
}

function cleanSentence(sentence) {
  let output = sentence.trim().replace(/^[，,：:;；\s]+/, "");

  fillerMarkers.forEach((marker) => {
    if (output.startsWith(marker) && output.length > marker.length + 2) {
      output = output.slice(marker.length).trim();
    }
  });

  return output.replace(/[，,：:;；\s]+$/, "").trim();
}

function containsAny(text, markers) {
  return markers.some((marker) => text.includes(marker));
}

function isDecision(sentence) {
  const cleaned = cleanSentence(sentence);
  if (!cleaned) return false;
  if (containsAny(cleaned, pendingMarkers)) return false;
  if (!containsAny(cleaned, decisionMarkers)) return false;

  return /(决定|确定|明确|统一|由.+负责|由.+推进|预算.+控制在|本周|下周|先.+上线|先.+做|不再|不做|改为|采用)/.test(cleaned);
}

function isPending(sentence) {
  const cleaned = cleanSentence(sentence);
  if (!cleaned) return false;
  return containsAny(cleaned, pendingMarkers) || /(谁来|何时|什么时候|是否|预算.*确认|时间.*确定|方案.*确认)/.test(cleaned);
}

function trimToCore(sentence, type) {
  const cleaned = cleanSentence(sentence);
  if (!cleaned) return "";

  if (type === "decision") {
    const match = cleaned.match(
      /(决定.*|确定.*|明确.*|统一.*|预算.*控制在.*|由.*负责.*|由.*推进.*|由.*申请.*|下周.*|本周.*上线.*|先上线.*|先做.*|不做.*|不上.*|停止.*|改为.*|采用.*)/
    );
    return match ? match[0].trim() : cleaned;
  }

  const pendingMatch = cleaned.match(/(.*(待确认|还没定|尚未确定|未定|需要确认|后续确认|再确认|进一步确认|还要确认|待定|再讨论|继续讨论|没拍板|暂未确定|尚未拍板).*)/);
  if (pendingMatch) return pendingMatch[1].trim();

  if (/(谁来|何时|什么时候|是否)/.test(cleaned)) {
    return `${cleaned.replace(/[。；;]+$/g, "")}，需后续确认`;
  }

  return cleaned;
}

function dedupe(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.replace(/[，,\s]/g, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractMeeting(text) {
  const sentences = splitSentences(normalizeText(text));

  const decisions = dedupe(
    sentences
      .filter(isDecision)
      .map((item) => trimToCore(item, "decision"))
      .filter(Boolean)
  ).slice(0, 5);

  if (decisions.length) {
    return {
      type: "核心决策",
      items: decisions
    };
  }

  const pending = dedupe(
    sentences
      .filter(isPending)
      .map((item) => trimToCore(item, "pending"))
      .filter(Boolean)
  ).slice(0, 3);

  return {
    type: "待确认事项",
    items: pending.length ? pending : ["会议记录中未识别到明确决策，需后续确认具体方案、时间或负责人。"]
  };
}

function setError(message) {
  errorText.textContent = message;
}

function renderResult(result) {
  resultType.textContent = result.type;
  resultList.innerHTML = "";

  result.items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-item";
    row.textContent = item.replace(/[。；;]+$/g, "");
    resultList.appendChild(row);
  });

  resultCard.hidden = false;
  emptyState.hidden = true;
}

function resetResult() {
  resultCard.hidden = true;
  emptyState.hidden = false;
  resultType.textContent = "";
  resultList.innerHTML = "";
}

function updateCount() {
  charCount.textContent = `${meetingInput.value.length} / 3000`;
}

function handleExtract() {
  const text = meetingInput.value.trim();
  setError("");

  if (!text) {
    resetResult();
    setError("请先粘贴一段会议记录。");
    return;
  }

  const result = extractMeeting(text);
  renderResult(result);
}

function copyResult() {
  if (resultCard.hidden) {
    setError("当前没有可复制的结果。");
    return;
  }

  const lines = [...resultList.querySelectorAll(".result-item")].map((item) => item.textContent);
  const text = [`输出类型：${resultType.textContent}`, ...lines].join("\n");

  navigator.clipboard
    .writeText(text)
    .then(() => setError("已复制到剪贴板。"))
    .catch(() => setError("复制失败，请手动复制结果。"));
}

extractBtn.addEventListener("click", handleExtract);

clearBtn.addEventListener("click", () => {
  meetingInput.value = "";
  updateCount();
  setError("");
  resetResult();
  meetingInput.focus();
});

copyBtn.addEventListener("click", copyResult);
meetingInput.addEventListener("input", updateCount);

updateCount();
resetResult();
