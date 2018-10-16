<template>
  <div class="m-form-modify">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基础信息" name="1">
        <el-form :model="ruleForm1" :inline="true" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="ruleForm1.name"></el-input>
          </el-form-item>
          <el-form-item label="企业编号" prop="company_number">
            <el-input v-model="ruleForm1.company_number"></el-input>
          </el-form-item>
          <el-form-item label="营业执照编号" prop="license_number">
            <el-input v-model="ruleForm1.license_number"></el-input>
          </el-form-item>
          <el-form-item label="注册资金" prop="register_money">
            <el-input v-model="ruleForm1.register_money"></el-input>
          </el-form-item>
          <el-form-item label="经营地址" prop="business_address">
            <el-input v-model="ruleForm1.business_address"></el-input>
          </el-form-item>
          <el-form-item label="经营范围" prop="business_scope">
            <el-input v-model="ruleForm1.business_scope"></el-input>
          </el-form-item>
          <el-form-item label="股东" prop="stockholder">
            <el-input v-model="ruleForm1.stockholder"></el-input>
          </el-form-item>
          <el-form-item label="营业执照有效期" prop="license_expiry_time">
            <el-date-picker
                v-model="ruleForm1.license_expiry_time"
                type="date"
                value-format="timestamp"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="信用机构代码证编号" prop="credit_institution_number">
            <el-input v-model="ruleForm1.credit_institution_number"></el-input>
          </el-form-item>
          <el-form-item label="信用机构代码证有效期" prop="credit_institution_expiry_time">
            <el-date-picker
                v-model="ruleForm1.credit_institution_expiry_time"
                type="date"
                value-format="timestamp"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="土地使用证" prop="land_license_number">
            <el-input v-model="ruleForm1.land_license_number"></el-input>        
          </el-form-item>
          <el-form-item label="土地使用证有效期" prop="land_license_expiry_time">
            <el-date-picker
                v-model="ruleForm1.land_license_expiry_time"
                type="date"
                value-format="timestamp"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="特种行业许可证编号" prop="special_industry_number">
            <el-input v-model="ruleForm1.special_industry_number"></el-input>
          </el-form-item>
          <el-form-item label="特种行业许可证有效期" prop="special_industry_expiry_time">
            <el-date-picker
                v-model="ruleForm1.special_industry_expiry_time"
                type="date"
                value-format="timestamp"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="开户许可证编码" prop="open_account_number">
            <el-input v-model="ruleForm1.open_account_number"></el-input>
          </el-form-item>
          <el-form-item label="开户许可证有效期" prop="open_account_expiry_time">
            <el-date-picker
                v-model="ruleForm1.open_account_expiry_time"
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
      id: '',
      ruleForm1: {
        name: '',
        company_number: '',
        license_number: '',
        register_money: '',
        business_address: '',
        business_scope: '',
        stockholder: '',
        license_expiry_time: '',
        credit_institution_number: '',
        credit_institution_expiry_time: '',
        land_license_number: '',
        land_license_expiry_time: '',
        special_industry_number: '',
        special_industry_expiry_time: '',
        open_account_number: '',
        open_account_expiry_time: ''
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
        company_name: [
          { required: true, message: '请输入营业执照信息', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在 2 到 11 个字符', trigger: 'blur' }
        ]
      }
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
          this.$store.dispatch('ModifyCompany', { data, params: { id: this.id } }).then((result) => {
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
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.id = to.params.id;
      vm.$store.dispatch('GetCompanyItem', {
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


