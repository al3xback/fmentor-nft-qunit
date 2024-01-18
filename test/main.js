import jsdom from 'jsdom';
import axios from 'axios';

const { JSDOM } = jsdom;
const { test } = QUnit;

const url = 'https://al3xback.github.io/fmentor-nft-qunit/';

const getData = () => {
	return axios.get(url)
		.then((res) => {
			const { document } = new JSDOM(res.data).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

QUnit.module('DOM', (hooks) => {
	hooks.beforeEach(async (assert) => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	test("should have an article element with a class of 'card'", (assert) => {
		const articleEl = document.querySelector('article');
		const articleClass = articleEl.className;

		assert.ok(articleEl);
		assert.equal(articleClass, 'card');
	});

	test("should have two children inside of the element with a class of 'card'", (assert) => {
		const cardEl = document.querySelector('.card');
		const cardChildrenLength = cardEl.children.length;

		assert.strictEqual(cardChildrenLength, 2);
	});

	test('should have a card image element that has width and height attribute with each value of 302px', (assert) => {
		const cardImgEl = document.querySelector('.card__image img');
		const cardImgWidth = parseInt(cardImgEl.getAttribute('width'));
		const cardImgHeight = parseInt(cardImgEl.getAttribute('height'));

		assert.strictEqual(cardImgWidth, 302);
		assert.strictEqual(cardImgHeight, 302);
	});

	test('should have title, description, statuses, and author elements', (assert) => {
		const cardEl = document.querySelector('.card');

		const cardTitleEl = cardEl.querySelector('.card__title');
		const cardDescEl = cardEl.querySelector('.card__desc');
		const cardStatListEl = cardEl.querySelector('.card__stats-list');
		const cardAuthorEl = cardEl.querySelector('.card__author');

		assert.ok(cardTitleEl);
		assert.ok(cardDescEl);
		assert.ok(cardStatListEl);
		assert.ok(cardAuthorEl);
	});

	test("should have a title element that contains 'Equilibrium'", (assert) => {
		const cardTitleEl = document.querySelector('.card__title');
		let cardTitle = cardTitleEl.textContent.trim();

		if (/\n/.test(cardTitle)) {
			cardTitle = cardTitle.replace(/\n/g, ' ');
		}

		if (/\t/.test(cardTitle)) {
			cardTitle = cardTitle.replace(/\t/g, '');
		}

		const cardTitleWords = cardTitle.split(' ');
		const isEquilibriumWordExist = cardTitleWords.includes('Equilibrium');

		assert.true(isEquilibriumWordExist);
	});

	test("should have a description element that contains 'Our Equilibrium'", (assert) => {
		const cardDescEl = document.querySelector('.card__desc');
		let cardDesc = cardDescEl.textContent.trim();

		if (/\n/.test(cardDesc)) {
			cardDesc = cardDesc.replace(/\n/g, ' ');
		}

		if (/\t/.test(cardDesc)) {
			cardDesc = cardDesc.replace(/\t/g, '');
		}

		const cardDescWords = cardDesc.split(' ');
		const isOurWordExist = cardDescWords.includes('Our');
		const isEquilibriumWordExist = cardDescWords.includes('Equilibrium');

		assert.true(isOurWordExist);
		assert.true(isEquilibriumWordExist);
	});

	test('should have two card status list item elements', (assert) => {
		const cardStatListEl = document.querySelector('.card__stats-list');
		const cardStatListChildrenLength = cardStatListEl.children.length;

		assert.strictEqual(cardStatListChildrenLength, 2);
	});

	test('should not have an author name element with a single name', (assert) => {
		const cardAuthorEl = document.querySelector('.card__author');
		const cardAuthorName =
			cardAuthorEl.querySelector('.btn--link').textContent;
		const cardAuthorWordNameLength = cardAuthorName
			.trim()
			.split(' ').length;

		assert.notStrictEqual(cardAuthorWordNameLength, 1);
	});
});
