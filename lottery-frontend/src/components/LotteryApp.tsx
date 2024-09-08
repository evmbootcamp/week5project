import React, { useState } from 'react';
import { useLottery } from './../hooks/useLottery';

const LotteryApp = () => {
  const {
    checkState,
    openBets,
    buyTokens,
    placeBet,
    closeBets,
    checkPrize,
    claimPrize,
    withdrawTokens,
    burnTokens,    
  } = useLottery();

  const [duration, setDuration] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [accountIndex, setAccountIndex] = useState<string>('0');
  const [betAmount, setBetAmount] = useState<string>('1');

  return (
    <div>
      <div>
        <button onClick={checkState}>Check Lottery State</button>
      </div>
      <div>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration in seconds"
        />
        <button onClick={() => openBets(duration)}>Open Bets</button>
      </div>
      <div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount of tokens"
        />
        <input
          type="text"
          value={accountIndex}
          onChange={(e) => setAccountIndex(e.target.value)}
          placeholder="Account index"
        />
        <button onClick={() => buyTokens(accountIndex, amount)}>Buy Tokens</button>
      </div>
      <div>
        <input
          type="text"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Bet amount"
        />
        <button onClick={() => placeBet(accountIndex, betAmount)}>Place Bet</button>
      </div>
      <div>
        <button onClick={closeBets}>Close Bets</button>
      </div>
      <div>
        <input
          type="text"
          value={accountIndex}
          onChange={(e) => setAccountIndex(e.target.value)}
          placeholder="Account index"
        />
        <button onClick={() => checkPrize(accountIndex)}>Check Prize</button>
      </div>
      <div>
        <button onClick={() => claimPrize(accountIndex)}>Claim Prize</button>
      </div>
      <div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Withdraw amount"
        />
        <button onClick={() => withdrawTokens(amount)}>Withdraw Tokens</button>
      </div>
      <div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Burn amount"
        />
        <button onClick={() => burnTokens(accountIndex, amount)}>Burn Tokens</button>
      </div>
      {/* <div>
        <p>Lottery Contract Address: {contractAddress}</p>
        <p>Token Contract Address: {tokenAddress}</p>
      </div> */}
    </div>
  );
};

export default LotteryApp;
