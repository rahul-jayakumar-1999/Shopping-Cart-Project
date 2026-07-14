function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

async function changeQuantity(cartID, productID, count) {
  try {
    let quantity = parseInt(
      document.getElementById(`cart-quantity-${productID}`).innerHTML,
    );

    count = parseInt(count);

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
      document.getElementById("total").innerHTML = formatINR(data.total);
      // alert("Product Removed");
    } else if (data.status) {
      console.log(data);
      console.log(data.status);

      document.getElementById(`cart-quantity-${productID}`).innerHTML =
        quantity + count;
 
        console.log("total", data.total);
      document.getElementById("total").innerHTML = formatINR(data.total);
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
      location.reload();
    }
  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
}
