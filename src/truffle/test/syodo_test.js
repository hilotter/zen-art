import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiBigNumber from 'chai-bignumber';
import { assertRevert } from "openzeppelin-solidity/test/helpers/assertRevert";
import { ether } from "openzeppelin-solidity/test/helpers/ether";

chai.use(chaiBigNumber());
chai.use(chaiAsPromised);
const { expect, assert } = chai

const Syodo = artifacts.require("Syodo");

contract('SyodoTest', async (accounts) => {
  let instance;
  let owner;

  beforeEach(async () => {
    instance = await Syodo.deployed();
    owner = await instance.owner();
    await instance.setPaperFee(0);
  });

  it("Should make first account an owner", async () => {
    expect(owner).to.equal(accounts[0]);
  });

  describe("mintPaper", () => {
    context('without fee', () => {
      it("creates token with tokenURI", async () => {
        const ipfsUri = "https://gateway.ipfs.io/ipfs/test";
        await instance.mintPaper(ipfsUri);

        const tokenId = await instance.tokenOfOwnerByIndex(owner, 0);
        const tokenUri = await instance.tokenURI(tokenId);
        expect(tokenUri).to.equal(ipfsUri);
      });

      it("should be unique", async () => {
        const ipfsUri = "https://gateway.ipfs.io/ipfs/test";
        await assertRevert(instance.mintPaper(ipfsUri, { from: accounts[1] }));
      });
    });

    context('require fee', () => {
      it("rejects without fee", async () => {
        await instance.setPaperFee(ether(0.1));
        const ipfsUri = "https://gateway.ipfs.io/ipfs/fee_test";

        await assertRevert(instance.mintPaper(ipfsUri));
      });

      it("creates token by fee", async () => {
        await instance.setPaperFee(ether(0.1));
        const ipfsUri = "https://gateway.ipfs.io/ipfs/fee_test";

        await instance.mintPaper(ipfsUri, { value: ether(0.1) }).should.be.fulfilled;
      });
    });
  });

  describe("getPaperFee", () => {
    it("gets paperFee", async () => {
      const paperFee = await instance.getPaperFee();
      expect(paperFee).to.bignumber.equal(0);
    });
  });

  describe("setPaperFee", () => {
    it("sets paperFee", async () => {
      const beforePaperFee = await instance.getPaperFee();
      expect(beforePaperFee).to.bignumber.equal(0);

      await instance.setPaperFee(ether(0.1));

      const afterPaperFee = await instance.getPaperFee();
      expect(afterPaperFee).to.bignumber.equal(ether(0.1));
    });
  });
});
