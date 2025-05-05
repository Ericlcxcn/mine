let currentLanguage = 'zh'; // 默认语言
let clickCount = 0;
let copyrightMessageShown = false; // 版权消息状态

const translations = {
    'zh': {
        studioName: "Winter工作室",
        introTitle: "个人简介",
        introText: "你好！我是一名软件开发者，专注于应用设计和用户体验设计。",
        skillsTitle: "技能",
        projectsTitle: "项目",
        linksTitle: "友情链接",
        contactTitle: "联系方式",
        emailText: "邮箱: 3507372474@qq.com",
        projectName1: "工具箱 v1.3.5",
        linkName: "Winter应用商店",
        linkName2: "打赏",
        thankYouMessage: "感谢打赏",
        languageButtonText: "简体中文",
        projectName2: "记事本 v1.2.0",
    },
    'zh-tw': {
        studioName: "Winter工作室",
        introTitle: "個人簡介",
        introText: "你好！我是一名軟體開發者，專注於應用設計和用戶體驗設計。",
        skillsTitle: "技能",
        projectsTitle: "項目",
        linksTitle: "友情連結",
        contactTitle: "聯繫方式",
        emailText: "郵箱: 3507372474@qq.com",
        projectName1: "工具箱 v1.3.5",
        linkName: "Winter應用商店",
        linkName2: "打赏",
        thankYouMessage: "感謝打賞",
        projectName2: "記事本 v1.2.0",
        languageButtonText: "繁體中文"
    },
    'en': {
        studioName: "Winter Studio",
        introTitle: "Introduction",
        introText: "Hello! I am a software developer focused on application design and user experience design.",
        skillsTitle: "Skills",
        projectsTitle: "Projects",
        linksTitle: "Links",
        contactTitle: "Contact",
        emailText: "Email: 3507372474@qq.com",
        projectName1: "Toolkit v1.3.5",
        linkName: "Winter App Store",
        linkName2: "Donation",
        thankYouMessage: "Thank you for your support",
        projectName2: "Notebook v1.2.0",
        languageButtonText: "English"
    }
};

function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage; 
    if (lang.startsWith('zh-Hans')) return 'zh'; 
    if (lang.startsWith('zh-Hant')) return 'zh-tw'; 
    if (lang.startsWith('en')) return 'en'; 
    return 'zh'; 
}

window.onload = function() {
    currentLanguage = getBrowserLanguage(); 
    updateContentAndButton(); 

    setTimeout(function() {
        document.getElementById('loader').style.transform = 'translateX(-100%)';
        document.getElementById('loader').style.transition = 'transform 0.5s ease';
    }, 1500);//延迟移除遮罩

    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        fadeInElements();
    }, 2000);//显示网页元素

    displayDateTime();
    adjustTextColor();

    //  版权窗口
    document.querySelector('.avatar').onclick = function() {
        clickCount++;
        if (clickCount === 1) {
            setTimeout(() => {
                clickCount = 0;
            }, 3000);
        }
        if (clickCount === 15) {
            showCopyrightMessage();
            clickCount = 0;
        }
    };
};

function displayDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const dateTimeString = currentLanguage === 'en' ?
        now.toLocaleString('en-GB', options) : 
        now.toLocaleString(navigator.language, options);
    document.getElementById('datetime').innerText = dateTimeString.replace(',', ' ');

    setTimeout(displayDateTime, 1000); // 使用 setTimeout 进行递归调用
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
    updateContentAndButton(); 
    closePopup();
}

function updateContentAndButton() {
    const translation = translations[currentLanguage];
    document.getElementById('studioName').innerText = translation.studioName;
    document.getElementById('introTitle').innerText = translation.introTitle;
    document.getElementById('introText').innerText = translation.introText;
    document.getElementById('skillsTitle').innerText = translation.skillsTitle;
    document.getElementById('projectsTitle').innerText = translation.projectsTitle;
    document.getElementById('linksTitle').innerText = translation.linksTitle;
    document.getElementById('contactTitle').innerText = translation.contactTitle;
    document.getElementById('emailText').innerText = translation.emailText;
    document.getElementById('projectName1').innerText = translation.projectName1;
    document.getElementById('projectName2').innerText = translation.projectName2;
    document.getElementById('linkName').innerText = translation.linkName;
    document.getElementById('linkName2').innerText = translation.linkName2;
    document.getElementById('thankYouMessage').innerText = translation.thankYouMessage;

    document.getElementById('languageButton').innerText = translation.languageButtonText; // 更新语言按钮
}

function closePopup() {
    document.getElementById('languagePopup').style.display = 'none';
}

function showRewardImage() {
    document.getElementById('rewardImage').style.display = 'flex';
}

function hideRewardImage() {
    document.getElementById('rewardImage').style.display = 'none';
    showThankYouMessage();
}

function showThankYouMessage() {
    const message = document.getElementById('thankYouMessage');
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 500);
}

function showCopyrightMessage() {
    if (copyrightMessageShown) return; // 如果已经显示过版权消息，则返回
    copyrightMessageShown = true; // 标记已显示版权消息

    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '50%';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translate(-50%, -50%)';
    messageContainer.style.zIndex = '1004';
    messageContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    messageContainer.style.color = '#000';
    messageContainer.style.padding = '20px';
    messageContainer.style.borderRadius = '8px';
    messageContainer.style.textAlign = 'center';
    
    const img = document.createElement('img');
    img.src = 'https://s2.loli.net/2024/11/23/giTHqSktvpJfaAE.jpg';
    img.style.maxWidth = '100%';
    img.style.borderRadius = '8px';
    img.style.cursor = 'pointer';

    const text = document.createElement('p');
    text.innerText = 'Winter工作室©️拥有本网站版权，请勿抄袭，或未经允许篡改';

    messageContainer.appendChild(img);
    messageContainer.appendChild(text);
    document.body.appendChild(messageContainer);

    img.onclick = function() {
        document.body.removeChild(messageContainer);
        copyrightMessageShown = false; // 关闭时重置状态
    };
}

function fadeInElements() {
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
}
