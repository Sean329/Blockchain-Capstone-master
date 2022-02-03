// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('Mint with verifier', function () {
        beforeEach(async function () {
            this.verifier = await Verifier.new({
                from: account_one
            });
            this.contract = await SolnSquareVerifier.new(this.verifier.address, {
                from: account_one
            });
        });

        it('Verifying minting', async function () {
            const {
                proof,
                inputs
            } = require('../zokrates/code/square/proof.json');
            await this.contract.mintNFT(
                account_two,
                10,
                proof.a,
                proof.b,
                proof.c,
                inputs
            );
            const accountTwoBalance = await this.contract.balanceOf(account_two);
            assert.equal(accountTwoBalance, 1, 'Incorrect balance');
        });

        it('Should fail when minting without verifying', async function () {
            const {
                proof_altered,
                inputs_altered
            } = require('../zokrates/code/square/proofAltered.json');
            await expectThrow(this.contract.mintNFT(
                account_three,
                20,
                proof_altered.a,
                proof_altered.b,
                proof_altered.c,
                inputs_altered
            ));
        });
    });
});

var expectThrow = async function (promise) {
    try {
        await promise;
    } catch (error) {
        assert.exists(error);
        return;
    }
    assert.fail('Expected an error but didnt see one!');
}