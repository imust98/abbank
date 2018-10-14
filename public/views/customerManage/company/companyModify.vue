<template>
  <div class="m-form-modify">
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <div class="title">基础信息</div>
      <el-form-item label="企业名称" prop="company_name">
        <el-input v-model="ruleForm.company_name"></el-input>
      </el-form-item>
      <el-form-item label="企业编号" prop="company_number">
        <el-input v-model="ruleForm.company_number"></el-input>
      </el-form-item>
      <el-form-item label="营业执照编号" prop="license_number">
        <el-input v-model="ruleForm.license_number"></el-input>
      </el-form-item>
      <el-form-item label="注册资金" prop="register_money">
        <el-input v-model="ruleForm.register_money"></el-input>
      </el-form-item>
      <el-form-item label="经营地址" prop="business_address">
        <el-input v-model="ruleForm.business_address"></el-input>
      </el-form-item>
      <el-form-item label="经营范围" prop="business_scope">
        <el-input v-model="ruleForm.business_scope"></el-input>
      </el-form-item>
      <el-form-item label="股东" prop="stockholder">
        <el-input v-model="ruleForm.stockholder"></el-input>
      </el-form-item>
      <el-form-item label="营业执照有效期" prop="license_expiry_time">
        <el-date-picker
            v-model="ruleForm.license_expiry_time"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="信用机构代码证编号" prop="credit_institution_number">
        <el-input v-model="ruleForm.credit_institution_number"></el-input>
      </el-form-item>
      <el-form-item label="信用机构代码证有效期" prop="credit_institution_expiry_time">
        <el-date-picker
            v-model="ruleForm.credit_institution_expiry_time"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="土地使用证" prop="land_license_number">
        <el-input v-model="ruleForm.land_license_number"></el-input>        
      </el-form-item>
      <el-form-item label="土地使用证有效期" prop="land_license_expiry_time">
        <el-date-picker
            v-model="ruleForm.land_license_expiry_time"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="特种行业许可证编号" prop="special_industry_number">
        <el-input v-model="ruleForm.special_industry_number"></el-input>
      </el-form-item>
      <el-form-item label="特种行业许可证有效期" prop="special_industry_expiry_time">
        <el-date-picker
            v-model="ruleForm.special_industry_expiry_time"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="开户许可证编码" prop="open_account_number">
        <el-input v-model="ruleForm.open_account_number"></el-input>
      </el-form-item>
      <el-form-item label="开户许可证有效期" prop="open_account_expiry_time">
        <el-date-picker
            v-model="ruleForm.open_account_expiry_time"
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
      id: '',
      ruleForm: {
        company_name: '',
        company_number: '',
        license_number: '',
        register_money: '',
        business_address: '',
        business_scope: '',
        stockholder:'',
        license_expiry_time:'',
        credit_institution_number:'',
        credit_institution_expiry_time:'',
        land_license_number:'',
        land_license_expiry_time:'',
        special_industry_number:'',
        special_industry_expiry_time:'',
        open_account_number:'',
        open_account_expiry_time:''
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
    submitForm(formName) {
      const data = this.ruleForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
        vm.ruleForm = _.merge({}, data);
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


