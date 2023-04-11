const searchArray = [3,7,1,9,4,10,2,5,13,8,15,14,6,11];
let sortedArray = searchArray.slice();
sortedArray.sort((a,b) => a-b);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15];
let count = 0;
function simpleSearch(arr, el) {
   for (let i=0; i<arr.length; i++) {
      count += 1;
      if (arr[i] === el) {
         return i;
      }
   }
   return null;
}

function binarySearch(arr, el) {
   let start = 0;
   let last = arr.length;
   let middle;
   let find = false;
   let findInd;
   while (find === false && start <= last) {
      count += 1;
      middle = Math.floor((start + last) / 2);
      if (arr[middle] === el) {
         find = true;
         findInd = middle;
         return findInd;
      }
      if (arr[middle] < el) {
         start = middle+1;
      } else last = middle-1;
   }
   return findInd||null;
}

function binarySearchRecur(arr, el, start, last) {
   let middle = Math.floor((start + last) / 2);
   console.log(el, start,middle,last)
   count += 1;
   if (el === arr[middle]) {
      return middle;
   }
   if (el < arr[middle]) {
      return binarySearchRecur(arr, el, start, middle - 1);
   } else {
    return binarySearchRecur(arr, el, middle + 1, last);
   }
}

function takeSort(arr) {
   for (let i=0; i<arr.length; i++) {
      let elemInd = i;
      for (let j=i+1; j<arr.length; j++) {
         if (arr[j] < arr[elemInd]) {
            count += 1;
            elemInd = j;
         }
      }
      let tmp = arr[i];
      arr[i] = arr[elemInd];
      arr[elemInd] = tmp;
   }
   return arr;
}

function bubbleSort(arr) {
   for (let i=0; i<arr.length-1; i++) {
      for (let j=0; j<arr.length-1-i; j++) {
         count +=1;
         if (arr[j] > arr[j+1]) {
            let tmp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = tmp;
         }
      }
   }
   return arr;
}

function quickSort(arr) {
   if (arr.length <= 1) return arr;
   let less = [];
   let more = [];
   let seredina = Math.floor(arr.length/2);
   let srdElement = arr[seredina];
   for (let i=0; i<arr.length; i++) {
      count += 1;
      if (i === seredina)
         continue;
      if (arr[i] < srdElement) {
         less.push(arr[i]);
      } else more.push(arr[i]);
   }
   return [...quickSort(less), srdElement, ...quickSort(more)];
}
function quickSortTehn(arr) {
   if (arr.length == 0) return [];
   let less = [];
   let biger = [];
   let baseElement = arr[0];
   for (let i=1; i<arr.length; i++) {
      count ++;
      if (arr[i] < baseElement) {
         less.push(arr[i]);
      } else {
         biger.push(arr[i]);
      }
   }
   return quickSortTehn(less).concat(baseElement, quickSortTehn(biger));
}

// console.log(Math.floor(Math.random()*100));

// function getCommentsByPostId(commentList, postId) {
//    console.log(`\nGet all comments for post with id = ${postId}:`);

//    let comments = commentList
//      .filter( comment => comment.postId === postId )
//      .map( comment => comment.text );

//    console.log('  comments:', comments);
//  }

//  function getAuthorNames(commentList) {
//    console.log('\nGet author names:');

//    let authors = commentList
//      .map( comment => comment.author )
//      .filter( (author, index, currentList) =>
//        currentList.findIndex( item => item.id === author.id ) === index
//      )
//      .map( author => author.name );

//    console.log('  authors:', authors);
//  }

//  function getAuthorsStatistics(commentList) {
//    console.log('\nGet authors statistics: <AuthorID, CommentCount>');

//    let statistics = commentList
//      .map( comment => comment.author.id )
//      .reduce( (dict, item) => {
//        dict[item] = (dict[item] || 0) + 1;
//        return dict;
//      }, {});

//    console.log('  statistics:', statistics);
//  }


//  console.log('s01e07 - Array Bypass');

 let commentList = [
   {
     id: '#com1',
     author: { id: '#aut1', name: 'John Doe'},
     text: 'Xyinia!',
     postId: '#post1',
   },
   {
     id: '#com2',
     author: { id: '#aut1', name: 'John Doe'},
     text: 'Cool!',
     postId: '#post2',
   },
   {
     id: '#com3',
     author: { id: '#aut2', name: 'Anthony Hopkins'},
     text: 'Nice comment, John! :)',
     postId: '#post1',
   },
   {
     id: '#com4',
     author: { id: '#aut1', name: 'John Doe'},
     text: 'Thanks!',
     postId: '#post1',
   },
 ];

 console.log('\n[commentList]:');
 commentList.forEach( comment => console.log(comment) );

 function getCommentsByPostId(commentList, pId) {
   let comments = commentList.filter(object => object.postId === pId).map(comment => comment.text);
   console.log('Come: ', comments);
 }

 getCommentsByPostId(commentList, '#post1');

 function getAuthorNames(commentList) {
   let autors = commentList.map(comment => comment.author)
   .filter((autor, index, commentList) => commentList.findIndex(item => item.id === autor.id) === index)
   .map(autor => autor.name);
   console.log("ASAS: ", autors);
 }

 getAuthorNames(commentList);
 // getAuthorsStatistics(commentList);

console.log(quickSortTehn(searchArray), count);

const matrix = [
   [1,2,3,4],
   [5,6,7,8],
   [9,0,3,5],
   [2,4,6,0]
];

function sumArray(arr) {
   // let count = 0;
   // let res = [];
   for (let i=0; i<arr.length; i++) {
      for (let j=0; j<arr[i].length; j++) {
         count += 1;
         let napr = i%2===0 ? j : (arr.length-1)-j;
         console.log(arr[i][napr])
      }
   }
}
sumArray(matrix);