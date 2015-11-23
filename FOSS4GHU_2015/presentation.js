var SLIDES_NUM = 13;
function init() {
    document.removeEventListener('DOMContentLoaded', init);
    var currSlide = 1;
    var iframe = document.getElementById('frame');
    var toNext = function () {
        if (currSlide >= SLIDES_NUM) {
            return false;
        }
        currSlide += 1;
        iframe.src = 'pages/' + currSlide + '.html';
        if (currSlide === SLIDES_NUM) {
            this.classList.add('disabled');
        }
        document.getElementById('backward').classList.remove('disabled');
        if (currSlide === 2) {
            document.getElementById('logo').style.display = 'inline-block';
        }
    };
    var toPrev = function () {
        if (currSlide <= 1) {
            return false;
        }
        currSlide -= 1;
        iframe.src = 'pages/' + currSlide + '.html';
        if (currSlide === 1) {
            this.classList.add('disabled');
            document.getElementById('logo').style.display = 'none';
        }
        document.getElementById('forward').classList.remove('disabled');
    };
    document.getElementById('forward').addEventListener('click', toNext);
    document.getElementById('backward').addEventListener('click', toPrev);
}
document.addEventListener('DOMContentLoaded', init);