<template>
  <div class="m-layout">
    <div class="query">
      <el-form :model="query" class="demo-form-inline">
        <el-form-item label="分类筛选">
          <el-select v-model="query.type" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="条件筛选">
          <el-select v-model="query.keyword" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input  v-model="query.value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        </div>
      </el-form>
    </div>
    <div class="operation">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加企业</el-button>
      <el-button type="primary" icon="el-icon-download" @click="handleCreate">导出Excel</el-button>
    </div>
    <div class="list">
      <el-table
      :data="companyList"
      :border="true"
      style="width: 100%">
      <el-table-column
        prop="yyzz"
        width="120px"
        label="营业执照">
      </el-table-column>
      <el-table-column
        prop="xyjg"
        width="120px"
        label="信用机构">
      </el-table-column>
      <el-table-column
        prop="tdsy"
        width="120px"
        label="土地使用证">
      </el-table-column>
      <el-table-column
        prop="tzhy"
        width="120px"
        label="特种行业许可证">
      </el-table-column>
      <el-table-column
        prop="khxk"
        width="120px"
        label="开户许可证">
      </el-table-column>
      <el-table-column
        prop="pwxk"
        width="120px"
        label="排污许可证">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <!-- <el-button v-if="!scope.row.credit_id"
            size="mini"
            type="primary"
            @click="handleAddCredit(scope.$index, scope.row)">添加信用信息</el-button> -->
            <el-button
            size="mini"
            type="primary"
            @click="handleModify(scope.$index, scope.row)">修改</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
export default {
  computed: {
    companyList: {
      get() {
        return this.$store.state.company.list || [];
      }
    }
  },
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10,
        type:'',
        keyword: '',
        value: ''
      },
      responseQuery: {
        totalCount: 0,
        totalPageCount: 0
      },
      options: [{
        value: 'yyzz',
        label: '营业执照'
      }],
      optionsType: [{
        value: 'credit',
        label: '信用'
      },{
        value: 'loans',
        label: '贷款'
      }]
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

