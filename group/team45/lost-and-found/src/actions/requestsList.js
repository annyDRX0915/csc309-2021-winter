export const removeRequest = (list, request) => {
    console.log(list)

    const updated = list.state.requests.filter(s => {
      return s !== request;
    });
  
    list.setState({
      requests: updated
    });
};