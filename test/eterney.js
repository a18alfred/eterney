const Eterney = artifacts.require('./Eterney.sol');

require('chai')
	.use(require('chai-as-promised'))
	.should();

contract('Eterney', ([deployer, ...accounts]) => {
	let eterney;

	before(async () => {
		eterney = await Eterney.deployed();
	});

	describe('deployment', async () => {
		it('deploys successfully', async () => {
			const address = await eterney.address;
			assert.notEqual(address, 0x0);
			assert.notEqual(address, '');
			assert.notEqual(address, null);
			assert.notEqual(address, undefined);

		});
		it('has correct admin address', async () => {
			const admin = await eterney.admin();
			assert.equal(admin, deployer, ' Addmin address is correct');

		});
		it('has correct initial fee', async () => {
			const fee = await eterney.fee();
			assert.equal(fee.toString(), '1000000000000000', ' Fee is correct');
		});
	});

	describe('protection', async () => {
		it('allows only admin change fee, withdraw and deletePerson', async () => {
			const gas = await eterney.changeFee.estimateGas('10000000000000000', { from: deployer });
			console.log('gasChange = ', gas);
			await eterney.changeFee('10000000000000000', { from: deployer });
			const newFee = await eterney.fee();
			assert.equal(newFee.toString(), '10000000000000000', 'Fee is updated by admin');
			await eterney.changeFee('1000000000000000', { from: accounts[0] }).should.be.rejected;
			await eterney.changeFee('1000000000000000', { from: deployer });

			await eterney.addPerson(
				'asdasd asdasasdasdas adasdasdasdasasd',
				'12.12.2020.12.12.2020',
				'ffddskfljsdflkjsdflkdjfipoweriowejrfklfnwefnffddskfljsdflkjsdflkdjfipoweriowejrfklfnwefnffddskfljsdflkjsdflkdjfipoweriowejrfklfnwefns',
				{ from: accounts[0], value: '1000000000000000' }
			);

			await eterney.withdraw('1000000000000000', { from: accounts[0] }).should.be.rejected;
			await eterney.withdraw('1000000000000000', { from: deployer });
			// not enough funds
			await eterney.withdraw('1000000000000000', { from: deployer }).should.be.rejected;

			await eterney.deletePerson(0, { from: accounts[0] }).should.be.rejected;

			await eterney.deletePerson('0', { from: deployer });

			const person = await eterney.people('0');
			assert.equal(person.dates, '', 'Dates are deleted');
		});
	});

	describe('working with eterney contract', async () => {
		it('adds a person', async () => {
			const originalPeopleCount = await eterney.peopleCount();

			const name = 'fsdfsdfsdfsdf fsdfsf sdfsdfsdf';
			const dates = '12.12.2020.12.12.2020';
			const bio = 'ffddskfljsdflkjsdflkdjfipoweriowejrfklfnwefnffddskfljsdflkjsdflkdjfipoweriowejrfklfnwefnffddskfljsdflkjsdflkdjfipoweriowejrfklfnwefnss';

			const gas = await eterney.addPerson.estimateGas(
				name,
				dates,
				bio,
				{
					from: accounts[0],
					value: '1000000000000000'
				});

			console.log('gas = ', gas);

			let searchResult = await eterney.getUserOrSearchSubmissionsPaginated(true, name, 1, 10);
			assert.equal(searchResult.totalAmountOfSubmissions.toString(), '0', 'SearchSelector result must be empty');

			const receipt = await eterney.addPerson(
				name,
				dates,
				bio,
				{
					from: accounts[0],
					value: '1000000000000000'
				});

			searchResult = await eterney.getUserOrSearchSubmissionsPaginated(true, name, 1, 10);
			assert.equal(searchResult.totalAmountOfSubmissions.toString(), '1', 'SearchSelector result amount must be 1');

			const person = await eterney.people(originalPeopleCount.toString());
			assert.equal(person.name, name, 'retruns correct name');
			assert.equal(person.dates, dates, 'retruns correct dates');
			assert.equal(person.bio, bio, 'retruns correct bio');

			const updatedUserSubmissions = await eterney.getUserOrSearchSubmissionsPaginated(false, '', 1, 10, { from: accounts[0] });
			assert.equal(updatedUserSubmissions.totalAmountOfSubmissions, 2, 'User has 2 submission');
			assert.equal(updatedUserSubmissions.ids[0].toString(), originalPeopleCount.toString(), 'New submission is included');

			const updatedPeopleCount = await eterney.peopleCount();
			assert.equal(updatedPeopleCount.toString(), '2', 'peopleCount incremented');

			const list = await eterney.getPeopleByIds([0, 1]);
			assert.equal(list.length, 2, 'Retruned list length is correct');

			await eterney.addPerson(
				name,
				dates,
				bio,
				{
					from: accounts[0],
					value: '1000000000000000'
				});

			searchResult = await eterney.getUserOrSearchSubmissionsPaginated(true, name, 1, 10);
			assert.equal(searchResult.totalAmountOfSubmissions.toString(), '2', 'SearchSelector result amount must be 2');

			await eterney.addPerson(
				'34fsfsd fsdsdfsd fsfsddsf',
				dates,
				bio,
				{
					from: accounts[0],
					value: '1000000000000000'
				});

			searchResult = await eterney.getUserOrSearchSubmissionsPaginated(true, name, 1, 10);
			assert.equal(searchResult.totalAmountOfSubmissions.toString(), '2', 'SearchSelector result amount must be 2');
			console.log('searchResult = ', searchResult.submissions.toString());

			searchResult = await eterney.getUserOrSearchSubmissionsPaginated(true, '34fsfsd fsdsdfsd fsfsddsf', 1, 10);
			assert.equal(searchResult.totalAmountOfSubmissions.toString(), '1', 'SearchSelector result amount must be 1');
		});
	});
});