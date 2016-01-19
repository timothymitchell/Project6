/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are all defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is a test that loops through each feed
         * within the allFeeds object and makes sure it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined that is not empty', function() {
           allFeeds.forEach(function(feed) {
               expect(feed.url).toBeDefined();
               expect(feed.url.length).not.toBe(0);
           })
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and makes sure it has a name defined
         * and that the name is not empty.
         */
        it('has the name defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });

    });

    /* Write a test named The menu. */
    describe('The menu', function() {
        /* This is a test that makes sure that the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This is a test that makes sure that the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes when the icon is selected', function () {
            var $menuIcon = $('.menu-icon-link');
            $menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* Write a suite named Initial entries
     * when the page first loads.
     */
    describe('Initial entries', function() {

        beforeEach(function(done) {
           loadFeed(0, done);
        });

        /* This is a the test that makes sure that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('have at least one entry', function() {
            expect($('.entry').length).not.toBe(0);
        });
    });

    /* This tests the "New Feed Selection" */
    describe('New Feed Selection', function() {

        var $previousContent;

        /* Store the content from feed #0 in $previousContent so it
         * can be compared to the content of the new feed.
         */
        beforeEach(function(done) {
            loadFeed(0, function () {
                $previousContent = $('.feed').html();
                done();
            })
        });

        /* This test makes sure that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Load feed #1 and compare the content to the value in
         * $previousContent.
         */
        it('changes the content when a new feed is loaded', function(done) {
            loadFeed(1, function() {
                expect($('.feed').html()).not.toEqual($previousContent);
                done();
            });
        });
    });
}());
