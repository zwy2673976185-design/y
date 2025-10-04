document.addEventListener('DOMContentLoaded', function() {
    const editSwitch = document.getElementById('editSwitch');
    const editPanel = document.getElementById('editPanel');
    const closeEdit = document.getElementById('closeEdit');
    const syncNotice = document.getElementById('syncNotice');
    const editTitle = document.getElementById('editTitle');
    const editDate = document.getElementById('editDate');
    const editContent = document.getElementById('editContent');
    const editUpdateUrl = document.getElementById('editUpdateUrl');
    const editFile = document.getElementById('editFile');
    const editFileInfo = document.getElementById('editFileInfo');
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);

    // 日期默认值
    editDate.value = new Date().toISOString().split('T')[0];

    // 打开/关闭编辑面板
    editSwitch.addEventListener('click', () => {
        editPanel.style.display = 'block';
    });

    closeEdit.addEventListener('click', () => {
        editPanel.style.display = 'none';
    });

    // 文件上传处理
    editFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSize = file.size > 1024 * 1024 
                ? `${(file.size / (1024 * 1024)).toFixed(1)}MB` 
                : `${(file.size / 1024).toFixed(1)}KB`;
            editFileInfo.textContent = `已选择: ${file.name} (${fileSize})`;
            file.url = URL.createObjectURL(file);
        } else {
            editFileInfo.textContent = '点击或拖拽文件到此处';
        }
    });

    // 同步公告
    syncNotice.addEventListener('click', () => {
        const title = editTitle.value.trim();
        const content = editContent.value.trim();
        const updateUrl = editUpdateUrl.value.trim();
        const file = editFile.files[0];

        if (!title || !content) {
            alert('公告标题和内容不能为空！');
            return;
        }

        // 格式化日期
        const [year, month, day] = editDate.value.split('-');
        const noticeData = {
            title: title,
            date: `${year}年${month}月${day}日`,
            content: content.replace(/\n/g, '<br>'),
            updateUrl: updateUrl,
            file: file ? {
                name: file.name,
                url: file.url,
                size: file.size,
                isDownloaded: false
            } : null,
            isDownloaded: false
        };

        // 存储到本地
        localStorage.setItem('noticeData', JSON.stringify(noticeData));
        
        // 显示提示
        toast.textContent = '同步成功';
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);

        editPanel.style.display = 'none';
    });
});
