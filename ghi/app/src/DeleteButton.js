import React from 'react';

function Delete(item) {
    const data = this.state.data.filter(i => i.id !== item.id)
    this.setState({data})
  }