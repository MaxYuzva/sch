(function() {
    var queries = document.querySelectorAll('.mediaquerydependent'),
        all = queries.length,
        cur = null,
        attr = null;
    while (all--) {
        cur = queries[all];
        if (cur.dataset.media &&
            window.matchMedia(cur.dataset.media).matches) {
            for (attr in cur.dataset) {
                if (attr !== 'media') {
                    cur.setAttribute(attr, cur.dataset[attr]);
                }
            }
        }
    }
}());