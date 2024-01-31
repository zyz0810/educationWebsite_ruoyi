import {
  getTreeList,
  setTreeList
} from '@/utils/auth'
import store from "@/store";


// 公共级联方法

export function getCascaderOptions(arr, ids = []) {
  arr.forEach(({
    name,
    id,
    childrens
  }) => {
    const data = {
      label: name,
      value: id,
    }
    if (childrens.length) {
      getCascaderOptions(childrens, data.children = [])
    }
    ids.push(data)
  })
  return ids
}


// 公共级联方法2

export function getCascaderOptionsByDeptName(arr, ids = []) {
  arr.forEach(({
    deptName,
    id,
    childrens
  }) => {
    const data = {
      label: deptName,
      value: id,
    }
    if (childrens.length) {
      getCascaderOptionsByDeptName(childrens, data.children = [])
    }
    ids.push(data)
  })
  return ids
}

//公共取树id方法

export function getCheckedNodesId(list, allCheck, ids) {
  list.forEach(item => {
    if (allCheck.includes(item.id)) {

      ids.push(item.id);
    } else {
      if (item.childrens && item.childrens.length) {
        getCheckedNodesId(item.childrens, allCheck, ids);
      }
    }
  });
  return ids;
}

// 公共树方法

export function getTreeOptions(arr, ids = []) {
  arr.forEach(({
    name,
    id,
    childrens
  }) => {
    const data = {
      name,
      id
    }
    if (childrens.length) {
      getTreeOptions(childrens, data.childrens = [])
    }
    ids.push(data)
  })
  return ids
}

// 公共还原树方法

export function getTreeOptions2(arr, list, level = 1) {
  let currentList = []
  if (level == 1) {
    list = arr.filter(item => !item.parentId)
  } else if (level == 3) {
    currentList = arr.filter(item => item.treePath.split(',').map(item => item).length == 2)

  } else if (level == 2) {

  }
  if (level > 1) {
    getTreeOptions2(arr, list, level += 1)
  }
  return list
}

// 把list地址数据转成树
export function listToTree(oldArr) {
  oldArr.forEach(element => {
    let parentId = element.parentId;
    if (parentId) {
      oldArr.forEach(ele => {
        if (ele.id == parentId) { //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
          if (!ele.childrens) {
            ele.childrens = [];
          }
          ele.childrens.push(element);
        }
      });
    }
  });
  oldArr = oldArr.filter(ele => !ele.parentId); //这一步是过滤，按树展开，将多余的数组剔除；
  return oldArr;
}
