<template>
  <div class="m-form-modify">
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
      <div v-if="ruleForm.credit_id">
        <div class="title">信用信息</div>
        <el-form-item label="信用证编号" prop="credit_id">
          <el-input v-model="ruleForm.credit_id" disabled></el-input>
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
        yyzz: '',
        yyjg: '',
        tdsy: '',
        tzhy: '',
        khxk: '',
        pwxk: '',
        credit_id: '',
        credit_starttime: '',
        credit_expiretime: '',
        credit_adjuster: '',
        credit_level: '',
        loans_count: '',
        loans_deadline: '',
        loans_rate: '',
        loans_bondsman_ids: '',
        lending_date: '',
        loans_balance: '',
        loans_subject: '',
        repayment_method: ''
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


