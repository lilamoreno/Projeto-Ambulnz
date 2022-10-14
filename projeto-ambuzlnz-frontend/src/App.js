import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ModalSubmit } from "./components/ModalSubmit";
import { BASE_URL } from "./constants";
import GlobalStyle from "./globalStyles";
import { OrderSummary } from "./screens/OrdersSummary";
import { PizzasMenu } from "./screens/PizzasMenu";

export const ContainerMain = styled.main`
  display:grid;
  grid-template: 
    "header"
    "menuAndSummary"
  ;

  header {
    text-align: center;
    background-color: #1976d2;
    color: white;
    grid-area: header;
  }

  .menuAndSummary {
    grid-area: menuAndSummary;
    display: grid;
    grid-template-columns:2fr 1fr;
    gap:1em
  }    
`


function App() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [orderSubmit, setOrderSubmit] = useState({
    isActive: false,
    summary: {
      id: null,
      pizzas: null,
      total: null
    }
  })

  useEffect(() => {
    calculateTotal()
  }, [cart])

  const addToCart = (pizzaToAdd) => {
    const foundIndex = cart.findIndex((pizzaInCart) => {
      return pizzaInCart.name === pizzaToAdd.name
    })
    if (foundIndex >= 0) {
      const newCart = [...cart]
      newCart[foundIndex].quantity += 1

      setCart(newCart)
    } else {
      const newCart = [...cart]
      const newPizza = {
        name: pizzaToAdd.name,
        price: pizzaToAdd.price,
        quantity: 1
      }
      newCart.push(newPizza)

      setCart(newCart)
    }
  }

  const removeFromCart = (pizzaToRemove) => {
    if (pizzaToRemove.quantity > 1) {
      const newCart = cart.map((pizza) => {
        if (pizza.name === pizzaToRemove.name) {
          pizza.quantity -= 1
        }
        return pizza
      })
      setCart(newCart)
    } else {
      const newCart = cart.filter((pizza) => {
        return pizza.name !== pizzaToRemove.name
      })
      setCart(newCart)
    }
  }


  const calculateTotal = () => {
    const total = cart.reduce(
      (acc, item) => acc + (item.price * item.quantity),
      0
    )

    setTotal(total)
  }

  const submitOrder = async () => {
    try {
      const body = {
        pizzas: cart
      }
      const res = await axios.post(`${BASE_URL}/orders`, body)

      setOrderSubmit(
        {
          isActive: true,
          summary: res.data.order
        })
      setCart([])

    } catch (err) {
      console.log(err);
    }
  }

  const closeSubmit = () => {
    setOrderSubmit({
      isActive: false,
      summary: {
        id: null,
        pizzas: null,
        total: null
      }
    })
  }

  return (
    <ContainerMain>
      <header>
        <h1>Faça seu Pedido</h1>
      </header>
      <section className="menuAndSummary">

        <PizzasMenu
          className="pizzaMenu"
          addToCart={addToCart}
        />
        <OrderSummary
          className="orderSummary"
          cart={cart}
          removeFromCart={removeFromCart}
          total={total}
          submitOrder={submitOrder}
        />
      </section>
      {orderSubmit.isActive
        && <ModalSubmit
          order={orderSubmit.summary}
          closeSubmit={closeSubmit}
        />
      }
      <GlobalStyle />
    </ContainerMain>
  );
}

export default App;
