const lungoTokenArt = artifacts.require("LungoToken");
const contractOperatorArt = artifacts.require("ERC20Operator");

contract("lungoToken", (accounts) => {

    before(async () => {
        lungoToken = await lungoTokenArt.deployed();
        operator = await contractOperatorArt.deployed();
    })

    it("should verify the supply of the token", async () => {
        let supply = await lungoToken.totalSupply();
        let supplyConverted = web3.utils.fromWei(supply, 'ether')
        console.log("Total supply of the token: " + supplyConverted);
        assert.equal(supplyConverted, 1000000000, "Supply is not equal to 1000000000");
    })    

    it("gives the owner of the token 1M tokens", async () => {
        let balance = await lungoToken.balanceOf(accounts[0])
        console.log('Accounts: ')
        console.log(accounts.forEach(account => console.log(account)))
        console.log('Owner address balance: ' , web3.utils.fromWei(balance, 'ether'))
        assert.equal(web3.utils.fromWei(balance, 'ether'), 1000000000, 'The owner should have 1M tokens')
    })

    it("can transfer tokens between accounts", async() => {
        let amount = web3.utils.toWei('1000', 'ether')
        await lungoToken.transfer(accounts[2], amount)

        let balance = await lungoToken.balanceOf(accounts[2])
        balance = web3.utils.fromWei(balance, 'ether')
        assert.equal(balance, '1000', 'The account should have 1000 tokens')
    })

    it("can not transfer tokens to the owner", async() => {
        let amount = web3.utils.toWei('100', 'ether')
        try {            
            await lungoToken.transfer(accounts[0], amount, {from: accounts[2]})
        } catch (error) {
            assert.equal(error.message, 'VM Exception while processing transaction: revert')
        }
    })
      
    it("increase allowance of two accounts and transfer", async() => {

        try {

            let amountAllowed = web3.utils.toWei('100', 'ether')
            let allowance = await lungoToken.allowance(accounts[2], accounts[0]);
            console.log('Allowance before: ' , web3.utils.fromWei(allowance, 'ether'));

            await lungoToken.increaseAllowance(accounts[2], amountAllowed, {from: accounts[0]})

            allowance = await lungoToken.allowance(accounts[0], accounts[2])
            console.log('Allowance later: ', web3.utils.fromWei(allowance, 'ether'));

            let balance = await lungoToken.balanceOf(accounts[0])
            let balance2 = await lungoToken.balanceOf(accounts[2])
            
            console.log('Balance account 0 before transfer: ' , web3.utils.fromWei(balance, 'ether'))
            console.log('Balance account 2 before transfer: ' , web3.utils.fromWei(balance2, 'ether'))

            await lungoToken.transferFrom(accounts[0], accounts[0], 10)

            balance = await lungoToken.balanceOf(accounts[0])
            balance2 = await lungoToken.balanceOf(accounts[2])

            console.log('Balance account 0 after transfer: ' , web3.utils.fromWei(balance, 'ether'))
            console.log('Balance account 2 before transfer: ' , web3.utils.fromWei(balance2, 'ether'))

        } catch (error) {
            assert.equal(error.message, 'VM Exception while processing transaction: revert')
        }
    })
})