<template>
  <div class="m-layout">
    <div class="operation">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加企业</el-button>
      <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出Excel</el-button>
    </div>
    <div class="query">
      <el-form :model="query" :inline="true" class="form-inline">
        <el-form-item label="统计分类">
          <el-select v-model="query.statisticsType" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input  v-model="query.name" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="ID编号">
          <el-input  v-model="query.id" placeholder="请输入ID编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table
      :data="companyList"
      :border="true"
      style="width: 100%">
      <el-table-column
        prop="id"
        width="120px"
        label="客户ID">
      </el-table-column>
      <el-table-column
        prop="name"
        width="180px"
        label="企业名称">
      </el-table-column>
      <el-table-column
        prop="company_number"
        width="120px"
        label="企业编号">
      </el-table-column>
      <el-table-column
        prop="license_number"
        width="150px"
        label="营业执照编号">
      </el-table-column>
      <el-table-column
        prop="register_money"
        width="120px"
        label="注册资金">
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <div v-if="user.role === 1">
            <el-button
            size="mini"
            type="primary"
            @click="handleDetail(scope.$index, scope.row)">查看</el-button>
            <el-button
            size="mini"
            type="primary"
            @click="handleModify(scope.$index, scope.row)">修改</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
          <div v-else>
            <el-button
            size="mini"
            type="primary"
            @click="handleDetail(scope.$index, scope.row)">查看</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="page">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="query.pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total,sizes, prev, pager, next"
          :total="responseQuery.totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import querystring from "querystring";
export default {
  computed: {
    companyList: {
      get() {
        return this.$store.state.company.list || [];
      }
    },
    user: {
      get() {
        return this.$store.state.user.info
      }
    }
  },
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10,
        card_type: 1,
        statisticsType: '',
        name: '',
        id: ''
      },
      responseQuery: {
        totalCount: 0,
        totalPageCount: 0
      },
      optionsType: [{
        value: 'credit',
        label: '信用'
      }]
      // optionsType: [{
      //   value: 'credit',
      //   label: '信用'
      // }, {
      //   value: 'loans',
      //   label: '贷款'
      // }]
    }
  },
  methods: {
    formatSex(row) {
      return ['男', '女'][row.sex];
    },
    handleCurrentChange(val) {
      this.query.pageIndex = val;
      this.handleQuery();
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.handleQuery();
    },
    handleAddCredit(index, row) {
      this.$router.push('/customer/company/addCredit/' + row.id);
    },
    handleCreate() {
      this.$router.push('/customer/company/create');
    },
    handleModify(index, row) {
      this.$router.push('/customer/company/modify/' + row.id);
    },
    handleDetail(index, row) {
      this.$router.push('/customer/company/detail/' + row.id);
    },
    handleDelete(index, row) {
      this.$store.dispatch('DelCompany', {
        params: {
          id: row.id
        }
      })
    },
    handleQuery() {
      this.$store.dispatch('GetCompanyList', Object.assign({}, this.query))
        .then(this.listLoadCb);
    },
    listLoadCb(data) {
      this.responseQuery.totalCount = data.query.totalCount;
      this.responseQuery.totalPageCount = data.query.totalPageCount
    },
    exportExcel() {
      let downloadUrl = '/api/company/res/download';
      let a = document.createElement('a');
      let params = Object.assign({}, this.query, { pageSize: 100000 })
      const str = querystring.stringify(params);
      a.href = downloadUrl + '?' + str;
      a.click();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('GetCompanyList', Object.assign({}, vm.query))
        .then(vm.listLoadCb.bind(vm));
    });
  }
}
</script>

