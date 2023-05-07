import '../style/AccountStatement.css'

interface props {
  accountType : string
  accountId : string
  balance : number
  balanceStatus : string
}

function AccountStatement({accountType, accountId, balance, balanceStatus} : props){
 return(
    <article className='statement-container'>
      <div className='statement-datas'>
        <h3 className='account-title'>Argent Bank {accountType} ({accountId})</h3>
        <p className='account-balance'>${balance}</p>
        <p className='account-status'>{balanceStatus}</p>
      </div>
      <button>View Transactions</button>
    </article>
 )
}

export default AccountStatement