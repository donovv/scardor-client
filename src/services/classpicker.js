import makeRequest from './api';

/* eslint-disable */
function rater(pickorder, criteria, searchvalue, currentarray) {
  const workingarray = currentarray;
  const keyinputinverse = { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 };
  workingarray.forEach((char) => {
    let temprating = 0;
    let ratingcount = 0;
    if (criteria.includes('/')) {
      const [searcharea, searchkey] = criteria.split('/');
      if (searcharea === 'mobbing') {
        pickorder = pickorder.filter((item) => item !== 'bossing');
        criteria = searchkey;
      }
      if (searcharea === 'bossing') {
        pickorder = pickorder.filter((item) => item === 'bossing');
        criteria = searchkey;
      }
    }
    if (Array.isArray(criteria)) {
      criteria.forEach((element) => {
        pickorder.forEach((pick, i) => {
          const multi = (i + 1) * 0.5;
          const searcharea = (pick.includes('/')) ? pick.split('/') : pick;
          if (Array.isArray(searcharea)) {
            if (char[searcharea[0]][searcharea[1]][element] === null || char[searcharea[0]][searcharea[1]][element] === undefined) return;
            temprating += (element === 'keyinput') ? keyinputinverse[char[searcharea[0]][searcharea[1]][element]] * (searchvalue * multi) : char[searcharea[0]][searcharea[1]][element] * (searchvalue * multi)
            ratingcount++
            return
          }
          if (char[searcharea][element] === null || char[searcharea][element] === undefined) return
          temprating += (element === 'keyinput') ? keyinputinverse[char[searcharea][element]] * (searchvalue * multi) : char[searcharea][element] * (searchvalue * multi)
          ratingcount++
        })
      })
    } else {
      pickorder.forEach((pick, i) => {
        const multi = (i + 1) * .5
        const searcharea = (pick.includes('/')) ? pick.split('/') : pick
        if (Array.isArray(searcharea)) {
          if (char[searcharea[0]][searcharea[1]][criteria] === null || char[searcharea[0]][searcharea[1]][criteria] === undefined) return
          temprating += (criteria === 'keyinput') ? keyinputinverse[char[searcharea[0]][searcharea[1]][criteria]] * (searchvalue * multi) : char[searcharea[0]][searcharea[1]][criteria] * (searchvalue * multi)
          ratingcount++
          return
        }
        if (char[searcharea][criteria] === null || char[searcharea][criteria] === undefined) return
        temprating += (criteria === 'keyinput') ? keyinputinverse[char[searcharea][criteria]] * (searchvalue * multi) : char[searcharea][criteria] * (searchvalue * multi)
        ratingcount++
      })
    }
    char.rating += Math.floor(temprating / ratingcount)
  })
  return workingarray
};

export default async function classPicker(ctype, playertype, criteria) {
  // eslint-disable-next-line
  // let classes = await makeRequest('/maple-classes/?$select[]=_id&$select[]=classname&$select[]=mid&$select[]=early&$select[]=mobbing&$select[]=bossing&$select[]=rating&$select[]=classtype&$limit=50', {
  let classes = await makeRequest('/maple-classes/?$limit=50', {
  headers: { 'Access-Control-Allow-Origin': '*' },
  })
  classes = classes.data;
  if (ctype === undefined || playertype === undefined) return;
  const { essentials, important, useful, optional, undesireable } = criteria;
  let order;
  if (ctype === 'main') {
    switch (playertype) {
      case 'casual':
        order = ['bossing', 'mobbing/end', 'mobbing/late', 'early', 'mid'];
        break
      case 'tryhard':
        order = ['early', 'mid', 'mobbing/end', 'mobbing/late', 'bossing'];
        break
      case 'gamer':
        order = ['early', 'mid', 'mobbing/late', 'mobbing/end', 'bossing'];
        break
      default :
        order = ['bossing', 'mobbing/end', 'mobbing/late', 'early', 'mid'];
        break
    }
  }
  let rating = classes;
  essentials.forEach((essential) => {
    rating = rater(order, essential.value, 10, rating);
  })
  important.forEach((essential) => {
    rating = rater(order, essential.value, 7, rating);
  })
  useful.forEach((essential) => {
    rating = rater(order, essential.value, 5, rating);
  })
  optional.forEach((essential) => {
    rating = rater(order, essential.value, 2, rating);
  })
  undesireable.forEach((essential) => {
    rating = rater(order, essential.value, -1, rating);
  })
  let sorted = rating.sort((a, b) => (b.rating / 100) - (a.rating / 100));
  console.log(sorted);
  return sorted;
};
