import React, { Component } from 'react';

const styles = {
  decalaration: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
};

export class FooterDeclaration extends Component {
  render() {
    return (
      <div>
        {window.location.pathname.indexOf('/post/') === -1 && (
          <div style={styles.decalaration}>
            <div>
              {window.location.host} © {new Date().getFullYear()}. All rights reserved.
            </div>
            <div>
              <b>Powered by</b>{' '}
              <a href="http://lesspod.org" target="_blank" rel="noopener noreferrer">
                Lesspod
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FooterDeclaration;
