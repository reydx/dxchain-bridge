import { message } from 'antd';

/**
 * @description: 一键复制
 */
export function copy(text: string, successMsg: string = '复制成功') {
  try {
    if (text === '' || text === undefined) {
      message.error('未检测到复制内容');
      return;
    }
    const oInput = document.createElement('input');
    oInput.value = text;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    document.body.removeChild(oInput);
    message.success(successMsg);
  } catch (error) {
    message.error('复制失败');
  }
}
