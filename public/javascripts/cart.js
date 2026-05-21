async function changeQuantity(cartID, productID, count) {
  try {
    let quantity = parseInt(
      document.getElementById(`cart-quantity-${productID}`).innerHTML,
    );

    count = parseInt(count);
    console.log(quantity);

    const response = await fetch(`/change-product-quantity`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartID: cartID,
        productID: productID,
        count: count,
        quantity: quantity,
      }),
    });

    const data = await response.json();

    if (data.removeProduct) {
      document.getElementById(`row-${productID}`).remove();

      // alert("Product Removed");
    } else if (data.status) {
      document.getElementById(`cart-quantity-${productID}`).innerHTML =
        quantity + count;
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

    if (data.removeProduct) {
      document.getElementById(`row-${productID}`).remove();
    }
  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
}
