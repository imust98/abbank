<template>
  <div class="m-layout">
    <div class="create">
      <el-button type="primary" @click="handleCreate">添加个人客户</el-button>
    </div>
    <div class="query">
      <el-select v-model="query.keyword" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="query.value" placeholder="请输入内容"></el-input>
      <el-button type="default" @click="handleQuery">查询</el-button>
    </div>
    <div class="list">
      <el-table
      :data="personList"
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
            <el-button
            size="mini"
            type="primary"
            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
          :page-sizes="[20, 50, 100, 200]"
          :page-size="20"
          layout="total,sizes, prev, pager, next"
          :total="responseQuery.totleCount">
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
        pageSize: 20,
        keyword: '',
        value:''
      },
      responseQuery: {
        totleCount: 0,
        totlePageCount: 0
      },
      options: [{
          value: 'name',
          label: '姓名'
        }, {
          value: 'sex',
          label: '性别'
        }, {
          value: 'card_id',
          label: '身份证号'
        }]
    }
  },
  methods: {
    formatSex(row){
      return ['女','男'][row.sex];
    },
    handleCurrentChange(val) {
      this.query.pageIndex = val;
      this.handleQuery();
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.handleQuery();
    },
    handleCreate() {
      this.$router.push('/customer/person/create');
    },
    handleDelete(index,row){
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
      // this.responseQuery.totleCount = data.query.totleCount;
      // this.responseQuery.totlePageCount = data.query.totlePageCount
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

