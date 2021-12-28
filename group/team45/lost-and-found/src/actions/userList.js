export const removeUser = (list, user) => {
 
    const updated = list.state.users.filter(s => {
      return s !== user;
    });
  
    list.setState({
      users: updated
    });
};