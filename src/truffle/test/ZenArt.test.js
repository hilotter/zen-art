import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiBigNumber from 'chai-bignumber';
import { assertRevert } from 'openzeppelin-solidity/test/helpers/assertRevert';
import { ether } from 'openzeppelin-solidity/test/helpers/ether';

chai.use(chaiBigNumber());
chai.use(chaiAsPromised);
const { expect, assert } = chai;

const ZenArt = artifacts.require('ZenArt');

contract('ZenArtTest', async (accounts) => {
  let instance;
  let owner;

  beforeEach(async () => {
    instance = await ZenArt.deployed();
    owner = await instance.owner();
    await instance.setPaperFee(0);
    const balance = await instance.getBalanceContract();
    if (balance.gt(0)) {
      await instance.withdraw(balance);
    }
  });

  it('Should make first account an owner', async () => {
    expect(owner).to.equal(accounts[0]);
  });

  describe('mintPaper', () => {
    context('without fee', () => {
      it('creates token with tokenURI', async () => {
        const imageHash = 'test';
        const ipfsUri = 'https://gateway.ipfs.io/ipfs/test';
        await instance.mintPaper(imageHash, ipfsUri);

        const tokenId = await instance.tokenOfOwnerByIndex(owner, 0);
        const tokenUri = await instance.tokenURI(tokenId);
        expect(tokenUri).to.equal(ipfsUri);
      });

      it('should be unique', async () => {
        const imageHash = 'test';
        const ipfsUri = 'https://gateway.ipfs.io/ipfs/test';
        await assertRevert(instance.mintPaper(imageHash, ipfsUri, { from: accounts[1] }));
      });
    });

    context('require fee', () => {
      it('rejects without fee', async () => {
        await instance.setPaperFee(ether(0.1));
        const imageHash = 'fee_test';
        const ipfsUri = 'https://gateway.ipfs.io/ipfs/test';

        await assertRevert(instance.mintPaper(imageHash, ipfsUri));
      });

      it('creates token by fee', async () => {
        await instance.setPaperFee(ether(0.1));
        const imageHash = 'fee_test';
        const ipfsUri = 'https://gateway.ipfs.io/ipfs/test';

        await instance.mintPaper(imageHash, ipfsUri, { value: ether(0.1) }).should.be.fulfilled;
      });
    });
  });

  describe('getPaperFee', () => {
    it('gets paperFee', async () => {
      const paperFee = await instance.getPaperFee();
      expect(paperFee).to.bignumber.equal(0);
    });
  });

  describe('setPaperFee', () => {
    it('sets paperFee', async () => {
      const beforePaperFee = await instance.getPaperFee();
      expect(beforePaperFee).to.bignumber.equal(0);

      await instance.setPaperFee(ether(0.1));

      const afterPaperFee = await instance.getPaperFee();
      expect(afterPaperFee).to.bignumber.equal(ether(0.1));
    });
  });

  describe('getBalanceContract', () => {
    it('gets balance', async () => {
      await instance.setPaperFee(ether(1));
      await instance.mintPaper('balance', 'https://gateway.ipfs.io/ipfs/test', { value: ether(1) }).should.be.fulfilled;
      const balance = await instance.getBalanceContract();
      expect(balance).to.bignumber.equal(ether(1));
    });
  });

  describe('withdraw', () => {
    it('withdraws only owner', async () => {
      await instance.setPaperFee(ether(1));
      await instance.mintPaper('balance1', 'https://gateway.ipfs.io/ipfs/test', { value: ether(1) }).should.be.fulfilled;
      await instance.mintPaper('balance2', 'https://gateway.ipfs.io/ipfs/test', { value: ether(1) }).should.be.fulfilled;

      await instance.withdraw(ether(2)).should.be.fulfilled;
    });

    it('should not withdraws other account', async () => {
      await instance.setPaperFee(ether(1));
      await instance.mintPaper('balance3', 'https://gateway.ipfs.io/ipfs/test', { value: ether(1) }).should.be.fulfilled;

      await assertRevert(instance.withdraw(ether(1), { from: accounts[1] }));
    });
  });
});
