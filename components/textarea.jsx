import React from 'react';

const Textarea = ({ styles = {}, ...o }) => (
  <textarea { ...o } className={ styles.control }/>
);

Textarea.propTypes = {
  name: React.PropTypes.string.isRequired,
  styles: React.PropTypes.object,
};

export default Textarea;
