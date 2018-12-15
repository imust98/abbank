<template>
  <div class="m-form-modify">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基础信息" name="1">
        <el-form
          :model="ruleForm1"
          :inline="true"
          ref="ruleForm1"
          label-width="120px"
          class="demo-ruleForm1"
        >
          <el-form-item label="姓名" prop="name">
            <span>{{ruleForm1.name}}</span>
          </el-form-item>
          <el-form-item label="出生年月" prop="birthday">
            <span>{{ruleForm1.birthday | timestamp}}</span>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <span>{{ruleForm1.sex | formatSex}}</span>
          </el-form-item>
          <el-form-item label="身份证号" prop="card_id">
            <span>{{ruleForm1.card_id}}</span>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <span>{{ruleForm1.phone}}</span>
          </el-form-item>
          <el-form-item label="户口所在地" prop="hk_address">
            <span>{{ruleForm1.hk_address}}</span>
          </el-form-item>
          <el-form-item label="家庭住址" prop="home_address">
            <span>{{ruleForm1.home_address}}</span>
          </el-form-item>
          <el-form-item label="工作单位" prop="unit_address">
            <span>{{ruleForm1.unit_address}}</span>
          </el-form-item>
          <el-form-item label="收入情况" prop="income">
            <span>{{ruleForm1.income}}</span>
          </el-form-item>
          <el-form-item label="家庭成员编号" prop="spouse_id">
            <span>{{ruleForm1.spouse_id}}</span>
          </el-form-item>
          <el-form-item label="客户类型">
            <span>{{ruleForm1.card_type | formatCardType }}</span>
          </el-form-item>
          <el-form-item v-if="ruleForm1.type === 2" label="工号" prop="employee_id">
            <span>{{ruleForm1.employee_id}}</span>
          </el-form-item>
          <el-form-item v-if="ruleForm1.type === 2" label="开始日期" prop="employee_start_time">
            <span>{{ruleForm1.employee_start_time}}</span>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="信用信息" name="2">
        <el-form
          :model="ruleForm2"
          :inline="true"
          ref="ruleForm2"
          label-width="120px"
          class="demo-ruleForm2"
        >
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
import { mergeValue, parseTime } from '@/utils/index';
const cardType = [{
  value: 1,
  label: '普通客户'
}, {
  value: 2,
  label: '信息员'
}, {
  value: 3,
  label: '黑名单'
}]
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
        card_type: 1,
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
      }
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  },
  filters: {
    timestamp(time) {
      console.log(time)
      return parseTime(time + '')
    },
    formatCardType(type) {
      const obj = cardType.find(item => item.value == type)
      return obj && obj.label;
    },
    formatSex(type){
      if(type == 1) return '男';
      return '女';
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


