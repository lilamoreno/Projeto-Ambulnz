import styled from "styled-components"
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import { Button } from "@mui/material";

export const ContainerLi = styled.li`
    background-color: #F2F2F2;
    margin: 1em;
    width: 13em;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3,
    .card-price {
        text-align: center;
    }

    span {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
`

export function PizzaCard(props) {
    const { pizza, addToCart } = props

    return (
        <ContainerLi>
            <h3>{pizza.name}</h3>
            <p className="card-price">
                {pizza.price.toLocaleString(
                    'pt-br',
                    { style: 'currency', currency: 'USD' }
                )}
            </p>
            <p>
                {pizza.ingredients.map((item) => {
                    return (
                        <span key={item}>{`${item.toUpperCase()} `}</span>
                    )
                })}
            </p>
            <Button variant="contained" disableElevation onClick={() => addToCart(pizza)}><AddShoppingCartTwoToneIcon/></Button>
        </ContainerLi>
    )
}

