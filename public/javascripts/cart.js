window.addEventListener("DOMContentLoaded", function () {
  // set minus button state on page load
  document.querySelectorAll("[id^='cart-quantity-']").forEach((el) => {
    const productID = el.id.replace("cart-quantity-", "");
    const qty = parseInt(el.innerText);

    const minusBtn = document.getElementById("minus-btn-" + productID);

    if (minusBtn) {
      minusBtn.style.display = qty <= 1 ? "none" : "inline-block";
    }
  });
});
async function changeQuantity(cartID, productID, count) {
  try {
    const response = await fetch(`/change-product-quantity`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartID: cartID,
        productID: productID,
        count: count,
      }),
    });

    const data = await response.json();

    if (data.status) {
      const qtyEl = document.getElementById("cart-quantity-" + productID);
      const minusBtn = document.getElementById("minus-btn-" + productID);

      // update quantity safely
      if (qtyEl) {
        qtyEl.innerText = data.quantity;
      }

      // show/hide minus button
      if (minusBtn) {
        minusBtn.style.display = data.quantity <= 1 ? "none" : "inline-block";
      }
    }
  } catch (error) {
    console.error("ERROR" + error);
  }
}

async function deleteProduct(cartID, productID) {
  try {
    const response = await fetch("/delete-cart-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartID,
        productID,
      }),
    });

    const data = await response.json();

    if (data.status) {
      // remove row from table instantly
      const row = document.getElementById("row-" + productID);
      if (row) {
        row.remove();
      }
    }
  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
}
