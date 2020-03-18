const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 根据出生日期计算年龄周岁  传参格式为1990-06-08
function getAge(strBirthday) {
  var returnAge = '';
  var mouthAge = '';
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  if (nowYear == birthYear) {
    // returnAge = 0; //同年 则为0岁
    var monthDiff = nowMonth - birthMonth; //月之差 
    if (monthDiff < 0) {
    } else {
      mouthAge = monthDiff + '个月';
    }
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差 
        if (dayDiff < 0) {
          returnAge = ageDiff - 1 + '岁';
        } else {
          returnAge = ageDiff + '岁';
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差 
        if (monthDiff < 0) {
          returnAge = ageDiff - 1 + '岁';
        } else {
          mouthAge = monthDiff + '个月';
          returnAge = ageDiff + '岁';
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge + mouthAge; //返回周岁年龄+月份
}

// 根据出生日期计算年龄周岁 传参格式为19900608
function getAges(strBirthday) {
  var returnAge = '';
  var mouthAge = '';
  var strBirthdayArr = strBirthday
  var birthYear = strBirthdayArr.substring(0, 4);
  var birthMonth = strBirthdayArr.substring(4, 6);
  var birthDay = strBirthdayArr.substring(6, 8);
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  if (nowYear == birthYear) {
    // returnAge = 0; //同年 则为0岁
    var monthDiff = nowMonth - birthMonth; //月之差 
    if (monthDiff < 0) {
    } else {
      mouthAge = monthDiff + '个月';
    }
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差 
        if (dayDiff < 0) {
          returnAge = ageDiff - 1 + '岁';
        } else {
          returnAge = ageDiff + '岁';
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差 
        if (monthDiff < 0) {
          returnAge = ageDiff - 1 + '岁';
        } else {
          mouthAge = monthDiff + '个月';
          returnAge = ageDiff + '岁';
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  //return returnAge + mouthAge; //返回周岁年龄+月份
  return returnAge
}

/**
 * 数字格式化金钱展示
 * @param {*} num 串数字
 * @returns
 */
const numFormat = (num) => {
  if (typeof (num) != 'number') {
    num = Number(num)
  }
  num = num.toFixed(2);
  num = parseFloat(num)
  num = num.toLocaleString();
  let floatPart = '.00' // 预定义小数部分
  let numArry = num.split('.')
  // =2表示数据有小数位
  if (numArry.length === 2) {
    floatPart = numArry[1].toString() // 拿到小数部分
    if (floatPart.length === 1) { // 补0,实际上用不着
      return numArry[0] + '.' + floatPart + '0'
    } else {
      return numArry[0] + '.' + floatPart
    }
  } else {
    return num + floatPart
  }
}

/**
 *
 * 金钱格式化数字
 * @param {*} 传字符串或者数字
 * @returns
 */
const number = (value) => {
  if (typeof (value) == 'number') {
    return value
  } else {
    if (value.indexOf(',') != -1) {
      return Number(value)
    } else {
      return Number(value.replace(',', ''))
    }
  }
}

module.exports = {
  formatTime: formatTime,
  getAge: getAge,
  getAges: getAges,
  numFormat: numFormat,
  number: number,
}
