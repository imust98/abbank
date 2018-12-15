<template>
  <div class="m-form-modify">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基础信息" name="1">
        <el-form :model="ruleForm1" :inline="true"  ref="ruleForm1" label-width="120px" class="demo-ruleForm">
          <el-form-item label="企业名称" prop="name">
            <span>{{ruleForm1.name}}</span>
          </el-form-item>
          <el-form-item label="企业编号" prop="company_number">
            <span>{{ruleForm1.company_number}}</span>
          </el-form-item>
          <el-form-item label="营业执照编号" prop="license_number">
            <span>{{ruleForm1.license_number}}</span>
          </el-form-item>
          <el-form-item label="注册资金" prop="register_money">
            <span>{{ruleForm1.register_money}}</span>
          </el-form-item>
          <el-form-item label="经营地址" prop="business_address">
            <span>{{ruleForm1.business_address}}</span>
          </el-form-item>
          <el-form-item label="经营范围" prop="business_scope">
            <span>{{ruleForm1.business_scope}}</span>
          </el-form-item>
          <el-form-item label="股东" prop="stockholder">
            <span>{{ruleForm1.stockholder}}</span>
          </el-form-item>
          <el-form-item label="营业执照有效期" prop="license_expiry_time">
            <span>{{ruleForm1.license_expiry_time}}</span>
          </el-form-item>
          <el-form-item label="信用机构代码证编号" prop="credit_institution_number">
            <span>{{ruleForm1.credit_institution_number}}</span>
          </el-form-item>
          <el-form-item label="信用机构代码证有效期" prop="credit_institution_expiry_time">
            <span>{{ruleForm1.credit_institution_expiry_time}}</span>
          </el-form-item>
          <el-form-item label="土地使用证" prop="land_license_number">
            <span>{{ruleForm1.land_license_number}}</span>
          </el-form-item>
          <el-form-item label="土地使用证有效期" prop="land_license_expiry_time">
            <span>{{ruleForm1.land_license_expiry_time}}</span>
          </el-form-item>
          <el-form-item label="特种行业许可证编号" prop="special_industry_number">
            <span>{{ruleForm1.special_industry_number}}</span>
          </el-form-item>
          <el-form-item label="特种行业许可证有效期" prop="special_industry_expiry_time">
            <span>{{ruleForm1.special_industry_expiry_time}}</span>
          </el-form-item>
          <el-form-item label="开户许可证编码" prop="open_account_number">
            <span>{{ruleForm1.open_account_number}}</span>
          </el-form-item>
          <el-form-item label="开户许可证有效期" prop="open_account_expiry_time">
            <span>{{ruleForm1.open_account_expiry_time}}</span>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="信用信息" name="2">
        <el-form :model="ruleForm2" :inline="true" :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm2">
          <el-form-item label="信用证编号" prop="credit_id">
            <span>{{ruleForm2.credit_id}}</span>
          </el-form-item>
          <el-form-item label="信用证发放日" prop="credit_start_time">
            <span>{{ruleForm2.credit_start_time}}</span>
          </el-form-item>
          <el-form-item label="信用证到期日" prop="credit_expire_time">
            <span>{{ruleForm2.credit_expire_time}}</span>
          </el-form-item>
          <el-form-item label="信用证评定人" prop="credit_adjuster">
            <span>{{ruleForm2.credit_adjuster}}</span>
          </el-form-item>
          <el-form-item label="信用证授信级别" prop="credit_level">
            <span>{{ruleForm2.credit_level}}</span>
          </el-form-item>
          <el-form-item label="客户经理" prop="customer_manager">
            <span>{{ruleForm2.customer_manager}}</span>
          </el-form-item>
          <el-form-item label="销户日期" prop="destroy_time">
            <span>{{ruleForm2.destroy_time}}</span>
          </el-form-item>
          <el-form-item label="销户原因" prop="destroy_reason">
            <span>{{ruleForm2.destroy_reason}}</span>
          </el-form-item>
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
      }
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
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
        // vm.ruleForm3 = mergeValue(vm.ruleForm3, data);
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


