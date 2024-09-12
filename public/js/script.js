document.addEventListener('DOMContentLoaded', () => {
  fetchAllTivis();
  fetchNhomTivis();

  document.getElementById('filterForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('searchName').value;
      const minPrice = document.getElementById('minPrice').value;
      const maxPrice = document.getElementById('maxPrice').value;
      const nhomTivi = document.getElementById('nhomTivi').value;
      const status = document.getElementById('status').value;

      const response = await fetch(`/api/tivi/filter?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&nhomTivi=${nhomTivi}&status=${status}`);
      const data = await response.json();
      displayTivis(data);
  });
});

async function fetchAllTivis() {
  const response = await fetch('/api/tivi/all');
  const data = await response.json();
  displayTivis(data);
}

async function fetchNhomTivis() {
  const response = await fetch('/api/tivi/nhom-tivi');
  const data = await response.json();
  const select = document.getElementById('nhomTivi');
  data.forEach(nhom => {
      const option = document.createElement('option');
      option.value = nhom.Ma_so;
      option.textContent = nhom.Ten;
      select.appendChild(option);
  });
}

function displayTivis(tivis) {
  const resultsBody = document.getElementById('results');
  resultsBody.innerHTML = tivis.map(tv => `
      <tr>
          <td>${tv.Ten}</td>
          <td>${tv.Don_gia_Ban.toLocaleString()} VND</td>
          <td>${tv.Nhom_Tivi.Ten}</td>
          <td class="${tv.Trang_thai_Con_hang ? 'in-stock' : 'out-of-stock'}">
              ${tv.Trang_thai_Con_hang ? 'In Stock' : 'Out of Stock'}
          </td>
      </tr>
  `).join('');
}
