import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./Button";
import Error from "./Error";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../ult/formatting";
import useHttp from "../hook/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd);

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    );
  }

  let actions = (
    <>
      <Button textOnly={true} type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <p>Sending data order...</p>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success!</h2>
        <p>Your order has been submited successfully!</p>
        <p>
          We will get back to you with more details via the meail within the
          next few minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount : {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="street" id="street" />
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code" />
          <Input label="City" type="city" id="city" />
        </div>
        {error && <Error title="Failed to send order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
