const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', saveBookmark);
document.addEventListener('DOMContentLoaded', fetchBookmarks);

function saveBookmark(e) {
  e.preventDefault();
  let name = document.querySelector('#siteName').value;
  let url = document.querySelector('#siteUrl').value;

  if (!validation(name, url)) {
    return false;
  }

  let bookmark = {
    name,
    url,
  };

  if (localStorage.getItem('bookmark') === null) {
    let bookmarks = [];
    bookmarks.push(bookmark);
    // set to local storage
    localStorage.setItem('bookmark', JSON.stringify(bookmarks));
  } else {
    // get from local storage
    let bkMarks = JSON.parse(localStorage.getItem('bookmark'));
    // add bookmark to array
    bkMarks.push(bookmark);
    // reset back to localstorage
    localStorage.setItem('bookmark', JSON.stringify(bkMarks));

    fetchBookmarks();
  }
  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
  // get from local storage
  let bkMarks = JSON.parse(localStorage.getItem('bookmark'));
  let res = '';

  for (let i = 0; i < bkMarks.length; i++) {
    res += `
        <div class="card card-body bg-light mb-3">
            <h3>${bkMarks[i].name}
            <a class="btn btn-success" target="_blank" href="${bkMarks[i].url}">Visit</a>
            <button onclick=deleteBookmark("${bkMarks[i].url}") class="btn btn-danger delete">Delete</button>
            </h3>
        </div>
    `;
  }
  document.querySelector('#bookmarksResults').innerHTML = res;

  document.querySelector('#siteName').value = '';
  document.querySelector('#siteUrl').value = '';
}

// delete bookmark
function deleteBookmark(url) {
  let bkMarks = JSON.parse(localStorage.getItem('bookmark'));
  for (let i = 0; i < bkMarks.length; i++) {
    if (bkMarks[i].url == url) {
      bkMarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmark', JSON.stringify(bkMarks));
  fetchBookmarks();
}

function validation(name, url) {
  if (!name || !url) {
    alert`please fill in the form`;
    return false;
  }

  const validUrl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  if (!url.match(validUrl)) {
    alert`please use valid url`;
    return false;
  }

  return true;
}

// dynamique clock
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.year').textContent = new Date().getFullYear();
});
