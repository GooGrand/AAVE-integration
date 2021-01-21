const signupParams = [
    "an-email@email.com", //email
    "my-name", //name
    "a-super-random-password", //password
    "my-team-name" // Optional, organisation name
  ]

// The wallet, that will be used as a target to transfer asset
const borrowerAddress = "";

// Should be integer
const collateralAmount = 123;

// Shortcode of the asset you want to put as collateral
// It should be ERC-20 type
const collateralType = "USDN";

// Shortcode of the recieving asset
const loanCurrency = "ETH";

// Duration of the loan in month
const loanDuration = 4;

// The percent of the total value you will pay as interest
const monthlyInterest = 1.5;