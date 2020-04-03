<!-- 组价的三部分 -->
<template>
  <div class='login-bg'>
    <div id='login'>
      <h3>BOSS直聘</h3>
      <form>
        <ul class='info-login'>
          <li>
            <b>+86
              <i class="icon-down"></i>
            </b>
            <input type="text" placeholder="用户名" v-model='userules.userid'>
          </li>
          <li>
            <span></span>
            <input type="password" v-model="userules.userpwd" placeholder="验证码">
            <b>获取验证码</b>
          </li>
          <li>
            <input type="submit" @click.prevent="infologin" value='进入'>
          </li>
        </ul>
      </form>
    </div>
    <div class='login-footer flex_parent'>
      <router-link to='/' class='flex_child'>
      <span>用户协议</span>
      </router-link>
      <router-link to='/' class='flex_child'>
      <span class='flex_child'>密码登录</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        userules: {
          userid:'',
          userpwd:''
        }
      }
    },
    methods: {
      infologin () {
        //alert('我要登录了');  进行登录的操作
        if (this.userules.userid == '10000000000') {
          if (this.userules.userpwd == '123123' ) {
             //通过路由进行跳转
            this.$router.push({
              path:'/home'   //跳转到某个路由
            })
          } else {
            alert('密码不正确，请重试！');
          }
        } else {
          alert('用户名不正确，别登陆了');
        }
       
      }
    }
}
</script>
<style scoped>

</style>