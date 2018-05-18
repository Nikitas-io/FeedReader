/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    describe('RSS Feeds', function () {
        /* This test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 
         * A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined URLs that are not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* 
         * A test that loops through each feed
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


    describe('The menu', function () {

        /*
         * A test that ensures that the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function () {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        /*
         * A test that ensures that the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
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
                /*This is incorrect because it is not checking the .feed container which is 
                important to have at least one .entry as a child according to the reviewer.
                //entriesBatchLen = entriesLen; */

                // Instead I will use jQuery to get the total number of the entries in the feed, 
                //while checking if the feed container is there as well.
                entriesBatchLen = $('.feed .entry').length;
                done();
            });
        });

        it('have at least a single .entry element within the .feed container', function (done) {
            expect(entriesBatchLen).toBeGreaterThan(0);
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
        beforeEach(function (done) {
            loadFeed(0, function () {
                feed0 = entries; // Get the first batch of entries in the feed.

                /* According to my reviewer I should not use done() in the first callback 
                If the second loadFeed(1, function(){...}) finishes first, it will exit the beforeEach function and run the spec. 
                And my 'feed0' variable will return as undefined and the spec will still pass 
                because undefined is not equal to feed1, which has a value. */
                //done(); 

                // I included the second loadFeed(1, function(){...}) in my first loadFeed(0, function () {...}) instead.
                loadFeed(1, function () {
                    feed1 = entries; // Get the second batch of entries.
                    done();
                });
            });
        });

        it('loads the new feeds', function (done) {
            expect(feed0).not.toBe(feed1);
            done();
        });
    });
}());