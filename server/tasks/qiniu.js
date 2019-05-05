const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}


;(async () => {
  let movies = [{
    video: 'http://vt1.doubanio.com/201905052302/0f2807a97bbf60f5b724581266a4b0c5/view/movie/M/402440458.mp4',
    doubanId: '26100958',
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2552058346.jpg',
    cover: 'https://img3.doubanio.com/img/trailer/medium/2550759113.jpg?'
  }];

  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('开始传 video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始传 cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        console.log('开始传 poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')


        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }

        console.log(movie);

        // {
        //   video: 'http://vt1.doubanio.com/201905052302/0f2807a97bbf60f5b724581266a4b0c5/view/movie/M/402440458.mp4',
        //   doubanId: '26100958',
        //   poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2552058346.jpg',
        //   cover: 'https://img3.doubanio.com/img/trailer/medium/2550759113.jpg?',
        //   videoKey: 'http://pqgzybcoi.bkt.clouddn.com/6FhZKVUN2HEXDkpxwsOv7.mp4',
        //   coverKey: 'http://pqgzybcoi.bkt.clouddn.com/nmT4UrOD4beeWPHmLlCH9.png',
        //   posterKey: 'http://pqgzybcoi.bkt.clouddn.com/0Dp9PC7NidZGbxwox594q.png'
        // }

      } catch (err) {
        console.log(err)
      }
    }
  })
})()

