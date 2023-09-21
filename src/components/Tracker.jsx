import classes from './Tracker.module.css'
import { useState } from 'react';


const Tracker = () => {
  const [text, setText] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);
  
  const deleteHandler = (indexed) => {
    const newList = transactions.filter((trans, index) => indexed !== index);
    setTransactions(newList)
    
  }
  
  const income = transactions.filter((transaction) => transaction.amount > 0)
                 .reduce((total, transaction) => total + (+transaction.amount), 0);
  const expense = transactions.filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + (+transaction.amount), 0);
  
  
  const submitHandler = (e) => {
    e.preventDefault();
    const transaction = {
      text: text,
      amount: +amount
    }
    if (transaction.text === '' || transaction.amount === 0)
    {
      return;
      }
    
    setTransactions([...transactions,transaction])
    setText('');
    setAmount(0);
  }
  return (
    <div className={classes.box}>
      <div className={classes.totalamt}>
        <h5>YOUR BALANCE </h5>
        <h2>${transactions.reduce((total, transaction) => total + (+transaction.amount), 0)}</h2>
      </div>
      <div className={classes.in}>
       <div className={classes.income}>
        <h5>INCOME </h5> 
          <h3>${income}</h3>
        </div>
        <div className={classes.bor}></div>
       <div className={classes.expense}>
        <h5>EXPENSE </h5> 
        <h3>${expense}</h3>
       </div>
      </div>
      <div className={classes.history}>
        <h3>History</h3>
        
        <div className={classes.exp}>
          {transactions.map((transaction, index) => {
            return (
              <div className={classes.l} key={index}>
              <div className={classes.cross} onClick={()=> deleteHandler(index)}>X</div>
                <div className={classes.t}>
                  <div className={classes.text}>{transaction.text}</div> 
                  <div className={classes.amount}>{transaction.amount}</div>
                  </div>
                {transaction.amount > 0 ?
                  <div className={classes.line}></div> : <div className={classes.r}> </div>}
                
                </div>
            )
          })}
          
        </div>
        
      </div>
      <form onSubmit={submitHandler} className={classes.trans}>
        <h3>Add new transaction text</h3>
        <h5>Text</h5>
        <input type='text' value={text} onChange={e=> setText(e.target.value)} placeholder='Enter the text'></input>
        <h5>Amount
          (negative - expenses, positive - income)</h5>
        <input  type='number' value={amount} onChange={e => setAmount(e.target.value) } placeholder='Enter the amount'></input>
        <div className={classes.submit}>
           <button type='submit' >Add Transaction</button> 
        </div>
      </form>

  </div>
)
}

export default Tracker;