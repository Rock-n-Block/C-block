import type { State } from 'types';

export default {
  selectState: (state: State) => state.admin,
  selectUser: (userId: number) => (state: State) => state.admin.users.find(({ id }) => userId === id),
  selectUsers: (searchText: string, selectOnlyAdmins: boolean) => (state: State) => {
    let ret = state.admin.users;
    if (searchText) {
      // eslint-disable-next-line arrow-body-style
      ret = ret.filter(({ ownerAddress, email, userName }) => {
        return [ownerAddress, email, userName].map((item) => item.toLowerCase()).includes(searchText.toLowerCase());
      });
    }

    if (selectOnlyAdmins) {
      ret = ret.filter(({ permissions }) => {
        const hasPermissions = Object.values(permissions).some((item) => item);
        return hasPermissions;
      });
    }
    return ret;
  },
};
