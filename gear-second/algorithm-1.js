/***
 * 选择排序
 */
function selectSort(arr) {
  let minIndex
  for (let i = 0; i < arr.length; i++) {
    minIndex = i
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}

selectSort([5, 6, 4, 7, 9, 8, 3, 2, 1])


/**
 * 插入排序
 */
function insertSort(arr) {
  let tmp
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1
    if (arr[i] < arr[j]) {
      tmp = arr[i]
      arr[j + 1] = arr[j]
      j -= 1
      while (j >= 0 && arr[j] > tmp) {
        arr[j + 1] = arr[j]
        j -= 1
      }
      arr[j + 1] = tmp
    }

  }
  return arr
}

insertSort([5, 6, 4, 7, 9, 8, 3, 2, 1])

/**
 * 冒泡排序
 */
function buddingSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}

buddingSort([5, 6, 4, 7, 9, 8, 3, 2, 1])

/**
 * 希尔排序
 */
function shellSort(arr) {
  let incre = Math.floor(arr.length / 2)
  while (incre >= 1) {
    for (let i = incre; i < arr.length; i++) {
      let temp = arr[i]
       let j = i - incre
       for (j; j >= 0 && arr[j] > temp; j -= incre) {
          arr[j + incre] = arr[j]
       }
       arr[j + incre] = temp
    }
    incre = Math.floor(incre / 2)
  }
  return arr
}

shellSort([5, 6, 4, 7, 9, 8, 3, 2, 1])

/**
 * 快速排序
 */
function quickSort(arr) {
  if (isSorted(arr)) {
    return arr
  }
  let sign = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > sign) {
      const large = arr.splice(i, 1)[0]
      arr.push(large)
    }
    if (arr[i] < sign) {
      const small = arr.splice(i, 1)[0]
      arr.unshift(small)
    }
  }
  const signIndex = arr.indexOf(sign)
  const largeArr = quickSort(arr.splice(signIndex + 1))
  const smallArr = quickSort(arr.splice(0, signIndex))
  return smallArr.concat([sign], largeArr)
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true
}

quickSort([5, 6, 4, 7, 9, 8, 3, 2, 1])
