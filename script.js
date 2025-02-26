const offers = [
  {
    unit: 1,
    discount: "10% Off",
    price: "$10.00 USD",
    oldPrice: "$24.00 USD",
    popular: false,
  },
  {
    unit: 2,
    discount: "20% Off",
    price: "$18.00 USD",
    oldPrice: "$24.00 USD",
    popular: true,
    tag: "MOST POPULAR",
  },
  {
    unit: 3,
    discount: "30% Off",
    price: "$24.00 USD",
    oldPrice: "$24.00 USD",
    popular: false,
  },
];

function generateOfferBoxes() {
  const container = document.getElementById("offer-boxes");
  container.innerHTML = offers
    .map(
      (offer, index) => `
        <div class="box ${
          offer.popular ? "popular" : ""
        }" data-index="${index}">
            <label>
                <input type="radio" name="unit" ${
                  index === 1 ? "checked" : ""
                } />
                <div class="content">
                    <div class="left">
                        <div class="radio-circle"></div>
                        <div class="unit-info">
                            <div class="unit-discount">
                                <span class="unit">${offer.unit} Unit${
        offer.unit > 1 ? "s" : ""
      }</span>
                                <span class="discount">${offer.discount}</span>
                            </div>
                            ${
                              index === 0
                                ? `<span class="standard-price">Standard Price</span>`
                                : ""
                            }
                        </div>
                    </div>
                    <div class="price-container">
                        <span class="price">${offer.price}</span>
                        <p class="old-price">${offer.oldPrice}</p>
                    </div>
                </div>
            </label>
            ${offer.tag ? `<span class="tag">${offer.tag}</span>` : ""}
            <div class="options">${generateOptions()}</div>
        </div>
    `
    )
    .join("");

  attachEventListeners();
}

function generateOptions() {
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Black", "White", "Red", "Green", "Yellow"];

  return `
    <div class="option-header">
        <span>Size</span>
        <span>Colour</span>
    </div>
    ${[1, 2]
      .map(
        (num) => `
        <div class="row">
            <label>#${num}</label>
            <select class="size-dropdown">${sizes
              .map((size) => `<option>${size}</option>`)
              .join("")}</select>
            <select class="color-dropdown">${colors
              .map((color) => `<option>${color}</option>`)
              .join("")}</select>
        </div>
    `
      )
      .join("")}
  `;
}

function attachEventListeners() {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", function () {
      selectBox(this.dataset.index);
    });
  });
}

function selectBox(index) {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box, i) => {
    const options = box.querySelector(".options");
    const input = box.querySelector("input");

    if (i == index) {
      box.classList.add("popular", "expanded");
      input.checked = true;
      options.style.display = "flex";
    } else {
      box.classList.remove("popular", "expanded");
      options.style.display = "none";
    }
  });

  document.getElementById("total-price").innerText = offers[index].price;
}

// Initialize Offers
generateOfferBoxes();
