const listItems = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
  'Item 11',
  'Item 12',
  'Item 13',
  'Item 14',
  'Item 15',
  'Item 16',
  'Item 17',
  'Item 18',
  'Item 19',
  'Item 20',
  'Item 21',
  'Item 22'
];

const listElement = document.getElementById('list');
const paginationElement = document.getElementById('pagination');

let currentPage = 1;
const rows = 5;

function DisplayList(items, wrapper, rowPerPage, page) {
  wrapper.innerHTML = '';
  // page--;

  const start = rowPerPage * page;
  console.log(start);
  const end = start + rowPerPage;
  console.log(end);
  const paginatedItems = items.slice(start, end);

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < paginatedItems.length; i++) {
    const item = paginatedItems[i];

    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.textContent = item;

    fragment.appendChild(itemElement);
  }
  wrapper.appendChild(fragment);
}

function PaginationButton(page, items) {
  const button = document.createElement('button');
  button.textContent = page;

  if (currentPage === page) button.classList.add('active');

  button.addEventListener('click', () => {
    currentPage = page;
    DisplayList(items, listElement, rows, currentPage);

    const currentBtn = document.querySelector('.pagenumbers button.active');
    currentBtn.classList.remove('active');

    button.classList.add('active');
  });

  return button;
}

function SetupPagination(items, wrapper, rowPerPage) {
  wrapper.innerHTML = '';

  const pageCount = Math.ceil(items.length / rowPerPage);
  for (let i = 1; i < pageCount + 1; i++) {
    const btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

DisplayList(listItems, listElement, rows, currentPage);
SetupPagination(listItems, paginationElement, rows);
