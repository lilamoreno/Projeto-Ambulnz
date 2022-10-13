import styled from "styled-components"
import RemoveShoppingCartTwoToneIcon from '@mui/icons-material/RemoveShoppingCartTwoTone';
import IconButton from '@mui/material/IconButton';

export const ContainerLi = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 0 1em ;

    
    
`

export function OrderItemCard(props) {
    const { pizza, removeFromCart } = props

    return (
        <ContainerLi>
            <p>
                Pizza {pizza.name}
                - {pizza.price.toLocaleString(
                    'pt-br',
                    { style: 'currency', currency: 'USD' }
                )}
                {" "} x {pizza.quantity}
            </p>
            <IconButton ar onClick={() => removeFromCart(pizza)}><RemoveShoppingCartTwoToneIcon/></IconButton>
        </ContainerLi>
    )
}

