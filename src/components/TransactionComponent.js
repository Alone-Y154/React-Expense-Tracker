import { useEffect, useState } from "react";
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Montserrat', sans-serif;
    padding: 10px 22px;
    width: 100%;
    font-size: 18px;
    gap: 10px;
    font-weight:bold;

    & input {
        outline: none;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid #e6e8e9;
        background: #e6e8e9;
        width: 100%;

    }
`;

const Cell = styled.div`
    display: flex;
    flex-directiom: row;
    padding: 10px 15px;
    border-radius: 2px;
    align-items: center;
    font-weight: normal;
    justify-content: space-between;
    font-size: 14px;
    border: 1px solid #e6e8e9;
    border-right: 4px solid ${(props) => (props.isExpense? "red" : "green")};
    width: 100%;
   


`;

 const TransactionCell = (props) => {
    return(
        <Cell isExpense ={props.payload?.type === "EXPENSE"}>
            <span>{props.payload.desc}</span>
            <span>₹ {props.payload.amount}</span>

        </Cell>
    )
 }

 const TransactionComponent = (props) => {
    const [filteredTxn, updatedTxn] = useState(props.transaction);
    const [searchText, updatedSearchText] = useState("");
    const filterData = () => {
        if(!searchText || !searchText.trim().length) {
            updatedTxn(props.transaction);
            return;
        }

        let txn = [...props.transaction];
        txn = txn.filter((payload) => 
        payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
        );
        updatedTxn(txn);

    }

    useEffect(() => filterData(searchText),[props.transaction]);
    return(
        <Container>
            Transaction
            <input placeholder="Search" value={searchText} onChange={(e) => {updatedSearchText(e.target.value)
            filterData(e.target.value);
            }}/>
            {filteredTxn.length ? filteredTxn.map((payload)=> <TransactionCell payload={payload}/>):""}
        </Container>
    )
}

export default TransactionComponent;