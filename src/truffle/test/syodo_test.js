const Syodo = artifacts.require("Syodo");

contract('SyodoTest', async (accounts) => {
  it("should assert true", async () => {
    const sign_test = await Syodo.deployed();
    assert.isTrue(true);
  });
});
