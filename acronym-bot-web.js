const botInput = document.querySelector("#botInput");
const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
const copyBtn = document.querySelector("#copyBtn");
const translateBtn = document.querySelector("#translateBtn");
const emptyState = document.querySelector("#emptyState");
const resultCard = document.querySelector("#resultCard");
const errorText = document.querySelector("#errorText");

const abbrValue = document.querySelector("#abbrValue");
const meaningValue = document.querySelector("#meaningValue");
const translationRow = document.querySelector("#translationRow");
const translationValue = document.querySelector("#translationValue");
const butterflies = [...document.querySelectorAll(".butterfly")];

let currentMatch = "";

const importedGlossary = {"AGO":"Attorney General’s Office","ALB":"Arms Length Bodies","BAU":"Business as Usual","BCS":"British Computer Society","BEIS":"Department of Business, Energy and Industrial Strategy","BIS":"Department for Business, Innovation and Skills","CA":"Citizens Advice","CAB":"Change Advisory Board","CAF":"Common Assessment Framework","CCG":"Clinical Commissioning Group","CCS":"Crown Commercial Service","CCW":"Consumer Council for Water","CO":"Cabinet Office","CPS":"Crown Prosecution Service","CQC":"Care Quality Commission","Cafcass":"Children and Family Court Advisory and Support Service","DBS":"Disclosure & Barring Service","DCLG":"Department for Communities & Local Government","DCMS":"Department for Digital, Culture, Media and Sport","DDAT":"Digital, Data and Technology","DExEU":"Department for Exiting the EU","DFID":"Department for International Development","DFT":"Department for Transport","DHSC":"Department of Health and Social Care","DIT":"Department of International Trade","DOS":"Digital Outcomes and Specialists","DVLA":"Driver and Vehicle Licensing Agency","DVSA":"Driver & Vehicle Standards Agency","DWP":"Department for Work and Pensions","Defra":"Department for Environment, Food and Rural Affairs","DfE":"Department for Education","ERG":"Efficiency and Reform Group","FBC":"Full Business Case","FCA":"Financial Conduct Authority","FCO":"Foreign and Commonwealth Office","FSA":"Food Standards Authority","FTE":"Full-time Equivalent","FoI":"Freedom of Information","GDS":"Government Digital Service","GLS":"Government Legal Service","GMPP":"Government's Major Projects Portfolio","GSI":"Government Secure Intranet","HEE":"Health Education England","HMCTS":"Her Majesty's Courts & Tribunals Service","HMG":"Her Majesty's Government","HMIC":"Her Majesty's Inspectorate of Constabulary","HMRC":"Her Majesty's Revenue and Customs","HMT":"Her Majesty's Treasury","HO":"Home Office","HRA":"Health Research Authority","ICO":"Information Commissioner's Office","IPA":"Infrastructure and Projects Authority","IPO":"Intellectual Property Office","ITHC":"IT Health Check","ITIL":"Information Technology Infrastructure Library","ITT":"Invitation to Tender","JAC":"Judicial Appointments Commission","KPI":"Key Performance Indicator","LA":"Local Authority","LAA":"Legal Aid Agency","MHCLG":"Ministry of Housing, Communities and Local Government","MISO":"Management System Information Online","MVP":"Minimum Viable Product","MoG":"Machinery of Government","MoJ":"Ministry of Justice","MoPA":"Major Projects Authority","NAO":"National Audit Office","NCA":"National Crime Agency","NCSC":"National Cyber-Security Centre","NDPB":"Non-Departmental Public Body","NGO":"Non-Governmental organisation","NHS":"National Health Service","NHSE":"NHS England","NICE":"National Institute of Clinical Excellence","NIO":"Northern Ireland Office","NS&I":"National Savings & Investments","OBC":"Outline Business Case","OBR":"Office for Budget Responsibility","OGD":"Other Government Departments","OKR":"Objectives and Key Results","ONS":"Office for National Statistics","OPG":"Office of the Public Guardian","Ofcom":"Office of Communications","Ofgem":"Office of Gas & Electricity Markets","Ofqual":"Office of Qualifications and Examinations Regulation","Ofsted":"Office for Standards in Education, Children's Services and Skills","PAC":"Public Accounts Committee","PASC":"Public Administration Select Committee","PCT":"Primary Care Trust","PHE":"Public Health England","PM":"Product Manager","PSN":"Public Sector Network","QAR":"Quality Assurance Reviews","SCS":"Senior Civil Service","SFO":"Serious Fraud Office","SHA":"Strategic Health Authority","SIRO":"Senior Information Risk Owner","SOC":"Strategic Outline Case","SRO":"Senior Responsible Owner","STA":"Senior Technical Advisor","UKEF":"UK Export Finance","VOA":"Valuation Office Agency","BAS":"British Antarctic Survey","AO":"Arctic Office","BBB":"British Business Bank","BCE":"Boundary Commission for England","CBW":"Community Business Weekend","CCC":"The Committee on Climate Change","CoDH":"Council of Deans of Health","DfT":"Department for Transport","E&E":"Education and Employers","ITF":"Inspiring the Future","PF":"Primary Futures","IG":"Inspiring Governance","IFEG":"Inspiring Further Education Governance","ESHT":"East Sussex Healthcare NHS Trust","BAT":"British Antarctic Territory","BIOT":"British Indian Overseas Territory","GISF":"Global Intelligence Security Forum","GLD":"Government Legal Department","GOC":"General Optical Council","GOsC":"General Osteopathic Council","ICAI":"Independent Commission for Aid Impact","LGIU":"Local Government Information Unit","MoD":"Ministry of Defence","AFC, AFD":"Armed Forces Covenant / Day","Natcen":"National Centre of Statistics (Also ScotCen)","WST":"What Scotland Thinks","WUKT":"What UK Thinks","GSS":"Government Statistical Service","DL":"Delivery Lead","UR":"User Researcher","FE":"Design/front end developer","BE":"Developer / back end","TM":"Transformation managers","SD":"Service designer","IxD":"Interaction Designer","SaaS":"Software as a service","PaaS":"Platform as a service","GPaaS":"GOV.UK Platform as a Service","i18n":"Internationalisation","a11y":"Accessibility","l10n":"localisation","SID":"Statistics on International Development","FCDO":"Foreign, Commonwealth & Development Office","AHRC":"Arts & Humanities Research Council","BBSRC":"Biotechnology and Biological Sciences Research Council","EPSRC":"Engineering and Physical Sciences Research Council","ESRC":"Economic and Social Research Council","IUK":"Innovate UK","MRC":"Medical Research Council","NERC":"Natural Environment Research Council","RAEng":"Royal Academy of Engineering","RE":"Research England","STFC":"Science and Technology Facilities","UKRI":"UK Research and Innovation","IATI":"International Aid Transparency Initiative","ADR":"Architectural Decision Records","EOT":"Employee Ownership Trust","ISPF":"International Science Partnerships Fund","DLUHC":"Department for Levelling Up, Housing & Communities","RODA":"Report your Official Development Assistance","TNA":"The National Archives","DSIT":"Department for Science, Innovation and Technology"};

const translatedGlossary = {
  DfE: "英国教育部",
  DfT: "英国交通部",
  KPI: "关键绩效指标",
  MVP: "最小可行产品",
  OKR: "目标与关键结果",
  ADR: "架构决策记录",
  PM: "产品经理",
  DL: "交付负责人",
  UR: "用户研究员",
  FE: "前端开发",
  BE: "后端开发",
  SD: "服务设计师",
  IxD: "交互设计师",
  SaaS: "软件即服务",
  PaaS: "平台即服务",
  GPaaS: "GOV.UK 平台即服务",
  i18n: "国际化",
  a11y: "无障碍",
  l10n: "本地化",
  GDS: "英国政府数字服务团队",
  DDAT: "数字、数据与技术",
  DOS: "数字成果与专家服务",
  FTE: "全职当量",
  OGD: "其他政府部门",
  PM: "产品经理",
  DLUHC: "英国升级、住房与社区事务部",
  DSIT: "英国科学、创新与技术部",
  FCDO: "英国外交、联邦及发展事务部",
  HMRC: "英国税务海关总署",
  HMT: "英国财政部",
  NHS: "英国国家医疗服务体系",
  NHSE: "英国国家医疗服务体系英格兰部门",
  Ofsted: "英国教育标准局",
  Ofqual: "英国资格与考试监管办公室",
  IPO: "知识产权局",
  ICO: "信息专员办公室",
  NCSC: "英国国家网络安全中心",
  DWP: "英国工作与养老金部",
  MoJ: "英国司法部",
  MoD: "英国国防部",
  NAO: "英国国家审计署",
  ONS: "英国国家统计局",
  UKEF: "英国出口信贷署",
  UKRI: "英国科研与创新署",
  RAEng: "英国皇家工程院",
  ESRC: "经济与社会研究理事会",
  EPSRC: "工程与自然科学研究理事会",
  MRC: "医学研究理事会",
  NERC: "自然环境研究理事会",
  AHRC: "艺术与人文研究理事会",
  BBSRC: "生物技术与生物科学研究理事会",
  STFC: "科学与技术设施理事会",
  IUK: "英国创新署",
  PAC: "公共账目委员会",
  PASC: "公共行政特别委员会",
  OBR: "预算责任办公室",
  CAB: "变更咨询委员会",
  ITIL: "信息技术基础架构库",
  ITT: "投标邀请",
  BAU: "日常业务",
  QAR: "质量保障评审",
  SRO: "高级责任负责人",
  SIRO: "高级信息风险负责人",
  STA: "高级技术顾问",
  FBC: "完整商业案例",
  OBC: "概要商业案例",
  SOC: "战略概要案例",
  LA: "地方政府",
  NGO: "非政府组织",
  GSI: "政府安全内网",
  GSS: "政府统计服务",
  RODA: "官方发展援助填报",
  TNA: "英国国家档案馆"
};

function setError(message) {
  errorText.textContent = message;
}

function resetResult() {
  resultCard.hidden = true;
  emptyState.hidden = false;
  abbrValue.textContent = "";
  meaningValue.textContent = "";
  currentMatch = "";
  if (translationRow) translationRow.hidden = true;
  if (translationValue) translationValue.textContent = "";
  if (translateBtn) translateBtn.disabled = true;
}

function findFirstMatch(acronym) {
  return Object.keys(importedGlossary).find((key) => key.toLowerCase() === acronym.toLowerCase());
}

function renderResult(key) {
  currentMatch = key;
  abbrValue.textContent = key;
  meaningValue.textContent = importedGlossary[key];
  resultCard.hidden = false;
  emptyState.hidden = true;
  if (translationRow) translationRow.hidden = true;
  if (translationValue) translationValue.textContent = "";
  if (translateBtn) translateBtn.disabled = false;
}

function translateCurrent() {
  if (!currentMatch) {
    setError("请先查询一个缩写。");
    return;
  }

  const translated = translatedGlossary[currentMatch];

  if (!translationRow || !translationValue) {
    return;
  }

  if (!translated) {
    translationRow.hidden = false;
    translationValue.textContent = "当前版本暂未覆盖该词条的高质量中文翻译。";
    setError("这个词条暂时还没有内置中文释义。");
    return;
  }

  translationRow.hidden = false;
  translationValue.textContent = translated;
  setError("");
}

function searchAcronym() {
  const acronym = botInput.value.trim();
  setError("");

  if (!acronym) {
    resetResult();
    setError("请先输入一个缩写。");
    return;
  }

  const firstMatch = findFirstMatch(acronym);

  if (firstMatch) {
    renderResult(firstMatch);
    return;
  }

  resetResult();
  setError(`Sorry, I don't know the acronym "${acronym}"`);
}

function copyResult() {
  if (resultCard.hidden) {
    setError("当前没有可复制的查询结果。");
    return;
  }

  const lines = [`${abbrValue.textContent} stands for ${meaningValue.textContent}`];

  if (translationRow && !translationRow.hidden && translationValue.textContent) {
    lines.push(`中文释义：${translationValue.textContent}`);
  }

  const text = lines.join("\n");

  navigator.clipboard
    .writeText(text)
    .then(() => setError("已复制到剪贴板。"))
    .catch(() => setError("复制失败，请手动复制结果。"));
}

searchBtn.addEventListener("click", searchAcronym);

clearBtn.addEventListener("click", () => {
  botInput.value = "";
  setError("");
  resetResult();
  botInput.focus();
});

copyBtn.addEventListener("click", copyResult);

if (translateBtn) {
  translateBtn.addEventListener("click", translateCurrent);
}

botInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchAcronym();
  }
});

if (butterflies.length) {
  const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    active: false
  };
  const state = butterflies.map((node) => ({
    node,
    baseX: Number(node.dataset.baseX || 50),
    baseY: Number(node.dataset.baseY || 50),
    scale: Number(node.dataset.scale || 1) || 1,
    x: (window.innerWidth * Number(node.dataset.baseX || 50)) / 100,
    y: (window.innerHeight * Number(node.dataset.baseY || 50)) / 100,
    vx: 0,
    vy: 0,
    wanderPhase: Math.random() * Math.PI * 2,
    wanderRadius: 28 + Math.random() * 26,
    driftSpeed: 0.5 + Math.random() * 0.28,
    turnBias: (Math.random() - 0.5) * 18,
    maxIdleSpeed: 1.1 + Math.random() * 0.5,
    maxGatherSpeed: 2.6 + Math.random() * 1.2
  }));

  const updatePointer = (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  };

  const releasePointer = () => {
    pointer.active = false;
  };

  const renderButterflies = () => {
    const now = performance.now() * 0.001;

    state.forEach((item, index) => {
      const homeX =
        (window.innerWidth * item.baseX) / 100 +
        Math.cos(now * item.driftSpeed + item.wanderPhase) * item.wanderRadius;
      const homeY =
        (window.innerHeight * item.baseY) / 100 +
        Math.sin(now * (item.driftSpeed * 1.16) + item.wanderPhase * 0.8) * (item.wanderRadius * 0.72);

      let targetX = homeX;
      let targetY = homeY;
      let velocityLimit = item.maxIdleSpeed;

      if (pointer.active) {
        targetX = pointer.x + Math.cos(item.wanderPhase + index) * 10;
        targetY = pointer.y + Math.sin(item.wanderPhase + index * 1.7) * 10;
        velocityLimit = item.maxGatherSpeed;
      }

      const dx = targetX - item.x;
      const dy = targetY - item.y;
      const distance = Math.hypot(dx, dy) || 1;
      const desireX = (dx / distance) * Math.min(velocityLimit, distance * 0.04);
      const desireY = (dy / distance) * Math.min(velocityLimit, distance * 0.04);

      item.vx += (desireX - item.vx) * (pointer.active ? 0.06 : 0.028);
      item.vy += (desireY - item.vy) * (pointer.active ? 0.06 : 0.028);

      item.x += item.vx;
      item.y += item.vy;

      const rotation = Math.atan2(item.vy, item.vx) * (180 / Math.PI) + 90 + item.turnBias;

      item.node.style.left = `${item.x.toFixed(2)}px`;
      item.node.style.top = `${item.y.toFixed(2)}px`;
      item.node.style.transform = `translate(-50%, -50%) rotate(${rotation.toFixed(2)}deg) scale(${item.scale})`;
    });

    window.requestAnimationFrame(renderButterflies);
  };

  window.addEventListener("mousemove", updatePointer);
  window.addEventListener("mouseleave", releasePointer);
  window.addEventListener("blur", releasePointer);
  window.addEventListener("resize", () => {
    state.forEach((item) => {
      item.x = (window.innerWidth * item.baseX) / 100;
      item.y = (window.innerHeight * item.baseY) / 100;
      item.vx = 0;
      item.vy = 0;
    });
    pointer.x = window.innerWidth / 2;
    pointer.y = window.innerHeight / 2;
  });
  renderButterflies();
}

resetResult();
