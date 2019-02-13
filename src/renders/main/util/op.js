import OP from '../constants/op';

export function getOP(metaKey, keyCode) {
  // 保存 command + s;
  if (metaKey && keyCode === 83) {
    return OP.SAVE;
  }
}