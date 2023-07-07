import { useState } from "react";
import styled from "styled-components";


 const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 margin: 10px;
 font-family: 'Montserrat', sans-serif;
 width: 100%;
`

const BalanceBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight:  bold;
    width: 100%;
`
 
const AddTransaction = styled.div`
    background: black;
    color: white;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    ${'' /* font-weight:  bold; */}
    font-size: 15px;
`
const AddTransactionContainer = styled.div`
    display: flex;
    flex-direction: column;
    ${'' /* font-weight:  bold;
    font-size: 15px; */}
    border: 1px solid #e6e8e9;
    gap: 10px;
    width: 100%;
    padding: 15px 20px;
    margin: 20px;
    text-align:center;
    & input {
        outline: none;
        padding: 10px 12px;
        border-radius: 4px;
        border: 1px solid #e6e8e9;
    }
`

const RadioBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;

    & input {
        width: unset;
        margin: 0 10px;
    }

`
const ExpenseContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin: 20px;
`
const ExpenseBox = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
    padding: 15px 20px;
    width: 135px;
    font-size: 12px;


    & span {
        font-weight: bold;
        font-size: 20px;
        color: ${props => props.isIncome ? 'green':'red'}
    }
`



const AddTxnView = (props) => {

    const [amount, setAmount] = useState();
    const [desc, setDesc] = useState();
    const [type, setType] = useState("EXPENSE");
    const addTransaction = () => {
        props.addTransaction({amount: Number(amount), desc , type,id:Date.now()})
        console.log({amount, desc , type});
        props.toggleAddTxn();

    }
    return (
        <AddTransactionContainer>
            <input placeholder="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
           
            <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}/>
            <RadioBox>
                <input type="radio" onChange={(e) => setType(e.target.value)} id="expense" name="type" value="EXPENSE" checked = {type === "EXPENSE"}/>
                <label htmlFor="expense">Expense</label>
                <input type="radio" onChange={(e) => setType(e.target.value)}  name="type" value="INCOME" checked = {type === "INCOME"}/>
                <label htmlFor="income">Income</label>
            </RadioBox>
            <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
        </AddTransactionContainer>
    )
}

 const OverviewComponent = (props) => {
    const [isAddTxnVisible, toggleAddTxn] = useState(false);
    return(
        <Container>
        <BalanceBox>
            Balance: ₹{props.income - props.expense}
            <AddTransaction onClick={() => toggleAddTxn(!isAddTxnVisible)}>
            {isAddTxnVisible ? "Cancel" : "Add"} 
            </AddTransaction>
        </BalanceBox>

        {isAddTxnVisible && <AddTxnView toggleAddTxn = {toggleAddTxn} addTransaction={props.addTransaction}/>}
        
        <ExpenseContainer>
            <ExpenseBox isIncome = {false}>
                Expense <span> ₹{props.expense}</span>
            </ExpenseBox>
            <ExpenseBox isIncome={true}>
                Income  <span> ₹{props.income}</span>
            </ExpenseBox>
        </ExpenseContainer>
        </Container>
    )
}

export default OverviewComponent;