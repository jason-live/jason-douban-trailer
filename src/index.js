import './asset/common.sass';

function changeTitle() {
  setTimeout(function (params) {
    window.$('#app').html('parcel 大包包');
  }, 2000)
}

changeTitle();