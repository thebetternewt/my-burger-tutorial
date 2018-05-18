import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// Error message modal wrapper for case when axios request returns error
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    // Add global error interceptors before component mounts
    UNSAFE_componentWillMount() {
      // Clear error on new request
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      // Set error if response error
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          // console.log(err);
          this.setState({ error: err });
        }
      );
    }

    // Remove global error interceptors before component unmounts
    componentWillUnmount() {
      // console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    // Clear error when clicking outside of modal
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
