/* ═══════════════════════════════════════════════════════════════
   TechVision EduSystem — app.js
   Complete School Management JavaScript Application
═══════════════════════════════════════════════════════════════ */

/* ─── GLOBAL STATE ─── */
let currentRole = "Super Admin";
let currentPage = "dashboard";
let sidebarCollapsed = false;
let currentLang = "EN";
let attendanceStatuses = {};
let chartInstances = {};
let admissionStep = 1;
let currentTab = {};

/* ─── MOCK DATA ─── */
const DATA = {
  students: [
    { id:"STU-2024-001", name:"Rafiqul Islam",    cls:"12", sec:"A", roll:1,  gpa:4.8, attendance:95, fee:"Paid",    guardian:"Abdul Islam",   phone:"01711-234567", subject:"CSE" },
    { id:"STU-2024-002", name:"Fatema Begum",     cls:"11", sec:"B", roll:2,  gpa:4.5, attendance:88, fee:"Paid",    guardian:"Karim Hossain", phone:"01812-345678", subject:"BBA" },
    { id:"STU-2024-003", name:"Md. Sabbir Ahmed", cls:"12", sec:"A", roll:3,  gpa:3.9, attendance:72, fee:"Due",     guardian:"Sabbir Sr.",    phone:"01913-456789", subject:"EEE" },
    { id:"STU-2024-004", name:"Nusrat Jahan",     cls:"10", sec:"C", roll:4,  gpa:4.2, attendance:91, fee:"Paid",    guardian:"Jahan Sr.",     phone:"01614-567890", subject:"CSE" },
    { id:"STU-2024-005", name:"Tanvir Hossain",   cls:"11", sec:"A", roll:5,  gpa:3.5, attendance:65, fee:"Due",     guardian:"Hossain Sr.",   phone:"01715-678901", subject:"Civil" },
    { id:"STU-2024-006", name:"Shapla Khatun",    cls:"12", sec:"B", roll:6,  gpa:4.7, attendance:97, fee:"Paid",    guardian:"Khatun Sr.",    phone:"01816-789012", subject:"CSE" },
    { id:"STU-2024-007", name:"Imran Hossain",    cls:"10", sec:"A", roll:7,  gpa:4.0, attendance:83, fee:"Partial", guardian:"Imran Sr.",     phone:"01917-890123", subject:"BBA" },
    { id:"STU-2024-008", name:"Rima Akter",       cls:"11", sec:"C", roll:8,  gpa:4.6, attendance:94, fee:"Paid",    guardian:"Akter Sr.",     phone:"01618-901234", subject:"EEE" },
  ],
  teachers: [
    { id:"TCH-001", name:"Prof. Dr. Aminul Islam", dept:"CSE",   subjects:["Data Structures","Algorithms"],  classes:["12A","11B"], attend:97, salary:65000, qual:"PhD CSE" },
    { id:"TCH-002", name:"Md. Rezaul Karim",       dept:"EEE",   subjects:["Circuit Theory","Electronics"],  classes:["11A","10C"], attend:92, salary:55000, qual:"M.Sc EEE" },
    { id:"TCH-003", name:"Ms. Hosne Ara Begum",    dept:"BBA",   subjects:["Accounting","Finance"],          classes:["12B","10A"], attend:88, salary:50000, qual:"MBA" },
    { id:"TCH-004", name:"Md. Shahabuddin",        dept:"Civil", subjects:["Structural Eng","Surveying"],    classes:["11C","12A"], attend:95, salary:58000, qual:"B.Sc Civil" },
    { id:"TCH-005", name:"Ms. Tahmina Sultana",    dept:"CSE",   subjects:["Web Dev","Database"],            classes:["10B","11A"], attend:90, salary:52000, qual:"M.Sc CSE" },
  ],
  notices: [
    { id:1, title:"HSC Admission Form Deadline Extended",  date:"2024-06-10", type:"Admission", priority:"high" },
    { id:2, title:"Annual Sports Day – Registration Open", date:"2024-06-08", type:"Event",     priority:"medium" },
    { id:3, title:"1st Semester Result Published",         date:"2024-06-05", type:"Academic",  priority:"high" },
    { id:4, title:"Library Holiday Notice",                date:"2024-06-03", type:"Library",   priority:"low" },
    { id:5, title:"Fee Submission Last Date",              date:"2024-06-01", type:"Finance",   priority:"high" },
  ],
  events: [
    { id:1, title:"Annual Prize Giving Ceremony",    date:"2024-06-20", venue:"Main Auditorium" },
    { id:2, title:"Inter-College Debate Competition", date:"2024-06-25", venue:"Conference Hall" },
    { id:3, title:"Industrial Visit – CSE Dept",     date:"2024-07-05", venue:"BRAC IT Park" },
    { id:4, title:"Parent-Teacher Meeting",          date:"2024-07-10", venue:"Classrooms" },
  ],
  attendance: [
    { month:"Jan", present:92, absent:8 }, { month:"Feb", present:88, absent:12 },
    { month:"Mar", present:95, absent:5 }, { month:"Apr", present:91, absent:9 },
    { month:"May", present:87, absent:13 },{ month:"Jun", present:94, absent:6 },
    { month:"Jul", present:96, absent:4 }, { month:"Aug", present:89, absent:11 },
  ],
  fees: [
    { month:"Jan", collected:485000, due:65000 },{ month:"Feb", collected:512000, due:48000 },
    { month:"Mar", collected:498000, due:52000 },{ month:"Apr", collected:535000, due:35000 },
    { month:"May", collected:520000, due:40000 },{ month:"Jun", collected:548000, due:22000 },
  ],
  gpaDistrib: [
    { label:"A+ (5.0)", val:28, color:"#10b981" },
    { label:"A (4.0–4.9)", val:45, color:"#0ea5e9" },
    { label:"A- (3.5–3.9)", val:32, color:"#3b82f6" },
    { label:"B (3.0–3.4)", val:21, color:"#8b5cf6" },
    { label:"C & Below", val:12, color:"#f59e0b" },
  ],
  deptEnroll: [
    { dept:"CSE", students:312 },{ dept:"EEE", students:245 },
    { dept:"Civil", students:198 },{ dept:"BBA", students:276 },
    { dept:"Textile", students:167 },{ dept:"Arch.", students:89 },
  ],
  exams: [
    { id:1, name:"1st Semester Final",  date:"2024-06-15", classes:"All",  status:"Published" },
    { id:2, name:"Mid-term Examination",date:"2024-04-01", classes:"10,11",status:"Completed" },
    { id:3, name:"Unit Test – I",       date:"2024-02-10", classes:"12",   status:"Completed" },
    { id:4, name:"2nd Semester Final",  date:"2024-11-20", classes:"All",  status:"Scheduled" },
  ],
  books: [
    { id:"BK-001", title:"Introduction to Algorithms",    author:"CLRS",       cat:"CSE",   qty:12, avail:7 },
    { id:"BK-002", title:"Electrical Circuit Analysis",   author:"Hayt",       cat:"EEE",   qty:8,  avail:3 },
    { id:"BK-003", title:"Principles of Management",      author:"Koontz",     cat:"BBA",   qty:15, avail:11 },
    { id:"BK-004", title:"Structural Analysis",           author:"Hibbeler",   cat:"Civil", qty:6,  avail:2 },
    { id:"BK-005", title:"Database System Concepts",      author:"Silberschatz",cat:"CSE",  qty:10, avail:6 },
  ],
  payroll: [
    { name:"Prof. Dr. Aminul Islam", dept:"CSE",   basic:65000, allowance:15000, deduction:8000,  net:72000 },
    { name:"Md. Rezaul Karim",       dept:"EEE",   basic:55000, allowance:12000, deduction:6500,  net:60500 },
    { name:"Ms. Hosne Ara Begum",    dept:"BBA",   basic:50000, allowance:10000, deduction:5800,  net:54200 },
    { name:"Md. Shahabuddin",        dept:"Civil", basic:58000, allowance:11000, deduction:6200,  net:62800 },
    { name:"Ms. Tahmina Sultana",    dept:"CSE",   basic:52000, allowance:10000, deduction:5500,  net:56500 },
  ],
  calEvents: [
    {date:"2024-01-01",title:"New Year Holiday",                   type:"Holiday",  color:"#ef4444"},
    {date:"2024-02-21",title:"International Mother Language Day",   type:"National", color:"#f59e0b"},
    {date:"2024-03-26",title:"Independence Day",                    type:"National", color:"#f59e0b"},
    {date:"2024-04-01",title:"Mid-Term Exam Begins",               type:"Exam",     color:"#8b5cf6"},
    {date:"2024-04-14",title:"Pahela Boishakh (Bangla New Year)",  type:"National", color:"#f59e0b"},
    {date:"2024-06-01",title:"1st Semester Final Exam",            type:"Exam",     color:"#8b5cf6"},
    {date:"2024-06-15",title:"Result Publication",                  type:"Academic", color:"#0ea5e9"},
    {date:"2024-07-10",title:"Parent-Teacher Meeting",             type:"Event",    color:"#10b981"},
    {date:"2024-09-01",title:"2nd Semester Begins",                type:"Academic", color:"#0ea5e9"},
    {date:"2024-11-20",title:"2nd Semester Final Exam",            type:"Exam",     color:"#8b5cf6"},
    {date:"2024-12-16",title:"Victory Day",                         type:"National", color:"#f59e0b"},
  ],
};

/* ─── LANGUAGE STRINGS ─── */
const LANG = {
  EN: { loginAs:"Login As", email:"Email / Username", pass:"Password", remember:"Remember me", forgot:"Forgot password?", signIn:"Sign In" },
  BN: { loginAs:"হিসেবে লগইন করুন", email:"ইমেইল / ব্যবহারকারী", pass:"পাসওয়ার্ড", remember:"মনে রাখুন", forgot:"পাসওয়ার্ড ভুলেছেন?", signIn:"লগইন করুন" },
};

/* ─── PAGE NAV MAP ─── */
const NAV_MAP = {
  dashboard: { icon:"📊", label:"Dashboard" },
  students:  { icon:"🎓", label:"Students" },
  teachers:  { icon:"👨‍🏫", label:"Teachers" },
  academics: { icon:"📚", label:"Academics" },
  attendance:{ icon:"✅", label:"Attendance" },
  exams:     { icon:"📝", label:"Examinations" },
  fees:      { icon:"💰", label:"Fees & Finance" },
  library:   { icon:"📖", label:"Library" },
  notices:   { icon:"📢", label:"Notices" },
  hr:        { icon:"👥", label:"HR & Staff" },
  reports:   { icon:"📈", label:"Reports" },
  settings:  { icon:"⚙️", label:"Settings" },
};

/* ═══════════════════════════════════ INIT ═══════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  setTopbarDate();
  // Init attendance statuses
  DATA.students.forEach(s => attendanceStatuses[s.id] = "Present");
});

function setTopbarDate() {
  const el = document.getElementById('topbar-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-BD', {weekday:'long',year:'numeric',month:'long',day:'numeric'});
}

/* ═══════════════════════════════════ AUTH ═══════════════════════════════════ */
function handleLogin() {
async function handleLogin() {
  const btn = document.getElementById('login-btn');
  const spinner = document.getElementById('login-spinner');
  const btnText = document.getElementById('login-btn-text');
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-pass').value;

  if (!email || !password) {
    showToast('Please enter email and password', 'error');
    return;
  }

  btn.disabled = true;
  spinner.classList.remove('hidden');
  btnText.textContent = 'Authenticating…';

  try {
    // Real Supabase login
    const { user } = await loginUser(email, password);

    // Get role from users table
    const roleData = await getUserRole(user.id);
    currentRole = roleData?.role || 'student';

    // Update UI
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('sidebar-role-badge').innerHTML =
      badge(currentRole, '#f59e0b');
    document.getElementById('user-role-label').textContent = currentRole;
    document.getElementById('user-avatar').textContent =
      (roleData?.full_name || email)[0].toUpperCase();

    navigate('dashboard',
      document.querySelector('.nav-item[data-page="dashboard"]'));
    showToast('✅ Welcome back, ' + (roleData?.full_name || email) + '!');

  } catch (error) {
    showToast('❌ Login failed: ' + error.message, 'error');
  } finally {
    btn.disabled = false;
    spinner.classList.add('hidden');
    btnText.textContent = LANG[currentLang].signIn;
  }
}

function handleLogout() {
  document.getElementById('app').classList.add('hidden');
  document.getElementById('login-page').classList.remove('hidden');
  destroyCharts();
}

/* ═══════════════════════════════════ LANG ═══════════════════════════════════ */
function setLang(l, btn) {
  currentLang = l;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const L = LANG[l];
  const lbl = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
  lbl('lbl-role', L.loginAs); lbl('lbl-email', L.email); lbl('lbl-pass', L.pass);
  lbl('lbl-remember', L.remember); lbl('lbl-forgot', L.forgot);
  const btnTxt = document.getElementById('login-btn-text');
  if (btnTxt) btnTxt.textContent = L.signIn;
}

/* ═══════════════════════════════════ SIDEBAR ═══════════════════════════════════ */
function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('collapsed', sidebarCollapsed);
  document.getElementById('collapse-btn').textContent = sidebarCollapsed ? '→' : '← Collapse';
}

/* ═══════════════════════════════════ NAVIGATION ═══════════════════════════════════ */
function navigate(page, btn) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const info = NAV_MAP[page] || {};
  const iconEl = document.getElementById('topbar-page-icon');
  const nameEl = document.getElementById('topbar-page-name');
  if (iconEl) iconEl.textContent = info.icon || '';
  if (nameEl) nameEl.textContent = info.label || page;
  destroyCharts();
  renderPage(page);
}

function destroyCharts() {
  Object.values(chartInstances).forEach(c => { try { c.destroy(); } catch(e){} });
  chartInstances = {};
}

/* ═══════════════════════════════════ PAGE ROUTER ═══════════════════════════════════ */
function renderPage(page) {
  const el = document.getElementById('page-content');
  const renderers = {
    dashboard: renderDashboard,
    students:  renderStudents,
    teachers:  renderTeachers,
    academics: renderAcademics,
    attendance:renderAttendancePage,
    exams:     renderExams,
    fees:      renderFees,
    library:   renderLibrary,
    notices:   renderNotices,
    hr:        renderHR,
    reports:   renderReports,
    settings:  renderSettings,
  };
  el.innerHTML = '';
  (renderers[page] || renderDashboard)(el);
}

/* ═══════════════════════════════════ HELPERS ═══════════════════════════════════ */
function badge(text, color = '#0ea5e9') {
  return `<span class="badge" style="background:${color}20;color:${color};border:1px solid ${color}40">${text}</span>`;
}
function avatarColor(name) {
  const hue = (name || '').charCodeAt(0) * 7 % 360;
  return `hsl(${hue},55%,35%)`;
}
function initials(name) {
  return (name||'').split(' ').filter(x=>x.length>1).map(x=>x[0]).join('').slice(0,2).toUpperCase();
}
function progressBar(pct, color = '#10b981') {
  return `<div class="progress-bar-wrap"><div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${pct}%;background:${color}"></div></div><span style="color:#64748b;font-size:11px;flex-shrink:0">${pct}%</span></div>`;
}
function gpaColor(g) { return g>=4.5?'#10b981':g>=4?'#0ea5e9':g>=3.5?'#f59e0b':'#f97316'; }
function feeColor(f) { return f==='Paid'?'#10b981':f==='Due'?'#ef4444':'#f59e0b'; }
function statusColor(s) { return s==='Published'||s==='Approved'?'#10b981':s==='Completed'?'#64748b':s==='Pending'?'#f59e0b':'#0ea5e9'; }
function priorityColor(p) { return p==='high'?'#ef4444':p==='medium'?'#f59e0b':'#10b981'; }
function btn(label, variant='primary', size='', extra='') {
  const cls = `btn-${variant}${size?' btn-sm':''}`;
  return `<button class="${cls}" ${extra}>${label}</button>`;
}
function tabBar(tabs, activeTab, pageKey) {
  return `<div class="tab-bar">${tabs.map(t=>`<button class="tab-btn${activeTab===t?' active':''}" onclick="switchTab('${pageKey}','${t.replace(/'/g,"\\'")}',this)">${t}</button>`).join('')}</div>`;
}
function card(inner, cls='') { return `<div class="card ${cls}">${inner}</div>`; }
function sectionHeader(title, sub='', actionHTML='') {
  return `<div class="section-header"><div><div class="section-title">${title}</div>${sub?`<div class="section-sub">${sub}</div>`:''}</div>${actionHTML}</div>`;
}
function formInput(label, id, type='text', val='', placeholder='') {
  return `<div class="form-group"><label class="form-label">${label}</label><input class="form-input" id="${id}" type="${type}" value="${val}" placeholder="${placeholder}" /></div>`;
}
function formSelect(label, id, options, selected='') {
  const opts = options.map(o=>typeof o==='string'?{v:o,l:o}:{v:o.v,l:o.l});
  return `<div class="form-group"><label class="form-label">${label}</label><select class="form-select" id="${id}">${opts.map(o=>`<option value="${o.v}"${o.v===selected?' selected':''}>${o.l}</option>`).join('')}</select></div>`;
}

function switchTab(pageKey, tab, btnEl) {
  currentTab[pageKey] = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderPage(currentPage);
}

/* ═══════════════════════════════════ DASHBOARD ═══════════════════════════════════ */
function renderDashboard(el) {
  el.innerHTML = `
    <div class="page-header"><div class="page-title">Dashboard Overview</div><div class="page-sub">Academic Year 2023–2024 • TechVision Technical School & College</div></div>

    <div class="stat-grid">
      ${statCard('🎓','Total Students','1,287','↑ 48 new this session','#0ea5e9','▲ 3.7% vs last month','#0ea5e9')}
      ${statCard('👨‍🏫','Total Teachers','86','6 Departments','#10b981','▲ 2.1% vs last month','#10b981')}
      ${statCard('👥','Total Staff','134','Admin + Support','#8b5cf6',null,null)}
      ${statCard('✅','Today Attendance','91.4%','1,176 / 1,287 Present','#f59e0b','▼ 1.2% vs last month','#ef4444')}
      ${statCard('💰','Fee Collected','৳54.8L','June 2024','#f97316','▲ 5.3% vs last month','#10b981')}
      ${statCard('📚','Active Classes','48','Across 6 Departments','#06b6d4',null,null)}
    </div>

    <div class="chart-row">
      <div class="card">
        ${sectionHeader('Monthly Attendance Trend','Present vs Absent %')}
        <canvas id="chart-attend" height="200"></canvas>
      </div>
      <div class="card">
        ${sectionHeader('GPA Distribution')}
        <canvas id="chart-gpa" height="200"></canvas>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
          ${DATA.gpaDistrib.map(d=>`<span style="display:flex;align-items:center;gap:4px;font-size:11px;color:#64748b"><span style="width:8px;height:8px;border-radius:50%;background:${d.color};display:inline-block"></span>${d.label}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="chart-row-2">
      <div class="card">
        ${sectionHeader('Fee Collection','Monthly collected vs due (BDT)')}
        <canvas id="chart-fee" height="190"></canvas>
      </div>
      <div class="card">
        ${sectionHeader('Department Enrollment')}
        <canvas id="chart-dept" height="190"></canvas>
      </div>
    </div>

    <div class="chart-row-2">
      <div class="card">
        ${sectionHeader('Recent Notices','',btn('View All','ghost btn-sm','','style="font-size:12px;padding:5px 14px"'))}
        ${DATA.notices.map(n=>`
          <div class="notice-item">
            <span style="font-size:18px">${n.priority==='high'?'🔴':n.priority==='medium'?'🟡':'🟢'}</span>
            <div class="notice-body">
              <div class="notice-title">${n.title}</div>
              <div class="notice-meta">${badge(n.type,'#64748b')}<span style="color:#64748b;font-size:11px">${n.date}</span></div>
            </div>
          </div>`).join('')}
      </div>
      <div class="card">
        ${sectionHeader('Upcoming Events','',`<button class="btn-ghost btn-sm" onclick="openModal('Add Event',addEventForm())">Add Event</button>`)}
        ${DATA.events.map(e=>{const d=e.date.split('-');return`
          <div class="event-item">
            <div class="event-date-box">
              <div class="event-day">${d[2]}</div>
              <div class="event-month">${new Date(e.date).toLocaleString('en',{month:'short'})}</div>
            </div>
            <div><div class="event-title">${e.title}</div><div class="event-venue">📍 ${e.venue}</div></div>
          </div>`;}).join('')}
      </div>
    </div>`;

  requestAnimationFrame(() => {
    drawAttendanceChart();
    drawGpaChart();
    drawFeeChart();
    drawDeptChart();
  });
}

function statCard(icon, label, value, sub, color, trend, trendColor) {
  return `<div class="stat-card fade-up" style="border-top-color:${color}">
    <div class="stat-card-glow" style="background:${color}12"></div>
    <div class="stat-icon">${icon}</div>
    <div class="stat-label">${label}</div>
    <div class="stat-value" style="color:${color}">${value}</div>
    ${sub?`<div class="stat-sub">${sub}</div>`:''}
    ${trend?`<div class="stat-trend" style="color:${trendColor}">${trend}</div>`:''}
  </div>`;
}

function drawAttendanceChart() {
  const ctx = document.getElementById('chart-attend');
  if (!ctx) return;
  chartInstances['attend'] = new Chart(ctx, {
    type:'line',
    data:{
      labels: DATA.attendance.map(d=>d.month),
      datasets:[
        {label:'Present %',data:DATA.attendance.map(d=>d.present),borderColor:'#10b981',backgroundColor:'rgba(16,185,129,.15)',fill:true,tension:.4,pointBackgroundColor:'#10b981',pointRadius:3},
        {label:'Absent %', data:DATA.attendance.map(d=>d.absent), borderColor:'#ef4444',backgroundColor:'rgba(239,68,68,.1)',fill:true,tension:.4,pointBackgroundColor:'#ef4444',pointRadius:3},
      ]
    },
    options: chartOpts()
  });
}

function drawGpaChart() {
  const ctx = document.getElementById('chart-gpa');
  if (!ctx) return;
  chartInstances['gpa'] = new Chart(ctx, {
    type:'doughnut',
    data:{
      labels: DATA.gpaDistrib.map(d=>d.label),
      datasets:[{data:DATA.gpaDistrib.map(d=>d.val),backgroundColor:DATA.gpaDistrib.map(d=>d.color),borderWidth:2,borderColor:'#0e1f38'}]
    },
    options:{
      responsive:true, cutout:'60%',
      plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>`${ctx.label}: ${ctx.parsed}`},bodyColor:'#e2e8f0',backgroundColor:'#0e1f38',borderColor:'#1a2d4a',borderWidth:1}}
    }
  });
}

function drawFeeChart() {
  const ctx = document.getElementById('chart-fee');
  if (!ctx) return;
  chartInstances['fee'] = new Chart(ctx, {
    type:'bar',
    data:{
      labels:DATA.fees.map(d=>d.month),
      datasets:[
        {label:'Collected',data:DATA.fees.map(d=>d.collected),backgroundColor:'#10b981',borderRadius:4},
        {label:'Due',      data:DATA.fees.map(d=>d.due),       backgroundColor:'#ef4444',borderRadius:4},
      ]
    },
    options:{...chartOpts(),scales:{...chartOpts().scales,y:{...chartOpts().scales.y,ticks:{...chartOpts().scales.y.ticks,callback:v=>`৳${(v/1000).toFixed(0)}k`}}}}
  });
}

function drawDeptChart() {
  const ctx = document.getElementById('chart-dept');
  if (!ctx) return;
  chartInstances['dept'] = new Chart(ctx, {
    type:'bar',
    data:{
      labels:DATA.deptEnroll.map(d=>d.dept),
      datasets:[{label:'Students',data:DATA.deptEnroll.map(d=>d.students),backgroundColor:'#0ea5e9',borderRadius:4}]
    },
    options:chartOpts()
  });
}

function chartOpts() {
  return {
    responsive:true,
    plugins:{legend:{labels:{color:'#64748b',font:{size:11}}},tooltip:{bodyColor:'#e2e8f0',backgroundColor:'#0e1f38',borderColor:'#1a2d4a',borderWidth:1,titleColor:'#e2e8f0'}},
    scales:{
      x:{grid:{color:'#1a2d4a30'},ticks:{color:'#64748b',font:{size:11}},border:{display:false}},
      y:{grid:{color:'#1a2d4a30'},ticks:{color:'#64748b',font:{size:11}},border:{display:false}},
    }
  };
}

/* ═══════════════════════════════════ STUDENTS ═══════════════════════════════════ */
function renderStudents(el) {
  const tab = currentTab['students'] || 'List';
  el.innerHTML = `
    <div class="page-header-row">
      <div><div class="page-title">Student Management</div><div class="page-sub">Total Enrolled: 1,287 Students</div></div>
      <div class="page-header-actions">
        ${btn('📥 Import CSV','secondary btn-sm')} ${btn('📤 Export','secondary btn-sm')}
        <button class="btn-primary btn-sm" onclick="openModal('New Student Admission',admissionFormHTML())">+ New Admission</button>
      </div>
    </div>
    ${tabBar(['List','Admission Form','Attendance','Promotion','Transfer'],'List','students')}`;

  if (tab === 'List') renderStudentList(el);
  else if (tab === 'Admission Form') renderAdmissionFormPage(el);
  else if (tab === 'Attendance') renderAttendanceSection(el);
  else if (tab === 'Promotion') renderPromotion(el);
  else if (tab === 'Transfer') renderTransfer(el);
}

function renderStudentList(el) {
  const rows = DATA.students.map(s=>`
    <tr onclick="openModal('Student Profile – ${s.name}',studentProfileHTML(${JSON.stringify(s).replace(/"/g,"'")}))">
      <td>${s.id}</td>
      <td><div class="avatar-cell"><div class="avatar-circle" style="background:${avatarColor(s.name)}">${initials(s.name)}</div><div><div class="avatar-name">${s.name}</div><div class="avatar-email">${s.phone}</div></div></div></td>
      <td>Class ${s.cls}</td><td>Sec ${s.sec}</td><td>${s.subject}</td>
      <td>${badge(s.gpa,gpaColor(s.gpa))}</td>
      <td style="min-width:130px">${progressBar(s.attendance,s.attendance>=85?'#10b981':s.attendance>=70?'#f59e0b':'#ef4444')}</td>
      <td>${badge(s.fee,feeColor(s.fee))}</td>
      <td><div style="display:flex;gap:6px">
        <button class="btn-secondary btn-sm" onclick="event.stopPropagation();openModal('Student Profile – ${s.name}',studentProfileHTML(${JSON.stringify(s).replace(/"/g,"'")}))">View</button>
        <button class="btn-ghost btn-sm" onclick="event.stopPropagation();showToast('ID Card Generated!')">ID Card</button>
      </div></td>
    </tr>`).join('');

  const section = document.createElement('div');
  section.innerHTML = `
    <div class="search-row">
      <input class="search-input" id="student-search" placeholder="🔍  Search by name or ID…" oninput="filterStudents()" />
      <select class="filter-select" id="student-cls" onchange="filterStudents()"><option value="">All Classes</option>${['9','10','11','12'].map(c=>`<option>Class ${c}</option>`).join('')}</select>
      <select class="filter-select"><option>All Sections</option><option>A</option><option>B</option><option>C</option></select>
      <select class="filter-select"><option>All Depts</option>${['CSE','EEE','BBA','Civil'].map(d=>`<option>${d}</option>`).join('')}</select>
    </div>
    <div class="card card-overflow">
      <div class="table-wrap" id="student-table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Class</th><th>Section</th><th>Dept</th><th>GPA</th><th>Attendance</th><th>Fee</th><th>Actions</th></tr></thead>
          <tbody id="student-tbody">${rows}</tbody>
        </table>
      </div>
    </div>`;
  el.appendChild(section);
}

function filterStudents() {
  const q = (document.getElementById('student-search')?.value||'').toLowerCase();
  const cls = document.getElementById('student-cls')?.value||'';
  const rows = DATA.students.filter(s=>{
    const matchQ = s.name.toLowerCase().includes(q)||s.id.toLowerCase().includes(q);
    const matchC = !cls||`Class ${s.cls}`===cls;
    return matchQ && matchC;
  });
  const tbody = document.getElementById('student-tbody');
  if (tbody) tbody.innerHTML = rows.map(s=>`
    <tr onclick="openModal('Student Profile – ${s.name}',studentProfileHTML(${JSON.stringify(s).replace(/"/g,"'")}))">
      <td>${s.id}</td>
      <td><div class="avatar-cell"><div class="avatar-circle" style="background:${avatarColor(s.name)}">${initials(s.name)}</div><div><div class="avatar-name">${s.name}</div></div></div></td>
      <td>Class ${s.cls}</td><td>Sec ${s.sec}</td><td>${s.subject}</td>
      <td>${badge(s.gpa,gpaColor(s.gpa))}</td>
      <td style="min-width:130px">${progressBar(s.attendance)}</td>
      <td>${badge(s.fee,feeColor(s.fee))}</td>
      <td><button class="btn-secondary btn-sm">View</button></td>
    </tr>`).join('');
}

function studentProfileHTML(s) {
  if (typeof s === 'string') s = JSON.parse(s);
  return `
    <div class="profile-header">
      <div class="profile-avatar">${initials(s.name)}</div>
      <div>
        <div class="profile-name">${s.name}</div>
        <div class="profile-id">${s.id} • Class ${s.cls} – Section ${s.sec}</div>
        <div style="display:flex;gap:8px">${badge(s.subject,'#0ea5e9')} ${badge(s.fee,feeColor(s.fee))}</div>
      </div>
    </div>
    <div class="info-grid mb-20">
      ${[['Roll No',s.roll],['GPA',s.gpa],['Attendance',s.attendance+'%'],['Guardian',s.guardian],['Phone',s.phone],['Fee Status',s.fee]].map(([k,v])=>`<div class="info-box"><div class="info-key">${k}</div><div class="info-val">${v}</div></div>`).join('')}
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn-primary btn-sm" onclick="showToast('🪪 ID Card Generated!')">🪪 ID Card</button>
      <button class="btn-secondary btn-sm" onclick="showToast('📄 Report Card Opened!')">📄 Report Card</button>
      <button class="btn-secondary btn-sm">✏️ Edit Profile</button>
    </div>`;
}

function renderAdmissionFormPage(el) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `<h2 style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#e2e8f0;margin-bottom:22px">📋 Student Admission Form</h2>${admissionFormHTML(true)}`;
  el.appendChild(div);
}

function admissionFormHTML(inline=false) {
  return `
    <div class="stepper" id="admission-stepper">
      ${['Personal Info','Academic Info','Guardian Info','Documents'].map((s,i)=>`<div class="step${i===0?' active':''}"><div class="step-circle">${i+1}</div><span class="step-label">${s}</span></div>`).join('')}
    </div>
    <div id="admission-step-content">
      <div class="form-grid-2">
        ${formInput('Full Name (Bangla)','adm-name-bn','text','','পূর্ণ নাম')}
        ${formInput('Full Name (English)','adm-name-en','text','','Full Name')}
        ${formInput('Date of Birth','adm-dob','date')}
        ${formInput('NID / Birth Reg. No.','adm-nid','text','','Registration Number')}
        ${formSelect('Gender','adm-gender',['Male','Female','Other'])}
        ${formSelect('Religion','adm-religion',['Islam','Hinduism','Christianity','Buddhism','Other'])}
        ${formInput('Mobile Number','adm-phone','tel','','01XXXXXXXXX')}
        ${formInput('Email Address','adm-email','email','','student@email.com')}
        <div class="span-2">${formInput('Permanent Address','adm-addr','text','','Village, Upazila, District')}</div>
      </div>
    </div>
    <div class="step-nav">
      <button class="btn-ghost btn-sm" onclick="admStep(-1)">← Previous</button>
      <div class="step-nav-right">
        ${inline?'':'<button class="btn-ghost btn-sm" onclick="closeModal()">Cancel</button>'}
        <button class="btn-primary btn-sm" id="adm-next-btn" onclick="admStep(1)">Next →</button>
      </div>
    </div>`;
}

let admCurrentStep = 1;
function admStep(dir) {
  admCurrentStep = Math.max(1, Math.min(4, admCurrentStep + dir));
  const stepDivs = document.querySelectorAll('.step');
  stepDivs.forEach((s,i)=>{
    s.classList.toggle('active', i===admCurrentStep-1);
    s.classList.toggle('done', i<admCurrentStep-1);
  });
  const stepContents = [
    `<div class="form-grid-2">
      ${formInput('Full Name (Bangla)','adm-name-bn','text','','পূর্ণ নাম')}
      ${formInput('Full Name (English)','adm-name-en','text','','Full Name')}
      ${formInput('Date of Birth','adm-dob','date')}
      ${formInput('NID / Birth Reg. No.','adm-nid','text','','Registration Number')}
      ${formSelect('Gender','adm-gender',['Male','Female','Other'])}
      ${formSelect('Religion','adm-religion',['Islam','Hinduism','Christianity','Buddhism'])}
      ${formInput('Mobile Number','adm-phone','tel','','01XXXXXXXXX')}
      ${formInput('Email Address','adm-email','email','','student@email.com')}
      <div class="span-2">${formInput('Permanent Address','adm-addr','text','','Village, Upazila, District')}</div>
    </div>`,
    `<div class="form-grid-2">
      ${formSelect('Department','adm-dept',['CSE','EEE','BBA','Civil','Textile','Architecture'])}
      ${formSelect('Class / Year','adm-class',['Class 9','Class 10','Class 11','Class 12'])}
      ${formSelect('Section','adm-sec',['A','B','C','D'])}
      ${formInput('Previous School','adm-prev-school','text','','Previous Institution Name')}
      ${formInput('Previous GPA/CGPA','adm-prev-gpa','text','','e.g., 5.00')}
      ${formInput('SSC/HSC Board','adm-board','text','','Dhaka / Chittagong / etc.')}
      ${formInput('Admission Date','adm-date','date')}
      ${formInput('Roll No. (if applicable)','adm-roll','text','','Roll Number')}
    </div>`,
    `<div class="form-grid-2">
      ${formInput("Father's Name",'adm-fname','text','','Full Name')}
      ${formInput("Father's Occupation",'adm-focc','text','','Occupation')}
      ${formInput("Father's Mobile",'adm-fphone','tel','','01XXXXXXXXX')}
      ${formInput("Father's NID",'adm-fnid','text','','NID Number')}
      ${formInput("Mother's Name",'adm-mname','text','','Full Name')}
      ${formInput("Mother's Occupation",'adm-mocc','text','','Occupation')}
      ${formInput("Mother's Mobile",'adm-mphone','tel','','01XXXXXXXXX')}
      ${formInput('Emergency Contact','adm-emerg','tel','','01XXXXXXXXX')}
      <div class="span-2">${formInput('Guardian (if different)','adm-guardian','text','','Guardian Name & Relation')}</div>
    </div>`,
    `<div>${['Photo (Passport Size)','Birth Certificate','Previous Marksheet','NID / Birth Reg. Copy','Character Certificate'].map(d=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:#0a1628;border-radius:8px;margin-bottom:10px">
        <span style="color:#e2e8f0;font-size:13px">📎 ${d}</span>
        <button class="btn-secondary btn-sm" onclick="showToast('Upload dialog would open here')">Upload</button>
      </div>`).join('')}</div>`
  ];
  const sc = document.getElementById('admission-step-content');
  if (sc) sc.innerHTML = stepContents[admCurrentStep-1];
  const nextBtn = document.getElementById('adm-next-btn');
  if (nextBtn) {
    if (admCurrentStep===4) { nextBtn.textContent='✅ Submit Admission'; nextBtn.onclick=()=>{closeModal();showToast('✅ Admission submitted successfully!');admCurrentStep=1;}; }
    else { nextBtn.textContent='Next →'; nextBtn.onclick=()=>admStep(1); }
  }
}

function renderAttendanceSection(el) {
  renderAttendancePage(el);
}

function renderPromotion(el) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <h3 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:#e2e8f0;margin-bottom:18px">Student Promotion</h3>
    <div class="form-grid-2">
      ${formSelect('From Class','promo-from',['Class 9','Class 10','Class 11'])}
      ${formSelect('To Class','promo-to',['Class 10','Class 11','Class 12'])}
      ${formSelect('Academic Year','promo-year',['2023-2024','2024-2025'])}
      ${formSelect('Minimum GPA Required','promo-gpa',['2.0','2.5','3.0','Pass'])}
    </div>
    <div style="padding:14px;background:#0a1628;border-radius:10px;margin-bottom:18px">
      <p style="color:#64748b;font-size:13px;margin:0">⚠️ This will promote all eligible students from Class 9 to Class 10 based on exam results. This action cannot be undone.</p>
    </div>
    <button class="btn-primary" onclick="showToast('✅ Promotion processed for 48 students!')">🎓 Process Promotion</button>`;
  el.appendChild(div);
}

function renderTransfer(el) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <h3 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:#e2e8f0;margin-bottom:18px">Transfer Certificate</h3>
    ${formInput('Student ID or Name','tc-student','text','','Search student…')}
    <div class="form-grid-2">
      ${formInput('Date of Issue','tc-date','date')}
      ${formInput('Reason for Transfer','tc-reason','text','','e.g., Relocation')}
    </div>
    ${formInput('Destination Institution','tc-dest','text','','Institution name')}
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
      <button class="btn-primary" onclick="showToast('📄 Transfer Certificate Generated!')">📄 Generate TC</button>
      <button class="btn-secondary" onclick="showToast('📥 Downloading PDF…')">📥 Download PDF</button>
    </div>`;
  el.appendChild(div);
}

/* ═══════════════════════════════════ TEACHERS ═══════════════════════════════════ */
function renderTeachers(el) {
  const tab = currentTab['teachers'] || 'List';
  el.innerHTML = `
    <div class="page-header-row">
      <div><div class="page-title">Teacher Management</div><div class="page-sub">86 Faculty Members • 6 Departments</div></div>
      <button class="btn-primary btn-sm">+ Add Teacher</button>
    </div>
    ${tabBar(['List','Attendance','Leave','Payroll','Performance'],tab,'teachers')}`;

  if (tab==='List') {
    const rows = DATA.teachers.map(t=>`
      <tr onclick="openModal('Teacher Profile – ${t.name}',teacherProfileHTML(${JSON.stringify(t).replace(/"/g,"'")}))">
        <td>${t.id}</td>
        <td><div class="avatar-cell"><div class="avatar-circle" style="background:linear-gradient(135deg,#0ea5e9,#8b5cf6)">${initials(t.name)}</div><div><div class="avatar-name">${t.name}</div><div class="avatar-email">${t.qual}</div></div></div></td>
        <td>${badge(t.dept,'#0ea5e9')}</td>
        <td style="max-width:200px;white-space:normal">${t.subjects.join(', ')}</td>
        <td>${badge(t.attend+'%',t.attend>=95?'#10b981':t.attend>=85?'#f59e0b':'#ef4444')}</td>
        <td>৳${t.salary.toLocaleString()}</td>
        <td><div style="display:flex;gap:6px">
          <button class="btn-secondary btn-sm" onclick="event.stopPropagation();openModal('Teacher Profile',teacherProfileHTML(${JSON.stringify(t).replace(/"/g,"'")}))">Profile</button>
          <button class="btn-ghost btn-sm" onclick="event.stopPropagation();showToast('Routine view opened')">Routine</button>
        </div></td>
      </tr>`).join('');
    el.insertAdjacentHTML('beforeend',`<div class="card card-overflow"><div class="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Dept</th><th>Subjects</th><th>Attendance</th><th>Salary</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table></div></div>`);
  } else if (tab==='Attendance') {
    renderTeacherAttendanceSection(el);
  } else if (tab==='Leave') {
    renderLeaveSection(el);
  } else if (tab==='Payroll') {
    renderPayrollSection(el);
  } else if (tab==='Performance') {
    renderPerformanceSection(el);
  }
}

function teacherProfileHTML(t) {
  if (typeof t==='string') t=JSON.parse(t);
  return `
    <div class="info-grid mb-20">
      ${[['ID',t.id],['Department',t.dept],['Qualification',t.qual],['Attendance',t.attend+'%'],['Salary','৳'+t.salary.toLocaleString()],['Classes',t.classes.join(', ')]].map(([k,v])=>`<div class="info-box"><div class="info-key">${k}</div><div class="info-val">${v}</div></div>`).join('')}
    </div>
    <div class="mb-16">
      <div class="info-key mb-8">Subjects</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${t.subjects.map(s=>badge(s,'#0ea5e9')).join('')}</div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      ${btn('✉️ Message','secondary btn-sm','',' onclick="showToast(\'Message sent!\')"')}
      ${btn('✏️ Edit','ghost btn-sm','',' onclick="showToast(\'Edit mode\')"')}
      ${btn('📊 Performance','ghost btn-sm','',' onclick="showToast(\'Performance report\')"')}
    </div>`;
}

function renderTeacherAttendanceSection(el) {
  const cards = DATA.teachers.map(t=>`
    <div class="attend-card">
      <div><div class="attend-name">${t.name}</div><div class="attend-meta">${t.dept} Department</div></div>
      <div class="attend-btns">
        ${['Present','Absent','Leave'].map(st=>`<button class="attend-status-btn ${st==='Present'?'active-present':''}" onclick="setTeacherAttend(this,'${st}')">${st==='Present'?'✅':st==='Absent'?'❌':'🏖'} ${st}</button>`).join('')}
      </div>
    </div>`).join('');
  el.insertAdjacentHTML('beforeend',`<div class="card mb-16">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px">
      <h3 class="section-title">Teacher Attendance – Today</h3>
      <div style="display:flex;gap:10px">
        <input type="date" class="form-input" style="width:auto" value="${new Date().toISOString().split('T')[0]}"/>
        <button class="btn-primary btn-sm" onclick="showToast('✅ Attendance saved!')">💾 Save</button>
      </div>
    </div>
    <div class="attend-grid">${cards}</div>
  </div>`);
}

function setTeacherAttend(btn, status) {
  const wrap = btn.closest('.attend-btns');
  wrap.querySelectorAll('.attend-status-btn').forEach(b=>{
    b.classList.remove('active-present','active-absent','active-late');
  });
  btn.classList.add(status==='Present'?'active-present':status==='Absent'?'active-absent':'active-late');
}

function renderLeaveSection(el) {
  const leaves = [
    {name:"Prof. Dr. Aminul Islam",type:"Sick Leave",   from:"2024-06-10",to:"2024-06-12",days:3,status:"Approved"},
    {name:"Ms. Tahmina Sultana",   type:"Casual Leave", from:"2024-06-20",to:"2024-06-20",days:1,status:"Pending"},
    {name:"Md. Rezaul Karim",      type:"Annual Leave", from:"2024-07-01",to:"2024-07-07",days:7,status:"Pending"},
  ];
  const rows = leaves.map(l=>`
    <tr>
      <td>${l.name}</td><td>${l.type}</td><td>${l.from}</td><td>${l.to}</td>
      <td>${badge(l.days+' days','#0ea5e9')}</td>
      <td>${badge(l.status,statusColor(l.status))}</td>
      <td>${l.status==='Pending'?`<div style="display:flex;gap:6px">
        <button class="btn-success btn-sm" onclick="showToast('✅ Leave Approved!')">Approve</button>
        <button class="btn-danger btn-sm" onclick="showToast('❌ Leave Rejected!')">Reject</button>
      </div>`:'<span style="color:#64748b;font-size:12px">—</span>'}</td>
    </tr>`).join('');
  el.insertAdjacentHTML('beforeend',`
    <div class="card card-overflow">
      <div style="padding:18px 0 16px;display:flex;justify-content:space-between;align-items:center">
        <h3 class="section-title">Leave Applications</h3>
        <button class="btn-primary btn-sm" onclick="showToast('Leave form opened')">+ Apply Leave</button>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Name</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>`);
}

function renderPayrollSection(el) {
  const rows = DATA.payroll.map(p=>`
    <tr>
      <td>${p.name}</td><td>${badge(p.dept,'#0ea5e9')}</td>
      <td>৳${p.basic.toLocaleString()}</td>
      <td>৳${p.allowance.toLocaleString()}</td>
      <td style="color:#ef4444">-৳${p.deduction.toLocaleString()}</td>
      <td style="color:#10b981;font-weight:700">৳${p.net.toLocaleString()}</td>
      <td><button class="btn-ghost btn-sm" onclick="showToast('📄 Pay slip downloaded!')">Slip</button></td>
    </tr>`).join('');
  el.insertAdjacentHTML('beforeend',`
    <div class="card card-overflow">
      <div style="padding:18px 0 16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <h3 class="section-title">Monthly Payroll – June 2024</h3>
        <div style="display:flex;gap:8px">
          <button class="btn-secondary btn-sm">📤 Export</button>
          <button class="btn-primary btn-sm" onclick="showToast('✅ Payroll processed!')">Process Payroll</button>
        </div>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Name</th><th>Dept</th><th>Basic</th><th>Allowance</th><th>Deduction</th><th>Net Pay</th><th>Slip</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>`);
}

function renderPerformanceSection(el) {
  const metrics = ['Class Delivery','Student Satisfaction','Syllabus Completion','Exam Result Quality'];
  const cards = DATA.teachers.map(t=>{
    const score = (3.5+Math.random()*1.5).toFixed(1);
    const bars = metrics.map((m,i)=>{
      const pct = 65+Math.floor(Math.random()*30);
      const c = `hsl(${200+i*20},80%,55%)`;
      return `<div class="perf-metric"><div class="perf-metric-row"><span>${m}</span><span>${pct}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${c}"></div></div></div>`;
    }).join('');
    return `<div class="perf-card"><div class="perf-header">
      <div><div class="perf-name">${t.name}</div><div class="perf-dept">${t.dept} • ${t.qual}</div></div>
      <div><div class="perf-score-val">${score}/5.0</div><div class="perf-score-label">Score</div></div>
    </div>${bars}</div>`;
  }).join('');
  el.insertAdjacentHTML('beforeend',`<div>${cards}</div>`);
}

/* ═══════════════════════════════════ ACADEMICS ═══════════════════════════════════ */
function renderAcademics(el) {
  const tab = currentTab['academics'] || 'Classes';
  el.innerHTML = `
    <div class="page-header"><div class="page-title">Academic Management</div><div class="page-sub">Classes, Subjects, Routine, Calendar, Syllabus</div></div>
    ${tabBar(['Classes','Subjects','Class Routine','Academic Calendar','Syllabus'],tab,'academics')}`;

  if (tab==='Classes') {
    const classes = [
      {cls:"9",sections:["A","B","C"],students:186,teachers:12},
      {cls:"10",sections:["A","B","C"],students:198,teachers:14},
      {cls:"11",sections:["A","B","C","D"],students:267,teachers:18},
      {cls:"12",sections:["A","B","C","D"],students:289,teachers:20},
      {cls:"Diploma-1",sections:["CSE-A","CSE-B","EEE-A"],students:187,teachers:15},
      {cls:"Diploma-2",sections:["CSE","EEE","Civil"],students:160,teachers:14},
    ];
    el.insertAdjacentHTML('beforeend',`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">
      ${classes.map(c=>`<div class="card" style="border-top:3px solid #0ea5e9">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h3 style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#e2e8f0">Class ${c.cls}</h3>
          ${badge(c.students+' Students','#0ea5e9')}
        </div>
        <div style="margin-bottom:10px"><div class="info-key mb-8">Sections</div><div style="display:flex;gap:6px;flex-wrap:wrap">${c.sections.map(s=>badge(s,'#8b5cf6')).join('')}</div></div>
        <div style="display:flex;justify-content:space-between;color:#64748b;font-size:12px;align-items:center">
          <span>👨‍🏫 ${c.teachers} Teachers</span>
          <button class="btn-ghost btn-sm">Manage</button>
        </div>
      </div>`).join('')}
    </div>`);
  } else if (tab==='Subjects') {
    const subjects = [
      {code:"CSE-101",name:"Introduction to Programming",dept:"CSE",cls:"11",credit:3,teacher:"Ms. Tahmina Sultana"},
      {code:"CSE-201",name:"Data Structures & Algorithms",dept:"CSE",cls:"12",credit:4,teacher:"Prof. Dr. Aminul Islam"},
      {code:"EEE-101",name:"Basic Electrical Engineering",dept:"EEE",cls:"11",credit:3,teacher:"Md. Rezaul Karim"},
      {code:"BBA-101",name:"Principles of Accounting",dept:"BBA",cls:"11",credit:3,teacher:"Ms. Hosne Ara Begum"},
      {code:"CIV-201",name:"Structural Analysis",dept:"Civil",cls:"12",credit:4,teacher:"Md. Shahabuddin"},
      {code:"MATH-101",name:"Engineering Mathematics",dept:"All",cls:"11",credit:4,teacher:"—"},
    ];
    const rows = subjects.map(s=>`<tr><td>${s.code}</td><td>${s.name}</td><td>${badge(s.dept,'#0ea5e9')}</td><td>Class ${s.cls}</td><td>${badge(s.credit+' Cr','#f59e0b')}</td><td>${s.teacher}</td><td><button class="btn-ghost btn-sm">Syllabus</button></td></tr>`).join('');
    el.insertAdjacentHTML('beforeend',`<div class="card card-overflow"><div style="display:flex;justify-content:space-between;align-items:center;padding:0 0 16px"><h3 class="section-title">Subject List</h3><button class="btn-primary btn-sm">+ Add Subject</button></div><div class="table-wrap"><table><thead><tr><th>Code</th><th>Subject Name</th><th>Dept</th><th>Class</th><th>Credits</th><th>Teacher</th><th>Syllabus</th></tr></thead><tbody>${rows}</tbody></table></div></div>`);
  } else if (tab==='Class Routine') {
    renderClassRoutine(el);
  } else if (tab==='Academic Calendar') {
    renderAcademicCalendar(el);
  } else if (tab==='Syllabus') {
    renderSyllabus(el);
  }
}

function renderClassRoutine(el) {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday"];
  const periods = ["8:00–8:45","8:45–9:30","9:30–10:15","10:15–11:00","Break","11:15–12:00","12:00–12:45"];
  const routineData = {
    "Sunday":  ["Math","Physics","—","Chemistry","—","English","CSE"],
    "Monday":  ["CSE","Math","English","—","—","Physics","Chemistry"],
    "Tuesday": ["English","CSE","Physics","Math","—","—","CSE"],
    "Wednesday":["Chemistry","English","Math","CSE","—","Physics","—"],
    "Thursday":["Physics","Chemistry","CSE","English","—","Math","Physics"],
  };
  const colors = {Math:'#0ea5e9',Physics:'#8b5cf6',Chemistry:'#10b981',English:'#f59e0b',CSE:'#f97316','—':'#334155'};
  const headerRow = `<tr><th>Period</th>${days.map(d=>`<th>${d}</th>`).join('')}</tr>`;
  const bodyRows = periods.map((p,i)=>{
    if (p==='Break') return `<tr class="break-row"><td style="color:#64748b;font-size:11px;font-family:'DM Mono',monospace">${p}</td>${days.map(()=>`<td><span>— Break —</span></td>`).join('')}</tr>`;
    return `<tr><td style="color:#64748b;font-size:11px;font-family:'DM Mono',monospace">${p}</td>${days.map(d=>{
      const s=routineData[d][i];
      return `<td><span class="routine-period" style="background:${(colors[s]||'#334155')}22;color:${colors[s]||'#64748b'}">${s}</span></td>`;
    }).join('')}</tr>`;
  }).join('');
  el.insertAdjacentHTML('beforeend',`<div class="card card-overflow">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <h3 class="section-title">Class Routine – Class 12, Section A</h3>
      <div style="display:flex;gap:8px">
        <select class="filter-select"><option>Class 12 – A</option><option>Class 11 – B</option></select>
        <button class="btn-secondary btn-sm" onclick="showToast('🖨 Printing routine…')">Print</button>
      </div>
    </div>
    <div class="table-wrap"><table class="routine-table"><thead>${headerRow}</thead><tbody>${bodyRows}</tbody></table></div>
  </div>`);
}

function renderAcademicCalendar(el) {
  const items = DATA.calEvents.map(e=>{
    const d=e.date.split('-');
    return `<div class="cal-item">
      <div class="cal-date-box" style="background:${e.color}20;border:1px solid ${e.color}40">
        <div class="cal-day" style="color:${e.color}">${d[2]}</div>
        <div class="cal-mon" style="color:${e.color}">${new Date(e.date).toLocaleString('en',{month:'short'})}</div>
      </div>
      <div class="cal-title">${e.title}</div>
      ${badge(e.type,e.color)}
    </div>`;
  }).join('');
  el.insertAdjacentHTML('beforeend',`<div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
      <h3 class="section-title">Academic Calendar 2024</h3>
      <button class="btn-primary btn-sm">+ Add Event</button>
    </div>${items}</div>`);
}

function renderSyllabus(el) {
  const subjects = ["Introduction to Programming","Data Structures & Algorithms","Database Systems","Operating Systems"];
  const items = subjects.map((s,i)=>{
    const pct = 60+i*8;
    return `<div style="background:#0a1628;border-radius:10px;padding:14px;margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div style="color:#e2e8f0;font-weight:600;font-size:13px">${s}</div>
        <div style="display:flex;gap:6px">${badge(pct+'% Complete','#0ea5e9')}<button class="btn-ghost btn-sm" onclick="showToast('Upload dialog opened')">Upload PDF</button></div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:linear-gradient(90deg,#0ea5e9,#3b82f6)"></div></div>
    </div>`;
  }).join('');
  el.insertAdjacentHTML('beforeend',`<div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px">
      <h3 class="section-title">Syllabus Management</h3>
      <div style="display:flex;gap:12px">
        <select class="filter-select"><option>CSE</option><option>EEE</option><option>BBA</option></select>
        <select class="filter-select"><option>1st Semester</option><option>2nd Semester</option></select>
      </div>
    </div>${items}</div>`);
}

/* ═══════════════════════════════════ ATTENDANCE ═══════════════════════════════════ */
function renderAttendancePage(el) {
  el.innerHTML = '';
  const today = new Date().toISOString().split('T')[0];
  const cards = DATA.students.map(s=>{
    const st = attendanceStatuses[s.id] || 'Present';
    return `<div class="attend-card">
      <div><div class="attend-name">${s.name}</div><div class="attend-meta">${s.id} • Roll ${s.roll}</div></div>
      <div class="attend-btns" id="ab-${s.id}">
        ${['Present','Absent','Late'].map(status=>`<button class="attend-status-btn ${st===status?`active-${status.toLowerCase()}`:''}` + (status==='Late'?' active-late':'')+`" onclick="setAttend('${s.id}','${status}',this)">${status==='Present'?'✅':status==='Absent'?'❌':'⏰'} ${status}</button>`).join('')}
      </div>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div class="page-header"><div class="page-title">Attendance System</div><div class="page-sub">Daily Attendance Register</div></div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px">
        <h3 class="section-title">Daily Attendance Register</h3>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
          <input type="date" class="form-input" style="width:auto" value="${today}" />
          <select class="filter-select"><option>Class 12 – A</option><option>Class 11 – B</option><option>Class 10 – C</option></select>
          <button class="btn-primary btn-sm" onclick="showToast('✅ Attendance saved!')">💾 Save</button>
          <button class="btn-secondary btn-sm" onclick="showToast('📱 SMS sent to absent parents!')">📱 SMS Absent</button>
        </div>
      </div>
      <div class="attend-grid" id="attend-grid">${cards}</div>
      <div id="attend-summary" style="margin-top:16px;padding:14px;background:#0a1628;border-radius:10px;display:flex;gap:20px;flex-wrap:wrap">
        <span style="color:#10b981;font-size:13px">✅ Present: <strong id="cnt-present">8</strong></span>
        <span style="color:#ef4444;font-size:13px">❌ Absent: <strong id="cnt-absent">0</strong></span>
        <span style="color:#f59e0b;font-size:13px">⏰ Late: <strong id="cnt-late">0</strong></span>
      </div>
    </div>

    <div style="margin-top:20px">
      <div class="card">
        ${sectionHeader('Monthly Attendance Report','')}
        <canvas id="chart-monthly-attend" height="200"></canvas>
      </div>
    </div>`;

  requestAnimationFrame(()=>{
    updateAttendSummary();
    const ctx = document.getElementById('chart-monthly-attend');
    if (ctx) {
      chartInstances['monthly'] = new Chart(ctx, {
        type:'bar',
        data:{labels:DATA.attendance.map(d=>d.month),datasets:[
          {label:'Present %',data:DATA.attendance.map(d=>d.present),backgroundColor:'#10b981',borderRadius:4},
          {label:'Absent %', data:DATA.attendance.map(d=>d.absent), backgroundColor:'#ef4444',borderRadius:4},
        ]},
        options:chartOpts()
      });
    }
  });
}

function setAttend(id, status, btn) {
  attendanceStatuses[id] = status;
  const wrap = document.getElementById('ab-'+id);
  if (!wrap) return;
  wrap.querySelectorAll('.attend-status-btn').forEach(b=>{
    b.classList.remove('active-present','active-absent','active-late');
  });
  btn.classList.add('active-'+status.toLowerCase());
  updateAttendSummary();
}

function updateAttendSummary() {
  const vals = Object.values(attendanceStatuses);
  const el = (id,val) => { const e=document.getElementById(id); if(e) e.textContent=val; };
  el('cnt-present', vals.filter(v=>v==='Present').length);
  el('cnt-absent',  vals.filter(v=>v==='Absent').length);
  el('cnt-late',    vals.filter(v=>v==='Late').length);
}

/* ═══════════════════════════════════ EXAMS ═══════════════════════════════════ */
function renderExams(el) {
  const tab = currentTab['exams'] || 'Exams';
  el.innerHTML = `
    <div class="page-header"><div class="page-title">Examination Management</div><div class="page-sub">Exams, Marks, Grades, Results, Transcripts</div></div>
    ${tabBar(['Exams','Marks Entry','Results','Merit List','Transcripts'],tab,'exams')}`;

  if (tab==='Exams') {
    const rows = DATA.exams.map(e=>`<tr><td>${e.id}</td><td>${e.name}</td><td>${e.date}</td><td>${e.classes}</td><td>${badge(e.status,statusColor(e.status))}</td><td><div style="display:flex;gap:6px"><button class="btn-secondary btn-sm">Routine</button><button class="btn-ghost btn-sm">Results</button></div></td></tr>`).join('');
    el.insertAdjacentHTML('beforeend',`<div class="card card-overflow"><div style="display:flex;justify-content:space-between;align-items:center;padding:0 0 16px"><h3 class="section-title">Exam Schedule</h3><button class="btn-primary btn-sm">+ Create Exam</button></div><div class="table-wrap"><table><thead><tr><th>#</th><th>Exam Name</th><th>Date</th><th>Classes</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table></div></div>`);
  } else if (tab==='Marks Entry') {
    renderMarksEntry(el);
  } else if (tab==='Results') {
    const rows = DATA.students.map(s=>`<tr><td>${s.roll}</td><td>${s.id}</td><td><span style="color:#e2e8f0;font-weight:500">${s.name}</span></td><td>${badge(s.gpa,gpaColor(s.gpa))}</td><td style="color:${gpaColor(s.gpa)};font-weight:700">${s.gpa>=4.5?'A+':s.gpa>=4?'A':s.gpa>=3.5?'A-':'B'}</td><td>${s.attendance}%</td><td><button class="btn-ghost btn-sm" onclick="showToast('📄 Report card downloaded')">Download</button></td></tr>`).join('');
    el.insertAdjacentHTML('beforeend',`<div class="card card-overflow"><div style="display:flex;justify-content:space-between;align-items:center;padding:0 0 16px;flex-wrap:wrap;gap:10px"><h3 class="section-title">Result Sheet – 1st Semester Final</h3><div style="display:flex;gap:8px"><button class="btn-secondary btn-sm" onclick="showToast('📥 PDF downloading…')">📥 PDF</button><button class="btn-primary btn-sm" onclick="showToast('📢 Results published!')">📢 Publish</button></div></div><div class="table-wrap"><table><thead><tr><th>Roll</th><th>Student ID</th><th>Name</th><th>GPA</th><th>Grade</th><th>Attendance</th><th>Report Card</th></tr></thead><tbody>${rows}</tbody></table></div></div>`);
  } else if (tab==='Merit List') {
    renderMeritList(el);
  } else if (tab==='Transcripts') {
    renderTranscriptSection(el);
  }
}

function renderMarksEntry(el) {
  const rows = DATA.students.slice(0,6).map(s=>{
    const theory = 45+Math.floor(Math.random()*25);
    const prac = 18+Math.floor(Math.random()*12);
    const total = theory+prac;
    const grade = total>=90?'A+':total>=80?'A':total>=70?'A-':total>=60?'B':'C';
    const gc = grade==='A+'?'#10b981':grade==='A'?'#0ea5e9':grade==='A-'?'#06b6d4':'#f59e0b';
    return `<tr><td>${s.roll}</td><td style="color:#e2e8f0;font-weight:500">${s.name}</td>
      <td><input type="number" class="marks-input" value="${theory}" min="0" max="70" /></td>
      <td><input type="number" class="marks-input" value="${prac}" min="0" max="30" /></td>
      <td style="font-weight:700">${total}</td>
      <td>${badge(grade,gc)}</td>
    </tr>`;
  }).join('');
  el.insertAdjacentHTML('beforeend',`<div class="card">
    <div class="form-grid-3 mb-20">
      ${formSelect('Exam','me-exam',['1st Semester Final','Mid-Term'])}
      ${formSelect('Class & Section','me-class',['Class 12 – A','Class 11 – B','Class 10 – C'])}
      ${formSelect('Subject','me-subj',['Mathematics','Physics','Chemistry','English','CSE'])}
    </div>
    <div class="table-wrap"><table><thead><tr><th>Roll</th><th>Name</th><th>Theory (70)</th><th>Practical (30)</th><th>Total</th><th>Grade</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">
      <button class="btn-primary" onclick="showToast('💾 Marks saved!')">💾 Save Marks</button>
      <button class="btn-secondary" onclick="showToast('🧮 GPA calculated!')">🧮 Calculate GPA</button>
      <button class="btn-secondary" onclick="showToast('📤 Results published!')">📤 Publish Results</button>
    </div>
  </div>`);
}

function renderMeritList(el) {
  const sorted = [...DATA.students].sort((a,b)=>b.gpa-a.gpa);
  const items = sorted.map((s,i)=>{
    const rankColor = i===0?'#f59e0b':i===1?'#64748b':i===2?'#f97316':'#334155';
    const rankBg = i<3?rankColor:'#1a2d4a';
    const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1;
    return `<div class="merit-item" style="background:${i<3?'rgba(245,158,11,0.04)':'transparent'}">
      <div class="merit-rank" style="background:${rankBg};color:${i<3?'#000':'#64748b'}">${medal}</div>
      <div class="merit-info"><div class="merit-name">${s.name}</div><div class="merit-sub">${s.id} • Class ${s.cls} – ${s.subject}</div></div>
      <div class="merit-gpa"><div class="merit-gpa-val" style="color:${gpaColor(s.gpa)}">${s.gpa}</div><div class="merit-gpa-label">GPA</div></div>
    </div>`;
  }).join('');
  el.insertAdjacentHTML('beforeend',`<div class="card card-overflow">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:0 0 16px">
      <h3 class="section-title">Merit List – 1st Semester Final 2024</h3>
      <button class="btn-secondary btn-sm" onclick="showToast('📥 Merit list downloaded!')">📥 Export</button>
    </div>${items}</div>`);
}

function renderTranscriptSection(el) {
  el.insertAdjacentHTML('beforeend',`<div class="card">
    <h3 class="section-title mb-20">Generate Transcript</h3>
    <div class="form-grid-2 mb-20">
      ${formInput('Student ID','tr-id','text','','STU-2024-001')}
      ${formSelect('Academic Year','tr-year',['2023-2024','2022-2023','2021-2022'])}
    </div>
    <div class="receipt-box mb-20" style="max-width:100%">
      <div class="receipt-head">
        <div style="font-size:28px;margin-bottom:6px">🏫</div>
        <div class="receipt-school">TechVision Technical School & College</div>
        <div class="receipt-addr">Dhaka, Bangladesh • BTEB Affiliated</div>
        <div class="receipt-label">ACADEMIC TRANSCRIPT</div>
      </div>
      ${[['Student Name','Rafiqul Islam'],['Student ID','STU-2024-001'],['Department','CSE'],['Session','2023-2024'],['CGPA','4.8 / 5.0'],['Status','PASSED WITH DISTINCTION']].map(([k,v])=>`<div class="receipt-row"><span class="receipt-row-key">${k}:</span><span class="receipt-row-val">${v}</span></div>`).join('')}
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn-primary" onclick="showToast('🔍 Transcript preview opened!')">🔍 Preview</button>
      <button class="btn-secondary" onclick="showToast('📥 PDF downloading…')">📥 Download PDF</button>
      <button class="btn-secondary" onclick="showToast('📧 Email sent to student!')">📧 Email</button>
    </div>
  </div>`);
}

/* ═══════════════════════════════════ FEES ═══════════════════════════════════ */
function renderFees(el) {
  const tab = currentTab['fees'] || 'Collection';
  el.innerHTML = `
    <div class="page-header"><div class="page-title">Fees & Finance</div><div class="page-sub">Fee Collection, Structure, Reports, Receipts</div></div>
    <div class="stat-grid-4">
      ${statCard('💰','Total Collected','৳54.8L','June 2024','#10b981',null,null)}
      ${statCard('📋','Total Due','৳2.2L','Pending','#ef4444',null,null)}
      ${statCard('✅','Paid Students','1,158','90.0%','#0ea5e9',null,null)}
      ${statCard('⚠️','Defaulters','129','10.0%','#f97316',null,null)}
    </div>
    ${tabBar(['Collection','Fee Structure','Due Management','Receipts','Financial Reports'],tab,'fees')}`;

  if (tab==='Collection') {
    el.insertAdjacentHTML('beforeend',`<div class="card">
      <h3 class="section-title mb-20">Collect Fee</h3>
      <div class="form-grid-2">
        ${formInput('Student ID or Name','fc-student','text','','Search student…')}
        ${formSelect('Fee Type','fc-type',['Tuition Fee','Admission Fee','Exam Fee','Library Fee','Transport Fee'])}
        ${formSelect('Month','fc-month',['January','February','March','April','May','June','July','August','September','October','November','December'])}
        ${formInput('Amount (BDT)','fc-amount','number','','0.00')}
        ${formSelect('Payment Method','fc-method',['Cash','bKash','Nagad','Bank Transfer','Cheque'])}
        ${formInput('Transaction ID','fc-txn','text','','(if online payment)')}
      </div>
      <div style="background:#0a1628;border-radius:10px;padding:14px;margin-bottom:18px">
        <div style="display:flex;justify-content:space-between;color:#64748b;font-size:13px;margin-bottom:8px">
          <span>Student: <strong style="color:#e2e8f0">Rafiqul Islam (STU-2024-001)</strong></span>
          <span>Pending: <strong style="color:#ef4444">৳4,500</strong></span>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${badge('Tuition: Paid','#10b981')} ${badge('Exam Fee: Due ৳1,500','#ef4444')} ${badge('Library: Partial ৳500','#f59e0b')}
        </div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn-primary" onclick="showToast('💳 Payment collected! Receipt generated.')">💳 Collect Payment</button>
        <button class="btn-secondary" onclick="showToast('🖨 Receipt printing…')">🖨 Print Receipt</button>
        <button class="btn-secondary" onclick="showToast('📱 SMS receipt sent!')">📱 SMS Receipt</button>
      </div>
    </div>`);
  } else if (tab==='Fee Structure') {
    const structure = [
      {cls:"Class 9-10",tuition:2500,admission:5000,exam:800,library:200,total:8500},
      {cls:"Class 11-12",tuition:3000,admission:6000,exam:1000,library:200,total:10200},
      {cls:"Diploma 1st Yr",tuition:4500,admission:8000,exam:1500,library:300,total:14300},
      {cls:"Diploma 2nd Yr",tuition:4500,admission:0,exam:1500,library:300,total:6300},
    ];
    const rows = structure.map(s=>`<tr><td>${s.cls}</td><td>৳${s.tuition.toLocaleString()}</td><td>৳${s.admission.toLocaleString()}</td><td>৳${s.exam.toLocaleString()}</td><td>৳${s.library.toLocaleString()}</td><td style="color:#0ea5e9;font-weight:700">৳${s.total.toLocaleString()}</td><td><button class="btn-ghost btn-sm">Edit</button></td></tr>`).join('');
    el.insertAdjacentHTML('beforeend',`<div class="card card-overflow"><div style="display:flex;justify-content:space-between;align-items:center;padding:0 0 16px"><h3 class="section-title">Fee Structure 2023-2024</h3><button class="btn-primary btn-sm">Update Structure</button></div><div class="table-wrap"><table><thead><tr><th>Class/Year</th><th>Tuition/mo</th><th>Admission</th><th>Exam Fee</th><th>Library</th><th>Annual Total</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></div>`);
  } else if (tab==='Due Management') {
    const dueStudents = DATA.students.filter(s=>s.fee!=='Paid');
    const rows = dueStudents.map(s=>`<tr><td>${s.id}</td><td>${s.name}</td><td>Class ${s.cls}</td><td>${s.subject}</td><td>${badge(s.fee,feeColor(s.fee))}</td><td style="color:#ef4444">৳${(s.roll*500).toLocaleString()}</td><td><div style="display:flex;gap:6px"><button class="btn-success btn-sm" onclick="showToast('Payment collected!')">Collect</button><button class="btn-ghost btn-sm" onclick="showToast('📱 SMS sent!')">📱 SMS</button></div></td></tr>`).join('');
    el.insertAdjacentHTML('beforeend',`<div class="card card-overflow"><div style="display:flex;justify-content:space-between;align-items:center;padding:0 0 16px;flex-wrap:wrap;gap:10px"><h3 class="section-title">Due Fee List</h3><div style="display:flex;gap:8px"><button class="btn-secondary btn-sm" onclick="showToast('📱 SMS sent to all defaulters!')">📱 Send SMS (All)</button><button class="btn-secondary btn-sm">📤 Export</button></div></div><div class="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Class</th><th>Dept</th><th>Status</th><th>Due Amount</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></div>`);
  } else if (tab==='Receipts') {
    el.insertAdjacentHTML('beforeend',`<div class="card">
      <h3 class="section-title mb-20">Fee Receipt</h3>
      <div class="receipt-box mb-20">
        <div class="receipt-head">
          <div style="font-size:28px;margin-bottom:6px">🏫</div>
          <div class="receipt-school">TechVision Technical School & College</div>
          <div class="receipt-addr">Mirpur, Dhaka-1216 • Phone: 02-58056789</div>
          <div class="receipt-label">FEE RECEIPT</div>
        </div>
        ${[['Receipt No','RCP-2024-08124'],['Date','12 June 2024'],['Student','Rafiqul Islam'],['Student ID','STU-2024-001'],['Class','Class 12 – A (CSE)'],['Fee Type','Tuition Fee – June 2024'],['Amount','৳ 3,000.00'],['Payment','bKash – 01711-234567'],['Trx ID','TXN-BKS-8845'],['Received By','Mr. Karim (Accountant)']].map(([k,v])=>`<div class="receipt-row"><span class="receipt-row-key">${k}:</span><span class="receipt-row-val">${v}</span></div>`).join('')}
        <div style="margin-top:14px;text-align:center;color:#64748b;font-size:11px">Computer-generated receipt. No signature required.</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn-primary" onclick="showToast('🖨 Printing receipt…')">🖨 Print</button>
        <button class="btn-secondary" onclick="showToast('📧 Email sent!')">📧 Email</button>
        <button class="btn-secondary" onclick="showToast('📥 PDF downloading…')">📥 Download PDF</button>
      </div>
    </div>`);
  } else if (tab==='Financial Reports') {
    el.insertAdjacentHTML('beforeend',`
      <div class="chart-row-2">
        <div class="card"><h3 class="section-title mb-16">Monthly Fee Collection</h3><canvas id="chart-fee-r" height="200"></canvas></div>
        <div class="card"><h3 class="section-title mb-16">Income vs Expense</h3>
          ${[['Fee Income','৳54,80,000','#10b981',88],['Govt. Grant','৳8,50,000','#0ea5e9',14],['Salary Expense','৳38,50,000','#ef4444',62],['Utility Bills','৳3,20,000','#f97316',5],['Maintenance','৳2,80,000','#8b5cf6',5]].map(([k,v,c,p])=>`<div class="income-bar"><div class="income-row"><span>${k}</span><span style="color:#e2e8f0;font-weight:600">${v}</span></div><div class="progress-bar"><div class="progress-fill" style="width:${p}%;background:${c}"></div></div></div>`).join('')}
        </div>
      </div>
      <div class="card"><div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">
        ${['Monthly Report','Annual Report','Dept-wise','Student-wise','Export Excel','Export PDF'].map(r=>`<button class="btn-secondary btn-sm" onclick="showToast('📊 ${r} generated!')">📊 ${r}</button>`).join('')}
      </div></div>`);
    requestAnimationFrame(()=>{
      const ctx = document.getElementById('chart-fee-r');
      if (ctx) chartInstances['fee-r'] = new Chart(ctx, {type:'line',data:{labels:DATA.fees.map(d=>d.month),datasets:[{label:'Collected',data:DATA.fees.map(d=>d.collected),borderColor:'#10b981',backgroundColor:'rgba(16,185,129,.15)',fill:true,tension:.4,pointRadius:3},{label:'Due',data:DATA.fees.map(d=>d.due),borderColor:'#ef4444',backgroundColor:'rgba(239,68,68,.1)',fill:true,tension:.4,pointRadius:3}]},options:chartOpts()});
    });
  }
}

/* ═══════════════════════════════════ LIBRARY ═══════════════════════════════════ */
function renderLibrary(el) {
  const tab = currentTab['library'] || 'Inventory';
  el.innerHTML = `
    <div class="page-header"><div class="page-title">Library Management</div><div class="page-sub">Books, Issue, Return, Fines, Reports</div></div>
    <div class="stat-grid-4">
      ${statCard('📚','Total Books','2,840','186 Titles','#0ea5e9',null,null)}
      ${statCard('📤','Issued','312','Currently Out','#f97316',null,null)}
      ${statCard('✅','Available','2,528','In Shelf','#10b981',null,null)}
      ${statCard('⚠️','Overdue','24','Fine Pending','#ef4444',null,null)}
    </div>
    ${tabBar(['Inventory','Issue/Return','Fine Management','Library Reports'],tab,'library')}`;

  if (tab==='Inventory') {
    const rows = DATA.books.map(b=>`<tr><td>${b.id}</td><td>${b.title}</td><td>${b.author}</td><td>${badge(b.cat,'#0ea5e9')}</td><td>${b.qty}</td><td>${badge(b.avail,b.avail>5?'#10b981':b.avail>2?'#f59e0b':'#ef4444')}</td><td><div style="display:flex;gap:6px"><button class="btn-secondary btn-sm" onclick="showToast('Book issued!')">Issue</button><button class="btn-ghost btn-sm">Edit</button></div></td></tr>`).join('');
    el.insertAdjacentHTML('beforeend',`<div class="card card-overflow"><div style="display:flex;justify-content:space-between;align-items:center;padding:0 0 14px"><h3 class="section-title">Book Inventory</h3><button class="btn-primary btn-sm">+ Add Book</button></div><div style="margin-bottom:14px"><input class="search-input" placeholder="🔍  Search by title, author, or code…" /></div><div class="table-wrap"><table><thead><tr><th>Book ID</th><th>Title</th><th>Author</th><th>Category</th><th>Total</th><th>Available</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table></div></div>`);
  } else if (tab==='Issue/Return') {
    const records = [
      {book:"Introduction to Algorithms",student:"Rafiqul Islam",id:"STU-2024-001",issued:"2024-05-20",due:"2024-06-03",status:"Overdue"},
      {book:"Database System Concepts",student:"Nusrat Jahan",id:"STU-2024-004",issued:"2024-06-01",due:"2024-06-15",status:"Issued"},
    ];
    const rows = records.map(r=>`<tr><td>${r.book}</td><td>${r.student}</td><td>${r.id}</td><td>${r.issued}</td><td>${r.due}</td><td>${badge(r.status,r.status==='Overdue'?'#ef4444':'#10b981')}</td><td>${r.status==='Issued'?`<button class="btn-secondary btn-sm" onclick="showToast('Book returned!')">Return</button>`:`<button class="btn-danger btn-sm" onclick="showToast('Fine collected & returned!')">Fine & Return</button>`}</td></tr>`).join('');
    el.insertAdjacentHTML('beforeend',`
      <div class="chart-row-2">
        <div class="card"><h3 class="section-title mb-16">Issue a Book</h3>
          ${formInput('Student ID','lib-sid','text','','STU-XXXX-XXX')}
          ${formInput('Book ID or Title','lib-bid','text','','BK-XXX or search title')}
          ${formInput('Issue Date','lib-issue','date')}
          ${formInput('Return Date','lib-return','date')}
          <button class="btn-primary" onclick="showToast('📤 Book issued successfully!')">📤 Issue Book</button>
        </div>
        <div class="card"><h3 class="section-title mb-16">Return a Book</h3>
          ${formInput('Issue Slip ID or Student ID','lib-ret-id','text','','Search…')}
          <div style="background:#0a1628;border-radius:8px;padding:12px;margin-bottom:16px">
            <div style="color:#64748b;font-size:12px;margin-bottom:3px">Book: <strong style="color:#e2e8f0">Introduction to Algorithms</strong></div>
            <div style="color:#64748b;font-size:12px;margin-bottom:3px">Issued: 2024-05-20 • Due: 2024-06-03</div>
            <div style="color:#ef4444;font-size:12px;font-weight:600">⚠️ Overdue by 9 days • Fine: ৳90</div>
          </div>
          <button class="btn-success" onclick="showToast('📥 Book returned & fine collected!')">📥 Process Return</button>
        </div>
      </div>
      <div class="card card-overflow mb-0">
        <h3 class="section-title mb-16">Current Issues</h3>
        <div class="table-wrap"><table><thead><tr><th>Book</th><th>Student</th><th>ID</th><th>Issued</th><th>Due</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>
      </div>`);
  } else if (tab==='Fine Management') {
    const fines = [
      {student:"Rafiqul Islam",book:"Intro to Algorithms",days:9,fine:90,status:"Pending"},
      {student:"Md. Sabbir Ahmed",book:"Structural Analysis",days:5,fine:50,status:"Paid"},
      {student:"Imran Hossain",book:"Principles of Management",days:14,fine:140,status:"Pending"},
    ];
    const rows = fines.map(f=>`<tr><td>${f.student}</td><td>${f.book}</td><td>${badge(f.days+' days','#ef4444')}</td><td style="color:#ef4444;font-weight:700">৳${f.fine}</td><td>${badge(f.status,f.status==='Paid'?'#10b981':'#ef4444')}</td><td>${f.status==='Pending'?`<button class="btn-success btn-sm" onclick="showToast('Fine collected!')">Collect Fine</button>`:'<span style="color:#64748b;font-size:11px">✓ Paid</span>'}</td></tr>`).join('');
    el.insertAdjacentHTML('beforeend',`<div class="card card-overflow"><div style="display:flex;justify-content:space-between;align-items:center;padding:0 0 16px"><h3 class="section-title">Fine Management</h3><span style="color:#64748b;font-size:12px">Rate: ৳10 per day overdue</span></div><div class="table-wrap"><table><thead><tr><th>Student</th><th>Book</th><th>Overdue Days</th><th>Fine Amount</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></div>`);
  } else if (tab==='Library Reports') {
    const reports = ["Most Issued Books","Overdue Report","Fine Collection Report","Book Category Report","Student Borrowing History","Monthly Circulation Report"];
    el.insertAdjacentHTML('beforeend',`<div class="card"><h3 class="section-title mb-20">Library Reports</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">${reports.map(r=>`<div style="background:#0a1628;border-radius:10px;padding:16px;display:flex;justify-content:space-between;align-items:center"><span style="color:#e2e8f0;font-size:13px">📊 ${r}</span><div style="display:flex;gap:6px"><button class="btn-ghost btn-sm" onclick="showToast('Report opened!')">View</button><button class="btn-ghost btn-sm" onclick="showToast('PDF downloading…')">PDF</button></div></div>`).join('')}</div></div>`);
  }
}

/* ═══════════════════════════════════ NOTICES ═══════════════════════════════════ */
function renderNotices(el) {
  const tab = currentTab['notices'] || 'Notice Board';
  el.innerHTML = `
    <div class="page-header-row">
      <div><div class="page-title">Notice & Communication</div><div class="page-sub">Notices, SMS, Email, Events</div></div>
      <button class="btn-primary" onclick="openModal('Create New Notice',createNoticeForm())">+ New Notice</button>
    </div>
    ${tabBar(['Notice Board','SMS Notification','Email','Parent Portal','Events'],tab,'notices')}`;

  if (tab==='Notice Board') {
    el.insertAdjacentHTML('beforeend',DATA.notices.map(n=>`
      <div class="notice-board-item" style="border-left-color:${priorityColor(n.priority)}">
        <div class="notice-content">
          <div class="notice-badges">${badge(n.priority.toUpperCase(),priorityColor(n.priority))} ${badge(n.type,'#64748b')}</div>
          <div class="notice-head">${n.title}</div>
          <div class="notice-date">Published: ${n.date}</div>
        </div>
        <div class="notice-actions">
          <button class="btn-secondary btn-sm">View</button>
          <button class="btn-ghost btn-sm">Edit</button>
          <button class="btn-danger btn-sm" onclick="showToast('Notice deleted','error')">Delete</button>
        </div>
      </div>`).join(''));
  } else if (tab==='SMS Notification') {
    el.insertAdjacentHTML('beforeend',`<div class="card">
      <h3 class="section-title mb-20">Send SMS Notification</h3>
      ${formSelect('Send To','sms-to',['All Students','All Parents','All Teachers','Specific Class','Absent Students','Due Fee Students'])}
      ${formSelect('Select Class (if specific)','sms-cls',['All Classes','Class 9','Class 10','Class 11','Class 12'])}
      <div class="form-group"><label class="form-label">Message (max 160 chars)</label><textarea class="form-textarea" rows="4" maxlength="160" placeholder="Type your SMS message here…" oninput="document.getElementById('sms-count').textContent=this.value.length"></textarea><div style="text-align:right;color:#64748b;font-size:11px;margin-top:4px"><span id="sms-count">0</span>/160</div></div>
      <div style="background:#0a1628;border-radius:8px;padding:12px;margin-bottom:18px;display:flex;gap:8px">
        <span style="color:#f59e0b">ℹ️</span>
        <span style="color:#64748b;font-size:13px">Recipients: ~1,287 numbers • Estimated Cost: ৳643.50</span>
      </div>
      <button class="btn-primary" onclick="showToast('📱 SMS sent to 1,287 numbers!')">📱 Send SMS</button>
    </div>`);
  } else if (tab==='Email') {
    el.insertAdjacentHTML('beforeend',`<div class="card">
      <h3 class="section-title mb-20">Send Email Notification</h3>
      ${formSelect('Recipients','email-to',['All Students','All Parents','All Teachers','Specific Department'])}
      ${formInput('Subject','email-sub','text','','Email subject line')}
      <div class="form-group"><label class="form-label">Email Body</label><textarea class="form-textarea" rows="6" placeholder="Write email content here…"></textarea></div>
      <button class="btn-primary" onclick="showToast('📧 Email sent to all recipients!')">📧 Send Email</button>
    </div>`);
  } else if (tab==='Parent Portal') {
    el.insertAdjacentHTML('beforeend',`<div class="card"><h3 class="section-title mb-16">Parent Communication Portal</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px">
        ${[['📊','Progress Reports','Send academic progress to parents'],['💰','Fee Reminders','Automated fee due notifications'],['📅','Event Updates','Notify parents of upcoming events'],['✅','Attendance Alerts','SMS for absent students'],['📝','Exam Results','Share results directly with parents'],['💬','Direct Message','One-on-one parent communication']].map(([ic,t,d])=>`<div class="card" style="cursor:pointer;transition:all .2s;border-top:3px solid #0ea5e9" onclick="showToast('${t} portal opened!')"><div style="font-size:28px;margin-bottom:8px">${ic}</div><div style="color:#e2e8f0;font-weight:600;font-size:14px;margin-bottom:4px">${t}</div><div style="color:#64748b;font-size:12px">${d}</div></div>`).join('')}
      </div>
    </div>`);
  } else if (tab==='Events') {
    el.insertAdjacentHTML('beforeend',`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">
      ${DATA.events.map(e=>{const d=e.date.split('-');return`<div class="card" style="border-top:3px solid #0ea5e9">
        <div style="color:#0ea5e9;font-family:'Syne',sans-serif;font-weight:800;font-size:24px;margin-bottom:4px">${d[2]}</div>
        <div style="color:#64748b;font-size:12px;margin-bottom:10px">${new Date(e.date).toLocaleString('en',{month:'long',year:'numeric'})}</div>
        <h3 style="color:#e2e8f0;font-size:14px;font-weight:600;margin-bottom:6px">${e.title}</h3>
        <div style="color:#64748b;font-size:12px;margin-bottom:14px">📍 ${e.venue}</div>
        <div style="display:flex;gap:8px"><button class="btn-secondary btn-sm">Edit</button><button class="btn-ghost btn-sm" onclick="showToast('Event shared!')">Share</button></div>
      </div>`;}).join('')}
    </div>`);
  }
}

function createNoticeForm() {
  return `
    ${formInput('Notice Title','nc-title','text','','Notice title…')}
    ${formSelect('Category','nc-cat',['Academic','Finance','Event','Admission','Library','General'])}
    ${formSelect('Priority','nc-pri',['High','Medium','Low'])}
    ${formSelect('Visible To','nc-vis',['Everyone','Students Only','Teachers Only','Parents Only','Staff'])}
    <div class="form-group"><label class="form-label">Notice Content</label><textarea class="form-textarea" rows="5" placeholder="Write notice content here…"></textarea></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn-primary" onclick="closeModal();showToast('📢 Notice published!')">📢 Publish Notice</button>
      <button class="btn-ghost" onclick="closeModal()">Cancel</button>
    </div>`;
}

/* ═══════════════════════════════════ HR ═══════════════════════════════════ */
function renderHR(el) {
  const tab = currentTab['hr'] || 'Staff Records';
  el.innerHTML = `
    <div class="page-header"><div class="page-title">HR & Staff Management</div><div class="page-sub">Employee Records, Payroll, Attendance, Leave</div></div>
    ${tabBar(['Staff Records','Leave','Payroll','Attendance','Performance'],tab,'hr')}`;

  if (tab==='Staff Records') {
    const allStaff = [...DATA.teachers,
      {id:"STAFF-001",name:"Mr. Arif Hossain",  dept:"Admin",   qual:"BBA",       attend:95,salary:35000},
      {id:"STAFF-002",name:"Ms. Salma Begum",   dept:"Accounts",qual:"M.Com",     attend:92,salary:38000},
      {id:"STAFF-003",name:"Md. Kamal Uddin",   dept:"Library", qual:"B.Lib.Sc.", attend:90,salary:32000},
    ];
    el.insertAdjacentHTML('beforeend',`<div class="staff-cards">
      ${allStaff.map(s=>`<div class="staff-card">
        <div class="staff-card-head">
          <div class="avatar-circle" style="width:44px;height:44px;background:linear-gradient(135deg,#0ea5e9,#8b5cf6)">${initials(s.name)}</div>
          <div><div class="staff-card-name">${s.name}</div>${badge(s.dept,'#0ea5e9')}</div>
        </div>
        <div style="display:flex;justify-content:space-between;color:#64748b;font-size:12px;margin-bottom:8px">
          <span>${s.qual}</span><span style="color:#10b981">৳${s.salary.toLocaleString()}</span>
        </div>
        <div class="progress-bar mb-4"><div class="progress-fill" style="width:${s.attend}%;background:${s.attend>=95?'#10b981':'#f59e0b'}"></div></div>
        <div style="color:#64748b;font-size:11px">Attendance: ${s.attend}%</div>
      </div>`).join('')}
    </div>`);
  } else if (tab==='Leave') {
    renderLeaveSection(el);
  } else if (tab==='Payroll') {
    renderPayrollSection(el);
  } else if (tab==='Attendance') {
    renderTeacherAttendanceSection(el);
  } else if (tab==='Performance') {
    renderPerformanceSection(el);
  }
}

/* ═══════════════════════════════════ REPORTS ═══════════════════════════════════ */
function renderReports(el) {
  el.innerHTML = `
    <div class="page-header"><div class="page-title">Reports & Analytics</div><div class="page-sub">Generate, Export PDF & Excel reports</div></div>
    <div class="report-cards">
      ${[
        {icon:"🎓",title:"Student Reports",desc:"Enrollment, Profiles, Academic Progress",color:"#0ea5e9"},
        {icon:"✅",title:"Attendance Reports",desc:"Daily, Monthly, Yearly Summaries",color:"#10b981"},
        {icon:"📝",title:"Exam Reports",desc:"Results, GPA, Merit Lists, Grade Sheets",color:"#8b5cf6"},
        {icon:"💰",title:"Financial Reports",desc:"Fee Collection, Income, Expenditure",color:"#f59e0b"},
        {icon:"👨‍🏫",title:"Teacher Reports",desc:"Performance, Attendance, Subject-wise",color:"#f97316"},
        {icon:"📖",title:"Library Reports",desc:"Circulation, Overdue, Fine Collection",color:"#06b6d4"},
        {icon:"📊",title:"Statistical Reports",desc:"Department-wise, Class-wise Analytics",color:"#ef4444"},
        {icon:"🏛️",title:"Annual Reports",desc:"Comprehensive Year-end Summaries",color:"#10b981"},
      ].map(r=>`<div class="report-card" style="border-top-color:${r.color}" onclick="showToast('Opening ${r.title}…')">
        <div class="report-card-icon">${r.icon}</div>
        <div class="report-card-title">${r.title}</div>
        <div class="report-card-desc">${r.desc}</div>
        <div class="report-card-btns">
          <button class="btn-secondary btn-sm" onclick="event.stopPropagation();showToast('Viewing report…')">👁 View</button>
          <button class="btn-ghost btn-sm" onclick="event.stopPropagation();showToast('PDF downloading…')">📄 PDF</button>
          <button class="btn-ghost btn-sm" onclick="event.stopPropagation();showToast('Excel downloading…')">📊 XLS</button>
        </div>
      </div>`).join('')}
    </div>
    <div class="card">
      <h3 class="section-title mb-20">Quick Report Generator</h3>
      <div class="form-grid-4">
        ${formSelect('Report Type','rpt-type',['Student','Attendance','Exam','Finance','Teacher'])}
        ${formSelect('Department','rpt-dept',['All','CSE','EEE','BBA','Civil'])}
        ${formInput('From Date','rpt-from','date')}
        ${formInput('To Date','rpt-to','date')}
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
        <button class="btn-primary" onclick="showToast('📊 Report generated!')">🔍 Generate Report</button>
        <button class="btn-secondary" onclick="showToast('📄 PDF downloading…')">📄 Export PDF</button>
        <button class="btn-secondary" onclick="showToast('📊 Excel downloading…')">📊 Export Excel</button>
      </div>
    </div>`;
}

/* ═══════════════════════════════════ SETTINGS ═══════════════════════════════════ */
function renderSettings(el) {
  const tab = currentTab['settings'] || 'General';
  el.innerHTML = `
    <div class="page-header"><div class="page-title">System Settings</div><div class="page-sub">Configuration, Security, User Management</div></div>
    ${tabBar(['General','User Roles','Security','Notifications','About'],tab,'settings')}`;

  if (tab==='General') {
    el.insertAdjacentHTML('beforeend',`
      <div class="card mb-20">
        <h3 class="section-title mb-20">Institution Information</h3>
        <div class="form-grid-2">
          ${formInput('Institution Name (English)','inst-en','text','TechVision Technical School & College','')}
          ${formInput('Institution Name (Bangla)','inst-bn','text','টেকভিশন টেকনিক্যাল স্কুল ও কলেজ','')}
          ${formInput('EIIN Number','inst-eiin','text','','Govt. EIIN')}
          ${formInput('BTEB/Board Code','inst-bteb','text','','Board Affiliation Code')}
          ${formInput('Principal Name','inst-principal','text','','Principal\'s Name')}
          ${formInput('Phone Number','inst-phone','text','','02-XXXXXXXX')}
          ${formInput('Email','inst-email','email','','info@techvision.edu.bd')}
          ${formInput('Website','inst-web','text','','https://www.techvision.edu.bd')}
          <div class="span-2">${formInput('Address','inst-addr','text','','Full Address')}</div>
        </div>
        <button class="btn-primary" onclick="showToast('✅ Settings saved!')">💾 Save Settings</button>
      </div>
      <div class="card">
        <h3 class="section-title mb-20">Academic Configuration</h3>
        <div class="form-grid-2">
          ${formSelect('Academic Year','conf-year',['2024-2025','2023-2024'])}
          ${formSelect('Grading System','conf-grade',['GPA-5.0 (Bangladesh)','GPA-4.0','Percentage'])}
          ${formSelect('Session Start Month','conf-start',['January','July','September'])}
          ${formSelect('Working Days','conf-days',['Sunday–Thursday','Monday–Friday','Saturday–Thursday'])}
        </div>
        <button class="btn-primary" onclick="showToast('✅ Configuration saved!')">💾 Save Config</button>
      </div>`);
  } else if (tab==='User Roles') {
    const roles = ["Super Admin","Principal","Vice Principal","Academic Coordinator","Teacher","Student","Parent","Accountant","Librarian"];
    el.insertAdjacentHTML('beforeend',`<div class="card"><h3 class="section-title mb-20">Role-Based Access Control</h3>
      ${roles.map(r=>`<div class="role-item">
        <div style="display:flex;gap:12px;align-items:center">
          <div class="role-avatar">${r[0]}</div>
          <div><div class="role-name">${r}</div><div class="role-sub">Role #${roles.indexOf(r)+1}</div></div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn-secondary btn-sm" onclick="showToast('Permissions panel opened')">Permissions</button>
          <button class="btn-ghost btn-sm" onclick="showToast('User list opened')">Users</button>
        </div>
      </div>`).join('')}</div>`);
  } else if (tab==='Security') {
    const items = [
      {title:"Two-Factor Authentication (2FA)",desc:"Require 2FA for admin logins via TOTP",status:true},
      {title:"JWT Authentication",desc:"Secure session management via JSON Web Tokens",status:true},
      {title:"Password Encryption (bcrypt)",desc:"All passwords stored using bcrypt hashing",status:true},
      {title:"Audit Log",desc:"Track all admin actions with timestamps",status:true},
      {title:"IP Whitelist",desc:"Restrict admin access to specific IPs",status:false},
      {title:"Auto Logout",desc:"Inactive session timeout after 30 minutes",status:true},
    ];
    el.insertAdjacentHTML('beforeend',`<div>${items.map(s=>`<div class="security-item">
      <div><div class="security-title">${s.title}</div><div class="security-desc">${s.desc}</div></div>
      <div class="security-right">${badge(s.status?'Active':'Inactive',s.status?'#10b981':'#64748b')}<button class="btn-ghost btn-sm" onclick="showToast('${s.status?'Disabled':'Enabled'}!')">${s.status?'Disable':'Enable'}</button></div>
    </div>`).join('')}</div>`);
  } else if (tab==='Notifications') {
    el.insertAdjacentHTML('beforeend',`<div class="card"><h3 class="section-title mb-20">Notification Settings</h3>
      <div style="display:grid;gap:12px">
        ${[['SMS Gateway','bKash / Robi Axiata API','#10b981'],['Email Server','SMTP via SendGrid','#10b981'],['Push Notifications','Firebase FCM','#f59e0b'],['WhatsApp API','Twilio WhatsApp','#334155']].map(([t,v,c])=>`<div style="background:#0a1628;border-radius:10px;padding:14px;display:flex;justify-content:space-between;align-items:center">
          <div><div style="color:#e2e8f0;font-weight:600;font-size:14px">${t}</div><div style="color:#64748b;font-size:12px;margin-top:2px">${v}</div></div>
          <div style="display:flex;gap:8px">${badge(c==='#334155'?'Not Connected':'Connected',c)}<button class="btn-ghost btn-sm">Configure</button></div>
        </div>`).join('')}
      </div>
    </div>`);
  } else if (tab==='About') {
    el.insertAdjacentHTML('beforeend',`<div class="card about-card">
      <div class="about-icon">🏫</div>
      <div class="about-name">TechVision EduSystem</div>
      <div class="about-ver">School & College Management Platform v2.4.0</div>
      <div class="about-grid">
        ${[['Stack','React.js / HTML+JS + Node.js + MySQL'],['Auth','JWT + bcrypt + 2FA TOTP'],['Language','English + বাংলা'],['Support','BTEB, Dhaka Board, NCTB'],['Developer','TechVision Software Ltd.'],['License','Proprietary – All Rights Reserved']].map(([k,v])=>`<div class="info-box"><div class="info-key">${k}</div><div class="info-val">${v}</div></div>`).join('')}
      </div>
    </div>`);
  }
}

/* ═══════════════════════════════════ MODAL ═══════════════════════════════════ */
function openModal(title, body) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal-overlay').classList.remove('hidden');
  admCurrentStep = 1;
}
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}
function closeModalOverlay(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

/* ═══════════════════════════════════ TOAST ═══════════════════════════════════ */
let toastTimer = null;
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast${type==='error'?' error':''}`;
  t.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.add('hidden'), 2800);
}

/* ═══════════════════════════════════ NOTIFICATION PANEL ═══════════════════════════════════ */
function toggleNotif() {
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('hidden');
  document.addEventListener('click', function closeNotif(e) {
    if (!e.target.closest('.notif-wrap')) {
      panel.classList.add('hidden');
      document.removeEventListener('click', closeNotif);
    }
  });
}

/* ═══════════════════════════════════ ADD EVENT FORM ═══════════════════════════════════ */
function addEventForm() {
  return `
    ${formInput('Event Title','ev-title','text','','Event name')}
    ${formInput('Date','ev-date','date')}
    ${formInput('Venue','ev-venue','text','','Location')}
    <div style="display:flex;gap:10px">
      <button class="btn-primary" onclick="closeModal();showToast('✅ Event added!')">Add Event</button>
      <button class="btn-ghost" onclick="closeModal()">Cancel</button>
    </div>`;
}
