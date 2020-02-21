// 一、浏览器加载ES模块
/**
 * 传统方法：
 * （1）HTML 网页中，浏览器通过<script>标签加载 JavaScript 脚本。由于浏览器脚本的默认语言是 JavaScript，
 * 因此type="application/javascript"可以省略。默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎
 * 遇到<script>标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。
 * 如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任
 * 何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。
 */
{
  // 所以浏览器允许脚本异步加载，下面就是两种异步加载的语法
  {
  // <script src="path/to/myModule.js" defer></script>
  // <script src="path/to/myModule.js" async></script>
    // 上面代码中，<script>标签打开defer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外
    // 部脚本，但不会等它下载和执行，而是直接执行后面的命令。defer与async的区别是：defer要等到整个页面在内存
    // 中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断
    // 渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如
    // 果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。
  }
}

/**
 * 加载规则：
 * （1）浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
 * （2）ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
 */
{
  // 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
  {
  // <script type="module" src="./foo.js"></script>
    // 上面代码在网页中插入一个模块foo.js，由于type属性设为module，所以浏览器知道这是一个 ES6 模块。
    // 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，
    // 再执行模块脚本，等同于打开了<script>标签的defer属性。如果网页有多个<script type="module">，它
    // 们会按照在页面出现的顺序依次执行。
   // <script type="module" src="./foo.js"></script>
   //  等同于
    // <script type="module" src="./foo.js" defer></script>
  }

  // <script>标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。
  {
    // <script type="module" src="./foo.js" async></script>
    // 一旦使用了async属性，<script type="module">就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。
  }

  // ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
  {
    // <script type="module">
    //    import $ from './login.js';
    //
    //   // other code
    // </script>
    /**
     * 对于外部的模块脚本（上例是login.js），有几点需要注意。
     *（1）代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
     *（2）模块脚本自动采用严格模式，不管有没有声明use strict。
     *（3）模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
     *（4）模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
     *（5）同一个模块如果加载多次，将只执行一次。
     */
  }
}

/**
 * ES6 模块与 CommonJS 模块的差异：
 * （1）讨论 Node.js 加载 ES6 模块之前，必须了解 ES6 模块与 CommonJS 模块完全不同。它们有两个重大差异。
 *    ----第一个差异：CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。CommonJS 模块是运行
 *    时加载，ES6 模块是编译时输出接口。
 *    ----第二个差异：因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才
 *    会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
 * （2）ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。
 * （3）ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。
 * （4）由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。
 * （5）export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。
 */
// import {counter,incCounter} from "./Module/lib";
// import './Module/x'
// import './Module/y'
/**
 *import语句会执行所加载的模块，因此可以有这种写法：import './Module/y'，这
 *种写法仅仅执行lodash模块，但是不输入任何值。如果多次重复执行同一句import语句，
 * 那么只会执行一次，而不会执行多次
 */
{
  // 第一个差异的解释
  {
     // CommonJS 模块输出的是值的拷贝(算是深拷贝），也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下
    // 面这个模块文件lib.js的例子。
    {
      // **********************CommonJS***********************
      // var mod = require('./CommonJS/lib');
      // console.log(mod.counter);  // 3
      // mod.incCounter();
      // console.log(mod.counter);
      // 上面代码说明，lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。这是因为mod.counter
      // 是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。
      // ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，
      // 就会生成一个只读引用（换句话说，当前文件拿到的是模块内变量的引用地址）。等到脚本真正执行时，再根
      // 据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，
      // 原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定
      // 其所在的模块。

      // **********************EsModule******************
      // console.log(counter);
      // incCounter();
      // console.log(counter);
      // 上面代码说明，ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。
    }
  }
}

/**
 * Node.js 加载：
 * （1）Node.js 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6
 * 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的
 * 加载方案。从 v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。
 * （2）Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import
 * 或者export命令，那么就必须采用.mjs后缀名。Node.js 遇到.mjs文件，就认为它是 ES6 模块，
 * 默认启用严格模式，不必在每个模块文件顶部指定"use strict"。如果不希望将后缀名改成.mjs，
 * 可以在项目的package.json文件中，指定type字段为module。一旦设置了以后，该目录里面的 JS
 * 脚本，就被解释用 ES6 模块。(注意，一旦在node种使用EsModule，那么引入文件的后缀名绝对
 * 不能省略，一定要有*.js或者*.mjs结尾，亲测：修改后缀名的方式无效，指定type字段为module
 * 这个有效）
 * （3）一旦在项目的package.json文件中，指定type字段为module。如果这时还要使用 CommonJS
 * 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。如果没有type字段，或者type字段为commonjs，
 * 则.js脚本会被解释成 CommonJS 模块。
 * （4）总结为一句话：.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件
 * 的加载取决于package.json里面type字段的设置。注意，ES6 模块与 CommonJS 模块尽量不要混用。
 * require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。反过来，.mjs文件里
 * 面也不能使用require命令，必须使用import。
 */
// import {count} from "./Module/abc.js";
{
 // 基本案例
  {
    // console.log(count);
  }
}

/**
 * main 字段：
 * （1）package.json文件有两个字段可以指定模块的入口文件：main和exports。比较简单的模块，
 * 可以只使用main字段，指定模块加载的入口文件。指定项目的入口脚本为./src/index.js，它的格式为
 * ES6 模块。如果没有type字段，index.js就会被解释为 CommonJS 模块。然后，import命令就可以加载
 * 这个模块。这时，如果用 CommonJS 模块的require()命令去加载es-module-package模块会报错，
 * 因为 CommonJS 模块不能处理export命令。
 */
// import {add} from "./Module/es-module";
{
  // 基本案例
  {
    // add();
  }
}

/**
 * exports 字段：exports字段的优先级高于main字段。它有多种用法。
 * （1）子目录别名：package.json文件的exports字段可以指定脚本或子目录的别名。
 * （2）exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，
 * 并且可以直接简写成exports字段的值。
 * （3）条件加载：利用.这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。
 * 目前，这个功能需要在 Node.js 运行的时候，打开--experimental-conditional-exports标志。
 */
// import {submodule} from "./Module/es-module/src/submodule";

{
  // 子目录别名：package.json文件的exports字段可以指定脚本或子目录的别名。
  {
    // submodule();
  }

  // 条件加载，在package.json种加入如下代码
  {
   /* {
      "type": "module",
      "exports": {
      ".": {
        "require": "./main.cjs",
          "default": "./main.js"
      }
    }

    //简写版本，注意，如果同时还有其他别名，就不能采用简写，否则或报错。
      {
        "exports": {
          "require": "./main.cjs",
          "default": "./main.js"
        }
      }
    }*/
   // 上面代码中，别名.的require条件指定require()命令的入口文件（即 CommonJS 的入口），
    // default条件指定其他情况的入口（即 ES6 的入口）。

  }
}

/**
 * ES6 模块加载 CommonJS 模块:
 * （1）一个模块同时支持 ES6 和 CommonJS 两种格式的常见方法是，package.json文件的
 * main字段指定 CommonJS 入口，给 Node.js 使用；module字段指定 ES6 模块入口，给打包工具
 * 使用，因为 Node.js 不认识module字段。
 * （2）注意：import命令加载 CommonJS 模块，只能整体加载，不能只加载单一的输出项。
 */

/**
 * node.js 的内置模块可以整体加载，也可以加载指定的输出项。
 */
// import EventEmitter from 'events'
{
  // 整体加载
  {
    // const e = new EventEmitter();
    // console.log(e);
  }

  // 加载指定的输出项
    /*import { readFile } from 'fs';
    readFile('./foo.txt', (err, source) => {
      if (err) {
        console.error(err);
      } else {
        console.log(source);
      }
    });*/
}

/**
 * 加载路径：
 * （1）ES6 模块的加载路径必须给出脚本的完整路径，不能省略脚本的后缀名。import命令
 * 和package.json文件的main字段如果省略脚本的后缀名，会报错。（这里注意，如果在
 * package种定义了入口模块路径，那么在使用模块导入的时候就无需模块文件后缀）
 * （2）为了与浏览器的import加载规则相同，Node.js 的.mjs文件支持 URL 路径。
 */
{
  // 为了与浏览器的import加载规则相同，Node.js 的.mjs文件支持 URL 路径。
  {
    // import './foo.mjs?query=1'; // 加载 ./foo 传入参数 ?query=1
    // 上面代码中，脚本路径带有参数?query=1，Node 会按 URL 规则解读。同一个脚本只
    // 要参数不同，就会被加载多次，并且保存成不同的缓存。由于这个原因，只要文件名
    // 中含有:、%、#、?等特殊字符，最好对这些字符进行转义。目前，Node.js 的import
    // 命令只支持加载本地模块（file:协议）和data:协议，不支持加载远程模块。另外，
    // 脚本路径只支持相对路径，不支持绝对路径（即以/或//开头的路径）。最后，Node
    // 的import命令是异步加载，这一点与浏览器的处理方法相同。
  }

}

/**
 * 内部变量：
 * ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了
 * 达到这个目标，Node 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。
 * 首先，就是this关键字。ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶
 * 层this指向当前模块，这是两者的一个重大差异。其次，以下这些顶层变量在 ES6 模块之
 * 中都是不存在的。
 * *** arguments
 * *** require
 * *** module
 * *** exports
 * *** __filename
 * *** __dirname
 */

/**
 * 循环加载：
 * （1）“循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本
 * 的执行又依赖a脚本。通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致
 * 递归加载，使得程序无法执行，因此应该避免出现。但是实际上，这是很难避免的，尤其
 * 是依赖关系复杂的大项目，很容易出现a依赖b，b依赖c，c又依赖a这样的情况。这意味着，
 * 模块加载机制必须考虑“循环加载”的情况。对于 JavaScript 语言来说，目前最常见的
 * 两种模块格式 CommonJS 和 ES6，处理“循环加载”的方法是不一样的，返回的结果也
 * 不一样。
 *（2）CommonJS 模块的加载原理：CommonJS 的一个模块，就是一个脚本文件。require命
 * 令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。
 * （3）CommonJS 模块的循环加载：CommonJS 模块的重要特性是加载时执行，即脚本代码在
 * require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，
 * 还未执行的部分不会输出。知道循环加载结束，在交还代码执行权，总之，CommonJS 输入的
 * 是被输出值的拷贝，不是引用。另外，由于 CommonJS 模块遇到循环加载时，返回的是当前
 * 已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的
 * 时候，必须非常小心。
 * （4）ES6 模块的循环加载：ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是
 * 动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不
 * 会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能
 * 够取到值。
 */
{
  // require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。
  {
   /* {
      id: '...',
        exports: { ... },
      loaded: true,
    ...
    }*/
    // 上面代码就是 Node 内部加载模块后生成的一个对象。该对象的id属性是模块名，exports
    // 属性是模块输出的各个接口，loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。
    // 其他还有很多属性，这里都省略了。以后需要用到这个模块的时候，就会到exports属性上
    // 面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。也就
    // 是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就
    // 返回第一次运行的结果，除非手动清除系统缓存。
  }
}

