var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1);
            await this.contract.mint(account_two, 2);
            await this.contract.mint(account_two, 3);
            await this.contract.mint(account_two, 4);
            await this.contract.mint(account_three, 5);
            await this.contract.mint(account_three, 6);
            await this.contract.mint(account_three, 7);
            await this.contract.mint(account_three, 8);
        })

        it('should return total supply', async function () { 
            const supply = await this.contract.totalSupply();
            assert.equal(supply, 8, "Incorrect total suppy");
        })

        it('should get token balance', async function () { 
            const accountTwoBalance = await this.contract.balanceOf(account_two);
            assert.equal(accountTwoBalance, 4, 'Incorrect account balance');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', 'Incorrect token uri');
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_three, 3, {
                from: account_two
            });
            const newOwner = await this.contract.ownerOf(3);
            assert.equal(newOwner, account_three, 'Incorrect new owner');
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            await expectThrow(this.contract.mint(account_two, 9, {
                from: account_two
            }));
        })

        it('should return contract owner', async function () { 
            const contractOwner = await this.contract.getOwner();
            assert.equal(contractOwner, account_one, 'Incorrect contract owner');
        })

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