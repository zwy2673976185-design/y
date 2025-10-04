// 点击按钮显示提示文本的逻辑
const btn = document.getElementById('btn-test');
const showText = document.getElementById('show-text');

btn.addEventListener('click', () => {
    showText.textContent = '交互测试成功！更新时可修改此文本验证部署';
    // 后续测试更新：可将上面的文本改为“已完成第1次拆分版更新！”
});
