// ── Repository Data ──
// Semesters with specializations have a nested structure:
// { "Cybersecurity": { courses... }, "Data-Science": { courses... } }
// Semesters without specializations remain flat: { courses... }

const REPO_DATA = {
  "Year-1": {
    "Semester-1": {
      "Anti Corruption": [
        "case study_Integrity and Anti-Corruption Course.pdf",
        "CORRUPTION ASSIGNMENT Group Work.pdf"
      ],
      "C-Programming": [],
      "Computer Organization & Architecture": [],
      "Mathematics": [],
      "Principal of Management": [
        "PETRONAS CASE STUDY.docx.pdf"
      ],
      "Sustainability": []
    },
    "Semester-2": {
      "Data Communication & Networking": [],
      "Object-Oriented Programming": [],
      "Principal of Marketing": [
        "principle of marketing project report .pdf"
      ],
      "Probability & Statistics": [
        "PROBABILITY AND STATISTICS PROJECT.pdf",
        "Probability and Statics data collection and presentation.pdf"
      ],
      "Social Business": [
        "SOCIAL BUSINESS  Group Assignment - Report.pdf"
      ]
    },
    "Semester-3": {
      "Cyber Ethics": [],
      "Discrete Mathematics": []
    }
  },
  "Year-2": {
    "Semester-1": {
      "Data Structures & Algorithms": [
        "DSA Assignment 2.pdf",
        "Report OF DSA.pdf"
      ],
      "Database Management System": [],
      "Operating Systems": [
        "A MULTI-PERSPECTIVE COMPARISON OF OPERATING SYSTEMS.pdf"
      ],
      "Software Engineering": [
        "Assignment_SOFTWERE_ENGINEERING.pdf",
        "SOFTWARE ENGINEERING REPORT DIAGRAMS _.pdf"
      ]
    },
    "Semester-2": {
      "Cybersecurity": {
        "Cryptography": [
          "crypto.pdf"
        ],
        "Cybersecurity Systems": [
          "CyberSecurity System Individual assignment 2 _OMID QAZIKHIL _ _AIU22102314_.pdf",
          "CyberSecurity _CCS2263_ Group Project .pdf"
        ],
        "Fundamentals of Information Security": [
          "Assignment 01_MD PARVEJ AHMED RAFI_AIU23102301.pdf",
          "Fundamental of information security.pdf",
          "PROJECT REPORT_ Al Bawani Security Implementation Plan_FOIS .pdf"
        ],
        "Requirement Engineering": [
          "CCE2233 RE Project S2-2025 - Peer Evaluation Form (2).pdf",
          "CCE2233 RE Project S2-2025 - Self Reflection Form-1.pdf",
          "Requirements Engineering GROUP PROJECT.pdf"
        ]
      },
      "Data-Science": {
        "Statistical Analysis & Modeling": [],
        "Data Visualization": [],
        "Introduction to Data Science": [],
        "Linear Algebra for Data Science": []
      }
    },
    "Semester-3": {
      "Cybersecurity": {
        "Secure Software Development": [
          "Secure_Softwere_Development-3.pdf"
        ],
        "Software Testing": [
          "CCE2333-LabModule1-AnswereSheet-3.pdf",
          "CCE2333-LabModule2-AnswerSheet-2.pdf",
          "SOFTWERE_TESTING_PROJECT.pdf"
        ]
      },
      "Data-Science": {
        "Machine Learning Fundamentals": [],
        "Data Mining & Warehousing": []
      }
    }
  },
  "Year-3": {
    "Semester-1": {
      "Cybersecurity": {
        "Digital Forensics": [
          "Digital Forensics Court Case Report-1.pdf",
          "LAB 1_ Introduction to Digital Forensics-3.pdf"
        ],
        "Internet of Things": [],
        "Risk Management": [],
        "VAPT": []
      },
      "Data-Science": {
        "Deep Learning": [],
        "Big Data Analytics": [],
        "Natural Language Processing": [],
        "Computer Vision": []
      }
    }
  }
};

// Folder name mapping (display name -> actual folder name in repo)
const FOLDER_MAP = {
  // Year 1
  "Anti Corruption": "Anti Corruption",
  "C-Programming": "C-Programming",
  "Computer Organization & Architecture": "Computer-Organization-and-Architecture",
  "Mathematics": "Mathematics",
  "Principal of Management": "Principal of Management",
  "Sustainability": "Sustainability",
  "Data Communication & Networking": "Data-Communication-and-Networking",
  "Object-Oriented Programming": "Object-Oriented-Programming",
  "Principal of Marketing": "Principal Of marketing",
  "Probability & Statistics": "Probability-and-Statistics",
  "Social Business": "Socail Business",
  "Cyber Ethics": "Cyber-Ethics",
  "Discrete Mathematics": "Discrete-Mathematics",
  // Year 2 - Semester 1 (common)
  "Data Structures & Algorithms": "Data-Structures-and-Algorithms",
  "Database Management System": "Database-Management-System",
  "Operating Systems": "Operating-Systems",
  "Software Engineering": "Software-Engineering",
  // Year 2 - Cybersecurity
  "Cryptography": "Cryptography",
  "Cybersecurity Systems": "Cybersecurity-Systems",
  "Fundamentals of Information Security": "Fundamentals-of-Information-Security",
  "Requirement Engineering": "Requirement-Engineering",
  "Secure Software Development": "Secure-Software-Development",
  "Software Testing": "Software-Testing",
  // Year 3 - Cybersecurity
  "Digital Forensics": "Digital-Forensics",
  "Internet of Things": "Internet-of-Things",
  "Risk Management": "Risk-Management",
  "VAPT": "VAPT",
  // Year 2 - Data Science
  "Statistical Analysis & Modeling": "Statistical-Analysis-and-Modeling",
  "Data Visualization": "Data-Visualization",
  "Introduction to Data Science": "Introduction-to-Data-Science",
  "Linear Algebra for Data Science": "Linear-Algebra-for-Data-Science",
  "Machine Learning Fundamentals": "Machine-Learning-Fundamentals",
  "Data Mining & Warehousing": "Data-Mining-and-Warehousing",
  // Year 3 - Data Science
  "Deep Learning": "Deep-Learning",
  "Big Data Analytics": "Big-Data-Analytics",
  "Natural Language Processing": "Natural-Language-Processing",
  "Computer Vision": "Computer-Vision"
};

const COURSE_ICONS = [
  { cls: 'purple', icon: '📘' },
  { cls: 'pink', icon: '📕' },
  { cls: 'cyan', icon: '📗' },
  { cls: 'green', icon: '📙' }
];

const SPECIALIZATION_META = {
  "Cybersecurity": {
    icon: "🔐",
    label: "Cybersecurity",
    cls: "spec-cyber"
  },
  "Data-Science": {
    icon: "📊",
    label: "Data Science",
    cls: "spec-ds"
  }
};

// ── Detect if semester has specializations ──
function isSpecialized(semData) {
  const firstVal = Object.values(semData)[0];
  return firstVal !== undefined && typeof firstVal === 'object' && !Array.isArray(firstVal);
}

// ── Compute Stats ──
let totalCourses = 0, totalPDFs = 0, totalSemesters = 0;
const totalYears = Object.keys(REPO_DATA).length;

Object.values(REPO_DATA).forEach(semesters => {
  Object.values(semesters).forEach(semData => {
    totalSemesters++;
    if (isSpecialized(semData)) {
      Object.values(semData).forEach(specCourses => {
        Object.entries(specCourses).forEach(([, files]) => {
          totalCourses++;
          totalPDFs += files.length;
        });
      });
    } else {
      Object.entries(semData).forEach(([, files]) => {
        totalCourses++;
        totalPDFs += files.length;
      });
    }
  });
});

// ── Track active specialization per semester ──
const activeSpecs = {};

// ── Initialize ──
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('stat-years').textContent = totalYears;
  document.getElementById('stat-semesters').textContent = totalSemesters;
  document.getElementById('stat-courses').textContent = totalCourses;
  document.getElementById('stat-pdfs').textContent = totalPDFs;

  initNavbar();
  initYearTabs();
  renderYear('Year-1');
  initSearch();
  animateOnScroll();
});

// ── Navbar ──
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ── Year Tabs ──
function initYearTabs() {
  document.querySelectorAll('.year-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderYear(tab.dataset.year);
    });
  });
}

// ── Render Year Content ──
function renderYear(year) {
  const container = document.getElementById('resources-container');
  const semesters = REPO_DATA[year];
  if (!semesters) { container.innerHTML = ''; return; }

  let html = '';
  Object.entries(semesters).forEach(([sem, semData], si) => {
    const semKey = `${year}-${sem}`;
    const specialized = isSpecialized(semData);

    let courseCount = 0, pdfCount = 0;
    if (specialized) {
      Object.values(semData).forEach(specCourses => {
        Object.entries(specCourses).forEach(([, files]) => {
          courseCount++;
          pdfCount += files.length;
        });
      });
    } else {
      Object.entries(semData).forEach(([, files]) => {
        courseCount++;
        pdfCount += files.length;
      });
    }

    // Default active specialization
    if (specialized && !activeSpecs[semKey]) {
      activeSpecs[semKey] = Object.keys(semData)[0]; // Default to first (Cybersecurity)
    }

    html += `
      <div class="semester-group" style="animation-delay: ${si * 0.1}s">
        <div class="semester-header${si === 0 ? ' active' : ''}" onclick="toggleSemester(this)">
          <h3>
            <span class="sem-icon">📚</span>
            ${sem.replace('-', ' ')}
            <span class="badge">${courseCount} courses · ${pdfCount} files</span>
            ${specialized ? '<span class="spec-badge">⚡ Specialization</span>' : ''}
          </h3>
          <span class="chevron">▼</span>
        </div>
        <div class="semester-content${si === 0 ? ' open' : ''}">
          <div class="semester-inner">
            ${specialized
              ? renderSpecializedSemester(year, sem, semData, semKey)
              : renderCourses(year, sem, semData, null)
            }
          </div>
        </div>
      </div>`;
  });
  container.innerHTML = html;
}

// ── Render Specialized Semester (with toggle) ──
function renderSpecializedSemester(year, sem, semData, semKey) {
  const activeSpec = activeSpecs[semKey] || Object.keys(semData)[0];

  let toggleHtml = '<div class="spec-toggle-container">';
  toggleHtml += '<div class="spec-toggle">';
  Object.keys(semData).forEach(specName => {
    const meta = SPECIALIZATION_META[specName];
    const isActive = specName === activeSpec;
    toggleHtml += `
      <button class="spec-toggle-btn ${meta.cls}${isActive ? ' active' : ''}"
              onclick="switchSpec('${year}', '${sem}', '${semKey}', '${specName}', this)"
              data-spec="${specName}">
        <span class="spec-toggle-icon">${meta.icon}</span>
        <span>${meta.label}</span>
      </button>`;
  });
  toggleHtml += '</div></div>';

  // Render courses for active specialization
  const activeCourses = semData[activeSpec] || {};
  const coursesHtml = `<div class="spec-courses-wrapper ${SPECIALIZATION_META[activeSpec]?.cls || ''}" id="spec-content-${semKey}">
    ${renderCourses(year, sem, activeCourses, activeSpec)}
  </div>`;

  return toggleHtml + coursesHtml;
}

// ── Switch Specialization ──
function switchSpec(year, sem, semKey, specName, btnEl) {
  activeSpecs[semKey] = specName;

  // Update toggle buttons
  const toggleContainer = btnEl.closest('.spec-toggle');
  toggleContainer.querySelectorAll('.spec-toggle-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  // Re-render courses with animation
  const semesters = REPO_DATA[year];
  const semData = semesters[sem];
  const courses = semData[specName] || {};
  const wrapper = document.getElementById(`spec-content-${semKey}`);

  // Remove old spec class
  wrapper.className = 'spec-courses-wrapper';
  wrapper.classList.add(SPECIALIZATION_META[specName]?.cls || '');

  // Fade out, swap, fade in
  wrapper.style.opacity = '0';
  wrapper.style.transform = 'translateY(10px)';
  setTimeout(() => {
    wrapper.innerHTML = renderCourses(year, sem, courses, specName);
    wrapper.style.opacity = '1';
    wrapper.style.transform = 'translateY(0)';
  }, 200);
}

// ── Render Courses ──
function renderCourses(year, sem, courses, specialization) {
  return Object.entries(courses).map(([name, files], i) => {
    const icon = COURSE_ICONS[i % COURSE_ICONS.length];
    const folderName = FOLDER_MAP[name] || name;

    // Build the download path — include specialization folder if applicable
    const basePath = specialization
      ? `${year}/${sem}/${specialization}/${folderName}`
      : `${year}/${sem}/${folderName}`;

    const pdfs = files.length > 0
      ? `<div class="pdf-list">${files.map(f => {
          const url = encodeURI(basePath + '/' + f);
          const displayName = f.replace('.pdf', '').replace(/_/g, ' ');
          return `<div class="pdf-item">
            <div class="pdf-info"><span class="pdf-icon">📄</span><span class="pdf-name" title="${f}">${displayName}</span></div>
            <a href="${url}" download="${f}" class="pdf-download">⬇ Download</a>
          </div>`;
        }).join('')}</div>`
      : '<p class="no-files">📂 Coming soon — contribute to add resources!</p>';

    // Determine specialization-specific card styling
    const specCardClass = specialization
      ? ` spec-card-${specialization === 'Cybersecurity' ? 'cyber' : 'ds'}`
      : '';

    return `<div class="course-card${specCardClass}" data-course="${name.toLowerCase()}">
      <div class="course-card-header">
        <div class="course-icon ${icon.cls}">${icon.icon}</div>
        <div><h4>${name}</h4><span class="file-count">${files.length} file${files.length !== 1 ? 's' : ''}</span></div>
      </div>
      ${pdfs}
    </div>`;
  }).join('');
}

// ── Accordion Toggle ──
function toggleSemester(el) {
  const content = el.nextElementSibling;
  el.classList.toggle('active');
  content.classList.toggle('open');
}

// ── Search ──
function initSearch() {
  const input = document.getElementById('search-input');
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.course-card').forEach(card => {
      const match = card.dataset.course.includes(q) || card.textContent.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
    });
    // auto-open all semesters when searching
    if (q) {
      document.querySelectorAll('.semester-header').forEach(h => { h.classList.add('active'); h.nextElementSibling.classList.add('open'); });
    }
  });
}

// ── Scroll Animations ──
function animateOnScroll() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)'; } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.stat-card, .section-header, .contribute').forEach(el => {
    el.style.opacity = 0; el.style.transform = 'translateY(20px)'; el.style.transition = 'all .6s ease';
    observer.observe(el);
  });
}
