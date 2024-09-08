import { getContract, parseEther } from 'viem';
import { publicClient, walletClient } from "./../utils/viemClient";
import { abi } from "./../../../artifacts/contracts/Lottery.sol/Lottery.json";
import { abi as lotteryTokenABI } from "./../../../artifacts/contracts/LotteryToken.sol/LotteryToken.json";



export const useLottery = () => {
  
  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
  const tokenAddress = '0xa16E02E87b7454126E5E10d957A927A7F5B5d2be';

  const contract = getContract({
    address: contractAddress,
    abi: abi,
    client: walletClient,
  });

  const token = getContract({
    address: contractAddress,
    abi: lotteryTokenABI,
    client: walletClient,
  });

  const checkState = async () => {
    const state = await contract.read.betsOpen();
    console.log(`The lottery is ${state ? 'open' : 'closed'}`);
  };

  const openBets = async (duration: string) => {
    const currentBlock = await publicClient.getBlock();
    const timestamp = currentBlock?.timestamp ?? 0;
    await contract.write.openBets([timestamp + BigInt(duration)]);
  };

  const buyTokens = async (index: string, amount: string) => {
    const accounts = await walletClient.getAddresses();
    const tx = await contract.write.purchaseTokens([{
      value: parseEther(amount)/1n,
      account: accounts[Number(index)],
    }]);
    console.log(`Tokens bought. transaction hash: ${tx}`);
    /*const tx = await walletClient.writeContract({
      address: contractAddress, // The address of your Lottery contract
      abi: [
        {
          "inputs": [],
          "name": "purchaseTokens",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function",
        }
      ],
      functionName: 'purchaseTokens',
      value: parseEther(amount), // The amount of ether to send for purchasing tokens
      account: accounts[Number(index)], // Specify the account sending the transaction
    });
    console.log(`Tokens bought, transaction hash: ${tx}`);*/
  };

  const placeBet = async (index: string, amount: string) => {
    const accounts = await walletClient.getAddresses();
    await token.write.approve([contract.address, parseEther(amount)]);
    await contract.write.bet([parseEther(amount)], {
      account: accounts[Number(index)],
    });
  };

  const closeBets = async () => {    
    await contract.write.closeLottery();
  };

  const checkPrize = async (index: string) => {
    const accounts = await walletClient.getAddresses();    
    const prize = await contract.read.prize({
      account: accounts[Number(index)],
    });
    console.log(`Prize: ${prize}`);
  };

 const claimPrize = async (index: string) => {
  const accounts = await walletClient.getAddresses();    
    await contract.write.claimPrize([{
      account: accounts[Number(index)],
    }]);
  };

  const withdrawTokens = async (amount: string) => {
    // const contract = await viem.getContractAt('Lottery', contractAddress);
    await contract.write.withdrawTokens([parseEther(amount)]);
  };

  const burnTokens = async (index: string, amount: string) => {
    const accounts = await walletClient.getAddresses();    
    await token.write.burn([parseEther(amount)], {
      account: accounts[Number(index)],
    }); 
  };

  return {
    checkState,
    openBets,
    buyTokens,
    placeBet,
    closeBets,
    checkPrize,
    claimPrize,
    withdrawTokens,
    burnTokens,
    contractAddress,
    tokenAddress,
  };
  
};
