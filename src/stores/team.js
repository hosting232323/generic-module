import { defineStore } from 'pinia';

export const useTeamStore = defineStore('team', {
  state: () => ({
    members: [],
    selectedMember: null
  }),
  actions: {
    loadMembers(members) {
      this.members = members;
    },
    selectMember(member) {
      this.selectedMember = member;
    },
    clearSelection() {
      this.selectedMember = null;
    }
  },
  getters: {
    membersByRole: (state) => {
      const grouped = {};
      state.members.forEach(member => {
        const role = member.role || 'Other';
        if (!grouped[role]) {
          grouped[role] = [];
        }
        grouped[role].push(member);
      });
      return grouped;
    }
  }
});
