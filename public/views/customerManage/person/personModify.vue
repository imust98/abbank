<template>
  <div class="m-form-modify">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基础信息" name="1">
        <el-form :model="ruleForm1" :inline="true" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm1">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm1.name"></el-input>
          </el-form-item>
          <el-form-item label="出生年月" prop="birthday">
            <el-date-picker
                v-model="ruleForm1.birthday"
                type="date"
                value-format="timestamp"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm1.sex">
              <el-radio :label="male">男</el-radio>
              <el-radio :label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="card_id">
            <el-input v-model="ruleForm1.card_id"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="ruleForm1.phone"></el-input>
          </el-form-item>
          <el-form-item label="户口所在地" prop="hk_address">
            <el-input v-model="ruleForm1.hk_address"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" prop="home_address">
            <el-input type="textarea" v-model="ruleForm1.home_address"></el-input>
          </el-form-item>
          <el-form-item label="工作单位" prop="unit_address">
            <el-input type="textarea" v-model="ruleForm1.unit_address"></el-input>
          </el-form-item>
          <el-form-item label="收入情况" prop="income">
            <el-input v-model="ruleForm1.income"></el-input>
          </el-form-item>
          <el-form-item label="家庭成员编号" prop="spouse_id">
            <el-input v-model="ruleForm1.spouse_id"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
              <el-select v-model="ruleForm1.person_type"  placeholder="请选择">
              <el-option
                v-for="item in personType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="ruleForm1.type === 2" label="工号" prop="employee_id">
            <el-input v-model="ruleForm1.employee_id"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm1.type === 2" label="开始日期" prop="employee_start_time">
            <el-date-picker
                v-model="ruleForm1.employee_start_time"
                type="date"
                value-format="timestamp"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <div class="form-button">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm1')">提交</el-button>
              <el-button @click="resetForm('ruleForm1')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="信用信息" name="2">
        <el-form :model="ruleForm2" :inline="true" :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm2">
          <el-form-item label="信用证编号" prop="credit_id">
            <el-input v-model="ruleForm2.credit_id"></el-input>
          </el-form-item>
          <el-form-item label="信用证发放日" prop="credit_start_time">
            <el-date-picker
              v-model="ruleForm2.credit_start_time"
              type="date"
              value-format="timestamp"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="信用证到期日" prop="credit_expire_time">
            <el-date-picker
              v-model="ruleForm2.credit_expire_time"
              type="date"
              value-format="timestamp"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="信用证评定人" prop="credit_adjuster">
            <el-input v-model="ruleForm2.credit_adjuster"></el-input>
          </el-form-item>
          <el-form-item label="信用证授信级别" prop="credit_level">
            <el-input v-model="ruleForm2.credit_level"></el-input>
          </el-form-item>
          <el-form-item label="客户经理" prop="customer_manager">
            <el-input v-model="ruleForm2.customer_manager"></el-input>
          </el-form-item>
          <el-form-item label="销户日期" prop="destroy_time">
            <el-date-picker
              v-model="ruleForm2.destroy_time"
              type="date"
              value-format="timestamp"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="销户原因" prop="destroy_reason">
            <el-input v-model="ruleForm2.destroy_reason"></el-input>
          </el-form-item>
          <div class="form-button">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="贷款信息" name="3">
        <el-form :model="ruleForm3" :inline="true" :rules="rules" ref="ruleForm3" label-width="120px" class="demo-ruleForm">
          <el-form-item label="贷款金额" prop="loans_count">
            <el-input v-model="ruleForm3.loans_count"></el-input>
          </el-form-item>
          <el-form-item label="贷款期限" prop="loans_deadline">
            <el-input v-model="ruleForm3.loans_deadline"></el-input>
          </el-form-item>
          <el-form-item label="贷款利率" prop="loans_rate">
            <el-input v-model="ruleForm3.loans_rate"></el-input>
          </el-form-item>
          <el-form-item label="放款日期" prop="lending_date">
            <el-date-picker
              v-model="ruleForm3.lending_date"
              type="date"
              value-format="timestamp"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="贷款余额" prop="loans_balance">
            <el-input v-model="ruleForm3.loans_balance"></el-input>
          </el-form-item>
          <el-form-item label="贷款科目" prop="loans_subject">
            <el-input v-model="ruleForm3.loans_subject"></el-input>
          </el-form-item>
          <el-form-item label="还款方式" prop="repayment_method">
            <el-input v-model="ruleForm3.repayment_method"></el-input>
          </el-form-item>
          <el-form-item label="担保人编码" prop="loans_bondsman_ids">
            <el-input v-model="ruleForm3.loans_bondsman_ids"></el-input>
          </el-form-item>
          <el-form-item label="主要负责人" prop="primary_person">
            <el-input v-model="ruleForm3.primary_person"></el-input>
          </el-form-item>
          <el-form-item label="次要负责人" prop="minor_person">
            <el-input v-model="ruleForm3.minor_person"></el-input>
          </el-form-item>
          <el-form-item label="贷款用途" prop="loans_use">
            <el-input v-model="ruleForm3.loans_use"></el-input>
          </el-form-item>
          <el-form-item label="贷款品种" prop="loans_kind">
            <el-input v-model="ruleForm3.loans_kind"></el-input>
          </el-form-item>
          <el-form-item label="贷款类型" prop="loans_type">
            <el-input v-model="ruleForm3.loans_type"></el-input>
          </el-form-item>
          <el-form-item label="担保方式" prop="bondsman_method">
            <el-input v-model="ruleForm3.bondsman_method"></el-input>
          </el-form-item>
          <el-form-item label="贷款状态" prop="loans_status">
            <el-input v-model="ruleForm3.loans_status"></el-input>
          </el-form-item>
          <el-form-item label="行业分类" prop="industry_classify">
            <el-input v-model="ruleForm3.industry_classify"></el-input>
          </el-form-item>
          <el-form-item label="经营性分类" prop="business_classify">
            <el-input v-model="ruleForm3.business_classify"></el-input>
          </el-form-item>
          <el-form-item label="利息收入" prop="interest_income">
            <el-input v-model="ruleForm3.interest_income"></el-input>
          </el-form-item>
          <el-form-item label="逾期欠款" prop="overdue_loans">
            <el-input v-model="ruleForm3.overdue_loans"></el-input>
          </el-form-item>
          <div class="form-button">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm3')">提交</el-button>
              <el-button @click="resetForm('ruleForm3')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import _ from 'lodash';
import { mergeValue } from '@/utils/index'
export default {
  data() {
    return {
      activeNames: ['1', '2', '3'],
      male: 1,
      female: 2,
      id: '',
      ruleForm1: {
        name: '',
        birthday: '',
        sex: 1,
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
      ruleForm2: {
        credit_id: '',
        credit_start_time: '',
        credit_expire_time: '',
        credit_adjuster: '',
        credit_level: '',
        customer_manager: '',
        destroy_time: '',
        destroy_reason: ''
      },
      ruleForm3: {
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
        loans_kind: '',
        loans_type: '',
        bondsman_method: '',
        loans_status: '',
        industry_classify: '',
        business_classify: '',
        interest_income: '',
        overdue_loans: ''
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
    handleChange(val) {
      console.log(val);
    },
    submitForm(formName) {
      const data = this[formName];
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'ruleForm1') {
            data.formType = 'base';
          } else if (formName === 'ruleForm2') {
            data.formType = 'credit';
          } else {
            data.formType = 'loans';
          }
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
        vm.ruleForm1 = mergeValue(vm.ruleForm1, data);
        vm.ruleForm2 = mergeValue(vm.ruleForm2, data);
        vm.ruleForm3 = mergeValue(vm.ruleForm3, data);
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


