let currentLanguage = 'zh'; // 默认语言

const translations = {
    'zh': {
        studioName: "Winter工作室",
        introTitle: "个人简介",
        introText: "你好！我是一名软件开发者，专注于应用设计和用户体验设计。",
        skillsTitle: "技能",
        projectsTitle: "项目",
        contactTitle: "联系方式",
        emailText: "邮箱: 3507372474@qq.com",
        projectName: "工具箱 v1.3.5",
        languageButtonText: "简体中文"
    },
    'zh-tw': {
        studioName: "Winter工作室",
        introTitle: "個人簡介",
        introText: "你好！我是一名軟體開發者，專注於應用設計和用戶體驗設計。",
        skillsTitle: "技能",
        projectsTitle: "項目",
        contactTitle: "聯繫方式",
        emailText: "郵箱: 3507372474@qq.com",
        projectName: "工具箱 v1.3.5",
        languageButtonText: "繁體中文"
    },
    'en': {
        studioName: "Winter Studio",
        introTitle: "Introduction",
        introText: "Hello! I am a software developer focused on application design and user experience design.",
        skillsTitle: "Skills",
        projectsTitle: "Projects",
        contactTitle: "Contact",
        emailText: "Email: 3507372474@qq.com",
        projectName: "Toolkit v1.3.5",
        languageButtonText: "English"
    }
};

// 自动获取设备语言
function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage; 
    if (lang.startsWith('zh-Hans')) return 'zh';  // 简体中文
    if (lang.startsWith('zh-Hant')) return 'zh-tw'; // 繁体中文
    if (lang.startsWith('en')) return 'en'; // 英文
    return 'zh'; // 默认使用简体中文
}

window.onload = function() {
    currentLanguage = getBrowserLanguage(); // 设置当前语言
    updateContent(); // 更新内容
    updateLanguageButton(); // 更新语言按钮文本

    setTimeout(function() {
        document.getElementById('loader').style.transform = 'translateX(-100%)';
        document.getElementById('loader').style.transition = 'transform 0.5s ease';
    }, 300);

    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';

        let opacity = 0;
        const elements = document.querySelectorAll('header, section, footer');
        const interval = setInterval(function() {
            if (opacity >= 1) {
                clearInterval(interval);
            } else {
                opacity += 0.15;
                elements.forEach(element => {
                    element.style.opacity = opacity;
                });
            }
        }, 50);
    }, 800);

    displayDateTime();
    adjustTextColor();
};

function handleButtonClick(button, link) {
    // 立即触发按钮缩放效果
    button.style.transform = 'scale(0.95)';
     window.location.href = link;
}

function displayDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const dateTimeString = now.toLocaleString('zh-CN', options);
    document.getElementById('datetime').innerText = dateTimeString;

    setInterval(displayDateTime, 1000);
}

function adjustTextColor() {
    const sections = document.querySelectorAll('section, footer');
    sections.forEach(section => {
        const bgColor = window.getComputedStyle(section).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        const brightness = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
        section.style.color = brightness > 0.5 ? '#000000' : '#ffffff';
    });
}

document.getElementById('languageButton').onclick = function() {
    document.getElementById('languagePopup').style.display = 'block';
};

function selectLanguage(language) {
    currentLanguage = language;
    updateContent(); // 更新内容
    updateLanguageButton(); // 更新按钮文本
    closePopup();
}

function updateContent() {
    const translation = translations[currentLanguage];
    document.getElementById('studioName').innerText = translation.studioName;
    document.getElementById('introTitle').innerText = translation.introTitle;
    document.getElementById('introText').innerText = translation.introText;
    document.getElementById('skillsTitle').innerText = translation.skillsTitle;
    document.getElementById('projectsTitle').innerText = translation.projectsTitle;
    document.getElementById('contactTitle').innerText = translation.contactTitle;
    document.getElementById('emailText').innerText = translation.emailText; // 更新邮箱文本
    document.getElementById('projectName').innerText = translation.projectName;
}

function updateLanguageButton() {
    const translation = translations[currentLanguage];
    document.getElementById('languageButton').innerText = translation.languageButtonText; // 更新按钮文本
}

function closePopup() {
    document.getElementById('languagePopup').style.display = 'none';
}