<template>
  <div class="m-form-person">
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <div class="title">基础信息</div>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio :label="male">男</el-radio>
          <el-radio :label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证号" prop="card_id">
        <el-input v-model="ruleForm.card_id"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="户口所在地" prop="hk_address">
        <el-input v-model="ruleForm.hk_address"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" prop="home_address">
        <el-input type="textarea" v-model="ruleForm.home_address"></el-input>
      </el-form-item>
      <el-form-item label="工作单位" prop="unit_address">
        <el-input type="textarea" v-model="ruleForm.unit_address"></el-input>
      </el-form-item>
      <el-form-item label="收入情况" prop="income">
        <el-input v-model="ruleForm.income"></el-input>
      </el-form-item>
      <el-form-item label="家庭成员编号" prop="spouse_id">
        <el-input v-model="ruleForm.spouse_id"></el-input>
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
      male: 0,
      female: 1,
      ruleForm: {
        name: '',
        age: '',
        sex: 0,
        card_id: '',
        phone: '',
        hk_address: '',
        home_address: '',
        unit_address: '',
        income: '',
        spouse_id: ''
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
          this.$store.dispatch('AddPerson', data).then((result) => {
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
.m-form-person {
  .el-form-item__content {
    width: 300px;
  }
  .el-form-item__label {
    font-weight: normal;
  }
}
</style>


