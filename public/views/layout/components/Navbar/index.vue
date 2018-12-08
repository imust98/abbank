<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger
        class="hamburger-container"
        :toggleClick="toggleSideBar"
        :isActive="sidebar.opened"
      ></hamburger>
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <div class="right-menu">
        <el-dropdown :hide-on-click="true" @command="handleCommand">
          <span class="el-dropdown-link">
            你好，{{user.username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="modifyPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="user-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'user']),
    user: {
      get() {
        return this.$store.state.user.info
      }
    }
  },
  data() {
    return {
      ruleForm: {
        password: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, message: '长度在不小于6个字符 ', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false
    };
  },
  methods: {
    handleCommand(command) {
      this[command].call(this);
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    modifyPwd() {
      this.dialogFormVisible = true;
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.href = '/login';
      });
    },
    submitForm(formName) {
      const data = this.ruleForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('ModifyUser', { data, params: { id: this.user.id } }).then((result) => {
            this.dialogFormVisible = false;
          }).catch(function () {
            return new Error('reject again in nested Promise');
          })
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch('GenerateRoutes',this.user.role);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    padding-right: 40px;
    height: 100%;
    &:focus {
      outline: none;
    }
    .el-dropdown {
      height: 30px;
      cursor: pointer;
    }
  }
}
</style>

