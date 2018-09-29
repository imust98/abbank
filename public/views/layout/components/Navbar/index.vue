<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <div class="right-menu">
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <span class="user-name">你好，{{user.username}}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided>
              <span @click="modifyPwd" style="display:block;">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
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
    ...mapGetters(['sidebar'])
  },
  data() {
    return {
      user:{}
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    modifyPwd(){

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
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-name {
          display: inline-block;
          vertical-align: 10px;
          padding-right: 20px;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.table-applist {
  .cell {
    display: flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
      margin-right: 20px;
      border-radius: 50%;
    }
  }
}
</style>

