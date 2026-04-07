const abbrInput = document.querySelector("#abbrInput");
const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
const copyBtn = document.querySelector("#copyBtn");
const emptyState = document.querySelector("#emptyState");
const resultCard = document.querySelector("#resultCard");
const errorText = document.querySelector("#errorText");

const abbrValue = document.querySelector("#abbrValue");
const englishValue = document.querySelector("#englishValue");
const chineseValue = document.querySelector("#chineseValue");
const explanationValue = document.querySelector("#explanationValue");

const glossary = {
  KPI: { english: "Key Performance Indicator", chinese: "关键绩效指标", explanation: "用来衡量团队或项目目标完成情况的核心指标，比如招生量、续费率或课程完成率。" },
  GMV: { english: "Gross Merchandise Volume", chinese: "成交总额", explanation: "指一段时间内平台或业务产生的总交易金额，常用来判断业务规模。" },
  CAC: { english: "Customer Acquisition Cost", chinese: "获客成本", explanation: "指获得一个新用户平均要花多少钱，常用于评估投放和拉新效率。" },
  LTV: { english: "Lifetime Value", chinese: "用户生命周期价值", explanation: "指一个用户在整个留存周期里能为业务带来的总价值，常和获客成本一起看。" },
  DAU: { english: "Daily Active Users", chinese: "日活跃用户数", explanation: "指每天实际使用产品的用户数量，常用来判断产品活跃度。" },
  MAU: { english: "Monthly Active Users", chinese: "月活跃用户数", explanation: "指一个月内至少活跃过一次的用户数量，用来观察产品的整体使用规模。" },
  ARPU: { english: "Average Revenue Per User", chinese: "每用户平均收入", explanation: "指平均每个用户带来的收入，常用来衡量付费转化后的商业表现。" },
  ROI: { english: "Return on Investment", chinese: "投资回报率", explanation: "用来判断一项投放、活动或项目投入后带来的收益是否划算。" },
  SOP: { english: "Standard Operating Procedure", chinese: "标准作业流程", explanation: "指把重复工作整理成标准步骤，方便团队统一执行和新人快速上手。" },
  OKR: { english: "Objectives and Key Results", chinese: "目标与关键结果", explanation: "一种目标管理方式，先定目标，再用几个关键结果判断是否达成。" },
  PV: { english: "Page View", chinese: "页面浏览量", explanation: "指页面被访问的总次数，同一个人多次打开也会重复计数。" },
  UV: { english: "Unique Visitor", chinese: "独立访客数", explanation: "指去重后的访问人数，常用来判断实际有多少人看过页面或活动。" },
  NPS: { english: "Net Promoter Score", chinese: "净推荐值", explanation: "用来衡量用户愿不愿意推荐产品，常作为满意度和口碑的参考。" },
  CRM: { english: "Customer Relationship Management", chinese: "客户关系管理", explanation: "通常指管理线索、学员和销售跟进过程的系统或方法。" },
  CLV: { english: "Customer Lifetime Value", chinese: "客户生命周期价值", explanation: "和 LTV 类似，强调一个客户在长期关系中能带来的总收入或价值。" },
  CTR: { english: "Click Through Rate", chinese: "点击率", explanation: "指看到内容后实际点进去的比例，常用来判断广告、海报或落地页是否吸引人。" },
  CVR: { english: "Conversion Rate", chinese: "转化率", explanation: "指用户完成目标动作的比例，比如试听后留资、留资后报名。" },
  CPS: { english: "Cost Per Sale", chinese: "按成交付费成本", explanation: "指每带来一笔实际成交平均花了多少钱，常用于效果投放结算。" },
  CPL: { english: "Cost Per Lead", chinese: "单条线索成本", explanation: "指拿到一个有效线索平均需要花多少钱，教育行业拉新和销售常会看这个指标。" },
  CPA: { english: "Cost Per Acquisition", chinese: "单次获客成本", explanation: "指获得一个目标用户或目标行为平均需要花多少钱，常用于评估投放效果。" },
  LEAD: { english: "Sales Lead", chinese: "销售线索", explanation: "指有机会转化成报名或付费的潜在用户信息，比如留资家长或试听学员。" },
  SQL: { english: "Sales Qualified Lead", chinese: "销售合格线索", explanation: "指已经达到销售跟进标准、可以重点推进成交的线索。" },
  MQL: { english: "Marketing Qualified Lead", chinese: "市场合格线索", explanation: "指经过市场筛选后有一定意向的线索，但还需要进一步判断成交可能性。" },
  CRMR: { english: "Customer Relationship Management Report", chinese: "客户关系管理报表", explanation: "通常指 CRM 系统相关的数据报表，用来查看线索、跟进和转化情况。" },
  ARR: { english: "Annual Recurring Revenue", chinese: "年度经常性收入", explanation: "常用于长期订阅或续费型业务，表示一年内稳定重复产生的收入规模。" },
  MRR: { english: "Monthly Recurring Revenue", chinese: "月度经常性收入", explanation: "指按月稳定重复产生的收入，常用于订阅课程、会员或系统服务。" },
  ACV: { english: "Annual Contract Value", chinese: "年度合同金额", explanation: "指一个客户一年合同对应的金额，B 端教育业务里比较常见。" },
  AOV: { english: "Average Order Value", chinese: "客单价", explanation: "指平均每笔订单带来的金额，能帮助判断产品组合和成交质量。" },
  ASP: { english: "Average Selling Price", chinese: "平均销售单价", explanation: "指产品或课程平均卖出的价格，常用于分析价格带和销售策略。" },
  CPO: { english: "Cost Per Order", chinese: "单笔订单成本", explanation: "指带来一笔订单平均花费的成本，适合用来评估活动或渠道效率。" },
  RET: { english: "Retention Rate", chinese: "留存率", explanation: "指用户在一段时间后仍然继续使用产品或继续学习的比例。" },
  REP: { english: "Repurchase Rate", chinese: "复购率", explanation: "指已经买过课的用户再次购买的比例，常用于判断课程体系和用户认可度。" },
  NDR: { english: "Net Dollar Retention", chinese: "净收入留存率", explanation: "指老客户在续费、增购、流失综合影响后，最终保留下来的收入比例。" },
  CSAT: { english: "Customer Satisfaction", chinese: "客户满意度", explanation: "指用户对课程、服务或班主任支持的满意程度，常通过问卷收集。" },
  CES: { english: "Customer Effort Score", chinese: "客户费力度评分", explanation: "用来衡量用户完成某件事有多费劲，比如报名、约课、请假或续费流程。" },
  LMS: { english: "Learning Management System", chinese: "学习管理系统", explanation: "指用于管理课程、学习进度、作业和教学数据的系统。" },
  SIS: { english: "Student Information System", chinese: "学员信息系统", explanation: "指管理学员档案、班级、课程和基础信息的系统。" },
  OMS: { english: "Order Management System", chinese: "订单管理系统", explanation: "指管理订单创建、支付、退款和订单状态流转的系统。" },
  ERP: { english: "Enterprise Resource Planning", chinese: "企业资源计划系统", explanation: "指把财务、采购、人事、库存等内部资源统一管理起来的系统。" },
  BI: { english: "Business Intelligence", chinese: "商业智能", explanation: "通常指数据分析平台或报表体系，用来帮助团队看业务数据和做判断。" },
  "B端": { english: "Business to Business", chinese: "企业端业务", explanation: "指面向学校、机构或企业客户提供产品和服务的业务。" },
  "C端": { english: "Business to Customer", chinese: "个人用户业务", explanation: "指面向学生、家长或个人消费者提供课程和服务的业务。" },
  SAAS: { english: "Software as a Service", chinese: "软件即服务", explanation: "指通过云端持续提供软件服务的模式，教育行业常见于校务和教学管理产品。" },
  POC: { english: "Proof of Concept", chinese: "概念验证", explanation: "指先小范围验证方案能不能跑通，再决定是否正式投入。" },
  UAT: { english: "User Acceptance Testing", chinese: "用户验收测试", explanation: "指产品上线前由业务或使用方确认是否满足实际需求的测试环节。" },
  PRD: { english: "Product Requirements Document", chinese: "产品需求文档", explanation: "指把需求背景、目标、功能和规则写清楚的产品文档。" },
  MVP: { english: "Minimum Viable Product", chinese: "最小可行产品", explanation: "指先用最少功能验证产品有没有价值，而不是一开始做得很复杂。" },
  GM: { english: "Growth Metric", chinese: "增长指标", explanation: "通常指团队重点盯的增长结果指标，比如新增、激活、续费或转化。" },
  ROIA: { english: "Return on Investment of Advertising", chinese: "广告投资回报率", explanation: "指广告投入带来的回报，用来判断广告投放是否值得继续加码。" },
  ROAS: { english: "Return on Advertising Spend", chinese: "广告支出回报率", explanation: "指广告花出去的钱最终带回了多少收入，是投放团队常看的指标。" }
};

function normalizeInput(value) {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

function setError(message) {
  errorText.textContent = message;
}

function resetResult() {
  resultCard.hidden = true;
  emptyState.hidden = false;
  abbrValue.textContent = "";
  englishValue.textContent = "";
  chineseValue.textContent = "";
  explanationValue.textContent = "";
}

function renderResult(abbr, item) {
  abbrValue.textContent = abbr;
  englishValue.textContent = item.english;
  chineseValue.textContent = item.chinese;
  explanationValue.textContent = item.explanation;
  resultCard.hidden = false;
  emptyState.hidden = true;
}

function searchAbbr() {
  const normalized = normalizeInput(abbrInput.value);
  setError("");

  if (!normalized) {
    resetResult();
    setError("请先输入一个缩写。");
    return;
  }

  const item = glossary[normalized];

  if (!item) {
    resetResult();
    setError("当前词库里没有这个缩写，请先试试 KPI、GMV、CAC、LTV、DAU 等常见词。");
    return;
  }

  renderResult(normalized, item);
}

function copyResult() {
  if (resultCard.hidden) {
    setError("当前没有可复制的查询结果。");
    return;
  }

  const text = [
    `缩写：${abbrValue.textContent}`,
    `英文全称：${englishValue.textContent}`,
    `中文含义：${chineseValue.textContent}`,
    `简短解释：${explanationValue.textContent}`
  ].join("\n");

  navigator.clipboard
    .writeText(text)
    .then(() => setError("已复制到剪贴板。"))
    .catch(() => setError("复制失败，请手动复制结果。"));
}

searchBtn.addEventListener("click", searchAbbr);

clearBtn.addEventListener("click", () => {
  abbrInput.value = "";
  setError("");
  resetResult();
  abbrInput.focus();
});

copyBtn.addEventListener("click", copyResult);

abbrInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchAbbr();
  }
});

resetResult();
