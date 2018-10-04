<template>
  <div>
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
      <div class="title">信用信息</div>
      <el-form-item label="信用证编号" prop="credit_id">
        <el-input v-model="ruleForm.credit_id"></el-input>
      </el-form-item>
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
      <div class="title">贷款信息</div>
      <el-form-item label="贷款金额" prop="loans_count">
        <el-input v-model="ruleForm.loans_count"></el-input>
      </el-form-item>
      <el-form-item label="贷款期限" prop="loans_deadline">
        <el-input v-model="ruleForm.loans_deadline"></el-input>
      </el-form-item>
      <el-form-item label="贷款利率" prop="loans_rate">
        <el-input v-model="ruleForm.loans_rate"></el-input>
      </el-form-item>
      <el-form-item label="担保人编码" prop="loans_bondsman_id">
        <el-input v-model="ruleForm.loans_bondsman_id"></el-input>
      </el-form-item>
      <el-form-item label="放款日期" prop="lending_date">
        <el-date-picker
          v-model="ruleForm.lending_date"
          type="date"
          value-format="timestamp"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="贷款余额" prop="loans_balance">
        <el-input v-model="ruleForm.loans_balance"></el-input>
      </el-form-item>
      <el-form-item label="贷款科目" prop="loans_subject">
        <el-input v-model="ruleForm.loans_subject"></el-input>
      </el-form-item>
      <el-form-item label="还款方式" prop="repayment_method">
        <el-input v-model="ruleForm.repayment_method"></el-input>
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
        credit_id:'',
        credit_starttime:'',
        credit_expiretime:'',
        credit_adjuster:'',
        credit_level:'',
        loans_count:'',
        loans_deadline:'',
        loans_rate:'',
        loans_bondsman_id:'',
        lending_date:'',
        loans_balance:'',
        loans_subject:'',
        repayment_method:''
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
  .form-button{
    padding-top: 20px;
    text-align: center;
  }
}
</style>
<style lang="scss">
.el-form-item__content {
  width: 300px;
}
.el-form-item__label {
  font-weight:normal;
}
</style>


