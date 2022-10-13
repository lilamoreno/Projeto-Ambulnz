import styled from "styled-components"
import { OrderItemCard } from "../components/OrderItemCart"
import Button from '@mui/material/Button';

export const ContainerSection = styled.section`
    width: 30em;
    background-color: #F2F2F2;
    

    h1 {
        font-size: 1.5em;
        text-align: center;
    }

    h2 {
        text-align: center;
    }
    
        
`

export function OrderSummary(props) {
    const { cart, removeFromCart, total, submitOrder } = props



    return (
        <ContainerSection>
            <h1>Resumo do pedido</h1>

            {cart.map((pizza) => {
                return (
                    <OrderItemCard
                        key={pizza.name}
                        pizza={pizza}
                        removeFromCart={removeFromCart}
                    />
                )
            })}

            <h2>
                Total: {total.toLocaleString(
                'pt-br',
                { style: 'currency', currency: 'USD' }
                )}
            </h2>
            <Button variant="contained" disableElevation onClick={submitOrder}>Confirmar pedido</Button>
        </ContainerSection>
    )
}