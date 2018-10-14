<template>
  <div class="m-form-modify">
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
          <el-select v-model="ruleForm.type"  placeholder="请选择">
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
      <div>
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
        <el-form-item label="客户经理" prop="customer_manager">
          <el-input v-model="ruleForm.credit_level"></el-input>
        </el-form-item>
        <el-form-item label="销户日期" prop="destroy_time">
          <el-date-picker
            v-model="ruleForm.destroy_time"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="销户原因" prop="destroy_reason">
          <el-input v-model="ruleForm.destroy_reason"></el-input>
        </el-form-item>
      </div>
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
      <el-form-item label="担保人编码" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="主要负责人" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="次要负责人" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="贷款用途" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="贷款品种" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="贷款类型" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="担保方式" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="贷款状态" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="行业分类" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="经营性分类" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="利息收入" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
      </el-form-item>
      <el-form-item label="逾期欠款" prop="loans_bondsman_ids">
        <el-input v-model="ruleForm.loans_bondsman_ids"></el-input>
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
import _ from 'lodash';
export default {
  data() {
    return {
      male: 0,
      female: 1,
      id: '',
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
        type: 1,
        employee_id: '',
        employee_start_time: '',
        credit_id: '',
        credit_starttime: '',
        credit_expiretime: '',
        credit_adjuster: '',
        credit_level: '',
        loans_count: '',
        loans_deadline: '',
        loans_rate: '',
        lending_date: '',
        loans_balance: '',
        loans_subject: '',
        repayment_method: '',
        loans_bondsman_ids: '',
        primary_person: '',
        minor_person: '',
        loans_use: '',
        loans_kind:'',
        loans_type:'',
        bondsman_method:'',
        loans_status:'',
        industry_classify:'',
        business_classify:'',
        interest_income:'',
        overdue_loans:''
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
          this.$store.dispatch('ModifyPerson', { data, params: { id: this.id } }).then((result) => {
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
      vm.$store.dispatch('GetPersonItem', {
        params: {
          id: to.params.id
        }
      }).then(data => {
        vm.ruleForm = _.merge({}, data);
      });
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
.m-form-modify {
  .el-form-item__content {
    width: 300px;
  }
  .el-form-item__label {
    font-weight: normal;
  }
}
</style>


