import React from 'react';
import { Link } from 'react-router-dom';

import { registerWithFirebase, addUserProfileToFbase } from '../../api/firebase';
import userStore from '../../stores/userStore';
import { showAlert } from '../../utils/utils';

class RegisterForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
  };

  onRegisterClick = () => {
    if (
      this.state.name &&
      this.state.password &&
      this.state.name.length > 0 &&
      this.state.password === this.state.confirmPassword
    ) {
      this.setState({ isLoading: true });
      registerWithFirebase(this.state.email, this.state.password).then(response => {
        const { error, data } = response;
        if (error) {
          showAlert(error.message, 'error');
          this.setState({ isLoading: false });
        } else {
          const profileData = {
            id: data.user.uid,
            email: this.state.email,
            first: this.state.name.split(' ')[0],
            last: this.state.name.split(' ')[1] ? this.state.name.split(' ')[1] : '',
          };
          this.setState({ isLoading: true });
          addUserProfileToFbase(profileData).then(res => {
            this.setState({ isLoading: false });
            if (res.error) {
              showAlert(res.error.message);
            } else {
              userStore.profileData = res.data;
              this.props.history.push('/home');
            }
          });
        }
      });
    } else if (this.state.password.length > 0 && this.state.password !== this.state.confirmPassword) {
      this.setState({ isLoading: false });
      showAlert('Passwords do not match!');
    } else {
      this.setState({ isLoading: false });
      showAlert('Enter all details');
    }
  };

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="box">
        {/* <div style={styles.logoContainer}>
          <div style={styles.logo} />
          <div style={styles.logoText} />
        </div> */}

        <div className="field">
          <label className="label">Full Name (First Last)</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="name"
              name="name"
              placeholder="e.g. Alex Johnson"
              autoComplete="fullname"
              onChange={this.handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user-circle" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              placeholder="e.g. alexjohnson@gmail.com"
              autoComplete="email"
              onChange={this.handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope" />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder="********"
              onChange={this.handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock" />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Retype Password</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              onChange={this.handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock" />
            </span>
          </div>
        </div>
        <div className="field is-grouped" style={{ marginTop: '2rem' }}>
          <div className="control">
            <div
              href="#"
              className={`button is-info ${this.state.isLoading ? 'is-loading' : ''}`}
              onClick={() => {
                this.onRegisterClick();
              }}
            >
              CREATE ACCOUNT
            </div>
          </div>
          <div className="control">
            <Link to="/login">
              <div className="button is-text" style={{ textDecoration: 'none', color: '#0271D3' }}>
                LOGIN
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
