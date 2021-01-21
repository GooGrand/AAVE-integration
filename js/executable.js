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
    const { loanAddress, collateralType, collateralAmount, state } = await this.marketplace.requests.getLoanData(requestAddress);
 
    const isCollateralPriceUpdated = await this.marketplace.requests.isCollateralPriceUpdated(loanAddress);
 
    if (state === "WaitingForCollateral" && isCollateralPriceUpdated) {
        const isApproved = await this.marketplace.utils.isTransferApproved(
            borrowerAddress, collateralType, collateralAmount
        );
        if (!isApproved) {
            const approveTx = await this.marketplace.utils.approveTransfer(borrowerAddress, collateralType);
            await web3.eth.sendTransaction(approveTx);
        }
 
        const tx = await marketplace.requests.placeCollateral(loanAddress, borrowerAddress);
 
        await web3.eth.sendTransaction(tx);
    }
}