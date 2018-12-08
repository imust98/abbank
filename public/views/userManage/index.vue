<template>
  <div class="m-layout">
    <div class="operation">
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加用户</el-button>
    </div>
    <div class="list">
      <el-table :data="userList" :border="true" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="80"></el-table-column>
        <el-table-column prop="realname" label="真实姓名" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="user-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="ruleForm.realname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        realname:''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度在不小于3个字符 ', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, message: '长度在不小于6个字符 ', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false
    }
  },
  computed: {
    userList: {
      get() {
        return this.$store.state.user.list || [];
      }
    }
  },
  methods: {
    handleDelete(row) {
      this.$store.dispatch('DelUser', {
        params: {
          id: row.id
        }
      })
    },
    submitForm(formName) {
      const data = this.ruleForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('AddUser', data).then((result) => {
            this.dialogFormVisible = false;
            this.$store.dispatch('GetUserList');
          }).catch(function () {
            return new Error('reject again in nested Promise');
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('GetUserList');
    });
  }
}
</script>
<style lang="scss" scoped>
</style>
