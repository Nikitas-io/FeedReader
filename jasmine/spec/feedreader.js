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
        /* This is our first test - it tests to make sure that the
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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined URLs that are not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined names that are not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when its icon is clicked', function () {
            $('.menu-icon-link').click();
            //I expect that after being clicked for the first and every other time the 
            expect(document.body.classList.contains('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {

        /* 
         * A test that ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        let entriesBatchLen; // The length of one batch of entries.
        beforeEach(function (done) {
            loadFeed(0, function () {
                entriesBatchLen = entriesLen; // Get the total number of the entries in the feed.
                done();
            });
        });

        it('have at least a single .entry element within the .feed container', function (done) {
            expect(entriesBatchLen).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function () {

        /* 
         * A test that ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feed0, feed1;
        beforeEach(function(done){
            loadFeed(0, function(){
                feed0 = entries; // Get the first batch of entries in the feed.
                done();
            });
            loadFeed(1, function(){
                feed1 = entries; // Get the second batch of entries.
                done();
            });
        });
 
        it('loads the new feeds', function(done){
            expect(feed0).not.toBe(feed1);
            done();
        });
    });
}());