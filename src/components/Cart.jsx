import { useState } from "react";
import "./cart.css";

import CartList from "./CartList";

export default function Cart({cart}) {
    const [visible, setVisible] = useState(false);

    return (
        <div class="cart">
            <div class="red-dot">{cart.length}</div>
            <div onClick={() => { setVisible(!visible) }}>&#128722;</div>
            {visible ? <CartList cart={cart} /> : null}
        </div>
    );
}
