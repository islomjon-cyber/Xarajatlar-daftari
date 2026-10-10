const elForm = document.querySelector(".my-form");
const elNomi = document.querySelector(".nomi");
const elNarx = document.querySelector(".nomi2");
const elKategoriya = document.querySelector(".nomi3");
const elList = document.querySelector(".list");
const jami = document.querySelector(".lenth");
const jamipul = document.querySelector(".jami-pul");
const maxPul = document.querySelector(".max-pul");

let data = [];

const icons = {
  "Oziq-ovqat": "shop.png",
  "Transport": "car.png",
  "Ta'lim": "study.png",
  "Boshqa": "wifi.png"
};

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  data.push({
    nomi: elNomi.value,
    narx: Number(elNarx.value),
    Kategoriya: elKategoriya.value
  });

  renderXarajat(data);
  updateStats();

  elForm.reset();
});

function renderXarajat(arr) {
  elList.innerHTML = "";

  const maxPrice = data.length > 0 ? Math.max(...data.map(item => Number(item.narx))) : 0;

  arr.forEach((mahsulot, index) => {
    const isMax = Number(mahsulot.narx) === maxPrice && maxPrice > 0;
    const iconImg = icons[mahsulot.Kategoriya] || "shop.png";

    elList.innerHTML += `
      <div class="item ${isMax ? 'item1' : ''}">
        <div class="left">
          <div class="icon1"><img src="${iconImg}" alt=""></div>
          <div class="info">
            <h4>${mahsulot.nomi}</h4>
            <div class="tags">
              <span class="tag1">${mahsulot.Kategoriya}</span>
              ${isMax ? '<span class="tag2">Eng katta xarajat</span>' : ''}
            </div>
            <h3>${Number(mahsulot.narx).toLocaleString()} so'm</h3>
          </div>
        </div>
        <button class="del" data-index="${index}" type="button">
          <img src="delete.png" alt="">
        </button>
      </div>`;
  });
}

elList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".del");

  if (deleteBtn) {
    const index = deleteBtn.dataset.index;
    data.splice(index, 1);
    renderXarajat(data);
    updateStats();
  }
});

function updateStats() {
  if (jami) jami.textContent = data.length;

  let total = 0;
  let max = 0;

  data.forEach((mahsulot) => {
    const price = Number(mahsulot.narx);
    total += price;
    if (price > max) max = price;
  });

  if (jamipul) jamipul.textContent = total.toLocaleString() + " so'm";
  if (maxPul) maxPul.textContent = max.toLocaleString() + " so'm";
}

const elFilterBtns = document.querySelectorAll(".filter");

elFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.textContent.trim();

    if (category === "Barchasi") {
      renderXarajat(data);
    } else {
      const filteredData = data.filter(
        (item) => item.Kategoriya === category
      );
      renderXarajat(filteredData);
    }
  });
});