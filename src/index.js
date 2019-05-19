import './asset/common.sass';

function changeTitle() {
  setTimeout(function (params) {
    window.$('#app').html('parcel 大包包1');
  }, 2000)
}

changeTitle();