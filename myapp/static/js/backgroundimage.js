    // 图片URL数组
    const backgrounds = [
        'static/images/background1.jpg',
        'static/images/background2.jpg',
        'static/images/background3.jpg',
		'static/images/background4.jpg',
		'static/images/background5.jpg',
		'static/images/background6.jpg',
		'static/images/background7.jpg',
		'static/images/background8.jpg',
        // 添加更多图片路径...
    ];

    // 随机选择一张背景图片并设置为body的背景
    function setBackgroundImage() {
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
    }

    // 页面加载时执行
    window.onload = setBackgroundImage;	