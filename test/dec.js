class Boy {
  @speak('中文')
  run() {
    console.log('i can run');
    console.log('i can speak' + this.language);
  }

  @speak1
  run1() {
    console.log('i can run1');
  }
}

function speak(language) {
  return function (target, key, descriptor) {
    // target : 装饰的类
    // key : 修饰的方法
    // descriptor : 描述
    // 拿到目标类，修改属性，配置
    console.log(target);
    console.log(key);
    console.log(descriptor);

    target.language = language;
  }
}

function speak1(target, key, descriptor) {
    // target : 装饰的类
    // key : 修饰的方法
    // descriptor : 描述
    // 拿到目标类，修改属性，配置
    console.log(target);
    console.log(key);
    console.log(descriptor);
}

const luke = new Boy();

// luke.run();