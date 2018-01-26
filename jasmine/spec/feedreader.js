/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function () {
		/* it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('has a URL defined', () => {
			for (const feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			}
		});

		/* a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('has a name defined', () => {
			for (const feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}
		});
	});


	describe('The menu', () => {
		/* a test that ensures the menu element is
		 * hidden by default. it checks out that the body
		 * has the class "menu-hidden"
		 */
		const menuIcon = $(".menu-icon-link");
		const body = $('body');

		it('is hidden by default', () => {
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		/* a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */

		it('should change visibility when the menu icon is clicked', () => {
			//show the menu
			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(false);

			//hide the menu
			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
	});

	describe('Initial entries', () => {

		//run the async loadfeed fn before the test
		beforeEach((done) => {
			loadFeed(0, () => {
				done();
			});
		});

		/* a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 */

		it('has at least a single entry', (done) => {
			expect($('.feed').find('.entry').length).not.toBe(0);
			done();
		});
	});

	describe('New Feed Selection', () => {
		/* a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */

		let tempFeed;
		//load the first and second feed and store the first for testing
		beforeEach((done) => {
			loadFeed(0, () => {
				tempFeed = $('.feed').html();
				loadFeed(1, () => {
					done();
				});
			});
		});

		//load the initial feed again after testing
		afterEach(() => {
			loadFeed(0);
		});

		it('should change the content when a new feed is loaded', (done) => {
			expect($('.feed').html()).not.toBe(tempFeed);
			done();
		});
	});

}());
