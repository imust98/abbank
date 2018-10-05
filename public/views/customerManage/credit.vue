<template>
  <div class="m-form-credit">
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <div class="title">信用信息</div>
      <el-form-item label="信用证发放日" prop="credit_starttime">
        <el-date-picker
          v-model="ruleForm.credit_starttime"
          type="date"
          value-format="timestamp"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="信用证到期日" prop="credit_expiretime">
        <el-date-picker
          v-model="ruleForm.credit_expiretime"
          type="date"
          value-format="timestamp"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="信用证评定人" prop="credit_adjuster">
        <el-input v-model="ruleForm.credit_adjuster"></el-input>
      </el-form-item>
      <el-form-item label="信用证授信级别" prop="credit_level">
        <el-input v-model="ruleForm.credit_level"></el-input>
      </el-form-item>
      <div class="form-button">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      ruleForm: {
        credit_starttime: '',
        credit_expiretime: '',
        credit_adjuster: '',
        credit_level: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const data = this.ruleForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('AddPersonCredit', { data, params: { id: this.id } }).then((result) => {
            this.$router.push('/customer/person/list');
          }).catch(function () {
            return new Error('reject again in nested Promise');
          })
        } else {
          console.log('error submit!!');
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
      vm.id = to.params.id;
    });
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  width: 880px;
  .title {
    padding-left: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #555;
    border-left: 3px solid #efefef;
    line-height: 20px;
  }
  .form-button {
    padding-top: 20px;
    text-align: center;
  }
}
</style>
<style lang="scss">
.m-form-credit {
  .el-form-item__content {
    width: 300px;
  }
  .el-form-item__label {
    font-weight: normal;
  }
}
</style>


