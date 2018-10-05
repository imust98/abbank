<template>
  <div class="m-form-company">
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <div class="title">基础信息</div>
      <el-form-item label="营业执照信息" prop="yyzz">
        <el-input v-model="ruleForm.yyzz"></el-input>
      </el-form-item>
      <el-form-item label="信用机构代码证" prop="yyjg">
        <el-input v-model="ruleForm.yyjg"></el-input>
      </el-form-item>
      <el-form-item label="土地使用证" prop="tdsy">
        <el-input v-model="ruleForm.tdsy"></el-input>        
      </el-form-item>
      <el-form-item label="特种行业许可证" prop="tzhy">
        <el-input v-model="ruleForm.tzhy"></el-input>
      </el-form-item>
      <el-form-item label="开户许可证" prop="khxk">
        <el-input v-model="ruleForm.khxk"></el-input>
      </el-form-item>
      <el-form-item label="排污许可证" prop="pwxk">
        <el-input v-model="ruleForm.pwxk"></el-input>
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
      ruleForm: {
        yyzz: '',
        yyjg: '',
        tdsy: '',
        tzhy: '',
        khxk: '',
        pwxk: ''
      },
      rules: {
        yyzz: [
          { required: true, message: '请输入营业执照信息', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在 2 到 11 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const data = this.ruleForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('AddCompany', data).then((result) => {
            this.$router.push('/customer/company/list');
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
.m-form-company {
  .el-form-item__content {
    width: 300px;
  }
  .el-form-item__label {
    font-weight: normal;
  }
}
</style>


