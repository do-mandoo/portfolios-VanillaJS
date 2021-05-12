const listItems = [
  'item 1',
  'item 2',
  'item 3',
  'item 4',
  'item 5',
  'item 6',
  'item 7',
  'item 8',
  'item 9',
  'item 10',
  'item 11',
  'item 12',
  'item 13',
  'item 14',
  'item 15',
  'item 16',
  'item 17',
  'item 18',
  'item 19',
  'item 20',
  'item 21',
  'item 22',
  'item 23'
];

const $list = document.querySelector('.list');
const $pagenumbers = document.querySelector('.pagenumbers');

let currentPage = 1;
const rows = 6;

function DisplayList(items, wrapper, rowPage, page) {
  wrapper.innerHTML = '';

  // page--; // 매개변수를 임의로 변경하면 안된다. 그래서 밑줄이 그어진 것.
  const zeroPage = page - 1;

  const start = rowPage * zeroPage; // 5
  const end = start + rowPage; // 10

  // start변수 (const start = 0 * rowPage * page;)에 0을 곱하지 않으면 인덱스5인 item 6부터 가져오게 된다.
  // start인 0번째 인덱스에서부터 end인 5번째 인덱스 전까지의 요소를 가져온다.
  // pagination 할때마다 항상 0부터5번째 전까지의 인덱스 요소만 갖고오게 된다.
  const paginationItems = items.slice(start, end);

  for (let i = 0; i < paginationItems.length; i++) {
    const item = paginationItems[i];
    const itemElement = document.createElement('div');

    itemElement.classList.add('item');
    itemElement.textContent = item;

    wrapper.appendChild(itemElement);
  }
}

function PaginationButton(page, items) {
  const $button = document.createElement('button');
  $button.textContent = page;
  if (currentPage === page) $button.classList.add('active');
  $button.addEventListener('click', () => {
    currentPage = page;
    DisplayList(items, $list, rows, currentPage);
    const currentBtn = document.querySelector('.pagenumbers button.active');
    currentBtn.classList.remove('active');
    $button.classList.add('active');
  });
  return $button;
}

function MakePagination(items, wrapper, rowPage) {
  wrapper.innerHTML = '';

  const pageCount = Math.ceil(items.length / rowPage);

  for (let i = 1; i < pageCount + 1; i++) {
    const button = PaginationButton(i, items);

    wrapper.appendChild(button);
  }
}

DisplayList(listItems, $list, rows, currentPage);
MakePagination(listItems, $pagenumbers, rows);
