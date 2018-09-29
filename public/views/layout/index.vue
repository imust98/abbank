<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="side-wrapper"></sidebar> 
    <div class="main-wrapper">
      <navbar></navbar>
      <tagbar></tagbar>
      <mainbar></mainbar>
    </div>
  </div>
</template>
<script>
import { Sidebar, Navbar, Tagbar, Mainbar } from './components';
import {mapGetters} from 'vuex';
export default {
  name: 'layout',
  components: {
    Sidebar,
    Navbar,
    Tagbar,
    Mainbar
  },
  computed:{
    ...mapGetters([
      'sidebar'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  },
  created(){
  }
};
</script>
<style lang="scss" scoped>
@import "public/styles/mixin.scss";
.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>


