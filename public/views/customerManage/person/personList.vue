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
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加人员</el-button>
      <el-button type="primary" icon="el-icon-download" @click="handleCreate">导出Excel</el-button>
    </div>
    <div class="list">
      <el-table
      :data="personList"
      :border="true"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        :formatter="formatSex"
        width="60">
      </el-table-column>
      <el-table-column
        prop="age"
        width="60"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="card_id"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button v-if="!scope.row.credit_id"
            size="mini"
            type="primary"
            @click="handleAddCredit(scope.$index, scope.row)">添加信用信息</el-button>
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
    personList: {
      get() {
        return this.$store.state.person.list || [];
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
        value: 'name',
        label: '姓名'
      }, {
        value: 'card_id',
        label: '身份证号'
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
      this.$router.push('/customer/person/addCredit/' + row.id);
    },
    handleCreate() {
      this.$router.push('/customer/person/create');
    },
    handleModify(index, row) {
      this.$router.push('/customer/person/modify/' + row.id);
    },
    handleDelete(index, row) {
      this.$store.dispatch('DelPerson', {
        params: {
          id: row.id
        }
      })
    },
    handleQuery() {
      this.$store.dispatch('GetPersonList', Object.assign({}, this.query))
        .then(this.listLoadCb);
    },
    listLoadCb(data) {
      this.responseQuery.totalCount = data.query.totalCount;
      this.responseQuery.totalPageCount = data.query.totalPageCount
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('GetPersonList', Object.assign({}, vm.query))
        .then(vm.listLoadCb.bind(vm));
    });
  }
}
</script>

