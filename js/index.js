const productTitleInput = document.getElementById("productTitle");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const searchInput = document.getElementById("search");
const createBtn = document.getElementById("create");
const updateBtn = document.getElementById("update");
const titleMsg = document.getElementById("titleMsg");
const priceMsg = document.getElementById("priceMsg");
const categoryMsg = document.getElementById("categoryMsg");

// console.log( productCategoryInput , productPriceInput , productTitleInput );

// create read  delete search update   (validation)

let allProducts = [];
let currentIndex = 0;
if (localStorage.getItem("product")) {
  allProducts = JSON.parse(localStorage.getItem("product"));
  displayItems();
}

function addProduct() {
  if (
    validation(productTitleInput, titleMsg) &&
    validation(productPriceInput, priceMsg) &&
    validation(productCategoryInput, categoryMsg)
  ) {
    let product = {
      title: productTitleInput.value.trim(),
      price: productPriceInput.value,
      category: productCategoryInput.value.trim(),
    };
    allProducts.push(product);
    localStorage.setItem("product", JSON.stringify(allProducts));
    displayItems();
    clearInputs();
  }
}

function displayItems() {
  let cartona = "";
  for (let i = 0; i < allProducts.length; i++) {
    cartona += createCols(i);
  }

  document.getElementById("items").innerHTML = cartona;
}

function createCols(i) {
  return `<tr>
                <td> ${i + 1} </td>
                <td class="fw-medium"> ${allProducts[i].title} </td>
                <td> ${allProducts[i].price} </td>
                <td> ${allProducts[i].category} </td>
                <td class="update-btn">
                    <button class="btn rounded-pill text-white border-0 py-1 px-4" onclick="setUpdateItem(${i})">
                                    update
                    </button>
                </td>
                <td class="delete-btn">
                    <button class="btn rounded-pill text-white border-0 py-1 px-4" onclick="deleteItem( ${i} )">
                                    delete
                    </button>
                </td>
         </tr>`;
}

function clearInputs() {
  productTitleInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productTitleInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
}

function deleteItem(i) {
  allProducts.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(allProducts));
  displayItems();
}

function searchProduct() {
  let text = searchInput.value.trim();
  let cartona = "";
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].title.toLowerCase().includes(text.toLowerCase())) {
      cartona += createCols(i);
    }
  }

  document.getElementById("items").innerHTML = cartona;
}

function setUpdateItem(i) {
  currentIndex = i;
  productTitleInput.value = allProducts[i].title;
  productPriceInput.value = allProducts[i].price;
  productCategoryInput.value = allProducts[i].category;
  createBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateProduct() {
  if (
    validation(productTitleInput, titleMsg) &&
    validation(productPriceInput, priceMsg) &&
    validation(productCategoryInput, categoryMsg)
  ) {
    let product = {
      title: productTitleInput.value.trim(),
      price: productPriceInput.value,
      category: productCategoryInput.value.trim(),
    };
    allProducts.splice(currentIndex, 1, product);
    localStorage.setItem("product", JSON.stringify(allProducts));
    displayItems();
    createBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    clearInputs();
  }
}

function validation(element, msgId) {
  let text = element.value.trim();
  let regex = {
    productTitle: /^.{2,20}$/,
    productPrice: /^\d+(\.\d+)?$/,
    productCategory:
      /^(Phones|Ipads|Smart Watches|Electronic|Labtops|Tablets|Tv)$/,
  };
  let msg = msgId;
  if (regex[element.id].test(text)) {
    msgId.classList.add("d-none");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    msgId.classList.remove("d-none");
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}
