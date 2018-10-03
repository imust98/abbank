<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <div class="right-menu">
        <el-dropdown :hide-on-click="true" @command="handleCommand">
          <span class="el-dropdown-link">
            你好，{{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="modifyPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
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

    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.href = '/login';
      });
    }
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

