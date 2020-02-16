/**
 * call的作用就是把obj1的方法放到obj2上使用，后面的参数代表的是obj1里面的方法需要参数
 */
{
  function add (x, y) {
    console.log (x + y);
  }
  function minus (x, y) {
    console.log (x - y);
  }
  // add.call (minus , 1, 1);    //2
  /**
   * 这个例子中的意思就是用 add 的函数操作来替换 minus的函数操作，add.call(minus ,1,1) == add(1,1) ，所以运行结果为：console.log (2);
   * 注意：js 中的函数其实是对象，函数名是对 Function 对象的引用。
   * A.call( B,x,y )：就是把A的函数放到B中运行，x 和 y 是A方法的参数。
   */
}

/**
 * 用call来实现继承
 */
{
  // 用this可以继承myfunc1中的所有方法和属性。
  {
    function myfunc1(){
      this.name = 'Lee';
      this.myTxt = function(txt) {
        console.log( 'i am',txt );
      }
    }

    function myfunc2(){
      myfunc1.call(this);
    }

    var myfunc3 = new myfunc2();
    myfunc3.myTxt('Geing'); // i am Geing
    console.log (myfunc3.name);	// Lee
  }
}
