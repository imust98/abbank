<template>
  <div class="g-doc">
    <div class="body">
      <div class="login-container">
        <el-form class="login-form" autoComplete="on" label-position="left" :model="form" :rules="rules" ref="ruleForm">
          <div class="title-container">
            <h3 class="title">登录</h3>
          </div>
          <el-form-item prop="username">
            <div class="error-tip" v-if="loginFail">用户名或密码不正确</div>
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="form.username"  autoComplete="on" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input type="password" v-model="form.password"  autoComplete="on" placeholder="密码" />
          </el-form-item>
          <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click="onSubmit('ruleForm')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      loginFail: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async dologin(data) {
      const response = await window.fetch('/api/user/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: new Headers({
          'X-Requested-With': 'xhr',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      });
      const res = await response.json();
      if (/^2/.test(res.code)) {
        if (res.result) {
          this.loginFail = false;
          location.href = '/customer';
        } else {
          this.loginFail = true;
        }
        console.log(res)
      } else {
        this.errorMsg = res.msg;
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dologin(this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #555;
      height: 47px;
    }
  }
  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #555;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  background-color: #2d3a4b;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 420px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #555;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    padding-bottom: 30px;
    h3 {
      text-align: center;
    }
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
.el-button--medium {
  padding: 15px 20px;
}
.g-doc {
  background: #2d3a4b;
  .error-tip {
    position: absolute;
    top: -20px;
    left: 0px;
    color: #f56c6c;
    line-height: 14px;
    font-size: 13px;
  }
}
</style>
