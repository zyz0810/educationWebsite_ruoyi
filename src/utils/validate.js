/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
/* 是否手机号码*/
export function validatePhone(rule, value, callback) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (value == "" || value == undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value) && value != "") {
      callback(new Error("请输入正确的电话号码"));
    } else {
      callback();
    }
  }
}
/*验证内容是否英文数字*/
export function isPassword(rule, value, callback) {
  // const reg = /^[_a-zA-Z0-9]+$/;
  const reg = /(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)/

  if (value == "" || value == undefined || value == null) {
    callback();
  } else {
    if (value.length < 6 && reg.test(value)) {
      callback(new Error("密码为6-18位"));
    } else if (value.length < 6 && !reg.test(value)) {
      callback(new Error("密码为6-18位，且由英文字母和数字组成"));
    } else if (value.length > 18 && reg.test(value)) {
      callback(new Error("密码为6-18位"));
    } else {
      if (!reg.test(value)) {
        callback(new Error("密码仅由英文字母和数字组成"));
      } else {
        callback();
      }
    }
  }
}
/* 是否手机号码*/
export function validateConfirmPassword(rule, value, callback,password) {
  if (value == "" || value == undefined || value == null) {
    callback();
  } else {
    if (value != password) {
      callback(new Error("两次密码输入不一致"));
    } else {
      callback();
    }
  }
}
