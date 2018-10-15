<template>
  <div class="m-form-person">
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <div class="title">基础信息</div>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="出生年月" prop="birthday">
        <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
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
      <el-form-item label="客户类型">
          <el-select v-model="ruleForm.person_type"  placeholder="请选择">
          <el-option
            v-for="item in personType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 2" label="工号" prop="employee_id">
        <el-input v-model="ruleForm.employee_id"></el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 2" label="开始日期" prop="employee_start_time">
        <el-date-picker
            v-model="ruleForm.employee_start_time"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
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
        birthday: '',
        sex: 0,
        card_id: '',
        phone: '',
        hk_address: '',
        home_address: '',
        unit_address: '',
        income: '',
        spouse_id: '',
        person_type: 1,
        employee_id: '',
        employee_start_time: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      },
      personType: [{
        value: 1,
        label: '普通客户'
      }, {
        value: 2,
        label: '信息员'
      }, {
        value: 3,
        label: '黑名单'
      }]
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


