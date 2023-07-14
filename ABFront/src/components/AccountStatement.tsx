import '../style/AccountStatement.css'
import Formatter from '../services/formaters'

interface props {
  accountType : string
  accountId : string
  balance : string
  balanceStatus : string
  mode : string
}

function AccountStatement({accountType, accountId, balance, balanceStatus, mode} : props){
 return(
    <article className={mode === "edit" ? 'statement-container statement-container-editborders' : 'statement-container'}>
      <div className='statement-datas'>
        <h3 className='account-title'>Argent Bank {accountType} ({accountId})</h3>
        <p className='account-balance'>${Formatter.amountWithColons(balance)}</p>
        <p className='account-status'>{balanceStatus}</p>
      </div>
      <button className={mode === "edit" ? 'purple-btn' : 'green-btn'}>View Transactions</button>
    </article>
 )
}

export default AccountStatement