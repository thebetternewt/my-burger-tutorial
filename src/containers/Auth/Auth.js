import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  authenticate,
  setAuthRedirectPath
} from '../../store/actions/authActions';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import validateInput from '../../common/validateInput';

const AuthFormContainer = styled.div`
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  box-sizing: border-box;
  margin: 20px auto;
  padding: 10px;
  width: 80%;
  text-align: center;

  @media (min-width: 600px) {
    width: 500px;
  }
`;

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.redirectPath !== '/') {
      this.props.setAuthRedirectPath();
    }
  }

  inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: validateInput(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({
      controls: updatedControls
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.authenticate(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  handleSwitchAuthMode = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    // Set auth redirect path
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.redirectPath} />;
    }

    // Check if loading
    if (this.props.loading) {
      return <Spinner />;
    }

    // Check error
    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }

    // Update elements for validation
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    const form = formElementsArray.map(el => (
      <Input
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        changed={e => this.inputChangedHandler(e, el.id)}
        valid={el.config.valid}
        shouldValidate={!!el.config.validation}
        touched={el.config.touched}
      />
    ));

    return (
      <AuthFormContainer>
        {errorMsg}
        <form onSubmit={this.handleSubmit}>
          <h4>{this.state.isSignup ? 'Sign Up' : 'Sign In'}</h4>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.handleSwitchAuthMode}>
          Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}
        </Button>
      </AuthFormContainer>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  redirectPath: state.auth.authRedirectPath
});

export default connect(mapStateToProps, { authenticate, setAuthRedirectPath })(
  Auth
);
