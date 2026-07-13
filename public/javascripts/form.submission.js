document
  .getElementById("check-out-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch("/place-order", {
        method: "Post",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        if (data.paymentMethod === "ONLINE") {
          window.location.href = data.url;
        } else {
          window.location.href = "/order-success";
        }
      } else {
        alert("failed to place order");
      }
    } catch (error) {
      console.error(error);
    }
  });
