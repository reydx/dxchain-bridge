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

/**
 * @description: 截取字符串中间用省略号显示
 */
export function getCenterSubStr(
  text: string,
  start: number = 10,
  end: number = 10,
) {
  const pc = document.body.clientWidth > 768;
  const newStart = pc ? start : 5;
  const newEnd = pc ? end : 5;
  var subStr1 = text.substr(0, newStart);
  var subStr2 = text.substr(text.length - newEnd, newEnd);
  var subStr = subStr1 + '...' + subStr2;
  return subStr;
}

/**
 * @description: sleep
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
