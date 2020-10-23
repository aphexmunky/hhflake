const { expect } = require("chai");

describe("Token contract", function() {
	it("Deployment should assign the total supply of tokens to the owner", async function() {
		const [owner] = await ethers.getSigners();
		const Token = await ethers.getContractFactory("Token");
		const hhflake = await Token.deploy();
		const ownerBalance = await hhflake.balanceOf(owner.address);

		expect(await hhflake.totalSupply()).to.equal(ownerBalance);
	});
});

describe("Transactions", function() {
	it("Should transfer tokens between accounts", async function() {
		const [owner, addr1, addr2] = await ethers.getSigners();

		const Token = await ethers.getContractFactory("Token");

		const hhflake = await Token.deploy();

		await hhflake.transfer(addr1.address, 50);
		expect(await hhflake.balanceOf(addr1.address)).to.equal(50);

		await hhflake.connect(addr1).transfer(addr2.address, 50);
		expect(await hhflake.balanceOf(addr2.address)).to.equal(50);
	});
});
