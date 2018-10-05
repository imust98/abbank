import {
  addCompany,
  addCompanyCredit,
  getList,
  getCompany,
  deleteCompany,
  modifyCompany
} from '@/api/company';
const company = {
  state: {
    list: [],
    company:null
  },
  mutations: {
    CompanyListLoad: (state, list) => {
      state.list = list;
    },
    CompanyAddLoad: (state, company) => {
      state.list.push(company);
    },
    CompanyItemLoad: (state, company) => {
      state.company = company;
    },
    CompanyDelete: (state, company) => {
      const index = state.list.findIndex(item => item.id === company.id);
      state.list.splice(index, 1);
    },
    CompanyUpdate: (state, company) => {
      const index = state.list.findIndex(item => item.id === company.id);
      state.list.splice(index, 1, company);
    }
  },
  actions: {
    GetCompanyList({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(response => {
          const data = response.data;
          commit('CompanyListLoad', data.result.list);
          resolve(data.result);
        });
      });
    },
    GetCompanyItem({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        getCompany(data).then(response => {
          const data = response.data;
          commit('CompanyItemLoad', data.result);
          resolve(data.result);
        });
      });
    },
    AddCompany({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        addCompany(data).then(response => {
          const data = response.data;
          commit('CompanyAddLoad', data.result);
          resolve(data.result);
        });
      });
    },
    AddCompanyCredit({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        addCompanyCredit(data).then(response => {
          const data = response.data;
          commit('CompanyUpdate', data.result);
          resolve(data.result);
        });
      });
    },
    DelCompany({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        deleteCompany(data).then(response => {
          const data = response.data;
          commit('CompanyDelete', data.result);
          resolve(data.result);
        });
      });
    },
    ModifyCompany({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        modifyCompany(data).then(response => {
          const data = response.data;
          commit('CompanyUpdate', data.result);
          resolve(data.result);
        });
      });
    }
  }
}
export default company;
