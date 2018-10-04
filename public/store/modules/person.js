import {
  addPerson,
  getList,
  deletePerson,
  modifyPerson
} from '@/api/person';
const person = {
  state: {
    list: []
  },
  mutations: {
    PersonListLoad: (state, list) => {
      state.list = list;
    },
    PersonAddLoad: (state, person) => {
      state.list.push(person);
    },
    PersonDelete: (state, person) => {
      const index = state.list.findIndex(item => item.id === person.id);
      state.list.splice(index, 1);
    },
    PersonUpdate: (state, person) => {
      const index = state.list.findIndex(item => item.id === person.id);
      state.list.splice(index, 1, person);
    }
  },
  actions: {
    GetPersonList({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(response => {
          const data = response.data;
          commit('PersonListLoad', data.result.list);
          resolve(data.result);
        });
      });
    },
    AddPerson({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        addPerson(data).then(response => {
          const data = response.data;
          commit('PersonAddLoad', data.result);
          resolve(data.result);
        });
      });
    },
    DelPerson({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        deletePerson(data).then(response => {
          const data = response.data;
          commit('PersonDelete', data.result);
          resolve(data.result);
        });
      });
    },
    ModifyPerson({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        modifyPerson(data).then(response => {
          const data = response.data;
          commit('PersonUpdate', data.result);
          resolve(data.result);
        });
      });
    }
  }
}
export default person;
