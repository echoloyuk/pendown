export function getTitleAndContent(str) {
  if (!str) {
    return {
      title: '',
      content: ''
    }
  }
  const strArr = str.split('\n');
  const firstLine = strArr[0];
  let title = '';
  let content = '';
  let isHaveTitle = false;
  if (firstLine.indexOf('# ') === 0) {
    title = firstLine.substr(2);
    isHaveTitle = true;
  }
  if (isHaveTitle) { // 找到了标题
    strArr.shift();
    content = strArr.join('\n');
  } else {
    content = strArr.join('\n');
  }
  return {
    title,
    content
  }
}

export function getFinalContent(title, content) {
  if (!title) {
    title = '';
  }
  if (!content) {
    content = '';
  }
  if (title) {
    return `# ${title}\n${content}`;
  } else {
    return `${title}${content}`;
  }
}