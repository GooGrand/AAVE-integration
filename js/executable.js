import { Marketplace } from "aave-js";
import "./config.js"

// Initializing the object, that can be exported and used as complete system
const controller = {
    marketplace,
    API_SECRET_KEY,
    signup,
    createLoanRequest,
    createMarketApprovance,
};

function signup(){
    const marketplace = new Marketplace("");
    this.API_SECRET_KEY = await marketplace.utils.signup(...signupParams);
    this.marketplace - new Marketplace(this.API_SECRET_KEY);
}

function createLoanRequest(){
    // We get the maximum loan amount, depending on the Loan-To-Value ratio allowed
    const maxLoanAmount = await this.marketplace.requests.getMaxLoanAmountFromCollateral(
        collateralAmount, collateralType, loanCurrency
    );
   
    const loanRequestParams = {
        loanAmount: maxLoanAmount,
        moe: loanCurrency,
        collateralAmount: collateralAmount,
        collateralType: collateralType,
        mpr: monthlyInterest,
        duration: loanDuration
    };
    const tx = await this.marketplace.requests.create(borrowerAddress,loanRequestParams);
   
    await web3.eth.sendTransaction(tx);
}

function createMarketApprovance(){
    // loanData comes from calling await marketplace.requests.getLoanData(requestAddress);
    const { loanAddress, collateralType, collateralAmount, state } = loanData;
    const borrowerAddress = '0x27499a2aaaa3a7a4a98a3274dad897' // The wallet that places collateral
 
    const isCollateralPriceUpdated = await marketplace.requests.isCollateralPriceUpdated(loanAddress);
 
    if (state === "WaitingForCollateral" && isCollateralPriceUpdated) {
        const isApproved = await marketplace.utils.isTransferApproved(
            borrowerAddress, collateralType, collateralAmount
        );
        if (!isApproved) {
            const approveTx = await marketplace.utils.approveTransfer(borrowerAddress, collateralType);
            await web3.eth.sendTransaction(approveTx);
        }
 
        const tx = await marketplace.requests.placeCollateral(loanAddress, borrowerAddress);
 
        await web3.eth.sendTransaction(tx);
    }
}