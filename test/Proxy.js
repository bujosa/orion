const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Proxy', function () {
  async function deployFixture() {
    const Proxy = await ethers.getContractFactory('Proxy');
    const proxy = await Proxy.deploy();

    const Logic1 = await ethers.getContractFactory('Logic1');
    const logic1 = await Logic1.deploy();

    const Logic2 = await ethers.getContractFactory('Logic2');
    const logic2 = await Logic2.deploy();

    return { proxy, logic1, logic2 };
  }

  it('Should work with logic1', async function () {
    const { proxy, logic1 } = await loadFixture(deployFixture);

    await proxy.changeImplementation(logic1.address);

    expect(await logic1.x()).to.equal(0);

    await proxy.changeX(40);

    expect(await logic1.x()).to.equal(40);
  });

  it('Should work with upgades', async function () {
    const { proxy, logic1, logic2 } = await loadFixture(deployFixture);

    await proxy.changeImplementation(logic1.address);
    expect(await logic1.x()).to.equal(0);

    await proxy.changeX(40);
    expect(await logic1.x()).to.equal(40);

    await proxy.changeImplementation(logic2.address);
    expect(await logic2.x()).to.equal(0);

    await proxy.changeX(45);
    expect(await logic2.x()).to.equal(90);
  });
});
