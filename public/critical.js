var critical = require('critical');
critical.generate({
    inline: true,
    base: './',
    src: 'index.html',
    dest: 'index.html',
    minify: true,
    width: 1400,
    height: 1200
});